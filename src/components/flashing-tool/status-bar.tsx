'use client';

import { useState, useEffect } from 'react';
import { useFlashingStore } from '@/store/flashing-store';
import { useLanguageStore } from '@/store/language-store';
import { t, isRTL } from '@/lib/i18n';
import { Badge } from '@/components/ui/badge';
import { Activity, Cpu, Wifi, Shield, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export function StatusBar() {
  const { stage, deviceConnected } = useFlashingStore();
  const { lang } = useLanguageStore();
  const rtl = isRTL(lang);
  const [time, setTime] = useState<string | null>(null);

  const stageKey = `status.${stage}` as string;
  const stageColorMap: Record<string, string> = {
    idle: 'text-emerald-400 bg-emerald-500/10',
    scanning: 'text-sky-400 bg-sky-500/10',
    detected: 'text-emerald-400 bg-emerald-500/10',
    analyzing: 'text-purple-400 bg-purple-500/10',
    downloading: 'text-sky-400 bg-sky-500/10',
    flashing: 'text-amber-400 bg-amber-500/10',
    completed: 'text-emerald-400 bg-emerald-500/10',
    error: 'text-red-400 bg-red-500/10',
  };

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      className="flex items-center justify-between px-4 py-1.5 bg-card/80 backdrop-blur-sm border-t border-emerald-500/10 text-[10px] text-muted-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <Activity className="h-3 w-3 text-emerald-400" />
          <Badge variant="outline" className={`text-[10px] h-4 px-1.5 border-current/20 ${stageColorMap[stage] || stageColorMap.idle}`}>
            {t(stageKey, lang)}
          </Badge>
        </div>
        {deviceConnected && (
          <div className="flex items-center gap-1 text-emerald-400">
            <Cpu className="h-3 w-3" />
            <span>{t('status.connected', lang)}</span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <Shield className="h-3 w-3 text-emerald-400/50" />
          <span>{t('status.secure', lang)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Wifi className="h-3 w-3 text-emerald-400/50" />
          <span>{t('status.online', lang)}</span>
        </div>
        <div className="hidden sm:flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>{time ?? '--:--:--'}</span>
        </div>
      </div>
    </motion.div>
  );
}