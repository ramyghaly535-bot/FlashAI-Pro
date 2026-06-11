import { create } from 'zustand';

export type DeviceBrand = 'Apple' | 'Samsung' | 'Xiaomi' | null;
export type DeviceMode = 'DFU/Recovery/Normal' | 'Download_Mode/ADB' | 'Fastboot/EDL' | null;
export type AppStage = 'idle' | 'scanning' | 'detected' | 'analyzing' | 'downloading' | 'flashing' | 'completed' | 'error';

export interface DeviceInfo {
  brand: DeviceBrand;
  model: string;
  modelCode: string;
  serialNumber: string;
  mode: DeviceMode;
  vendorId: string;
  productId: string;
  storageCapacity: string;
  currentOsVersion: string;
  batteryLevel: number;
  chipset: string;
  baseband: string;
  securityPatch: string;
  display: string;
  region: string;
}

export interface FirmwareInfo {
  version: string;
  buildNumber: string;
  fileSize: string;
  fileHash: string;
  serverUrl: string;
  signedStatus: 'Signed' | 'Unsigned' | 'Verifying';
  region: string;
  releaseDate: string;
}

export interface LogEntry {
  id: string;
  timestamp: Date;
  type: 'info' | 'success' | 'warning' | 'error' | 'system';
  message: string;
  source: string;
}

export interface DownloadProgress {
  totalSize: number;
  downloadedSize: number;
  speed: string;
  threads: number;
  eta: string;
  percentage: number;
  fileName: string;
  integrityVerified: boolean;
}

export interface FlashProgress {
  currentPartition: string;
  totalPartitions: number;
  completedPartitions: number;
  percentage: number;
  currentOperation: string;
  speed: string;
  eta: string;
}

interface FlashingState {
  // App state
  stage: AppStage;
  setStage: (stage: AppStage) => void;

  // Device
  deviceConnected: boolean;
  deviceInfo: DeviceInfo | null;
  setDeviceInfo: (info: DeviceInfo) => void;
  clearDevice: () => void;

  // Firmware
  firmwareInfo: FirmwareInfo | null;
  setFirmwareInfo: (info: FirmwareInfo) => void;

  // Download
  downloadProgress: DownloadProgress | null;
  setDownloadProgress: (progress: DownloadProgress) => void;

  // Flash
  flashProgress: FlashProgress | null;
  setFlashProgress: (progress: FlashProgress) => void;

  // Logs
  logs: LogEntry[];
  addLog: (entry: Omit<LogEntry, 'id' | 'timestamp'>) => void;
  clearLogs: () => void;

  // Selected brand for manual selection
  selectedBrand: DeviceBrand;
  setSelectedBrand: (brand: DeviceBrand) => void;

  // Actions
  reset: () => void;
}

const initialState = {
  stage: 'idle' as AppStage,
  deviceConnected: false,
  deviceInfo: null,
  firmwareInfo: null,
  downloadProgress: null,
  flashProgress: null,
  logs: [] as LogEntry[],
  selectedBrand: null as DeviceBrand,
};

export const useFlashingStore = create<FlashingState>((set, get) => ({
  ...initialState,

  setStage: (stage) => set({ stage }),

  setDeviceInfo: (info) => set({
    deviceInfo: info,
    deviceConnected: true,
    stage: 'detected',
  }),

  clearDevice: () => set({
    deviceInfo: null,
    deviceConnected: false,
    firmwareInfo: null,
    downloadProgress: null,
    flashProgress: null,
    stage: 'idle',
  }),

  setFirmwareInfo: (info) => set({ firmwareInfo: info }),

  setDownloadProgress: (progress) => set({ downloadProgress: progress }),

  setFlashProgress: (progress) => set({ flashProgress: progress }),

  addLog: (entry) => set((state) => ({
    logs: [
      ...state.logs,
      {
        ...entry,
        id: crypto.randomUUID(),
        timestamp: new Date(),
      },
    ],
  })),

  clearLogs: () => set({ logs: [] }),

  setSelectedBrand: (brand) => set({ selectedBrand: brand }),

  reset: () => set({ ...initialState, logs: [] }),
}));