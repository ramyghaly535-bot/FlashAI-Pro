'use client';

import { useFlashingStore } from '@/store/flashing-store';
import { useLanguageStore } from '@/store/language-store';
import { t, isRTL } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Smartphone, Monitor, Cpu, HardDrive, Wifi, Battery, Fingerprint, Hash } from 'lucide-react';
import { motion } from 'framer-motion';

const brandIcons: Record<string, { icon: typeof Smartphone; gradient: string }> = {
  Apple: { icon: Smartphone, gradient: 'from-gray-400 to-gray-600' },
  Samsung: { icon: Monitor, gradient: 'from-blue-400 to-blue-600' },
  Xiaomi: { icon: Smartphone, gradient: 'from-orange-400 to-orange-600' },
};

export function DeviceInfoCard() {
  const { deviceInfo } = useFlashingStore();
  const { lang } = useLanguageStore();

  if (!deviceInfo) {
    return (
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <Cpu className="h-4 w-4" />
            {t('device.title', lang)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground/50">
            <Smartphone className="h-10 w-10 mb-2" />
            <p className="text-xs">{t('device.no_device', lang)}</p>
            <p className="text-[10px] mt-1">{t('device.no_device_hint', lang)}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const brandStyle = brandIcons[deviceInfo.brand] || brandIcons.Apple;
  const BrandIcon = brandStyle.icon;

  const infoItems = [
    { label: t('device.brand', lang), value: deviceInfo.brand, icon: BrandIcon },
    { label: t('device.model', lang), value: deviceInfo.model, icon: Smartphone },
    { label: t('device.serial', lang), value: deviceInfo.serialNumber, icon: Hash },
    { label: t('device.vendor_id', lang), value: deviceInfo.vendorId, icon: Cpu },
    { label: t('device.product_id', lang), value: deviceInfo.productId, icon: Cpu },
    { label: t('device.storage', lang), value: deviceInfo.storageCapacity, icon: HardDrive },
    { label: t('device.os_version', lang), value: deviceInfo.currentOsVersion, icon: Wifi },
    { label: t('device.connection_mode', lang), value: deviceInfo.mode, icon: Fingerprint },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="border-emerald-500/20 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <Cpu className="h-4 w-4 text-emerald-400" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300">
                {t('device.title', lang)}
              </span>
            </CardTitle>
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[10px]">
              {t('device.identified', lang)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-0 p-0">
          <div className="p-4 pb-3 flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${brandStyle.gradient} flex items-center justify-center shadow-lg`}>
              <BrandIcon className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-foreground truncate">{deviceInfo.model}</h3>
              <p className="text-xs text-muted-foreground">{deviceInfo.brand} • {deviceInfo.storageCapacity}</p>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <Battery className={`h-4 w-4 ${deviceInfo.batteryLevel > 20 ? 'text-emerald-400' : 'text-destructive'}`} />
              <span className="text-[10px] text-muted-foreground">{deviceInfo.batteryLevel}%</span>
            </div>
          </div>

          <Separator className="bg-emerald-500/10" />

          <div className="p-4 grid grid-cols-2 gap-x-4 gap-y-3">
            {infoItems.map((item, index) => {
              const ItemIcon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="space-y-0.5"
                >
                  <div className="flex items-center gap-1.5">
                    <ItemIcon className="h-3 w-3 text-muted-foreground/50" />
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-medium">{item.label}</span>
                  </div>
                  <p className="text-xs font-mono text-foreground/90 truncate" title={item.value}>{item.value}</p>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}