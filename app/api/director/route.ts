import { NextResponse } from 'next/server';

type DirectorRequest = {
  request?: string;
  appeal?: string;
  budget?: number;
  messages?: Array<{ role: 'player' | 'director' | 'system'; content: string }>;
};

const parseJsonReply = (content: string) => {
  try {
    return JSON.parse(content);
  } catch {
    const match = content.match(/\{[\s\S]*\}/);
    if (!match) return null;
    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  }
};

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'OPENAI_API_KEY is missing. Set it in the server environment and redeploy.' },
      { status: 500 }
    );
  }

  let payload: DirectorRequest;
  try {
    payload = (await request.json()) as DirectorRequest;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const requestText = payload.request?.trim();
  const budget = payload.budget ?? 0;
  const appeal = payload.appeal?.trim();
  const messages = payload.messages ?? [];

  if (!requestText && messages.length === 0) {
    return NextResponse.json({ error: 'Missing request text.' }, { status: 400 });
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      temperature: 0.4,
      messages: [
        {
          role: 'system',
          content:
            'You are Site Director Harlow overseeing procurement and research queries. Speak with terse authority. If the user is requesting a resource, respond with JSON only: { "itemName": string, "description": string, "cost": number }. Deny unsafe or impossible requests by setting itemName to "Denied" and cost to 0. If the user is asking a research question, respond with a short paragraph in plain text. For appeals, weigh the justification and budget.'
        },
        ...messages.map((message) => ({
          role: message.role === 'player' ? 'user' : message.role === 'director' ? 'assistant' : 'system',
          content: message.content
        })),
        {
          role: 'user',
          content: `Request: ${requestText ?? 'N/A'}\nCurrent budget: ${budget}\nAppeal: ${appeal ?? 'None'}`
        }
      ]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json(
      { error: `OpenAI request failed: ${response.status} ${response.statusText}. ${errorText}` },
      { status: 502 }
    );
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content?.trim();

  if (!content) {
    return NextResponse.json({ error: 'Director response was empty.' }, { status: 502 });
  }

  const parsed = parseJsonReply(content);
  if (!parsed || typeof parsed !== 'object') {
    return NextResponse.json({
      reply: content,
      item: null
    });
  }

  return NextResponse.json({
    reply: null,
    item: {
      itemName: parsed.itemName ?? 'Requested Asset',
      description: parsed.description ?? 'No description provided.',
      cost: Number(parsed.cost ?? 0)
    }
  });
}
