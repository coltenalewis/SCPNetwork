import { NextResponse } from 'next/server';

type IncomingMessage = {
  role: 'player' | 'npc' | 'system';
  content: string;
  speaker?: string;
};

type ChatRequest = {
  guide?: string;
  messages?: IncomingMessage[];
  mode?: 'chat' | 'action';
  inventory?: Array<{ name: string; description: string; quantity: number }>;
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
  const mode = payload.mode ?? 'chat';
  const inventory = payload.inventory ?? [];

  if (!guide) {
    return NextResponse.json({ error: 'Missing SCP guide content.' }, { status: 400 });
  }

  const openAiMessages = [
    {
      role: 'system' as const,
      content: `You are SCP-049. Follow this behavior guide strictly:\n${guide}\n\nRoleplay mode: ${mode}. In chat mode, respond with dialogue only. In action mode, the player intends to perform actions; only allow actions to terminate the test or use inventory items. If a player's request seems like an action while in chat mode, ask if they want to switch to action mode. If they reference an item, confirm it exists before proceeding. Inventory: ${inventory
        .map((item) => `${item.name} (${item.quantity}) - ${item.description}`)
        .join('; ') || 'None'}.`
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
