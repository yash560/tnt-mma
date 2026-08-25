import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_MEMBERS } from '@/lib/initialData';
import { Member } from '@/lib/types';

let inMemoryMembers: Member[] = [...INITIAL_MEMBERS];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const batch = searchParams.get('batch');

  let list = inMemoryMembers;
  if (status && status !== 'ALL') {
    list = list.filter((m) => m.status === status);
  }
  if (batch && batch !== 'ALL') {
    list = list.filter((m) => m.batch === batch);
  }

  return NextResponse.json({ success: true, count: list.length, members: list });
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Member;
    if (!body.name || !body.phone) {
      return NextResponse.json({ success: false, error: 'Name and phone are required' }, { status: 400 });
    }

    inMemoryMembers = [body, ...inMemoryMembers];
    return NextResponse.json({ success: true, member: body });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || 'Server error' }, { status: 500 });
  }
}
