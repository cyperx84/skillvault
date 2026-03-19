import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('session_id');

  if (!sessionId) return NextResponse.json({ error: 'session_id required' }, { status: 400 });

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const templateId = session.metadata?.templateId;

  if (!templateId || session.payment_status !== 'paid') {
    return NextResponse.json({ error: 'Payment not completed' }, { status: 400 });
  }

  // Get template files URL
  const { data: template } = await supabase
    .from('templates')
    .select('files_url, name')
    .eq('id', templateId)
    .single();

  if (!template) return NextResponse.json({ error: 'Template not found' }, { status: 404 });

  // Increment download count
  await supabase.rpc('increment_downloads', { template_id: templateId });

  return NextResponse.json({
    purchased: true,
    template_name: template.name,
    download_url: template.files_url,
  });
}
