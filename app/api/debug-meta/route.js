import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const accountId = searchParams.get('accountId');
  const datePreset = searchParams.get('datePreset') || 'today';
  const token = process.env.META_ACCESS_TOKEN;

  if (!token || !accountId) {
    return NextResponse.json({ error: 'Faltando accountId ou token' }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v19.0/${accountId}/insights?fields=spend,actions,action_values&date_preset=${datePreset}&access_token=${token}`
    );
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
