import { NextResponse } from 'next/server';
import { recordClick } from '@/lib/click';
import { getTrivia } from '@/lib/openai';

export async function POST(req: Request) {
  const { x, y } = await req.json();
  const clickStats = await recordClick(x, y);
  const trivia = await getTrivia(x, y);

  return NextResponse.json({
    trivia,
    ...clickStats,
  });
}