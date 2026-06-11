'use client';

import { useFlashingStore } from '@/store/flashing-store';
import { Badge } from '@/components/ui/badge';
import { Activity, Cpu, Wifi, Shield, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const stageLabels: Record<string, { label: string; color: string }> = {
  idle: { label: 'Ready', color: 'text-emerald-400 bg-emerald-500/10' },
  scanning: { label: 'Scanning USB', color: 'text-sky-400 bg-sky-500/10' },
  detected: { label: 'Device Detected', color: 'text-emerald-400 bg-emerald-500/10' },
  analyzing: { label: 'AI Analyzing', color: 'text-purple-400 bg-purple-500/10' },
  downloading: { label: 'Downloading', color: 'text-sky-400 bg-sky-500/10' },
  flashing: { label: 'Flashing', color: 'text-amber-400 bg-amber-500/10' },
  completed: { label: 'Completed', color: 'text-emerald-400 bg-emerald-500/10' },
  error: { label: 'Error', color: 'text-red-400 bg-red-500/10' },
};

export function StatusBar() {
  const { stage, deviceConnected, logs } = useFlashingStore();
  const stageInfo = stageLabels[stage] || stageLabels.idle;
  const now = new Date();

  return (
    <motion.div
      className="flex items-center justify-between px-4 py-1.5 bg-card/80 backdrop-blur-sm border-t border-emerald-500/10 text-[10px] text-muted-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <Activity className="h-3 w-3 text-emerald-400" />
          <Badge variant="outline" className={`text-[10px] h-4 px-1.5 border-current/20 ${stageInfo.color}`}>
            {stageInfo.label}
          </Badge>
        </div>
        {deviceConnected && (
          <div className="flex items-center gap-1 text-emerald-400">
            <Cpu className="h-3 w-3" />
            <span>Device Connected</span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <Shield className="h-3 w-3 text-emerald-400/50" />
          <span>Secure Channel</span>
        </div>
        <div className="flex items-center gap-1">
          <Wifi className="h-3 w-3 text-emerald-400/50" />
          <span>Online</span>
        </div>
        <div className="hidden sm:flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>{now.toLocaleTimeString('en-US', { hour12: false })}</span>
        </div>
      </div>
    </motion.div>
  );
}