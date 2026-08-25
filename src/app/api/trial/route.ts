import { NextRequest, NextResponse } from 'next/server';
import { TrialBooking } from '@/lib/types';

let inMemoryTrials: TrialBooking[] = [];

export async function GET() {
  return NextResponse.json({ success: true, count: inMemoryTrials.length, trials: inMemoryTrials });
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as TrialBooking;
    if (!body.name || !body.phone) {
      return NextResponse.json({ success: false, error: 'Name and phone are required' }, { status: 400 });
    }

    inMemoryTrials = [body, ...inMemoryTrials];
    return NextResponse.json({ success: true, trial: body });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || 'Server error' }, { status: 500 });
  }
}
