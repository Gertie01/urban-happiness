import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");
const MODEL_ID = "gemini-2.0-flash-exp-image-generation";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    // Fetch or generate data based on ID
    const data = {
      id: id || 'default',
      content: 'Generated content',
      createdAt: new Date().toISOString(),
    }

    return Response.json(data)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return Response.json({ error: message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.description) {
      return Response.json(
        { error: 'Missing required fields: name, description' },
        { status: 400 }
      )
    }

    // Process the request
    const result = {
      success: true,
      id: Math.random().toString(36).substr(2, 9),
      ...body,
      createdAt: new Date().toISOString(),
    }

    return Response.json(result, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return Response.json({ error: message }, { status: 500 })
  }
}
