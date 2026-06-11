'use client';

import { useFlashingStore } from '@/store/flashing-store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { DeviceDetectionPanel } from '@/components/flashing-tool/device-detection-panel';
import { DeviceInfoCard } from '@/components/flashing-tool/device-info-card';
import { FirmwareAnalysisPanel } from '@/components/flashing-tool/firmware-analysis-panel';
import { DownloadManager } from '@/components/flashing-tool/download-manager';
import { TerminalConsole } from '@/components/flashing-tool/terminal-console';
import { StatusBar } from '@/components/flashing-tool/status-bar';
import { Zap, RotateCcw, Github, Shield, Cpu, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const navItems = [
  { icon: Cpu, label: 'Dashboard', active: true },
  { icon: Smartphone, label: 'Devices', active: false },
  { icon: Shield, label: 'Security', active: false },
];

export default function FlashingToolPage() {
  const { stage, deviceConnected, logs, reset, addLog } = useFlashingStore();

  const handleReset = () => {
    reset();
    addLog({ type: 'system', message: 'Application state reset. Ready for new operation.', source: 'System' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#060d0a] text-foreground overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px]" />
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          className="object-cover opacity-[0.06] mix-blend-screen"
          priority
        />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-emerald-500/10 bg-card/60 backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Zap className="h-5 w-5 text-white" />
            </motion.div>
            <div>
              <h1 className="text-base sm:text-lg font-bold tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400">
                  FlashAI Pro
                </span>
              </h1>
              <p className="text-[10px] text-muted-foreground hidden sm:block">
                AI-Powered Multi-OS Mobile Flashing Engine v2.0
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-emerald-400 border-emerald-500/30 text-[10px] hidden sm:flex">
              <Shield className="h-3 w-3 mr-1" />
              End-to-End Encrypted
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs text-muted-foreground hover:text-foreground"
              onClick={handleReset}
            >
              <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
              Reset
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-1 px-4 sm:px-6 pb-2">
          {navItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                  item.active
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Hero Banner */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-xl overflow-hidden border border-emerald-500/10 bg-gradient-to-r from-emerald-950/40 via-card/60 to-teal-950/40 backdrop-blur-sm p-4 sm:p-6"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
                  Smart Mobile Flashing
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
                  AI-powered firmware analysis, multi-threaded download engine, and automated flashing for Apple, Samsung, and Xiaomi devices.
                </p>
                <div className="flex items-center gap-3 mt-3">
                  {['Apple', 'Samsung', 'Xiaomi'].map((brand) => (
                    <div key={brand} className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-[10px] text-muted-foreground">{brand}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 text-[10px]">
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">USB 3.0</Badge>
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">MD5/SHA256</Badge>
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">16 Threads</Badge>
              </div>
            </div>
          </motion.div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left Column - Device Detection & Info */}
            <div className="lg:col-span-5 space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <DeviceDetectionPanel />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <DeviceInfoCard />
              </motion.div>
            </div>

            {/* Right Column - AI Analysis & Download */}
            <div className="lg:col-span-7 space-y-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
              >
                <FirmwareAnalysisPanel />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
              >
                <DownloadManager />
              </motion.div>
            </div>
          </div>

          {/* Terminal Console - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <TerminalConsole />
          </motion.div>
        </div>
      </main>

      {/* Status Bar */}
      <StatusBar />
    </div>
  );
}