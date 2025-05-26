import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Simulate FormSpree validation
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check for test scenarios
    if (body.email === 'error@test.com') {
      return NextResponse.json(
        { error: 'Server error' },
        { status: 500 }
      );
    }

    if (body.email === 'ratelimit@test.com') {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }

    // Add delay for loading state testing
    if (body.email === 'slow@test.com') {
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    // Simulate successful FormSpree response
    return NextResponse.json({
      ok: true,
      next: 'https://formspree.io/thanks',
      submissionText: 'Thank you!'
    });
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON' },
      { status: 400 }
    );
  }
}