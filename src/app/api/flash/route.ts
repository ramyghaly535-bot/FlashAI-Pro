import { NextResponse } from 'next/server';

const flashSteps: Record<string, { partitions: string[]; operations: string[] }> = {
  Apple: {
    partitions: ['iBSS', 'iBEC', 'DeviceTree', 'KernelCache', 'System', 'SEP', 'Baseband', 'ANID'],
    operations: ['Verifying SHSH blobs', 'Preparing IPSW extraction', 'Writing partition', 'Verifying partition hash', 'Applying patches'],
  },
  Samsung: {
    partitions: ['BL', 'AP', 'CP', 'CSC', 'HOME_CSC', 'USERDATA', 'BOOT', 'RECOVERY'],
    operations: ['Initializing PIT table', 'Writing partition via Odin protocol', 'Verifying MD5 checksum', 'Switching partition slot'],
  },
  Xiaomi: {
    partitions: ['xbl', 'abl', 'boot', 'dtbo', 'system', 'vendor', 'product', 'odm', 'userdata'],
    operations: ['Initializing Fastboot session', 'Flashing partition', 'Verifying partition integrity', 'Locking bootloader'],
  },
};

export async function POST(request: Request) {
  const body = await request.json();
  const { brand } = body;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const steps = flashSteps[brand] || flashSteps.Apple;

  return NextResponse.json({
    flashId: crypto.randomUUID(),
    totalPartitions: steps.partitions.length,
    completedPartitions: 0,
    currentPartition: steps.partitions[0],
    percentage: 0,
    currentOperation: 'Initializing flashing engine...',
    speed: '0 MB/s',
    eta: 'Calculating...',
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const brand = searchParams.get('brand') || 'Apple';
  const progress = parseFloat(searchParams.get('progress') || '0');

  const steps = flashSteps[brand] || flashSteps.Apple;
  const totalPartitions = steps.partitions.length;
  const currentPartitionIndex = Math.min(
    Math.floor((progress / 100) * totalPartitions),
    totalPartitions - 1
  );
  const completedPartitions = Math.min(currentPartitionIndex, totalPartitions);
  const currentPartition = steps.partitions[currentPartitionIndex];
  const currentOperation = steps.operations[Math.floor(Math.random() * steps.operations.length)];

  const speed = (20 + Math.random() * 80).toFixed(1);
  const remainingPartitions = totalPartitions - currentPartitionIndex;
  const etaSeconds = remainingPartitions * (2 + Math.random() * 3);

  return NextResponse.json({
    percentage: Math.min(progress, 100),
    currentPartition,
    totalPartitions,
    completedPartitions,
    currentOperation: progress >= 100 ? 'Finalizing...' : currentOperation,
    speed: progress >= 100 ? '---' : `${speed} MB/s`,
    eta: progress >= 100 ? 'Rebooting...' : formatEta(etaSeconds),
  });
}

function formatEta(seconds: number): string {
  if (seconds < 60) return `${Math.ceil(seconds)}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${Math.ceil(seconds % 60)}s`;
  return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
}