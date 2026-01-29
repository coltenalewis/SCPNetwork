import { NextResponse } from 'next/server';

type DirectorRequest = {
  request?: string;
  appeal?: string;
  budget?: number;
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

  if (!requestText) {
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
            'You are the SCP Site Director procurement system. Respond with a JSON object containing: itemName (string), description (string), cost (number). Price should be realistic for SCP containment procurement. If request is unsafe or impossible, return itemName "Denied", a short description, and cost 0. Output JSON only.'
        },
        {
          role: 'user',
          content: `Request: ${requestText}\nCurrent budget: ${budget}\nAppeal: ${appeal ?? 'None'}`
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
    return NextResponse.json({ error: 'Director response was not valid JSON.' }, { status: 502 });
  }

  return NextResponse.json({
    itemName: parsed.itemName ?? 'Requested Asset',
    description: parsed.description ?? 'No description provided.',
    cost: Number(parsed.cost ?? 0)
  });
}
