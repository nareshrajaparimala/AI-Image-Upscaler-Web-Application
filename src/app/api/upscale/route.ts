import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json(
        { error: 'FILE_SIZE_LIMIT', message: 'Upload limits exceeded.' },
        { status: 400 }
      );
    }

    const result = await cloudinary.uploader.upload(image, {
      transformation: [
        { effect: 'upscale' },
        { quality: 'auto:best' }
      ],
      timeout: 60000
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (error: any) {
    console.error('Upscale error:', error);

    if (error.http_code === 401 || error.message?.includes('unauthorized')) {
      return NextResponse.json(
        { error: 'AUTH_FAILED', message: 'Server configuration error. Contact admin.' },
        { status: 401 }
      );
    }

    if (error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED') {
      return NextResponse.json(
        { error: 'CLOUD_TIMEOUT', message: 'The AI service is busy. Please try again.' },
        { status: 503 }
      );
    }

    if (error.message?.includes('File size too large')) {
      return NextResponse.json(
        { error: 'FILE_SIZE_LIMIT', message: 'Upload limits exceeded.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'UNKNOWN_ERROR', message: 'Failed to process image.' },
      { status: 500 }
    );
  }
}
