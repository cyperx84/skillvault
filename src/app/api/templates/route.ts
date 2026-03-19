import { NextRequest, NextResponse } from 'next/server';
import { supabase, Template } from '@/lib/supabase';

export async function GET() {
  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .order('downloads', { ascending: false });
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { data, error } = await supabase
    .from('templates')
    .insert({
      name: body.name,
      description: body.description,
      category: body.category,
      price: body.price,
      preview_content: body.preview_content,
    })
    .select()
    .single();
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
