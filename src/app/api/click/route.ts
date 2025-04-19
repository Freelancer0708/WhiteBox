import { NextResponse } from 'next/server';
import { getTrivia } from '@/lib/openai';
import fs from 'fs/promises';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'src/data/db.json');

export async function POST(req: Request) {
  const { x, y } = await req.json();
  const key = `${x},${y}`;

  const dbRaw = await fs.readFile(dbPath, 'utf-8');
  const db = JSON.parse(dbRaw);

  db[key] = (db[key] || 0) + 1;

  await fs.writeFile(dbPath, JSON.stringify(db, null, 2));

  const totalClicks = (Object.values(db) as number[]).reduce((a, b) => a + b, 0);
  const clickCount = db[key];
  const percentage = ((clickCount / totalClicks) * 100).toFixed(2);
  const trivia = await getTrivia(x, y);

  return NextResponse.json({
    clickCount,
    totalClicks,
    percentage,
    trivia,
  });
}