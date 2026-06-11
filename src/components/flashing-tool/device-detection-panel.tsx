'use client';

import { useFlashingStore } from '@/store/flashing-store';
import { useLanguageStore } from '@/store/language-store';
import { t, isRTL } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Usb, Radio, Zap, Loader2, Cable, Smartphone, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function DeviceDetectionPanel() {
  const { stage, deviceConnected, deviceInfo, selectedBrand, setSelectedBrand, setStage, setDeviceInfo, addLog, clearDevice } = useFlashingStore();
  const { lang } = useLanguageStore();
  const rtl = isRTL(lang);
  const isScanning = stage === 'scanning';

  const handleStartScan = async () => {
    if (isScanning || deviceConnected) return;

    setStage('scanning');
    addLog({ type: 'system', message: 'Initializing USB listener subsystem...', source: 'USB Monitor' });
    addLog({ type: 'info', message: 'Scanning USB bus 001 for supported Vendor IDs: 0x05AC, 0x04E8, 0x2717...', source: 'USB Monitor' });

    try {
      const res = await fetch('/api/detect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brand: selectedBrand }),
      });
      const data = await res.json();

      if (data.detected) {
        // Log multi-step detection from the API
        if (data.detectionSteps) {
          for (const step of data.detectionSteps) {
            addLog({ type: 'info', message: `[${step.step}] ${step.detail}`, source: 'USB Monitor' });
          }
        }
        setDeviceInfo(data.deviceInfo);
        addLog({ type: 'success', message: `AI Classification: ${data.deviceInfo.brand} — ${data.deviceInfo.model} (${data.deviceInfo.modelCode})`, source: 'AI Engine' });
        addLog({ type: 'info', message: `Chipset: ${data.deviceInfo.chipset} | Baseband: ${data.deviceInfo.baseband}`, source: 'Hardware Probe' });
        addLog({ type: 'info', message: `Display: ${data.deviceInfo.display} | Storage: ${data.deviceInfo.storageCapacity}`, source: 'Hardware Probe' });
        addLog({ type: 'info', message: `Security Patch: ${data.deviceInfo.securityPatch} | Region: ${data.deviceInfo.region}`, source: 'Security Check' });
        addLog({ type: 'info', message: `Mode: ${data.deviceInfo.mode} | Battery: ${data.deviceInfo.batteryLevel}%`, source: 'Device Info' });
      }
    } catch {
      addLog({ type: 'error', message: 'Failed to scan USB devices. Please check connection and try again.', source: 'USB Monitor' });
      setStage('idle');
    }
  };

  const brandOptions: Array<{ name: 'Apple' | 'Samsung' | 'Xiaomi'; icon: typeof Smartphone; color: string; vid: string }> = [
    { name: 'Apple', icon: Smartphone, color: 'text-gray-400', vid: '0x05AC' },
    { name: 'Samsung', icon: Monitor, color: 'text-blue-400', vid: '0x04E8' },
    { name: 'Xiaomi', icon: Smartphone, color: 'text-orange-400', vid: '0x2717' },
  ];

  return (
    <Card className="border-emerald-500/20 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm overflow-hidden relative">
      {isScanning && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent z-0"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      )}
      <CardHeader className="pb-3 relative z-10">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <Usb className="h-4 w-4 text-emerald-400" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300">
              {t('usb.title', lang)}
            </span>
          </CardTitle>
          <div className="flex items-center gap-2">
            {deviceConnected && (
              <Badge variant="default" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                <Radio className={`h-3 w-3 ${rtl ? 'ml-1' : 'mr-1'} animate-pulse`} />
                {t('usb.connected', lang)}
              </Badge>
            )}
            {isScanning && (
              <Badge variant="secondary" className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">
                <Loader2 className={`h-3 w-3 ${rtl ? 'ml-1' : 'mr-1'} animate-spin`} />
                {t('usb.scanning_badge', lang)}
              </Badge>
            )}
            {!deviceConnected && !isScanning && (
              <Badge variant="outline" className="text-muted-foreground text-xs">
                <Cable className={`h-3 w-3 ${rtl ? 'ml-1' : 'mr-1'}`} />
                {t('usb.waiting', lang)}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative z-10 space-y-4">
        {!deviceConnected && !isScanning && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">{t('usb.select_brand', lang)}</p>
            <div className="flex gap-2">
              {brandOptions.map((brand) => {
                const Icon = brand.icon;
                return (
                  <button
                    key={brand.name}
                    onClick={() => setSelectedBrand(selectedBrand === brand.name ? null : brand.name)}
                    className={`flex-1 flex flex-col items-center gap-1.5 p-2.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                      selectedBrand === brand.name
                        ? 'border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                        : 'border-border/50 bg-muted/30 hover:border-emerald-500/30 hover:bg-emerald-500/5'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${selectedBrand === brand.name ? 'text-emerald-400' : brand.color}`} />
                    <span className={`text-xs font-medium ${selectedBrand === brand.name ? 'text-emerald-400' : 'text-muted-foreground'}`}>
                      {brand.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground/60 font-mono">{brand.vid}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <AnimatePresence>
          {isScanning && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center gap-3 py-4"
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-2 border-emerald-500/20 flex items-center justify-center">
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-transparent border-t-emerald-400"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                  <Zap className="h-6 w-6 text-emerald-400" />
                </div>
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border border-emerald-500/30"
                    animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                  />
                ))}
              </div>
              <p className="text-xs text-emerald-400/80 font-mono animate-pulse">
                {t('usb.scanning_msg', lang)}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {deviceConnected && deviceInfo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                <div className="w-8 h-8 rounded-md bg-emerald-500/20 flex items-center justify-center">
                  <Smartphone className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{deviceInfo.model}</p>
                  <p className="text-xs text-muted-foreground">{deviceInfo.brand} • {deviceInfo.mode}</p>
                </div>
                <Badge variant="outline" className="text-emerald-400 border-emerald-500/30 text-[10px]">
                  {deviceInfo.batteryLevel}%
                </Badge>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={() => {
                  clearDevice();
                  addLog({ type: 'warning', message: 'Device disconnected by user.', source: 'System' });
                }}
              >
                {t('usb.disconnect', lang)}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {!deviceConnected && !isScanning && (
          <Button
            onClick={handleStartScan}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-300"
          >
            <Usb className={`h-4 w-4 ${rtl ? 'ml-2' : 'mr-2'}`} />
            {selectedBrand ? t('usb.scan_brand', lang, { brand: selectedBrand }) : t('usb.auto_detect', lang)}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}