import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { happinessScore, location, feedback } = body;

    // Validate the data
    if (!happinessScore || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: Save to database or external service
    console.log('Received happiness data:', { happinessScore, location, feedback });

    return NextResponse.json(
      { message: 'Happiness score recorded successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
