import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    const { name, email, topic } = body

    if (!name || !email) {
      return Response.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    if (!email.includes('@')) {
      return Response.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Simulate saving to database or external service
    const savedData = {
      id: Date.now().toString(),
      name,
      email,
      topic,
      createdAt: new Date().toISOString(),
    }

    // You would normally save this to a database here
    // const result = await database.submit.create(savedData)

    return Response.json(
      {
        success: true,
        message: 'Your submission has been received',
        submissionId: savedData.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Submit error:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return Response.json({ error: message }, { status: 500 })
  }
}
