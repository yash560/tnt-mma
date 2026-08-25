import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_WAIVERS } from '@/lib/initialData';
import { WaiverDocument } from '@/lib/types';

let inMemoryWaivers: WaiverDocument[] = [...INITIAL_WAIVERS];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');

  if (query) {
    const qLower = query.toLowerCase();
    const filtered = inMemoryWaivers.filter(
      (w) =>
        w.verificationId.toLowerCase().includes(qLower) ||
        w.participantName.toLowerCase().includes(qLower) ||
        w.signerPhone.includes(query)
    );
    return NextResponse.json({ success: true, count: filtered.length, waivers: filtered });
  }

  return NextResponse.json({ success: true, count: inMemoryWaivers.length, waivers: inMemoryWaivers });
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as WaiverDocument;
    if (!body.participantName || !body.signatureDataUrl) {
      return NextResponse.json({ success: false, error: 'Missing required participant details or signature' }, { status: 400 });
    }

    inMemoryWaivers = [body, ...inMemoryWaivers];
    return NextResponse.json({ success: true, waiver: body });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || 'Server error' }, { status: 500 });
  }
}
