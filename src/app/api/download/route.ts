import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { fileSize: totalSizeStr, serverUrl } = body;

  const totalSize = 4000000000 + Math.random() * 3000000000; // 4-7 GB

  return NextResponse.json({
    downloadId: crypto.randomUUID(),
    fileName: serverUrl.split('/').pop() || 'firmware.bin',
    totalSize,
    threads: 16,
    serverUrl,
  });
}

export async function GET() {
  // Simulate a download progress snapshot
  const progress = Math.random() * 100;
  const totalSize = 5000000000;
  const downloaded = (progress / 100) * totalSize;
  const speed = (50 + Math.random() * 150).toFixed(1);
  const remaining = ((totalSize - downloaded) / (parseFloat(speed) * 1024 * 1024));

  return NextResponse.json({
    percentage: Math.min(progress, 100),
    downloadedSize: Math.floor(downloaded),
    totalSize,
    speed: `${speed} MB/s`,
    threads: 16,
    eta: progress >= 99.9 ? 'Completing...' : formatEta(remaining),
    integrityVerified: progress >= 99.9,
  });
}

function formatEta(seconds: number): string {
  if (seconds < 60) return `${Math.ceil(seconds)}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${Math.ceil(seconds % 60)}s`;
  return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
}