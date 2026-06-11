'use client';

import { useEffect, useRef } from 'react';
import { useFlashingStore, type LogEntry } from '@/store/flashing-store';
import { useLanguageStore } from '@/store/language-store';
import { t, isRTL } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Terminal, Trash2, CheckCircle2, AlertTriangle, Info, XCircle, Server } from 'lucide-react';

const logTypeStyles: Record<LogEntry['type'], { color: string; icon: typeof Info; prefix: string }> = {
  info: { color: 'text-sky-400', icon: Info, prefix: 'INFO' },
  success: { color: 'text-emerald-400', icon: CheckCircle2, prefix: ' OK ' },
  warning: { color: 'text-amber-400', icon: AlertTriangle, prefix: 'WARN' },
  error: { color: 'text-red-400', icon: XCircle, prefix: ' ERR' },
  system: { color: 'text-purple-400', icon: Server, prefix: 'SYS ' },
};

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) +
    '.' + String(date.getMilliseconds()).padStart(3, '0');
}

export function TerminalConsole() {
  const { logs, clearLogs } = useFlashingStore();
  const { lang } = useLanguageStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const el = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    }
  }, [logs]);

  return (
    <Card className="border-emerald-500/20 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <Terminal className="h-4 w-4 text-emerald-400" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300">
              {lang === 'ar' ? 'وحدة التحكم' : 'System Console'}
            </span>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-muted-foreground text-[10px] font-mono">
              {logs.length} {lang === 'ar' ? 'سجل' : 'entries'}
            </Badge>
            {logs.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                onClick={clearLogs}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div ref={scrollRef}>
          <ScrollArea className="h-[200px] sm:h-[240px]">
            {logs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-muted-foreground/30">
                <Terminal className="h-8 w-8 mb-2" />
                <p className="text-xs">{lang === 'ar' ? 'ستظهر المخرجات هنا' : 'Console output will appear here'}</p>
                <p className="text-[10px] mt-1">{lang === 'ar' ? 'ابدأ الفحص لرؤية السجلات' : 'Start scanning to see real-time logs'}</p>
              </div>
            ) : (
              <div className="p-3 space-y-0.5 font-mono text-[11px] leading-relaxed" dir="ltr">
                {logs.map((log) => {
                  const style = logTypeStyles[log.type];
                  const Icon = style.icon;
                  return (
                    <div key={log.id} className="flex items-start gap-2 py-0.5 hover:bg-muted/20 rounded px-1 -mx-1 transition-colors">
                      <span className="text-muted-foreground/40 shrink-0">{formatTime(log.timestamp)}</span>
                      <span className={`shrink-0 font-bold ${style.color}`}>[{style.prefix}]</span>
                      <Icon className={`h-3 w-3 shrink-0 mt-0.5 ${style.color}`} />
                      <span className="text-foreground/70 break-all">{log.message}</span>
                      <span className="shrink-0 text-muted-foreground/30 text-[10px] ml-auto whitespace-nowrap">{log.source}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}