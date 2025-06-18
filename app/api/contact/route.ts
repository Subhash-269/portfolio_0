import { NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(request: NextRequest) {
  try {
    // This API route is currently not used as we're using mailto approach
    // for the contact form. This is a placeholder for future implementation.
    return NextResponse.json(
      { message: 'Contact API not implemented - using mailto approach' },
      { status: 501 }
    );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
