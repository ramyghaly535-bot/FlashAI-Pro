'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useFlashingStore } from '@/store/flashing-store';
import { useLanguageStore } from '@/store/language-store';
import { t, isRTL } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Download, CheckCircle2, Shield, Gauge, Layers, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function DownloadManager() {
  const { stage, downloadProgress, setDownloadProgress, setStage, addLog, setFlashProgress, flashProgress, firmwareInfo, deviceInfo } = useFlashingStore();
  const { lang } = useLanguageStore();
  const rtl = isRTL(lang);
  const isDownloading = stage === 'downloading';
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startFlashSimulation = useCallback(() => {
    if (!deviceInfo) return;
    setStage('flashing');
    addLog({ type: 'system', message: 'Automated Flashing Engine initialized', source: 'Flash Engine' });
    addLog({ type: 'warning', message: 'WARNING: Flashing procedure started. Do NOT disconnect the device!', source: 'Flash Engine' });

    const brand = deviceInfo.brand;
    const partitions = brand === 'Apple'
      ? ['iBSS', 'iBEC', 'DeviceTree', 'KernelCache', 'System', 'SEP', 'Baseband', 'ANID']
      : brand === 'Samsung'
      ? ['BL', 'AP', 'CP', 'CSC', 'HOME_CSC', 'USERDATA', 'BOOT', 'RECOVERY']
      : ['xbl', 'abl', 'boot', 'dtbo', 'system', 'vendor', 'product', 'odm', 'userdata'];

    const total = partitions.length;
    let progress = 0;

    setFlashProgress({
      currentPartition: partitions[0],
      totalPartitions: total,
      completedPartitions: 0,
      percentage: 0,
      currentOperation: 'Preparing flashing engine...',
      speed: '0 MB/s',
      eta: 'Calculating...',
    });

    const flashInterval = setInterval(() => {
      progress += 0.8 + Math.random() * 1.2;
      if (progress >= 100) progress = 100;

      const currentIndex = Math.min(Math.floor((progress / 100) * total), total - 1);
      const completed = Math.min(currentIndex, total);

      const operations = [
        'Verifying integrity',
        'Writing partition data',
        'Applying cryptographic signatures',
        'Flashing partition',
        'Verifying hash',
      ];

      setFlashProgress({
        currentPartition: partitions[Math.min(currentIndex, total - 1)],
        totalPartitions: total,
        completedPartitions: completed,
        percentage: Math.min(progress, 100),
        currentOperation: progress >= 100 ? 'Finalizing and rebooting...' : operations[Math.floor(Math.random() * operations.length)],
        speed: progress >= 100 ? '---' : `${(25 + Math.random() * 75).toFixed(1)} MB/s`,
        eta: progress >= 100 ? 'Rebooting...' : `${Math.ceil((100 - progress) * 0.3)}s`,
      });

      if (progress >= 100) {
        clearInterval(flashInterval);
        setTimeout(() => {
          addLog({ type: 'success', message: '[SUCCESS] Firmware installed successfully. Device is rebooting to factory state.', source: 'Flash Engine' });
          setStage('completed');
        }, 1500);
      }
    }, 400);
  }, [deviceInfo, setStage, addLog, setFlashProgress]);

  useEffect(() => {
    if (!isDownloading || !downloadProgress) return;

    let progress = downloadProgress.percentage;

    intervalRef.current = setInterval(() => {
      progress += 0.3 + Math.random() * 0.7;
      if (progress >= 100) progress = 100;

      const total = downloadProgress.totalSize;
      const downloaded = (progress / 100) * total;
      const speed = (40 + Math.random() * 120).toFixed(1);
      const remaining = ((total - downloaded) / (parseFloat(speed) * 1024 * 1024));

      let etaStr = 'Completing...';
      if (progress < 99.9) {
        if (remaining < 60) etaStr = `${Math.ceil(remaining)}s`;
        else if (remaining < 3600) etaStr = `${Math.floor(remaining / 60)}m ${Math.ceil(remaining % 60)}s`;
        else etaStr = `${Math.floor(remaining / 3600)}h ${Math.floor((remaining % 3600) / 60)}m`;
      }

      setDownloadProgress({
        ...downloadProgress,
        downloadedSize: Math.floor(downloaded),
        percentage: progress,
        speed: `${speed} MB/s`,
        eta: etaStr,
        integrityVerified: progress >= 99.9,
      });

      if (progress >= 100) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        addLog({ type: 'success', message: 'Download complete! Verifying file integrity (MD5/SHA256)...', source: 'Download Engine' });
        addLog({ type: 'success', message: 'Integrity verified: Hash matches manufacturer signature. File is 100% safe.', source: 'Download Engine' });

        setTimeout(() => {
          startFlashSimulation();
        }, 1500);
      }
    }, 200);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isDownloading, downloadProgress, setDownloadProgress, addLog, startFlashSimulation]);

  const formatBytes = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  const isFlashing = stage === 'flashing' || stage === 'completed';

  return (
    <Card className="border-emerald-500/20 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            {isFlashing ? (
              <>
                <Gauge className="h-4 w-4 text-amber-400" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-300">
                  {t('download.flash_title', lang)}
                </span>
              </>
            ) : (
              <>
                <Download className="h-4 w-4 text-emerald-400" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300">
                  {t('download.title', lang)}
                </span>
              </>
            )}
          </CardTitle>
          {stage === 'completed' && (
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[10px]">
              <CheckCircle2 className={`h-3 w-3 ${rtl ? 'ml-1' : 'mr-1'}`} />
              {t('download.completed_badge', lang)}
            </Badge>
          )}
          {isDownloading && (
            <Badge className="bg-sky-500/20 text-sky-400 border-sky-500/30 text-[10px]">
              <Download className={`h-3 w-3 ${rtl ? 'ml-1' : 'mr-1'} animate-bounce`} />
              {t('download.downloading_badge', lang)}
            </Badge>
          )}
          {isFlashing && stage !== 'completed' && (
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-[10px]">
              <Gauge className={`h-3 w-3 ${rtl ? 'ml-1' : 'mr-1'} animate-pulse`} />
              {t('download.flash_badge', lang)}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isDownloading && !isFlashing && !downloadProgress && (
          <div className="flex flex-col items-center justify-center py-6 text-muted-foreground/50">
            <Download className="h-8 w-8 mb-2" />
            <p className="text-xs">{t('download.awaiting', lang)}</p>
          </div>
        )}

        <AnimatePresence mode="wait">
          {isDownloading && downloadProgress && (
            <motion.div
              key="download"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="p-2.5 rounded-lg bg-sky-500/5 border border-sky-500/20">
                <p className="text-xs font-mono text-sky-400/80 truncate">{downloadProgress.fileName}</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">{t('download.progress', lang)}</span>
                  <span className="text-xs font-mono text-emerald-400">{downloadProgress.percentage.toFixed(1)}%</span>
                </div>
                <Progress
                  value={downloadProgress.percentage}
                  className="h-2 bg-muted/50 [&>div]:bg-gradient-to-r [&>div]:from-emerald-500 [&>div]:to-teal-400"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                  <span>{formatBytes(downloadProgress.downloadedSize)} / {formatBytes(downloadProgress.totalSize)}</span>
                  <span>{downloadProgress.eta}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="p-2 rounded-lg bg-muted/20 text-center">
                  <Gauge className="h-3 w-3 mx-auto mb-1 text-emerald-400" />
                  <p className="text-xs font-mono text-foreground">{downloadProgress.speed}</p>
                  <p className="text-[10px] text-muted-foreground">{t('download.speed', lang)}</p>
                </div>
                <div className="p-2 rounded-lg bg-muted/20 text-center">
                  <Layers className="h-3 w-3 mx-auto mb-1 text-emerald-400" />
                  <p className="text-xs font-mono text-foreground">{downloadProgress.threads}</p>
                  <p className="text-[10px] text-muted-foreground">{t('download.threads', lang)}</p>
                </div>
                <div className="p-2 rounded-lg bg-muted/20 text-center">
                  <Shield className="h-3 w-3 mx-auto mb-1 text-emerald-400" />
                  <p className="text-xs font-mono text-foreground">{downloadProgress.integrityVerified ? t('download.verified', lang) : t('download.pending', lang)}</p>
                  <p className="text-[10px] text-muted-foreground">{t('download.integrity', lang)}</p>
                </div>
              </div>
            </motion.div>
          )}

          {isFlashing && flashProgress && (
            <motion.div
              key="flash"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">{t('download.flash_progress', lang)}</span>
                  <span className="text-xs font-mono text-amber-400">{flashProgress.percentage.toFixed(1)}%</span>
                </div>
                <Progress
                  value={flashProgress.percentage}
                  className="h-2 bg-muted/50 [&>div]:bg-gradient-to-r [&>div]:from-amber-500 [&>div]:to-orange-400"
                />
              </div>

              <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
                <p className="text-[10px] uppercase tracking-wider text-amber-400/70 mb-1">{t('download.current_partition', lang)}</p>
                <p className="text-sm font-mono font-bold text-foreground">{flashProgress.currentPartition}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{flashProgress.currentOperation}</p>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px]">
                  <span className="text-muted-foreground">{t('download.partitions', lang)}</span>
                  <span className="text-amber-400 font-mono">{flashProgress.completedPartitions}/{flashProgress.totalPartitions}</span>
                </div>
                <div className="flex gap-1 flex-wrap">
                  {Array.from({ length: flashProgress.totalPartitions }, (_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                        i < flashProgress.completedPartitions
                          ? 'bg-amber-400'
                          : i === flashProgress.completedPartitions
                          ? 'bg-amber-400/50 animate-pulse'
                          : 'bg-muted/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded-lg bg-muted/20 text-center">
                  <Gauge className="h-3 w-3 mx-auto mb-1 text-amber-400" />
                  <p className="text-xs font-mono text-foreground">{flashProgress.speed}</p>
                  <p className="text-[10px] text-muted-foreground">{t('download.speed', lang)}</p>
                </div>
                <div className="p-2 rounded-lg bg-muted/20 text-center">
                  <Clock className="h-3 w-3 mx-auto mb-1 text-amber-400" />
                  <p className="text-xs font-mono text-foreground">{flashProgress.eta}</p>
                  <p className="text-[10px] text-muted-foreground">{t('download.eta', lang)}</p>
                </div>
              </div>
            </motion.div>
          )}

          {stage === 'completed' && (
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3 py-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center"
              >
                <CheckCircle2 className="h-8 w-8 text-emerald-400" />
              </motion.div>
              <div className="text-center">
                <p className="text-sm font-semibold text-emerald-400">{t('download.flash_success', lang)}</p>
                <p className="text-xs text-muted-foreground mt-1">{t('download.rebooting_msg', lang)}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}