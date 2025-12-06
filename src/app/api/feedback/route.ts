import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { rating, feedback, email } = await request.json();

    if (!rating || !feedback) {
      return NextResponse.json(
        { error: 'Rating and feedback are required' },
        { status: 400 }
      );
    }

    const feedbackData = {
      rating,
      feedback,
      email: email || 'anonymous',
      timestamp: new Date().toISOString(),
      id: Date.now().toString()
    };

    console.log('Feedback received:', feedbackData);

    return NextResponse.json({ 
      success: true, 
      message: 'Feedback submitted successfully' 
    });
  } catch (error) {
    console.error('Feedback error:', error);
    return NextResponse.json(
      { error: 'Failed to submit feedback' },
      { status: 500 }
    );
  }
}
