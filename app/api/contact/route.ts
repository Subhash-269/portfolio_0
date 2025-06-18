import { NextRequest, NextResponse } from 'next/server';

export async function POST(_request: NextRequest) {
  try {
    // This API route is currently not used as we're using mailto approach
    // for the contact form. This is a placeholder for future implementation.
    return NextResponse.json(
      { message: 'Contact API not implemented - using mailto approach' },
      { status: 501 }
    );
  } catch (_error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
