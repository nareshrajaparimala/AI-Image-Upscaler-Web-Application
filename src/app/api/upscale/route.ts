import { NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    const output = await replicate.run('nightmareai/real-esrgan', {
      input: {
        image: image,
        scale: 4
      }
    });

    return NextResponse.json({ url: output });
  } catch (error) {
    console.error('Upscale error:', error);
    return NextResponse.json({ error: 'Failed to process' }, { status: 500 });
  }
}
