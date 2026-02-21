import { NextRequest } from 'next/server';

type CacheEntry = { url: string; expiresAt: number };
const cache = new Map<string, CacheEntry>();
const TTL = 1000 * 60 * 60;

const FALLBACK = 'https://placehold.co/1200x675/f2eadb/6e6048.png?text=Roblox+Cover';

function parseTarget(target: string) {
  const game = target.match(/roblox\.com\/games\/(\d+)/);
  if (game) return { kind: 'game' as const, id: game[1] };
  const group = target.match(/roblox\.com\/communities\/(\d+)/);
  if (group) return { kind: 'community' as const, id: group[1] };
  return null;
}

async function fetchGameImage(placeId: string) {
  const placeRes = await fetch(`https://games.roblox.com/v1/games/multiget-place-details?placeIds=${placeId}`, { next: { revalidate: 3600 } });
  if (!placeRes.ok) throw new Error('place lookup failed');
  const placeData = (await placeRes.json()) as { universeId?: number }[];
  const universeId = placeData?.[0]?.universeId;
  if (!universeId) throw new Error('missing universe id');

  const imageRes = await fetch(
    `https://thumbnails.roblox.com/v1/games/icons?universeIds=${universeId}&size=768x432&format=Png&isCircular=false`,
    { next: { revalidate: 3600 } }
  );
  if (!imageRes.ok) throw new Error('thumbnail fetch failed');
  const imageData = (await imageRes.json()) as { data?: { imageUrl?: string }[] };
  return imageData?.data?.[0]?.imageUrl;
}

async function fetchGroupImage(groupId: string) {
  const res = await fetch(`https://thumbnails.roblox.com/v1/groups/icons?groupIds=${groupId}&size=420x420&format=Png&isCircular=false`, {
    next: { revalidate: 3600 }
  });
  if (!res.ok) throw new Error('group thumbnail failed');
  const data = (await res.json()) as { data?: { imageUrl?: string }[] };
  return data?.data?.[0]?.imageUrl;
}

async function ogFallback(url: string) {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const text = await res.text();
    const match = text.match(/property=["']og:image["'] content=["']([^"']+)["']/i);
    return match?.[1] ?? null;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const target = req.nextUrl.searchParams.get('target');
  if (!target) return Response.redirect(FALLBACK, 307);

  const cached = cache.get(target);
  if (cached && cached.expiresAt > Date.now()) return Response.redirect(cached.url, 307);

  const parsed = parseTarget(target);
  let imageUrl: string | null = null;

  try {
    if (parsed?.kind === 'game') imageUrl = (await fetchGameImage(parsed.id)) ?? null;
    if (parsed?.kind === 'community') imageUrl = (await fetchGroupImage(parsed.id)) ?? null;
  } catch {
    imageUrl = null;
  }

  if (!imageUrl) imageUrl = await ogFallback(target);
  if (!imageUrl) imageUrl = FALLBACK;

  cache.set(target, { url: imageUrl, expiresAt: Date.now() + TTL });
  if (cache.size > 120) {
    const oldest = cache.keys().next().value;
    if (oldest) cache.delete(oldest);
  }

  return Response.redirect(imageUrl, 307);
}
