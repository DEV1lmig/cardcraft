import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    console.log("Received POST request");

    const body = await request.json();

    console.log("Sending Request to Backend: ", body);

    const response = await fetch('http://localhost/~mig/cardcraft-backend/register.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    console.log("Backend Response Status: ", response.status);

    if (!response.ok) {
      console.error(`Error: ${response.status} ${response.statusText}`);
    }

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}

export async function GET() {
  console.log("Received GET request");
  return NextResponse.json({ message: 'GET request received' });
}

export async function PUT() {
  console.log("Received PUT request");
  return NextResponse.json({ message: 'PUT request received' });
}

export async function DELETE() {
  console.log("Received DELETE request");
  return NextResponse.json({ message: 'DELETE request received' });
}
