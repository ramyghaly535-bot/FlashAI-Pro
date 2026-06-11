import { NextResponse } from 'next/server';

// ─── Comprehensive device database with realistic hardware identifiers ───

interface DeviceModel {
  model: string;
  modelCode: string;       // Internal board identifier
  serialFormat: string;    // Prefix pattern for serial generation
  productId: string;       // USB Product ID per model
  storageCapacity: string;
  currentOsVersion: string;
  mode: string;
  chipset: string;
  baseband: string;
  securityPatch: string;
  display: string;
  region: string;
}

const deviceDatabase: Record<string, DeviceModel[]> = {
  Apple: [
    { model: 'iPhone 15 Pro Max', modelCode: 'D93AP', serialFormat: 'FX9M', productId: '0x12A8', storageCapacity: '256 GB', currentOsVersion: 'iOS 17.5.1', mode: 'DFU/Recovery/Normal', chipset: 'A17 Pro (3nm)', baseband: '1.40.02', securityPatch: '2024-06-10', display: '6.7" Super Retina XDR OLED', region: 'MEA' },
    { model: 'iPhone 15 Pro', modelCode: 'D92AP', serialFormat: 'FX9K', productId: '0x12A8', storageCapacity: '128 GB', currentOsVersion: 'iOS 17.5.1', mode: 'DFU/Recovery/Normal', chipset: 'A17 Pro (3nm)', baseband: '1.40.02', securityPatch: '2024-06-10', display: '6.1" Super Retina XDR OLED', region: 'US' },
    { model: 'iPhone 15', modelCode: 'D73AP', serialFormat: 'CZ2K', productId: '0x12A8', storageCapacity: '256 GB', currentOsVersion: 'iOS 17.5.1', mode: 'DFU/Recovery/Normal', chipset: 'A16 Bionic (4nm)', baseband: '1.30.02', securityPatch: '2024-06-10', display: '6.1" Super Retina XDR OLED', region: 'EU' },
    { model: 'iPhone 14 Pro Max', modelCode: 'D73bAP', serialFormat: 'DQ3P', productId: '0x12A8', storageCapacity: '512 GB', currentOsVersion: 'iOS 17.5.1', mode: 'DFU/Recovery/Normal', chipset: 'A16 Bionic (4nm)', baseband: '1.30.02', securityPatch: '2024-06-10', display: '6.7" Super Retina XDR OLED', region: 'CN' },
    { model: 'iPhone 14', modelCode: 'D28AP', serialFormat: 'DQ3M', productId: '0x12A8', storageCapacity: '128 GB', currentOsVersion: 'iOS 17.4.1', mode: 'DFU/Recovery/Normal', chipset: 'A15 Bionic (5nm)', baseband: '1.20.01', securityPatch: '2024-04-01', display: '6.1" Super Retina XDR OLED', region: 'Global' },
    { model: 'iPhone 13', modelCode: 'D17AP', serialFormat: 'C48P', productId: '0x12A8', storageCapacity: '128 GB', currentOsVersion: 'iOS 17.4.1', mode: 'DFU/Recovery/Normal', chipset: 'A15 Bionic (5nm)', baseband: '1.20.01', securityPatch: '2024-04-01', display: '6.1" Super Retina XDR OLED', region: 'MEA' },
    { model: 'iPad Pro 12.9" M2', modelCode: 'J417AP', serialFormat: 'HV3M', productId: '0x12A9', storageCapacity: '256 GB', currentOsVersion: 'iPadOS 17.5', mode: 'DFU/Recovery/Normal', chipset: 'Apple M2', baseband: 'N/A', securityPatch: '2024-05-15', display: '12.9" Liquid Retina XDR', region: 'US' },
    { model: 'iPad Air M1', modelCode: 'J407AP', serialFormat: 'GTM3', productId: '0x12A9', storageCapacity: '64 GB', currentOsVersion: 'iPadOS 17.5', mode: 'DFU/Recovery/Normal', chipset: 'Apple M1', baseband: 'N/A', securityPatch: '2024-05-15', display: '10.9" Liquid Retina', region: 'EU' },
  ],
  Samsung: [
    { model: 'Galaxy S24 Ultra', modelCode: 'SM-S928B', serialFormat: 'R5C', productId: '0x6860', storageCapacity: '256 GB', currentOsVersion: 'One UI 6.1 (Android 14)', mode: 'Download_Mode/ADB', chipset: 'Snapdragon 8 Gen 3', baseband: 'S928BXXS3AXE1', securityPatch: '2024-06-01', display: '6.8" Dynamic AMOLED 2X QHD+', region: 'MEA' },
    { model: 'Galaxy S24+', modelCode: 'SM-S926B', serialFormat: 'R5D', productId: '0x6860', storageCapacity: '256 GB', currentOsVersion: 'One UI 6.1 (Android 14)', mode: 'Download_Mode/ADB', chipset: 'Exynos 2400 (4nm)', baseband: 'S926BXXS3AXC5', securityPatch: '2024-06-01', display: '6.7" Dynamic AMOLED 2X QHD+', region: 'EU' },
    { model: 'Galaxy S24', modelCode: 'SM-S921B', serialFormat: 'R5F', productId: '0x6860', storageCapacity: '128 GB', currentOsVersion: 'One UI 6.1 (Android 14)', mode: 'Download_Mode/ADB', chipset: 'Exynos 2400 (4nm)', baseband: 'S921BXXS3AXD3', securityPatch: '2024-06-01', display: '6.2" Dynamic AMOLED 2X FHD+', region: 'Global' },
    { model: 'Galaxy S23 Ultra', modelCode: 'SM-S918B', serialFormat: 'R9N', productId: '0x6860', storageCapacity: '512 GB', currentOsVersion: 'One UI 6.1 (Android 14)', mode: 'Download_Mode/ADB', chipset: 'Snapdragon 8 Gen 2', baseband: 'S918BXXS4BXA1', securityPatch: '2024-05-01', display: '6.8" Dynamic AMOLED 2X QHD+', region: 'US' },
    { model: 'Galaxy A54 5G', modelCode: 'SM-A546B', serialFormat: 'R8S', productId: '0x6860', storageCapacity: '128 GB', currentOsVersion: 'One UI 6.1 (Android 14)', mode: 'Download_Mode/ADB', chipset: 'Exynos 1380 (5nm)', baseband: 'A546BXXS6CXD1', securityPatch: '2024-06-01', display: '6.4" Super AMOLED FHD+', region: 'MEA' },
    { model: 'Galaxy A34 5G', modelCode: 'SM-A346B', serialFormat: 'R5S', productId: '0x6860', storageCapacity: '128 GB', currentOsVersion: 'One UI 6.1 (Android 14)', mode: 'Download_Mode/ADB', chipset: 'MediaTek Dimensity 1080', baseband: 'A346BXXS6CXC1', securityPatch: '2024-05-01', display: '6.6" Super AMOLED FHD+', region: 'EU' },
    { model: 'Galaxy Note 20 Ultra', modelCode: 'SM-N986B', serialFormat: 'R5M', productId: '0x6860', storageCapacity: '256 GB', currentOsVersion: 'One UI 6.1 (Android 13)', mode: 'Download_Mode/ADB', chipset: 'Exynos 990 (7nm)', baseband: 'N986BXXS9HXF1', securityPatch: '2024-01-01', display: '6.9" Dynamic AMOLED 2X QHD+', region: 'Global' },
    { model: 'Galaxy Z Fold 5', modelCode: 'SM-F946B', serialFormat: 'R9C', productId: '0x6860', storageCapacity: '256 GB', currentOsVersion: 'One UI 6.1.1 (Android 14)', mode: 'Download_Mode/ADB', chipset: 'Snapdragon 8 Gen 2', baseband: 'F946BXXS4AXF2', securityPatch: '2024-06-01', display: '7.6" Dynamic AMOLED 2X QHD+', region: 'US' },
  ],
  Xiaomi: [
    { model: 'Xiaomi 14 Ultra', modelCode: '24030PN60G', serialFormat: '2403', productId: '0xFF40', storageCapacity: '512 GB', currentOsVersion: 'HyperOS 1.0.10.0 (Android 14)', mode: 'Fastboot/EDL', chipset: 'Snapdragon 8 Gen 3', baseband: '1.0.c6-00056', securityPatch: '2024-06-01', display: '6.73" LTPO AMOLED QHD+', region: 'Global' },
    { model: 'Xiaomi 14', modelCode: '23127PN0CC', serialFormat: '2312', productId: '0xFF40', storageCapacity: '256 GB', currentOsVersion: 'HyperOS 1.0.8.0 (Android 14)', mode: 'Fastboot/EDL', chipset: 'Snapdragon 8 Gen 3', baseband: '1.0.c4-00051', securityPatch: '2024-06-01', display: '6.36" LTPO AMOLED FHD+', region: 'Global' },
    { model: 'Xiaomi 13 Ultra', modelCode: '2304FPN6DC', serialFormat: '2304', productId: '0xFF40', storageCapacity: '512 GB', currentOsVersion: 'HyperOS 1.0.5.0 (Android 14)', mode: 'Fastboot/EDL', chipset: 'Snapdragon 8 Gen 2', baseband: '1.0.c3-00043', securityPatch: '2024-04-01', display: '6.73" LTPO AMOLED QHD+', region: 'CN' },
    { model: 'Redmi Note 13 Pro+', modelCode: '23106RN0DA', serialFormat: 'CXG', productId: '0xFF60', storageCapacity: '256 GB', currentOsVersion: 'MIUI 14.0.8 (Android 13)', mode: 'Fastboot/EDL', chipset: 'MediaTek Dimensity 7200-Ultra', baseband: 'MOLY0052', securityPatch: '2024-03-01', display: '6.67" AMOLED FHD+ 120Hz', region: 'Global' },
    { model: 'Redmi Note 13 Pro 5G', modelCode: '23106RN0CC', serialFormat: 'CXD', productId: '0xFF60', storageCapacity: '128 GB', currentOsVersion: 'MIUI 14.0.8 (Android 13)', mode: 'Fastboot/EDL', chipset: 'Snapdragon 7s Gen 2', baseband: '1.0.c2-00038', securityPatch: '2024-03-01', display: '6.67" AMOLED FHD+ 120Hz', region: 'MEA' },
    { model: 'Redmi Note 12 Pro', modelCode: '22101316G', serialFormat: '21K', productId: '0xFF60', storageCapacity: '256 GB', currentOsVersion: 'MIUI 14.0.6 (Android 13)', mode: 'Fastboot/EDL', chipset: 'MediaTek Dimensity 1080', baseband: 'MOLY0049', securityPatch: '2024-01-01', display: '6.67" AMOLED FHD+ 120Hz', region: 'Global' },
    { model: 'Poco X6 Pro', modelCode: '2311DRK48G', serialFormat: '2311', productId: '0xFF80', storageCapacity: '256 GB', currentOsVersion: 'MIUI 14.0.6 (Android 13)', mode: 'Fastboot/EDL', chipset: 'MediaTek Dimensity 8300-Ultra', baseband: 'MOLY0051', securityPatch: '2024-02-01', display: '6.67" AMOLED FHD+ 120Hz', region: 'India' },
    { model: 'Poco F6', modelCode: '2311DRK47C', serialFormat: '2311', productId: '0xFF80', storageCapacity: '512 GB', currentOsVersion: 'HyperOS 1.0.3.0 (Android 14)', mode: 'Fastboot/EDL', chipset: 'Snapdragon 8s Gen 3', baseband: '1.0.c3-00041', securityPatch: '2024-05-01', display: '6.67" AMOLED FHD+ 120Hz', region: 'Global' },
  ],
};

const vendorIds: Record<string, string> = {
  Apple: '0x05AC',
  Samsung: '0x04E8',
  Xiaomi: '0x2717',
};

// Realistic serial number generator per brand
function generateSerial(brand: string, format: string): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const pick = (n: number) => Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('');

  if (brand === 'Apple') {
    // Apple serial: 10-12 chars, format like FX9MCxxxxxxx
    return format + pick(8);
  }
  if (brand === 'Samsung') {
    // Samsung serial: 11 chars, format like R5CK30XXXXX
    return format + pick(8);
  }
  // Xiaomi serial: variable, format + 8 hex/alpha
  return format + pick(8);
}

// Deterministic model selection seeded by current time to feel realistic
function seededPick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

export async function POST(request: Request) {
  const body = await request.json();
  const { brand } = body;

  // Simulate multi-step USB scanning
  const totalDelay = 1800 + Math.random() * 800;
  const step1 = totalDelay * 0.3; // USB bus enumeration
  const step2 = totalDelay * 0.6; // Device handshake
  const step3 = totalDelay;       // Model identification

  // Step 1: USB bus enumeration
  await new Promise((resolve) => setTimeout(resolve, step1));
  const targetBrand = brand || ['Apple', 'Samsung', 'Xiaomi'][Math.floor(Math.random() * 3)];
  const vid = vendorIds[targetBrand];

  // Step 2: Device handshake - read product ID
  await new Promise((resolve) => setTimeout(resolve, step2 - step1));
  const now = Date.now();
  const devices = deviceDatabase[targetBrand];
  const device = seededPick(devices, Math.floor(now / 30000)); // Same device for 30s window

  // Step 3: Full model identification
  await new Promise((resolve) => setTimeout(resolve, step3 - step2));
  const serialNumber = generateSerial(targetBrand, device.serialFormat);
  const batteryLevel = Math.floor(Math.random() * 35) + 60;

  return NextResponse.json({
    detected: true,
    detectionSteps: [
      { step: 'USB Enumeration', detail: `Found USB device at bus 001, device ${String(Math.floor(Math.random() * 8) + 1).padStart(3, '0')}`, vid },
      { step: 'Vendor Identification', detail: `VID:${vid} matched ${targetBrand} Inc. (registered vendor)` },
      { step: 'Protocol Handshake', detail: `Product ID: ${device.productId} — ${targetBrand} mobile device confirmed` },
      { step: 'Model Identification', detail: `Board config: ${device.modelCode} → ${device.model}` },
    ],
    deviceInfo: {
      brand: targetBrand,
      model: device.model,
      modelCode: device.modelCode,
      serialNumber,
      mode: device.mode,
      vendorId: vid,
      productId: device.productId,
      storageCapacity: device.storageCapacity,
      currentOsVersion: device.currentOsVersion,
      batteryLevel,
      chipset: device.chipset,
      baseband: device.baseband,
      securityPatch: device.securityPatch,
      display: device.display,
      region: device.region,
    },
  });
}