import { NextResponse } from 'next/server';

// ─── Comprehensive device database with realistic hardware identifiers ───

interface DeviceVariant {
  storageCapacity: string;
}

interface DeviceModel {
  model: string;
  modelCode: string;
  serialFormat: string;
  productId: string;
  currentOsVersion: string;
  chipset: string;
  baseband: string;
  securityPatch: string;
  display: string;
  mode: string[];
  storageVariants: string[];
  regions: string[];
}

const Apple: DeviceModel[] = [
  { model: 'iPhone 16 Pro Max', modelCode: 'D84AP', serialFormat: 'FX9N', productId: '0x12A8', currentOsVersion: 'iOS 18.0', chipset: 'A18 Pro (3nm)', baseband: '1.50.01', securityPatch: '2024-09-16', display: '6.9" Super Retina XDR OLED', mode: ['DFU Mode', 'Recovery Mode', 'Normal Mode'], storageVariants: ['256 GB', '512 GB', '1 TB'], regions: ['US', 'EU', 'MEA', 'CN', 'Global'] },
  { model: 'iPhone 16 Pro', modelCode: 'D83AP', serialFormat: 'FX9P', productId: '0x12A8', currentOsVersion: 'iOS 18.0', chipset: 'A18 Pro (3nm)', baseband: '1.50.01', securityPatch: '2024-09-16', display: '6.3" Super Retina XDR OLED', mode: ['DFU Mode', 'Recovery Mode', 'Normal Mode'], storageVariants: ['128 GB', '256 GB', '512 GB'], regions: ['US', 'EU', 'MEA', 'Global'] },
  { model: 'iPhone 16', modelCode: 'D47AP', serialFormat: 'FX9Q', productId: '0x12A8', currentOsVersion: 'iOS 18.0', chipset: 'A18 (3nm)', baseband: '1.45.02', securityPatch: '2024-09-16', display: '6.1" Super Retina XDR OLED', mode: ['DFU Mode', 'Recovery Mode', 'Normal Mode'], storageVariants: ['128 GB', '256 GB', '512 GB'], regions: ['US', 'EU', 'MEA', 'Global'] },
  { model: 'iPhone 16 Plus', modelCode: 'D48AP', serialFormat: 'FX9R', productId: '0x12A8', currentOsVersion: 'iOS 18.0', chipset: 'A18 (3nm)', baseband: '1.45.02', securityPatch: '2024-09-16', display: '6.7" Super Retina XDR OLED', mode: ['DFU Mode', 'Recovery Mode', 'Normal Mode'], storageVariants: ['128 GB', '256 GB', '512 GB'], regions: ['US', 'EU', 'Global'] },
  { model: 'iPhone 15 Pro Max', modelCode: 'D93AP', serialFormat: 'FX9M', productId: '0x12A8', currentOsVersion: 'iOS 17.6.1', chipset: 'A17 Pro (3nm)', baseband: '1.40.02', securityPatch: '2024-08-08', display: '6.7" Super Retina XDR OLED', mode: ['DFU Mode', 'Recovery Mode', 'Normal Mode'], storageVariants: ['256 GB', '512 GB', '1 TB'], regions: ['US', 'EU', 'MEA', 'CN', 'Global'] },
  { model: 'iPhone 15 Pro', modelCode: 'D92AP', serialFormat: 'FX9K', productId: '0x12A8', currentOsVersion: 'iOS 17.6.1', chipset: 'A17 Pro (3nm)', baseband: '1.40.02', securityPatch: '2024-08-08', display: '6.1" Super Retina XDR OLED', mode: ['DFU Mode', 'Recovery Mode', 'Normal Mode'], storageVariants: ['128 GB', '256 GB', '512 GB', '1 TB'], regions: ['US', 'EU', 'MEA', 'Global'] },
  { model: 'iPhone 15', modelCode: 'D73AP', serialFormat: 'CZ2K', productId: '0x12A8', currentOsVersion: 'iOS 17.6.1', chipset: 'A16 Bionic (4nm)', baseband: '1.35.02', securityPatch: '2024-08-08', display: '6.1" Super Retina XDR OLED', mode: ['DFU Mode', 'Recovery Mode', 'Normal Mode'], storageVariants: ['128 GB', '256 GB', '512 GB'], regions: ['US', 'EU', 'MEA', 'CN', 'Global'] },
  { model: 'iPhone 15 Plus', modelCode: 'D74AP', serialFormat: 'CZ2L', productId: '0x12A8', currentOsVersion: 'iOS 17.6.1', chipset: 'A16 Bionic (4nm)', baseband: '1.35.02', securityPatch: '2024-08-08', display: '6.7" Super Retina XDR OLED', mode: ['DFU Mode', 'Recovery Mode', 'Normal Mode'], storageVariants: ['128 GB', '256 GB', '512 GB'], regions: ['US', 'EU', 'Global'] },
  { model: 'iPhone 14 Pro Max', modelCode: 'D73bAP', serialFormat: 'DQ3P', productId: '0x12A8', currentOsVersion: 'iOS 17.6.1', chipset: 'A16 Bionic (4nm)', baseband: '1.30.02', securityPatch: '2024-08-08', display: '6.7" Super Retina XDR OLED', mode: ['DFU Mode', 'Recovery Mode', 'Normal Mode'], storageVariants: ['128 GB', '256 GB', '512 GB', '1 TB'], regions: ['US', 'EU', 'MEA', 'Global'] },
  { model: 'iPhone 14 Pro', modelCode: 'D72AP', serialFormat: 'DQ3N', productId: '0x12A8', currentOsVersion: 'iOS 17.6.1', chipset: 'A16 Bionic (4nm)', baseband: '1.30.02', securityPatch: '2024-08-08', display: '6.1" Super Retina XDR OLED', mode: ['DFU Mode', 'Recovery Mode', 'Normal Mode'], storageVariants: ['128 GB', '256 GB', '512 GB'], regions: ['US', 'EU', 'Global'] },
  { model: 'iPhone 14', modelCode: 'D28AP', serialFormat: 'DQ3M', productId: '0x12A8', currentOsVersion: 'iOS 17.6', chipset: 'A15 Bionic (5nm)', baseband: '1.20.01', securityPatch: '2024-07-22', display: '6.1" Super Retina XDR OLED', mode: ['DFU Mode', 'Recovery Mode', 'Normal Mode'], storageVariants: ['128 GB', '256 GB', '512 GB'], regions: ['US', 'EU', 'MEA', 'Global'] },
  { model: 'iPhone 14 Plus', modelCode: 'D29AP', serialFormat: 'DQ3L', productId: '0x12A8', currentOsVersion: 'iOS 17.6', chipset: 'A15 Bionic (5nm)', baseband: '1.20.01', securityPatch: '2024-07-22', display: '6.7" Super Retina XDR OLED', mode: ['DFU Mode', 'Recovery Mode', 'Normal Mode'], storageVariants: ['128 GB', '256 GB', '512 GB'], regions: ['US', 'EU', 'Global'] },
  { model: 'iPhone 13 Pro Max', modelCode: 'D64AP', serialFormat: 'C48P', productId: '0x12A8', currentOsVersion: 'iOS 17.6', chipset: 'A15 Bionic (5nm)', baseband: '1.10.01', securityPatch: '2024-07-22', display: '6.7" Super Retina XDR OLED', mode: ['DFU Mode', 'Recovery Mode', 'Normal Mode'], storageVariants: ['128 GB', '256 GB', '512 GB', '1 TB'], regions: ['US', 'EU', 'MEA', 'Global'] },
  { model: 'iPhone 13 Pro', modelCode: 'D63AP', serialFormat: 'C48N', productId: '0x12A8', currentOsVersion: 'iOS 17.6', chipset: 'A15 Bionic (5nm)', baseband: '1.10.01', securityPatch: '2024-07-22', display: '6.1" Super Retina XDR OLED', mode: ['DFU Mode', 'Recovery Mode', 'Normal Mode'], storageVariants: ['128 GB', '256 GB', '512 GB'], regions: ['US', 'EU', 'Global'] },
  { model: 'iPhone 13', modelCode: 'D17AP', serialFormat: 'C48M', productId: '0x12A8', currentOsVersion: 'iOS 17.5.1', chipset: 'A15 Bionic (5nm)', baseband: '1.10.01', securityPatch: '2024-05-13', display: '6.1" Super Retina XDR OLED', mode: ['DFU Mode', 'Recovery Mode', 'Normal Mode'], storageVariants: ['128 GB', '256 GB', '512 GB'], regions: ['US', 'EU', 'MEA', 'Global'] },
  { model: 'iPhone 13 Mini', modelCode: 'D16AP', serialFormat: 'C48L', productId: '0x12A8', currentOsVersion: 'iOS 17.5.1', chipset: 'A15 Bionic (5nm)', baseband: '1.10.01', securityPatch: '2024-05-13', display: '5.4" Super Retina XDR OLED', mode: ['DFU Mode', 'Recovery Mode', 'Normal Mode'], storageVariants: ['128 GB', '256 GB', '512 GB'], regions: ['US', 'EU', 'Global'] },
  { model: 'iPhone SE (3rd gen)', modelCode: 'D49AP', serialFormat: 'FZF3', productId: '0x12A8', currentOsVersion: 'iOS 17.5.1', chipset: 'A15 Bionic (5nm)', baseband: '1.10.01', securityPatch: '2024-05-13', display: '4.7" Retina HD IPS', mode: ['DFU Mode', 'Recovery Mode', 'Normal Mode'], storageVariants: ['64 GB', '128 GB', '256 GB'], regions: ['US', 'EU', 'MEA', 'Global'] },
  { model: 'iPad Pro 12.9" M2', modelCode: 'J417AP', serialFormat: 'HV3M', productId: '0x12A9', currentOsVersion: 'iPadOS 17.6', chipset: 'Apple M2', baseband: 'N/A', securityPatch: '2024-07-22', display: '12.9" Liquid Retina XDR', mode: ['DFU Mode', 'Recovery Mode', 'Normal Mode'], storageVariants: ['128 GB', '256 GB', '512 GB', '1 TB', '2 TB'], regions: ['US', 'EU', 'CN', 'Global'] },
  { model: 'iPad Pro 11" M2', modelCode: 'J416AP', serialFormat: 'HV3N', productId: '0x12A9', currentOsVersion: 'iPadOS 17.6', chipset: 'Apple M2', baseband: 'N/A', securityPatch: '2024-07-22', display: '11" Liquid Retina', mode: ['DFU Mode', 'Recovery Mode', 'Normal Mode'], storageVariants: ['128 GB', '256 GB', '512 GB', '1 TB', '2 TB'], regions: ['US', 'EU', 'Global'] },
  { model: 'iPad Air M1', modelCode: 'J407AP', serialFormat: 'GTM3', productId: '0x12A9', currentOsVersion: 'iPadOS 17.6', chipset: 'Apple M1', baseband: 'N/A', securityPatch: '2024-07-22', display: '10.9" Liquid Retina', mode: ['DFU Mode', 'Recovery Mode', 'Normal Mode'], storageVariants: ['64 GB', '256 GB'], regions: ['US', 'EU', 'Global'] },
  { model: 'iPad Mini 6', modelCode: 'J310AP', serialFormat: 'GTM5', productId: '0x12A9', currentOsVersion: 'iPadOS 17.5.1', chipset: 'A15 Bionic (5nm)', baseband: '1.10.01', securityPatch: '2024-05-13', display: '8.3" Liquid Retina', mode: ['DFU Mode', 'Recovery Mode', 'Normal Mode'], storageVariants: ['64 GB', '256 GB'], regions: ['US', 'EU', 'Global'] },
];

const Samsung: DeviceModel[] = [
  { model: 'Galaxy S24 Ultra', modelCode: 'SM-S928B', serialFormat: 'R5C', productId: '0x6860', currentOsVersion: 'One UI 6.1.1 (Android 14)', chipset: 'Snapdragon 8 Gen 3 for Galaxy', baseband: 'S928BXXS3AXE1', securityPatch: '2024-07-01', display: '6.8" Dynamic AMOLED 2X QHD+ 120Hz', mode: ['Download Mode', 'ADB Mode'], storageVariants: ['256 GB', '512 GB', '1 TB'], regions: ['US', 'EU', 'MEA', 'CN', 'Global'] },
  { model: 'Galaxy S24+', modelCode: 'SM-S926B', serialFormat: 'R5D', productId: '0x6860', currentOsVersion: 'One UI 6.1.1 (Android 14)', chipset: 'Exynos 2400 (4nm)', baseband: 'S926BXXS3AXC5', securityPatch: '2024-07-01', display: '6.7" Dynamic AMOLED 2X QHD+ 120Hz', mode: ['Download Mode', 'ADB Mode'], storageVariants: ['256 GB', '512 GB'], regions: ['EU', 'MEA', 'Global'] },
  { model: 'Galaxy S24', modelCode: 'SM-S921B', serialFormat: 'R5F', productId: '0x6860', currentOsVersion: 'One UI 6.1.1 (Android 14)', chipset: 'Exynos 2400 (4nm)', baseband: 'S921BXXS3AXD3', securityPatch: '2024-07-01', display: '6.2" Dynamic AMOLED 2X FHD+ 120Hz', mode: ['Download Mode', 'ADB Mode'], storageVariants: ['128 GB', '256 GB', '512 GB'], regions: ['EU', 'MEA', 'Global'] },
  { model: 'Galaxy S23 Ultra', modelCode: 'SM-S918B', serialFormat: 'R9N', productId: '0x6860', currentOsVersion: 'One UI 6.1 (Android 14)', chipset: 'Snapdragon 8 Gen 2 for Galaxy', baseband: 'S918BXXS4BXA1', securityPatch: '2024-06-01', display: '6.8" Dynamic AMOLED 2X QHD+ 120Hz', mode: ['Download Mode', 'ADB Mode'], storageVariants: ['256 GB', '512 GB', '1 TB'], regions: ['US', 'EU', 'MEA', 'Global'] },
  { model: 'Galaxy S23+', modelCode: 'SM-S916B', serialFormat: 'R9P', productId: '0x6860', currentOsVersion: 'One UI 6.1 (Android 14)', chipset: 'Snapdragon 8 Gen 2 for Galaxy', baseband: 'S916BXXS4BXC1', securityPatch: '2024-06-01', display: '6.6" Dynamic AMOLED 2X FHD+ 120Hz', mode: ['Download Mode', 'ADB Mode'], storageVariants: ['256 GB', '512 GB'], regions: ['US', 'EU', 'Global'] },
  { model: 'Galaxy S23', modelCode: 'SM-S911B', serialFormat: 'R9Q', productId: '0x6860', currentOsVersion: 'One UI 6.1 (Android 14)', chipset: 'Snapdragon 8 Gen 2 for Galaxy', baseband: 'S911BXXS4BXD1', securityPatch: '2024-06-01', display: '6.1" Dynamic AMOLED 2X FHD+ 120Hz', mode: ['Download Mode', 'ADB Mode'], storageVariants: ['128 GB', '256 GB', '512 GB'], regions: ['EU', 'MEA', 'Global'] },
  { model: 'Galaxy S23 FE', modelCode: 'SM-S711B', serialFormat: 'R9M', productId: '0x6860', currentOsVersion: 'One UI 6.1 (Android 14)', chipset: 'Exynos 2200 (4nm)', baseband: 'S711BXXS5CXC1', securityPatch: '2024-06-01', display: '6.4" Dynamic AMOLED 2X FHD+ 120Hz', mode: ['Download Mode', 'ADB Mode'], storageVariants: ['128 GB', '256 GB'], regions: ['EU', 'MEA', 'Global'] },
  { model: 'Galaxy S22 Ultra', modelCode: 'SM-S908B', serialFormat: 'R9K', productId: '0x6860', currentOsVersion: 'One UI 6.1 (Android 14)', chipset: 'Snapdragon 8 Gen 2', baseband: 'S908BXXS6BXD1', securityPatch: '2024-06-01', display: '6.8" Dynamic AMOLED 2X QHD+ 120Hz', mode: ['Download Mode', 'ADB Mode'], storageVariants: ['128 GB', '256 GB', '512 GB', '1 TB'], regions: ['US', 'EU', 'MEA', 'Global'] },
  { model: 'Galaxy S22+', modelCode: 'SM-S906B', serialFormat: 'R9J', productId: '0x6860', currentOsVersion: 'One UI 6.1 (Android 14)', chipset: 'Exynos 2200 (4nm)', baseband: 'S906BXXS6BXC1', securityPatch: '2024-06-01', display: '6.6" Dynamic AMOLED 2X FHD+ 120Hz', mode: ['Download Mode', 'ADB Mode'], storageVariants: ['128 GB', '256 GB'], regions: ['EU', 'Global'] },
  { model: 'Galaxy S22', modelCode: 'SM-S901B', serialFormat: 'R9H', productId: '0x6860', currentOsVersion: 'One UI 6.1 (Android 14)', chipset: 'Exynos 2200 (4nm)', baseband: 'S901BXXS6BXE1', securityPatch: '2024-06-01', display: '6.1" Dynamic AMOLED 2X FHD+ 120Hz', mode: ['Download Mode', 'ADB Mode'], storageVariants: ['128 GB', '256 GB'], regions: ['EU', 'MEA', 'Global'] },
  { model: 'Galaxy Z Fold 5', modelCode: 'SM-F946B', serialFormat: 'R9C', productId: '0x6860', currentOsVersion: 'One UI 6.1.1 (Android 14)', chipset: 'Snapdragon 8 Gen 2 for Galaxy', baseband: 'F946BXXS4AXF2', securityPatch: '2024-07-01', display: '7.6" Dynamic AMOLED 2X QHD+ 120Hz', mode: ['Download Mode', 'ADB Mode'], storageVariants: ['256 GB', '512 GB', '1 TB'], regions: ['US', 'EU', 'Global'] },
  { model: 'Galaxy Z Fold 4', modelCode: 'SM-F936B', serialFormat: 'R8V', productId: '0x6860', currentOsVersion: 'One UI 6.1 (Android 14)', chipset: 'Snapdragon 8+ Gen 1', baseband: 'F936BXXS5CXC1', securityPatch: '2024-06-01', display: '7.6" Dynamic AMOLED 2X QHD+ 120Hz', mode: ['Download Mode', 'ADB Mode'], storageVariants: ['256 GB', '512 GB', '1 TB'], regions: ['US', 'EU', 'MEA', 'Global'] },
  { model: 'Galaxy Z Flip 5', modelCode: 'SM-F731B', serialFormat: 'R9D', productId: '0x6860', currentOsVersion: 'One UI 6.1.1 (Android 14)', chipset: 'Snapdragon 8 Gen 2 for Galaxy', baseband: 'F731BXXS4AXD1', securityPatch: '2024-07-01', display: '6.7" Dynamic AMOLED 2X FHD+ 120Hz', mode: ['Download Mode', 'ADB Mode'], storageVariants: ['256 GB', '512 GB'], regions: ['US', 'EU', 'Global'] },
  { model: 'Galaxy Z Flip 4', modelCode: 'SM-F721B', serialFormat: 'R8W', productId: '0x6860', currentOsVersion: 'One UI 6.1 (Android 14)', chipset: 'Snapdragon 8+ Gen 1', baseband: 'F721BXXS5CXB1', securityPatch: '2024-06-01', display: '6.7" Dynamic AMOLED 2X FHD+ 120Hz', mode: ['Download Mode', 'ADB Mode'], storageVariants: ['128 GB', '256 GB', '512 GB'], regions: ['EU', 'MEA', 'Global'] },
  { model: 'Galaxy A54 5G', modelCode: 'SM-A546B', serialFormat: 'R8S', productId: '0x6860', currentOsVersion: 'One UI 6.1 (Android 14)', chipset: 'Exynos 1380 (5nm)', baseband: 'A546BXXS6CXD1', securityPatch: '2024-06-01', display: '6.4" Super AMOLED FHD+ 120Hz', mode: ['Download Mode', 'ADB Mode'], storageVariants: ['128 GB', '256 GB'], regions: ['EU', 'MEA', 'Global'] },
  { model: 'Galaxy A34 5G', modelCode: 'SM-A346B', serialFormat: 'R5S', productId: '0x6860', currentOsVersion: 'One UI 6.1 (Android 14)', chipset: 'MediaTek Dimensity 1080 (6nm)', baseband: 'A346BXXS6CXC1', securityPatch: '2024-06-01', display: '6.6" Super AMOLED FHD+ 120Hz', mode: ['Download Mode', 'ADB Mode'], storageVariants: ['128 GB', '256 GB'], regions: ['EU', 'MEA', 'Global'] },
  { model: 'Galaxy A15 5G', modelCode: 'SM-A155F', serialFormat: 'R5X', productId: '0x6860', currentOsVersion: 'One UI 6.1 (Android 14)', chipset: 'MediaTek Dimensity 6100+ (6nm)', baseband: 'A155FXXS5BXA1', securityPatch: '2024-05-01', display: '6.5" Super AMOLED FHD+ 90Hz', mode: ['Download Mode', 'ADB Mode'], storageVariants: ['64 GB', '128 GB'], regions: ['MEA', 'Global'] },
  { model: 'Galaxy Note 20 Ultra', modelCode: 'SM-N986B', serialFormat: 'R5M', productId: '0x6860', currentOsVersion: 'One UI 6.1 (Android 13)', chipset: 'Exynos 990 (7nm+)', baseband: 'N986BXXS9HXF1', securityPatch: '2024-01-01', display: '6.9" Dynamic AMOLED 2X QHD+ 120Hz', mode: ['Download Mode', 'ADB Mode'], storageVariants: ['256 GB', '512 GB'], regions: ['EU', 'MEA', 'Global'] },
  { model: 'Galaxy Tab S9', modelCode: 'SM-X710B', serialFormat: 'R5W', productId: '0x685D', currentOsVersion: 'One UI 6.1 (Android 14)', chipset: 'Snapdragon 8 Gen 2 for Galaxy', baseband: 'X710BXXS3AXA1', securityPatch: '2024-06-01', display: '11" Dynamic AMOLED 2X QHD+ 120Hz', mode: ['Download Mode', 'ADB Mode'], storageVariants: ['128 GB', '256 GB', '512 GB'], regions: ['US', 'EU', 'Global'] },
  { model: 'Galaxy Tab S8', modelCode: 'SM-X706B', serialFormat: 'R8N', productId: '0x685D', currentOsVersion: 'One UI 6.1 (Android 14)', chipset: 'Snapdragon 8 Gen 1', baseband: 'X706BXXS5BXC1', securityPatch: '2024-06-01', display: '11" LTPS TFT LCD QHD+ 120Hz', mode: ['Download Mode', 'ADB Mode'], storageVariants: ['128 GB', '256 GB', '512 GB'], regions: ['US', 'EU', 'Global'] },
];

const Xiaomi: DeviceModel[] = [
  { model: 'Xiaomi 14 Ultra', modelCode: '24030PN60G', serialFormat: '2403', productId: '0xFF40', currentOsVersion: 'HyperOS 1.0.10.0 (Android 14)', chipset: 'Snapdragon 8 Gen 3', baseband: '1.0.c6-00056', securityPatch: '2024-07-01', display: '6.73" LTPO AMOLED 2K+ 120Hz', mode: ['Fastboot Mode', 'EDL Mode'], storageVariants: ['256 GB', '512 GB', '1 TB'], regions: ['CN', 'Global', 'EU', 'India'] },
  { model: 'Xiaomi 14 Pro', modelCode: '23116PN5BC', serialFormat: '2311', productId: '0xFF40', currentOsVersion: 'HyperOS 1.0.9.0 (Android 14)', chipset: 'Snapdragon 8 Gen 3', baseband: '1.0.c5-00052', securityPatch: '2024-07-01', display: '6.73" LTPO AMOLED 2K+ 120Hz', mode: ['Fastboot Mode', 'EDL Mode'], storageVariants: ['256 GB', '512 GB', '1 TB'], regions: ['CN', 'Global'] },
  { model: 'Xiaomi 14', modelCode: '23127PN0CC', serialFormat: '2312', productId: '0xFF40', currentOsVersion: 'HyperOS 1.0.8.0 (Android 14)', chipset: 'Snapdragon 8 Gen 3', baseband: '1.0.c4-00051', securityPatch: '2024-07-01', display: '6.36" LTPO AMOLED FHD+ 120Hz', mode: ['Fastboot Mode', 'EDL Mode'], storageVariants: ['256 GB', '512 GB'], regions: ['CN', 'Global', 'EU', 'India'] },
  { model: 'Xiaomi 13 Ultra', modelCode: '2304FPN6DC', serialFormat: '2304', productId: '0xFF40', currentOsVersion: 'HyperOS 1.0.5.0 (Android 14)', chipset: 'Snapdragon 8 Gen 2', baseband: '1.0.c3-00043', securityPatch: '2024-06-01', display: '6.73" LTPO AMOLED 2K+ 120Hz', mode: ['Fastboot Mode', 'EDL Mode'], storageVariants: ['256 GB', '512 GB', '1 TB'], regions: ['CN', 'Global'] },
  { model: 'Xiaomi 13 Pro', modelCode: '2210132G', serialFormat: '2210', productId: '0xFF40', currentOsVersion: 'HyperOS 1.0.4.0 (Android 14)', chipset: 'Snapdragon 8 Gen 2', baseband: '1.0.c2-00040', securityPatch: '2024-06-01', display: '6.73" LTPO AMOLED 2K+ 120Hz', mode: ['Fastboot Mode', 'EDL Mode'], storageVariants: ['128 GB', '256 GB', '512 GB'], regions: ['Global', 'EU', 'India'] },
  { model: 'Xiaomi 13', modelCode: '2211133G', serialFormat: '2211', productId: '0xFF40', currentOsVersion: 'HyperOS 1.0.3.0 (Android 14)', chipset: 'Snapdragon 8 Gen 2', baseband: '1.0.c1-00038', securityPatch: '2024-06-01', display: '6.36" AMOLED FHD+ 120Hz', mode: ['Fastboot Mode', 'EDL Mode'], storageVariants: ['128 GB', '256 GB', '512 GB'], regions: ['Global', 'EU', 'India'] },
  { model: 'Xiaomi 12', modelCode: '2201123G', serialFormat: '2201', productId: '0xFF40', currentOsVersion: 'MIUI 14.0.10.0 (Android 13)', chipset: 'Snapdragon 8 Gen 1', baseband: '1.0.c0-00035', securityPatch: '2024-04-01', display: '6.28" AMOLED FHD+ 120Hz', mode: ['Fastboot Mode', 'EDL Mode'], storageVariants: ['128 GB', '256 GB'], regions: ['Global', 'EU'] },
  { model: 'Xiaomi 12 Pro', modelCode: '2201122G', serialFormat: '2201', productId: '0xFF40', currentOsVersion: 'MIUI 14.0.10.0 (Android 13)', chipset: 'Snapdragon 8 Gen 1', baseband: '1.0.c0-00035', securityPatch: '2024-04-01', display: '6.73" AMOLED 2K+ 120Hz', mode: ['Fastboot Mode', 'EDL Mode'], storageVariants: ['128 GB', '256 GB', '512 GB'], regions: ['Global', 'EU'] },
  { model: 'Redmi Note 13 Pro+', modelCode: '23106RN0DA', serialFormat: 'CXG', productId: '0xFF60', currentOsVersion: 'MIUI 14.0.8 (Android 13)', chipset: 'MediaTek Dimensity 7200-Ultra', baseband: 'MOLY0052', securityPatch: '2024-05-01', display: '6.67" AMOLED FHD+ 120Hz', mode: ['Fastboot Mode', 'EDL Mode'], storageVariants: ['128 GB', '256 GB', '512 GB'], regions: ['Global', 'MEA', 'India'] },
  { model: 'Redmi Note 13 Pro 5G', modelCode: '23106RN0CC', serialFormat: 'CXD', productId: '0xFF60', currentOsVersion: 'MIUI 14.0.8 (Android 13)', chipset: 'Snapdragon 7s Gen 2', baseband: '1.0.c2-00038', securityPatch: '2024-05-01', display: '6.67" AMOLED FHD+ 120Hz', mode: ['Fastboot Mode', 'EDL Mode'], storageVariants: ['128 GB', '256 GB', '512 GB'], regions: ['Global', 'MEA', 'India'] },
  { model: 'Redmi Note 13 Pro', modelCode: '23106RN0DG', serialFormat: 'CXC', productId: '0xFF60', currentOsVersion: 'MIUI 14.0.8 (Android 13)', chipset: 'MediaTek Helio G99 Ultra', baseband: 'MOLY0050', securityPatch: '2024-05-01', display: '6.67" AMOLED FHD+ 120Hz', mode: ['Fastboot Mode', 'EDL Mode'], storageVariants: ['128 GB', '256 GB'], regions: ['Global', 'MEA'] },
  { model: 'Redmi Note 13', modelCode: '23106RN0DA', serialFormat: 'CXB', productId: '0xFF60', currentOsVersion: 'MIUI 14.0.7 (Android 13)', chipset: 'MediaTek Dimensity 6080', baseband: 'MOLY0048', securityPatch: '2024-05-01', display: '6.67" IPS LCD FHD+ 120Hz', mode: ['Fastboot Mode', 'EDL Mode'], storageVariants: ['128 GB', '256 GB'], regions: ['Global', 'MEA', 'India'] },
  { model: 'Redmi Note 13C', modelCode: '23106RN0CA', serialFormat: 'CXA', productId: '0xFF60', currentOsVersion: 'MIUI 14.0.6 (Android 13)', chipset: 'MediaTek Helio G85', baseband: 'MOLY0045', securityPatch: '2024-04-01', display: '6.74" IPS LCD HD+ 60Hz', mode: ['Fastboot Mode', 'EDL Mode'], storageVariants: ['128 GB', '256 GB'], regions: ['MEA', 'India'] },
  { model: 'Redmi Note 12 Pro', modelCode: '22101316G', serialFormat: '21K', productId: '0xFF60', currentOsVersion: 'MIUI 14.0.6 (Android 13)', chipset: 'MediaTek Dimensity 1080', baseband: 'MOLY0049', securityPatch: '2024-03-01', display: '6.67" AMOLED FHD+ 120Hz', mode: ['Fastboot Mode', 'EDL Mode'], storageVariants: ['128 GB', '256 GB'], regions: ['Global', 'MEA', 'India'] },
  { model: 'Redmi Note 12', modelCode: '22101316I', serialFormat: '21J', productId: '0xFF60', currentOsVersion: 'MIUI 14.0.5 (Android 13)', chipset: 'Snapdragon 685', baseband: '1.0.c0-00028', securityPatch: '2024-03-01', display: '6.67" AMOLED FHD+ 120Hz', mode: ['Fastboot Mode', 'EDL Mode'], storageVariants: ['64 GB', '128 GB', '256 GB'], regions: ['Global', 'MEA', 'India'] },
  { model: 'Redmi Note 12S', modelCode: '2306ERA39G', serialFormat: '2306', productId: '0xFF60', currentOsVersion: 'MIUI 14.0.4 (Android 13)', chipset: 'MediaTek Helio G96', baseband: 'MOLY0042', securityPatch: '2024-02-01', display: '6.43" AMOLED FHD+ 90Hz', mode: ['Fastboot Mode', 'EDL Mode'], storageVariants: ['64 GB', '128 GB', '256 GB'], regions: ['Global', 'MEA'] },
  { model: 'Poco X6 Pro', modelCode: '2311DRK48G', serialFormat: '2311', productId: '0xFF80', currentOsVersion: 'MIUI 14.0.8 (Android 14)', chipset: 'MediaTek Dimensity 8300-Ultra', baseband: 'MOLY0053', securityPatch: '2024-05-01', display: '6.67" AMOLED FHD+ 120Hz', mode: ['Fastboot Mode', 'EDL Mode'], storageVariants: ['128 GB', '256 GB', '512 GB'], regions: ['India', 'Global'] },
  { model: 'Poco X6', modelCode: '23122PC87G', serialFormat: '2312', productId: '0xFF80', currentOsVersion: 'MIUI 14.0.6 (Android 14)', chipset: 'Snapdragon 7s Gen 2', baseband: '1.0.c2-00038', securityPatch: '2024-05-01', display: '6.67" AMOLED FHD+ 120Hz', mode: ['Fastboot Mode', 'EDL Mode'], storageVariants: ['128 GB', '256 GB', '512 GB'], regions: ['India', 'Global'] },
  { model: 'Poco F6', modelCode: '2311DRK47C', serialFormat: '2311', productId: '0xFF80', currentOsVersion: 'HyperOS 1.0.3.0 (Android 14)', chipset: 'Snapdragon 8s Gen 3', baseband: '1.0.c3-00041', securityPatch: '2024-06-01', display: '6.67" AMOLED FHD+ 120Hz', mode: ['Fastboot Mode', 'EDL Mode'], storageVariants: ['256 GB', '512 GB'], regions: ['Global', 'India'] },
  { model: 'Poco F5', modelCode: '23078PND5G', serialFormat: '2307', productId: '0xFF80', currentOsVersion: 'MIUI 14.0.6 (Android 14)', chipset: 'Snapdragon 7+ Gen 2', baseband: '1.0.c1-00036', securityPatch: '2024-05-01', display: '6.67" AMOLED FHD+ 120Hz', mode: ['Fastboot Mode', 'EDL Mode'], storageVariants: ['256 GB', '512 GB'], regions: ['India', 'Global'] },
  { model: 'Poco M6 Pro', modelCode: '2404FPN6DG', serialFormat: '2404', productId: '0xFF80', currentOsVersion: 'HyperOS 1.0.2.0 (Android 14)', chipset: 'MediaTek Dimensity 7025 Ultra', baseband: 'MOLY0054', securityPatch: '2024-06-01', display: '6.67" IPS LCD FHD+ 120Hz', mode: ['Fastboot Mode', 'EDL Mode'], storageVariants: ['64 GB', '128 GB', '256 GB'], regions: ['India', 'Global', 'MEA'] },
];

const deviceDatabase: Record<string, DeviceModel[]> = { Apple, Samsung, Xiaomi };

const vendorIds: Record<string, string> = { Apple: '0x05AC', Samsung: '0x04E8', Xiaomi: '0x2717' };
const usbClassCodes: Record<string, string> = { Apple: '0x00 (Composite Device)', Samsung: '0x00 (Composite Device)', Xiaomi: '0xFF (Vendor Specific)' };

// Module-level counter for cycling through devices
const brandCounters: Record<string, number> = { Apple: 0, Samsung: 0, Xiaomi: 0 };

function generateAppleSerial(prefix: string): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const pick = (n: number) => Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return prefix + pick(8);
}

function generateSamsungSerial(prefix: string): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const pick = (n: number) => Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return prefix + pick(3) + String(Math.floor(Math.random() * 10)) + pick(5);
}

function generateXiaomiSerial(prefix: string): string {
  const hex = '0123456789ABCDEF';
  const pick = (n: number) => Array.from({ length: n }, () => hex[Math.floor(Math.random() * hex.length)]).join('');
  return prefix + pick(8).toLowerCase();
}

function generateSerial(brand: string, format: string): string {
  if (brand === 'Apple') return generateAppleSerial(format);
  if (brand === 'Samsung') return generateSamsungSerial(format);
  return generateXiaomiSerial(format);
}

function pickMode(modes: string[]): string {
  // Weighted selection: Normal is most common
  const weights = modes.length === 3 ? [0.1, 0.15, 0.75] : modes.length === 2 ? [0.3, 0.7] : [1];
  const r = Math.random();
  let cumulative = 0;
  for (let i = 0; i < modes.length; i++) {
    cumulative += (weights[i] || 0);
    if (r < cumulative) return modes[i];
  }
  return modes[modes.length - 1];
}

function pickStorage(variants: string[]): string {
  return variants[Math.floor(Math.random() * variants.length)];
}

function pickRegion(regions: string[]): string {
  return regions[Math.floor(Math.random() * regions.length)];
}

export async function POST(request: Request) {
  const body = await request.json();
  const { brand: requestedBrand } = body;

  // Simulate realistic multi-step USB scanning with progressive delays
  const busNum = String(Math.floor(Math.random() * 3) + 1).padStart(3, '0');
  const devNum = String(Math.floor(Math.random() * 8) + 1).padStart(3, '0');

  // Step 1: USB bus enumeration
  await new Promise((resolve) => setTimeout(resolve, 300));
  const targetBrand = requestedBrand || ['Apple', 'Samsung', 'Xiaomi'][Math.floor(Date.now() / 10000) % 3];
  const vid = vendorIds[targetBrand];
  const usbClass = usbClassCodes[targetBrand];

  // Step 2: Vendor identification
  await new Promise((resolve) => setTimeout(resolve, 250));

  // Deterministic cycling through devices (each scan gets a different device)
  const devices = deviceDatabase[targetBrand];
  const idx = brandCounters[targetBrand] % devices.length;
  brandCounters[targetBrand] = idx + 1;
  const device = devices[idx];

  // Step 3: Product ID & handshake
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Step 4-5: Serial & board config
  await new Promise((resolve) => setTimeout(resolve, 350));
  const serialNumber = generateSerial(targetBrand, device.serialFormat);
  const storageCapacity = pickStorage(device.storageVariants);
  const region = pickRegion(device.regions);
  const mode = pickMode(device.mode);
  const batteryLevel = Math.floor(Math.random() * 40) + 55;

  // Step 6-8: Full identification
  await new Promise((resolve) => setTimeout(resolve, 350));

  return NextResponse.json({
    detected: true,
    detectionSteps: [
      { step: 'USB Bus Enumeration', detail: `Scanning USB bus ${busNum}... Device found at ${busNum}:${devNum}` },
      { step: 'Vendor ID Match', detail: `VID:${vid} → ${targetBrand} Inc. (registered USB vendor)` },
      { step: 'USB Class Code', detail: `Device Class: ${usbClass}` },
      { step: 'Product ID Read', detail: `PID:${device.productId} — ${targetBrand} mobile device confirmed` },
      { step: 'Serial Number Read', detail: `USB descriptor serial: ${serialNumber.substring(0, 6)}****` },
      { step: 'Board Config', detail: `Hardware identifier: ${device.modelCode} → ${device.model}` },
      { step: 'Chipset Probe', detail: `SoC: ${device.chipset} | Baseband: ${device.baseband}` },
      { step: 'Fingerprint Complete', detail: `${device.model} / ${storageCapacity} / ${region} / ${mode}` },
    ],
    deviceInfo: {
      brand: targetBrand,
      model: device.model,
      modelCode: device.modelCode,
      serialNumber,
      mode,
      vendorId: vid,
      productId: device.productId,
      storageCapacity,
      currentOsVersion: device.currentOsVersion,
      batteryLevel,
      chipset: device.chipset,
      baseband: device.baseband,
      securityPatch: device.securityPatch,
      display: device.display,
      region,
    },
  });
}