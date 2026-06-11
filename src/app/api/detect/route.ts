import { NextResponse } from 'next/server';

const deviceDatabase: Record<string, Array<{
  model: string;
  serialPrefix: string;
  storageCapacity: string;
  currentOsVersion: string;
  mode: string;
}>> = {
  Apple: [
    { model: 'iPhone 15 Pro Max', serialPrefix: 'FX9M', storageCapacity: '256 GB', currentOsVersion: 'iOS 17.4.1', mode: 'DFU/Recovery/Normal' },
    { model: 'iPhone 14 Pro', serialPrefix: 'DQ3P', storageCapacity: '128 GB', currentOsVersion: 'iOS 17.3.1', mode: 'DFU/Recovery/Normal' },
    { model: 'iPhone 15', serialPrefix: 'CZ2K', storageCapacity: '512 GB', currentOsVersion: 'iOS 17.4', mode: 'DFU/Recovery/Normal' },
  ],
  Samsung: [
    { model: 'Galaxy S24 Ultra', serialPrefix: 'R5C', storageCapacity: '256 GB', currentOsVersion: 'One UI 6.1 (Android 14)', mode: 'Download_Mode/ADB' },
    { model: 'Galaxy A54 5G', serialPrefix: 'R8S', storageCapacity: '128 GB', currentOsVersion: 'One UI 6.0 (Android 14)', mode: 'Download_Mode/ADB' },
    { model: 'Galaxy S23 FE', serialPrefix: 'R9N', storageCapacity: '128 GB', currentOsVersion: 'One UI 6.1 (Android 14)', mode: 'Download_Mode/ADB' },
  ],
  Xiaomi: [
    { model: 'Redmi Note 13 Pro+', serialPrefix: 'CXG', storageCapacity: '256 GB', currentOsVersion: 'MIUI 14.0.8 (Android 13)', mode: 'Fastboot/EDL' },
    { model: 'Xiaomi 14 Ultra', serialPrefix: '2403', storageCapacity: '512 GB', currentOsVersion: 'HyperOS 1.0 (Android 14)', mode: 'Fastboot/EDL' },
    { model: 'Poco X6 Pro', serialPrefix: '2311', storageCapacity: '256 GB', currentOsVersion: 'MIUI 14.0.6 (Android 13)', mode: 'Fastboot/EDL' },
  ],
};

const vendorIds: Record<string, { vendorId: string; productId: string }> = {
  Apple: { vendorId: '0x05AC', productId: '0x12A8' },
  Samsung: { vendorId: '0x04E8', productId: '0x6860' },
  Xiaomi: { vendorId: '0x2717', productId: '0xFF40' },
};

export async function POST(request: Request) {
  const body = await request.json();
  const { brand } = body;

  // Simulate scanning delay
  await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 1000));

  const targetBrand = brand || ['Apple', 'Samsung', 'Xiaomi'][Math.floor(Math.random() * 3)];
  const devices = deviceDatabase[targetBrand];
  const device = devices[Math.floor(Math.random() * devices.length)];
  const ids = vendorIds[targetBrand];

  const serialNumber = device.serialPrefix + Array.from({ length: 8 }, () =>
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 36)]
  ).join('');

  return NextResponse.json({
    detected: true,
    deviceInfo: {
      brand: targetBrand,
      model: device.model,
      serialNumber,
      mode: device.mode,
      vendorId: ids.vendorId,
      productId: ids.productId,
      storageCapacity: device.storageCapacity,
      currentOsVersion: device.currentOsVersion,
      batteryLevel: Math.floor(Math.random() * 40) + 60,
    },
  });
}