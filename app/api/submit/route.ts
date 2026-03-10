import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  const data = await request.json()

  const { error } = await supabase
    .from('submissions')
    .insert([{ content: data.content }])

  if (error) return Response.json({ error }, { status: 500 })
  return Response.json({ success: true })
}
