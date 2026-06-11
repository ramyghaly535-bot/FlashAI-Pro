'use client';

import { useFlashingStore, type FirmwareInfo } from '@/store/flashing-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Shield, Server, Hash, Globe, Calendar, Loader2, CheckCircle2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function FirmwareAnalysisPanel() {
  const { stage, deviceInfo, firmwareInfo, setFirmwareInfo, setStage, addLog, setDownloadProgress } = useFlashingStore();
  const isAnalyzing = stage === 'analyzing';

  const handleAnalyze = async () => {
    if (!deviceInfo) return;

    setStage('analyzing');
    addLog({ type: 'system', message: `AI Firmware Engine activated for ${deviceInfo.brand} ${deviceInfo.model}`, source: 'AI Engine' });
    addLog({ type: 'info', message: 'Reading device parameters: Model, Region, Security Version...', source: 'AI Engine' });

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brand: deviceInfo.brand, model: deviceInfo.model }),
      });
      const data = await res.json();

      setFirmwareInfo(data.firmware);
      setStage('idle');

      addLog({ type: 'success', message: `AI Analysis Complete: Recommended firmware ${data.firmware.version} (${data.firmware.buildNumber})`, source: 'AI Engine' });
      addLog({ type: 'info', message: `Server: ${data.firmware.serverUrl.substring(0, 60)}...`, source: 'AI Engine' });
      addLog({ type: 'info', message: `Signed Status: ${data.firmware.signedStatus} | Region: ${data.firmware.region}`, source: 'AI Engine' });
      addLog({ type: 'success', message: `File Size: ${data.firmware.fileSize} | Hash: ${data.firmware.fileHash.substring(0, 16)}...`, source: 'AI Engine' });
      addLog({ type: 'info', message: `AI Confidence: ${data.analysis.confidence}% - ${data.analysis.reason}`, source: 'AI Engine' });
    } catch {
      addLog({ type: 'error', message: 'Failed to analyze firmware. Please check network connection.', source: 'AI Engine' });
      setStage('idle');
    }
  };

  const handleDownload = () => {
    if (!firmwareInfo) return;
    setStage('downloading');
    addLog({ type: 'system', message: 'Initializing Ultra-Fast Download Manager...', source: 'Download Engine' });
    addLog({ type: 'info', message: `Starting multi-threaded download (16 threads) from ${firmwareInfo.serverUrl.substring(0, 50)}...`, source: 'Download Engine' });

    setDownloadProgress({
      totalSize: 5000000000,
      downloadedSize: 0,
      speed: '0 MB/s',
      threads: 16,
      eta: 'Calculating...',
      percentage: 0,
      fileName: firmwareInfo.serverUrl.split('/').pop() || 'firmware.bin',
      integrityVerified: false,
    });
  };

  return (
    <Card className="border-emerald-500/20 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <Brain className="h-4 w-4 text-emerald-400" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300">
              AI Firmware Analysis
            </span>
          </CardTitle>
          {firmwareInfo && (
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[10px]">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Analysis Complete
            </Badge>
          )}
          {isAnalyzing && (
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-[10px]">
              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
              AI Processing
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!deviceInfo && (
          <div className="flex flex-col items-center justify-center py-6 text-muted-foreground/50">
            <Brain className="h-8 w-8 mb-2" />
            <p className="text-xs">Connect a device first</p>
          </div>
        )}

        {deviceInfo && !firmwareInfo && !isAnalyzing && (
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
              <div className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-foreground/80">
                    AI will analyze your <span className="text-emerald-400 font-semibold">{deviceInfo.brand} {deviceInfo.model}</span> and fetch the latest official signed firmware from {deviceInfo.brand} servers.
                  </p>
                </div>
              </div>
            </div>
            <Button
              onClick={handleAnalyze}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-300"
            >
              <Brain className="h-4 w-4 mr-2" />
              Analyze &amp; Fetch Official Firmware
            </Button>
          </div>
        )}

        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3 py-6"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-14 h-14 rounded-full border-2 border-emerald-500/20 border-t-purple-400 border-r-emerald-400 flex items-center justify-center"
                >
                  <Brain className="h-6 w-6 text-emerald-400" />
                </motion.div>
              </div>
              <div className="text-center">
                <p className="text-xs text-emerald-400/80 font-mono animate-pulse">AI is analyzing device parameters...</p>
                <p className="text-[10px] text-muted-foreground/60 mt-1">Contacting {deviceInfo?.brand} servers</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {firmwareInfo && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <div className="grid grid-cols-2 gap-2">
                <FirmwareStat icon={Shield} label="Version" value={firmwareInfo.version} />
                <FirmwareStat icon={Hash} label="Build" value={firmwareInfo.buildNumber} />
                <FirmwareStat icon={Server} label="Region" value={firmwareInfo.region} />
                <FirmwareStat icon={Calendar} label="Released" value={firmwareInfo.releaseDate} />
                <FirmwareStat icon={Globe} label="Size" value={firmwareInfo.fileSize} />
                <FirmwareStat
                  icon={Shield}
                  label="Signed"
                  value={firmwareInfo.signedStatus}
                  valueClass={firmwareInfo.signedStatus === 'Signed' ? 'text-emerald-400' : 'text-amber-400'}
                />
              </div>
              <div className="p-2 rounded-md bg-muted/30 border border-border/50">
                <p className="text-[10px] text-muted-foreground font-mono truncate">{firmwareInfo.fileHash}</p>
              </div>
              {stage !== 'downloading' && stage !== 'flashing' && stage !== 'completed' && (
                <Button
                  onClick={handleDownload}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300"
                >
                  <Server className="h-4 w-4 mr-2" />
                  Download &amp; Flash Firmware
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

function FirmwareStat({
  icon: Icon,
  label,
  value,
  valueClass = 'text-foreground',
}: {
  icon: typeof Shield;
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="p-2.5 rounded-lg bg-muted/20 border border-border/30">
      <div className="flex items-center gap-1 mb-0.5">
        <Icon className="h-3 w-3 text-muted-foreground/50" />
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground/70">{label}</span>
      </div>
      <p className={`text-xs font-medium ${valueClass} truncate`} title={value}>{value}</p>
    </div>
  );
}