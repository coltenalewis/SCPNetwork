import { NextResponse } from 'next/server';

type IncomingMessage = {
  role: 'player' | 'npc' | 'system';
  content: string;
  speaker?: string;
};

type ChatRequest = {
  guide?: string;
  messages?: IncomingMessage[];
};

const roleMap: Record<IncomingMessage['role'], 'user' | 'assistant' | 'system'> = {
  player: 'user',
  npc: 'assistant',
  system: 'system'
};

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'OPENAI_API_KEY is missing. Set it in the server environment and redeploy.' },
      { status: 500 }
    );
  }

  let payload: ChatRequest;
  try {
    payload = (await request.json()) as ChatRequest;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const guide = payload.guide?.trim();
  const messages = payload.messages ?? [];

  if (!guide) {
    return NextResponse.json({ error: 'Missing SCP guide content.' }, { status: 400 });
  }

  const openAiMessages = [
    {
      role: 'system' as const,
      content: `You are SCP-049. Follow this behavior guide strictly:\n${guide}`
    },
    ...messages.map((message) => ({
      role: roleMap[message.role],
      content: message.content
    }))
  ];

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: openAiMessages,
      temperature: 0.7
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
  const reply = data.choices?.[0]?.message?.content?.trim();

  if (!reply) {
    return NextResponse.json({ error: 'OpenAI response was empty.' }, { status: 502 });
  }

  return NextResponse.json({ reply });
}
