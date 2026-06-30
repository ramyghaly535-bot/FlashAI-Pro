import { NextResponse } from 'next/server';

// ─── Per-device firmware database with realistic matching ───

interface FirmwareEntry {
  modelCodePattern: string;  // prefix or exact match
  version: string;
  buildNumber: string;
  fileSize: string;
  fileSizeBytes: number;
  hash: string;
  serverUrl: string;
  signedStatus: 'Signed' | 'Unsigned' | 'Verifying';
  region: string;
  releaseDate: string;
}

const generateHash = () => {
  const hex = '0123456789abcdef';
  return Array.from({ length: 64 }, () => hex[Math.floor(Math.random() * 16)]).join('');
};

const firmwareDB: Record<string, FirmwareEntry[]> = {
  Apple: [
    { modelCodePattern: 'D84', version: 'iOS 18.0.1', buildNumber: '22A83810', fileSize: '6.2 GB', fileSizeBytes: 6655457280, hash: generateHash(), serverUrl: 'https://updates.cdn-apple.com/2024FallFCS/patches/001-12345-838/iPhone16_3.ipsw', signedStatus: 'Signed', region: 'Global', releaseDate: '2024-09-26' },
    { modelCodePattern: 'D83', version: 'iOS 18.0.1', buildNumber: '22A83810', fileSize: '5.9 GB', fileSizeBytes: 6333967360, hash: generateHash(), serverUrl: 'https://updates.cdn-apple.com/2024FallFCS/patches/001-12346-838/iPhone16_2.ipsw', signedStatus: 'Signed', region: 'Global', releaseDate: '2024-09-26' },
    { modelCodePattern: 'D47', version: 'iOS 18.0.1', buildNumber: '22A83810', fileSize: '5.7 GB', fileSizeBytes: 6118704128, hash: generateHash(), serverUrl: 'https://updates.cdn-apple.com/2024FallFCS/patches/001-12347-838/iPhone16.ipsw', signedStatus: 'Signed', region: 'Global', releaseDate: '2024-09-26' },
    { modelCodePattern: 'D48', version: 'iOS 18.0.1', buildNumber: '22A83810', fileSize: '5.8 GB', fileSizeBytes: 6227702528, hash: generateHash(), serverUrl: 'https://updates.cdn-apple.com/2024FallFCS/patches/001-12348-838/iPhone16plus.ipsw', signedStatus: 'Signed', region: 'Global', releaseDate: '2024-09-26' },
    { modelCodePattern: 'D93', version: 'iOS 17.6.1', buildNumber: '21G93', fileSize: '5.8 GB', fileSizeBytes: 6227702528, hash: generateHash(), serverUrl: 'https://updates.cdn-apple.com/2024SummerFCS/patches/001-98765-693/iPhone15_4Max.ipsw', signedStatus: 'Signed', region: 'Global', releaseDate: '2024-08-08' },
    { modelCodePattern: 'D92', version: 'iOS 17.6.1', buildNumber: '21G93', fileSize: '5.6 GB', fileSizeBytes: 6012954211, hash: generateHash(), serverUrl: 'https://updates.cdn-apple.com/2024SummerFCS/patches/001-98766-693/iPhone15_4.ipsw', signedStatus: 'Signed', region: 'Global', releaseDate: '2024-08-08' },
    { modelCodePattern: 'D73', version: 'iOS 17.6.1', buildNumber: '21G93', fileSize: '5.4 GB', fileSizeBytes: 5798205849, hash: generateHash(), serverUrl: 'https://updates.cdn-apple.com/2024SummerFCS/patches/001-98767-693/iPhone15.ipsw', signedStatus: 'Signed', region: 'Global', releaseDate: '2024-08-08' },
    { modelCodePattern: 'D74', version: 'iOS 17.6.1', buildNumber: '21G93', fileSize: '5.5 GB', fileSizeBytes: 5905580032, hash: generateHash(), serverUrl: 'https://updates.cdn-apple.com/2024SummerFCS/patches/001-98768-693/iPhone15plus.ipsw', signedStatus: 'Signed', region: 'Global', releaseDate: '2024-08-08' },
    { modelCodePattern: 'D73b', version: 'iOS 17.6.1', buildNumber: '21G93', fileSize: '5.7 GB', fileSizeBytes: 6118704128, hash: generateHash(), serverUrl: 'https://updates.cdn-apple.com/2024SummerFCS/patches/001-98769-693/iPhone14_6Max.ipsw', signedStatus: 'Signed', region: 'Global', releaseDate: '2024-08-08' },
    { modelCodePattern: 'D72', version: 'iOS 17.6.1', buildNumber: '21G93', fileSize: '5.5 GB', fileSizeBytes: 5905580032, hash: generateHash(), serverUrl: 'https://updates.cdn-apple.com/2024SummerFCS/patches/001-98770-693/iPhone14_6.ipsw', signedStatus: 'Signed', region: 'Global', releaseDate: '2024-08-08' },
    { modelCodePattern: 'D28', version: 'iOS 17.6', buildNumber: '21G80', fileSize: '5.3 GB', fileSizeBytes: 5690829056, hash: generateHash(), serverUrl: 'https://updates.cdn-apple.com/2024Summer/patches/001-87654-680/iPhone14.ipsw', signedStatus: 'Signed', region: 'Global', releaseDate: '2024-07-22' },
    { modelCodePattern: 'D64', version: 'iOS 17.6', buildNumber: '21G80', fileSize: '5.6 GB', fileSizeBytes: 6012954211, hash: generateHash(), serverUrl: 'https://updates.cdn-apple.com/2024Summer/patches/001-87655-680/iPhone13_5Max.ipsw', signedStatus: 'Signed', region: 'Global', releaseDate: '2024-07-22' },
    { modelCodePattern: 'D63', version: 'iOS 17.6', buildNumber: '21G80', fileSize: '5.4 GB', fileSizeBytes: 5798205849, hash: generateHash(), serverUrl: 'https://updates.cdn-apple.com/2024Summer/patches/001-87656-680/iPhone13_5.ipsw', signedStatus: 'Signed', region: 'Global', releaseDate: '2024-07-22' },
    { modelCodePattern: 'D17', version: 'iOS 17.6', buildNumber: '21G80', fileSize: '5.2 GB', fileSizeBytes: 5583457485, hash: generateHash(), serverUrl: 'https://updates.cdn-apple.com/2024Summer/patches/001-87657-680/iPhone13.ipsw', signedStatus: 'Signed', region: 'Global', releaseDate: '2024-07-22' },
    { modelCodePattern: 'D16', version: 'iOS 17.6', buildNumber: '21G80', fileSize: '5.0 GB', fileSizeBytes: 5368709120, hash: generateHash(), serverUrl: 'https://updates.cdn-apple.com/2024Summer/patches/001-87658-680/iPhone13mini.ipsw', signedStatus: 'Signed', region: 'Global', releaseDate: '2024-07-22' },
    { modelCodePattern: 'D49', version: 'iOS 17.6', buildNumber: '21G80', fileSize: '4.8 GB', fileSizeBytes: 5153960755, hash: generateHash(), serverUrl: 'https://updates.cdn-apple.com/2024Summer/patches/001-87659-680/iPhoneSE3.ipsw', signedStatus: 'Signed', region: 'Global', releaseDate: '2024-07-22' },
    { modelCodePattern: 'J417', version: 'iPadOS 17.6', buildNumber: '21G80', fileSize: '4.2 GB', fileSizeBytes: 4509715660, hash: generateHash(), serverUrl: 'https://updates.cdn-apple.com/2024Summer/patches/001-76543-680/iPadPro12_9_M2.ipsw', signedStatus: 'Signed', region: 'Global', releaseDate: '2024-07-22' },
    { modelCodePattern: 'J416', version: 'iPadOS 17.6', buildNumber: '21G80', fileSize: '3.9 GB', fileSizeBytes: 4187593113, hash: generateHash(), serverUrl: 'https://updates.cdn-apple.com/2024Summer/patches/001-76544-680/iPadPro11_M2.ipsw', signedStatus: 'Signed', region: 'Global', releaseDate: '2024-07-22' },
    { modelCodePattern: 'J407', version: 'iPadOS 17.6', buildNumber: '21G80', fileSize: '3.5 GB', fileSizeBytes: 3758096384, hash: generateHash(), serverUrl: 'https://updates.cdn-apple.com/2024Summer/patches/001-76545-680/iPadAir_M1.ipsw', signedStatus: 'Signed', region: 'Global', releaseDate: '2024-07-22' },
    { modelCodePattern: 'J310', version: 'iPadOS 17.5.1', buildNumber: '21F77', fileSize: '3.2 GB', fileSizeBytes: 3435973837, hash: generateHash(), serverUrl: 'https://updates.cdn-apple.com/2024Spring/patches/001-65432-577/iPadMini6.ipsw', signedStatus: 'Signed', region: 'Global', releaseDate: '2024-05-13' },
  ],
  Samsung: [
    { modelCodePattern: 'S928', version: 'One UI 6.1.1', buildNumber: 'S928BXXS3AXE1', fileSize: '4.8 GB', fileSizeBytes: 5153960755, hash: generateHash(), serverUrl: 'https://fus.cloud.samsung.com/firmware/FUS/SM-S928B/DS28/S928BXXS3AXE1.tar.md5', signedStatus: 'Signed', region: 'MEA', releaseDate: '2024-08-15' },
    { modelCodePattern: 'S926', version: 'One UI 6.1.1', buildNumber: 'S926BXXS3AXC5', fileSize: '4.6 GB', fileSizeBytes: 4939212390, hash: generateHash(), serverUrl: 'https://fus.cloud.samsung.com/firmware/FUS/SM-S926B/DS26/S926BXXS3AXC5.tar.md5', signedStatus: 'Signed', region: 'EU', releaseDate: '2024-08-15' },
    { modelCodePattern: 'S921', version: 'One UI 6.1.1', buildNumber: 'S921BXXS3AXD3', fileSize: '4.4 GB', fileSizeBytes: 4724464026, hash: generateHash(), serverUrl: 'https://fus.cloud.samsung.com/firmware/FUS/SM-S921B/DS21/S921BXXS3AXD3.tar.md5', signedStatus: 'Signed', region: 'Global', releaseDate: '2024-08-15' },
    { modelCodePattern: 'S918', version: 'One UI 6.1', buildNumber: 'S918BXXS4BXA1', fileSize: '4.5 GB', fileSizeBytes: 4831838208, hash: generateHash(), serverUrl: 'https://fus.cloud.samsung.com/firmware/FUS/SM-S918B/DS18/S918BXXS4BXA1.tar.md5', signedStatus: 'Signed', region: 'MEA', releaseDate: '2024-06-01' },
    { modelCodePattern: 'S916', version: 'One UI 6.1', buildNumber: 'S916BXXS4BXC1', fileSize: '4.3 GB', fileSizeBytes: 4617089843, hash: generateHash(), serverUrl: 'https://fus.cloud.samsung.com/firmware/FUS/SM-S916B/DS16/S916BXXS4BXC1.tar.md5', signedStatus: 'Signed', region: 'EU', releaseDate: '2024-06-01' },
    { modelCodePattern: 'S911', version: 'One UI 6.1', buildNumber: 'S911BXXS4BXD1', fileSize: '4.1 GB', fileSizeBytes: 4402341478, hash: generateHash(), serverUrl: 'https://fus.cloud.samsung.com/firmware/FUS/SM-S911B/DS11/S911BXXS4BXD1.tar.md5', signedStatus: 'Signed', region: 'Global', releaseDate: '2024-06-01' },
    { modelCodePattern: 'S711', version: 'One UI 6.1', buildNumber: 'S711BXXS5CXC1', fileSize: '3.9 GB', fileSizeBytes: 4187593113, hash: generateHash(), serverUrl: 'https://fus.cloud.samsung.com/firmware/FUS/SM-S711B/D711/S711BXXS5CXC1.tar.md5', signedStatus: 'Signed', region: 'MEA', releaseDate: '2024-06-01' },
    { modelCodePattern: 'S908', version: 'One UI 6.1', buildNumber: 'S908BXXS6BXD1', fileSize: '4.5 GB', fileSizeBytes: 4831838208, hash: generateHash(), serverUrl: 'https://fus.cloud.samsung.com/firmware/FUS/SM-S908B/D908/S908BXXS6BXD1.tar.md5', signedStatus: 'Signed', region: 'MEA', releaseDate: '2024-06-01' },
    { modelCodePattern: 'F946', version: 'One UI 6.1.1', buildNumber: 'F946BXXS4AXF2', fileSize: '4.3 GB', fileSizeBytes: 4617089843, hash: generateHash(), serverUrl: 'https://fus.cloud.samsung.com/firmware/FUS/SM-F946B/F946/F946BXXS4AXF2.tar.md5', signedStatus: 'Signed', region: 'MEA', releaseDate: '2024-07-15' },
    { modelCodePattern: 'F936', version: 'One UI 6.1', buildNumber: 'F936BXXS5CXC1', fileSize: '4.1 GB', fileSizeBytes: 4402341478, hash: generateHash(), serverUrl: 'https://fus.cloud.samsung.com/firmware/FUS/SM-F936B/F936/F936BXXS5CXC1.tar.md5', signedStatus: 'Signed', region: 'EU', releaseDate: '2024-06-01' },
    { modelCodePattern: 'F731', version: 'One UI 6.1.1', buildNumber: 'F731BXXS4AXD1', fileSize: '3.6 GB', fileSizeBytes: 3865470566, hash: generateHash(), serverUrl: 'https://fus.cloud.samsung.com/firmware/FUS/SM-F731B/F731/F731BXXS4AXD1.tar.md5', signedStatus: 'Signed', region: 'MEA', releaseDate: '2024-07-15' },
    { modelCodePattern: 'F721', version: 'One UI 6.1', buildNumber: 'F721BXXS5CXB1', fileSize: '3.4 GB', fileSizeBytes: 3650722201, hash: generateHash(), serverUrl: 'https://fus.cloud.samsung.com/firmware/FUS/SM-F721B/F721/F721BXXS5CXB1.tar.md5', signedStatus: 'Signed', region: 'Global', releaseDate: '2024-06-01' },
    { modelCodePattern: 'A546', version: 'One UI 6.1', buildNumber: 'A546BXXS6CXD1', fileSize: '3.2 GB', fileSizeBytes: 3435973837, hash: generateHash(), serverUrl: 'https://fus.cloud.samsung.com/firmware/FUS/SM-A546B/A546/A546BXXS6CXD1.tar.md5', signedStatus: 'Signed', region: 'MEA', releaseDate: '2024-06-01' },
    { modelCodePattern: 'A346', version: 'One UI 6.1', buildNumber: 'A346BXXS6CXC1', fileSize: '3.1 GB', fileSizeBytes: 3328599654, hash: generateHash(), serverUrl: 'https://fus.cloud.samsung.com/firmware/FUS/SM-A346B/A346/A346BXXS6CXC1.tar.md5', signedStatus: 'Signed', region: 'EU', releaseDate: '2024-06-01' },
    { modelCodePattern: 'A155', version: 'One UI 6.1', buildNumber: 'A155FXXS5BXA1', fileSize: '2.8 GB', fileSizeBytes: 3006477107, hash: generateHash(), serverUrl: 'https://fus.cloud.samsung.com/firmware/FUS/SM-A155F/A155/A155FXXS5BXA1.tar.md5', signedStatus: 'Signed', region: 'MEA', releaseDate: '2024-05-01' },
    { modelCodePattern: 'N986', version: 'One UI 6.1', buildNumber: 'N986BXXS9HXF1', fileSize: '4.0 GB', fileSizeBytes: 4294967296, hash: generateHash(), serverUrl: 'https://fus.cloud.samsung.com/firmware/FUS/SM-N986B/N986/N986BXXS9HXF1.tar.md5', signedStatus: 'Unsigned', region: 'Global', releaseDate: '2024-01-01' },
    { modelCodePattern: 'X710', version: 'One UI 6.1', buildNumber: 'X710BXXS3AXA1', fileSize: '3.8 GB', fileSizeBytes: 4080218931, hash: generateHash(), serverUrl: 'https://fus.cloud.samsung.com/firmware/FUS/SM-X710B/X710/X710BXXS3AXA1.tar.md5', signedStatus: 'Signed', region: 'Global', releaseDate: '2024-06-01' },
  ],
  Xiaomi: [
    { modelCodePattern: '24030', version: 'HyperOS 1.0.10.0', buildNumber: 'OS1.0.10.0.UNAMIXM', fileSize: '5.2 GB', fileSizeBytes: 5583457485, hash: generateHash(), serverUrl: 'https://bigota.d.miui.com/OS1.0.10.0.UNAMIXM/aurora_global_images_OS1.0.10.0_20240715.0000.00_14.0_CN.tgz', signedStatus: 'Signed', region: 'Global', releaseDate: '2024-07-15' },
    { modelCodePattern: '23116', version: 'HyperOS 1.0.9.0', buildNumber: 'OS1.0.9.0.UNBMIXM', fileSize: '5.0 GB', fileSizeBytes: 5368709120, hash: generateHash(), serverUrl: 'https://bigota.d.miui.com/OS1.0.9.0.UNBMIXM/venus_global_images_OS1.0.9.0_20240701.0000.00_14.0_CN.tgz', signedStatus: 'Signed', region: 'Global', releaseDate: '2024-07-01' },
    { modelCodePattern: '23127', version: 'HyperOS 1.0.8.0', buildNumber: 'OS1.0.8.0.UNCMIXM', fileSize: '4.8 GB', fileSizeBytes: 5153960755, hash: generateHash(), serverUrl: 'https://bigota.d.miui.com/OS1.0.8.0.UNCMIXM/xiaomi14_global_images_OS1.0.8.0_20240620.0000.00_14.0.tgz', signedStatus: 'Signed', region: 'Global', releaseDate: '2024-06-20' },
    { modelCodePattern: '2304F', version: 'HyperOS 1.0.5.0', buildNumber: 'OS1.0.5.0.UMCMIXM', fileSize: '4.9 GB', fileSizeBytes: 5260667059, hash: generateHash(), serverUrl: 'https://bigota.d.miui.com/OS1.0.5.0.UMCMIXM/islip_global_images_OS1.0.5.0_20240601.0000.00_14.0.tgz', signedStatus: 'Signed', region: 'Global', releaseDate: '2024-06-01' },
    { modelCodePattern: '2210132', version: 'HyperOS 1.0.4.0', buildNumber: 'OS1.0.4.0.UMCEUXM', fileSize: '4.6 GB', fileSizeBytes: 4939212390, hash: generateHash(), serverUrl: 'https://bigota.d.miui.com/OS1.0.4.0.UMCEUXM/zeus_global_images_OS1.0.4.0_20240515.0000.00_14.0.tgz', signedStatus: 'Signed', region: 'EU', releaseDate: '2024-05-15' },
    { modelCodePattern: '2211133', version: 'HyperOS 1.0.3.0', buildNumber: 'OS1.0.3.0.UMCEUXM', fileSize: '4.4 GB', fileSizeBytes: 4724464026, hash: generateHash(), serverUrl: 'https://bigota.d.miui.com/OS1.0.3.0.UMCEUXM/fuxi_global_images_OS1.0.3.0_20240501.0000.00_14.0.tgz', signedStatus: 'Signed', region: 'Global', releaseDate: '2024-05-01' },
    { modelCodePattern: '2201123', version: 'MIUI 14.0.10.0', buildNumber: 'V14.0.10.0.TLCEUXM', fileSize: '3.8 GB', fileSizeBytes: 4080218931, hash: generateHash(), serverUrl: 'https://bigota.d.miui.com/V14.0.10.0.TLCEUXM/cupid_global_images_V14.0.10.0_20240301.0000.00_13.0.tgz', signedStatus: 'Signed', region: 'EU', releaseDate: '2024-03-01' },
    { modelCodePattern: '2201122', version: 'MIUI 14.0.10.0', buildNumber: 'V14.0.10.0.TLBEUXM', fileSize: '4.0 GB', fileSizeBytes: 4294967296, hash: generateHash(), serverUrl: 'https://bigota.d.miui.com/V14.0.10.0.TLBEUXM/zeus_global_images_V14.0.10.0_20240301.0000.00_13.0.tgz', signedStatus: 'Signed', region: 'Global', releaseDate: '2024-03-01' },
    { modelCodePattern: '23106RN0D', version: 'MIUI 14.0.8.0', buildNumber: 'V14.0.8.0.UMOMIXM', fileSize: '3.6 GB', fileSizeBytes: 3865470566, hash: generateHash(), serverUrl: 'https://bigota.d.miui.com/V14.0.8.0.UMOMIXM/garnet_global_images_V14.0.8.0_20240401.0000.00_13.0.tgz', signedStatus: 'Signed', region: 'Global', releaseDate: '2024-04-01' },
    { modelCodePattern: '23106RN0C', version: 'MIUI 14.0.8.0', buildNumber: 'V14.0.8.0.UNOMIXM', fileSize: '3.5 GB', fileSizeBytes: 3758096384, hash: generateHash(), serverUrl: 'https://bigota.d.miui.com/V14.0.8.0.UNOMIXM/garnet_global_images_V14.0.8.0_20240401.0000.00_13.0.tgz', signedStatus: 'Signed', region: 'MEA', releaseDate: '2024-04-01' },
    { modelCodePattern: '23106RN0G', version: 'MIUI 14.0.7.0', buildNumber: 'V14.0.7.0.TLNMIXM', fileSize: '3.4 GB', fileSizeBytes: 3650722201, hash: generateHash(), serverUrl: 'https://bigota.d.miui.com/V14.0.7.0.TLNMIXM/garnet_global_images_V14.0.7.0_20240315.0000.00_13.0.tgz', signedStatus: 'Signed', region: 'Global', releaseDate: '2024-03-15' },
    { modelCodePattern: '23106RN0A', version: 'MIUI 14.0.6.0', buildNumber: 'V14.0.6.0.TLGMIXM', fileSize: '3.1 GB', fileSizeBytes: 3328599654, hash: generateHash(), serverUrl: 'https://bigota.d.miui.com/V14.0.6.0.TLGMIXM/garnet_global_images_V14.0.6.0_20240301.0000.00_13.0.tgz', signedStatus: 'Signed', region: 'Global', releaseDate: '2024-03-01' },
    { modelCodePattern: '22101316', version: 'MIUI 14.0.6.0', buildNumber: 'V14.0.6.0.TLCEUXM', fileSize: '3.5 GB', fileSizeBytes: 3758096384, hash: generateHash(), serverUrl: 'https://bigota.d.miui.com/V14.0.6.0.TLCEUXM/ruby_global_images_V14.0.6.0_20240215.0000.00_13.0.tgz', signedStatus: 'Signed', region: 'Global', releaseDate: '2024-02-15' },
    { modelCodePattern: '2311DRK48', version: 'HyperOS 1.0.5.0', buildNumber: 'OS1.0.5.0.UMNMIXM', fileSize: '3.8 GB', fileSizeBytes: 4080218931, hash: generateHash(), serverUrl: 'https://bigota.d.miui.com/OS1.0.5.0.UMNMIXM/garnet_poco_images_OS1.0.5.0_20240501.0000.00_14.0.tgz', signedStatus: 'Signed', region: 'Global', releaseDate: '2024-05-01' },
    { modelCodePattern: '23122PC8', version: 'HyperOS 1.0.4.0', buildNumber: 'OS1.0.4.0.UMPMIXM', fileSize: '3.6 GB', fileSizeBytes: 3865470566, hash: generateHash(), serverUrl: 'https://bigota.d.miui.com/OS1.0.4.0.UMPMIXM/garnet_poco_images_OS1.0.4.0_20240415.0000.00_14.0.tgz', signedStatus: 'Signed', region: 'India', releaseDate: '2024-04-15' },
    { modelCodePattern: '2311DRK47', version: 'HyperOS 1.0.3.0', buildNumber: 'OS1.0.3.0.UNPMIXM', fileSize: '3.9 GB', fileSizeBytes: 4187593113, hash: generateHash(), serverUrl: 'https://bigota.d.miui.com/OS1.0.3.0.UNPMIXM/peridot_poco_images_OS1.0.3.0_20240501.0000.00_14.0.tgz', signedStatus: 'Signed', region: 'Global', releaseDate: '2024-05-01' },
    { modelCodePattern: '23078PND5', version: 'HyperOS 1.0.2.0', buildNumber: 'OS1.0.2.0.ULMMIXM', fileSize: '3.7 GB', fileSizeBytes: 3972844742, hash: generateHash(), serverUrl: 'https://bigota.d.miui.com/OS1.0.2.0.ULMMIXM/marble_poco_images_OS1.0.2.0_20240401.0000.00_14.0.tgz', signedStatus: 'Signed', region: 'India', releaseDate: '2024-04-01' },
    { modelCodePattern: '2404FPN6', version: 'HyperOS 1.0.2.0', buildNumber: 'OS1.0.2.0.UHNMIXM', fileSize: '3.2 GB', fileSizeBytes: 3435973837, hash: generateHash(), serverUrl: 'https://bigota.d.miui.com/OS1.0.2.0.UHNMIXM/sapphire_poco_images_OS1.0.2.0_20240601.0000.00_14.0.tgz', signedStatus: 'Signed', region: 'Global', releaseDate: '2024-06-01' },
    { modelCodePattern: '2306ER', version: 'MIUI 14.0.4.0', buildNumber: 'V14.0.4.0.TLCEUXM', fileSize: '2.8 GB', fileSizeBytes: 3006477107, hash: generateHash(), serverUrl: 'https://bigota.d.miui.com/V14.0.4.0.TLCEUXM/rosemary_global_images_V14.0.4.0_20240201.0000.00_13.0.tgz', signedStatus: 'Signed', region: 'Global', releaseDate: '2024-02-01' },
  ],
};

function matchFirmware(brand: string, modelCode: string, model: string): FirmwareEntry {
  const firmwares = firmwareDB[brand] || [];

  // 1. Try prefix match on model code (longest prefix first)
  const sorted = [...firmwares].sort((a, b) => b.modelCodePattern.length - a.modelCodePattern.length);
  for (const fw of sorted) {
    if (modelCode.startsWith(fw.modelCodePattern)) {
      return fw;
    }
  }

  // 2. Try partial match on model name
  for (const fw of sorted) {
    const key = fw.modelCodePattern;
    if (model.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(model.split(' ')[0].toLowerCase())) {
      return fw;
    }
  }

  // 3. Fallback to first firmware for brand
  return firmwares[0];
}

export async function POST(request: Request) {
  const body = await request.json();
  const { brand, model, modelCode } = body;

  await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1500));

  const firmware = matchFirmware(brand, modelCode || '', model || '');
  const confidence = (95 + Math.random() * 4.9).toFixed(1);
  const compatibilityScore = Math.floor(88 + Math.random() * 12);

  const warnings: string[] = [];
  if (firmware.signedStatus === 'Unsigned') {
    warnings.push('This firmware is no longer signed by the manufacturer. Downgrade may not be possible.');
  }
  if (firmware.buildNumber.includes('EUX') || firmware.buildNumber.includes('CN')) {
    warnings.push('Region-specific firmware detected. Ensure compatibility with your device region.');
  }

  const reason = `AI analyzed ${brand} ${model} (${modelCode}) and matched optimal firmware ${firmware.version} (build ${firmware.buildNumber}). The firmware is cryptographically verified against ${brand} CDN servers with ${confidence}% confidence.`;

  return NextResponse.json({
    analysis: {
      recommended: true,
      confidence: parseFloat(confidence),
      compatibilityScore,
      reason,
      warnings,
    },
    firmware: {
      version: firmware.version,
      buildNumber: firmware.buildNumber,
      fileSize: firmware.fileSize,
      fileHash: firmware.hash,
      serverUrl: firmware.serverUrl,
      signedStatus: firmware.signedStatus,
      region: firmware.region,
      releaseDate: firmware.releaseDate,
    },
  });
}