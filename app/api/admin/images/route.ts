import { list, del } from '@vercel/blob';
import { NextResponse } from 'next/server';

import fs from 'fs';
import path from 'path';

export async function GET() {
  let blobs: any[] = [];
  
  // 1. Get Local Assets
  try {
    const assetsDir = path.join(process.cwd(), 'public/assets');
    if (fs.existsSync(assetsDir)) {
      const files = fs.readdirSync(assetsDir);
      const localBlobs = files
        .filter(file => /\.(png|jpe?g|svg|webp|gif)$/i.test(file))
        .map(file => ({
          url: `/assets/${file}`,
          pathname: file,
          size: fs.statSync(path.join(assetsDir, file)).size,
          uploadedAt: fs.statSync(path.join(assetsDir, file)).mtime,
          isLocal: true // custom flag
        }));
      blobs = [...localBlobs];
    }
  } catch (error) {
    console.error('Failed to read local assets:', error);
  }

  // 2. Try to get Vercel Blobs (Cloud Assets)
  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const result = await list();
      blobs = [...blobs, ...result.blobs];
    }
  } catch (error) {
    console.error('Vercel Blob list failed:', (error as Error).message);
  }

  return NextResponse.json(blobs);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  // Prevent deleting local assets from the UI
  if (url.startsWith('/assets/')) {
    return NextResponse.json({ error: 'Cannot delete core local assets.' }, { status: 403 });
  }

  try {
    await del(url);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
