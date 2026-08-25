import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_BROADCASTS } from '@/lib/initialData';
import { BroadcastMessage } from '@/lib/types';

let inMemoryBroadcasts: BroadcastMessage[] = [...INITIAL_BROADCASTS];

export async function GET() {
  return NextResponse.json({ success: true, count: inMemoryBroadcasts.length, broadcasts: inMemoryBroadcasts });
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as BroadcastMessage;
    if (!body.title || !body.content) {
      return NextResponse.json({ success: false, error: 'Title and content are required' }, { status: 400 });
    }

    inMemoryBroadcasts = [body, ...inMemoryBroadcasts];
    return NextResponse.json({ success: true, broadcast: body });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || 'Server error' }, { status: 500 });
  }
}
