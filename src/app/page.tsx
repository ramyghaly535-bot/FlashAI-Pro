'use client';

import { useFlashingStore } from '@/store/flashing-store';
import { useLanguageStore } from '@/store/language-store';
import { t, isRTL } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DeviceDetectionPanel } from '@/components/flashing-tool/device-detection-panel';
import { DeviceInfoCard } from '@/components/flashing-tool/device-info-card';
import { FirmwareAnalysisPanel } from '@/components/flashing-tool/firmware-analysis-panel';
import { DownloadManager } from '@/components/flashing-tool/download-manager';
import { TerminalConsole } from '@/components/flashing-tool/terminal-console';
import { StatusBar } from '@/components/flashing-tool/status-bar';
import { Zap, RotateCcw, Shield, Cpu, Smartphone, Languages } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function FlashingToolPage() {
  const { stage, reset, addLog } = useFlashingStore();
  const { lang, toggleLang } = useLanguageStore();
  const rtl = isRTL(lang);

  const navItems = [
    { icon: Cpu, labelKey: 'nav.dashboard' },
    { icon: Smartphone, labelKey: 'nav.devices' },
    { icon: Shield, labelKey: 'nav.security' },
  ];

  const handleReset = () => {
    reset();
    addLog({ type: 'system', message: 'Application state reset. Ready for new operation.', source: 'System' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#060d0a] text-foreground overflow-hidden" dir={rtl ? 'rtl' : 'ltr'}>
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
                  {t('app.name', lang)}
                </span>
              </h1>
              <p className="text-[10px] text-muted-foreground hidden sm:block">
                {t('app.subtitle', lang)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-emerald-400 border-emerald-500/30 text-[10px] hidden sm:flex">
              <Shield className={`h-3 w-3 ${rtl ? 'ml-1' : 'mr-1'}`} />
              {t('header.encrypted', lang)}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground border border-border/50 hover:border-emerald-500/30"
              onClick={toggleLang}
            >
              <Languages className="h-3.5 w-3.5" />
              {lang === 'ar' ? 'EN' : 'عربي'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs text-muted-foreground hover:text-foreground"
              onClick={handleReset}
            >
              <RotateCcw className={`h-3.5 w-3.5 ${rtl ? 'ml-1.5' : 'mr-1.5'}`} />
              {t('header.reset', lang)}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-1 px-4 sm:px-6 pb-2">
          {navItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <button
                key={item.labelKey}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                  i === 0
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{t(item.labelKey, lang)}</span>
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
                  {t('hero.title', lang)}
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
                  {t('hero.desc', lang)}
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
            {/* Left Column */}
            <div className="lg:col-span-5 space-y-4">
              <motion.div
                initial={{ opacity: 0, x: rtl ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <DeviceDetectionPanel />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: rtl ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <DeviceInfoCard />
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-7 space-y-4">
              <motion.div
                initial={{ opacity: 0, x: rtl ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
              >
                <FirmwareAnalysisPanel />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: rtl ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
              >
                <DownloadManager />
              </motion.div>
            </div>
          </div>

          {/* Terminal Console */}
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