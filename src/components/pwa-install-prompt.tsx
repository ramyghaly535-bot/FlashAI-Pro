'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLanguageStore } from '@/store/language-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, Smartphone, Monitor, ArrowDownToLine, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

function getInitialState() {
  if (typeof window === 'undefined') return { isInstalled: false, isDismissed: false };
  const isInstalled = window.matchMedia('(display-mode: standalone)').matches
    || (window.navigator as unknown as { standalone?: boolean }).standalone === true;
  const wasDismissed = localStorage.getItem('flashai-install-dismissed');
  const dismissTime = wasDismissed ? parseInt(wasDismissed, 10) : 0;
  const oneDayMs = 24 * 60 * 60 * 1000;
  const isDismissed = !isInstalled && Date.now() - dismissTime < oneDayMs;
  return { isInstalled, isDismissed };
}

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [installed, setInstalled] = useState(getInitialState().isInstalled);
  const [dismissed, setDismissed] = useState(getInitialState().isDismissed);
  const { lang } = useLanguageStore();

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      if (!dismissed) {
        setTimeout(() => setShowBanner(true), 2500);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    const appInstalledHandler = () => {
      setInstalled(true);
      setShowBanner(false);
      setDeferredPrompt(null);
      localStorage.removeItem('flashai-install-dismissed');
    };
    window.addEventListener('appinstalled', appInstalledHandler);

    // If no prompt fires after 5s, show manual instructions
    const timer = setTimeout(() => {
      if (!deferredPrompt && !dismissed && !installed) {
        setShowBanner(true);
      }
    }, 5000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', appInstalledHandler);
      clearTimeout(timer);
    };
  }, [deferredPrompt, dismissed, installed]);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstalled(true);
    }
    setShowBanner(false);
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    setDismissed(true);
    localStorage.setItem('flashai-install-dismissed', Date.now().toString());
  };

  if (installed) return null;

  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const canAutoInstall = !!deferredPrompt;

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-20 left-3 right-3 sm:left-auto sm:right-4 sm:w-[360px] z-50"
        >
          <Card className="border-emerald-500/30 bg-card/95 backdrop-blur-xl shadow-[0_0_40px_rgba(16,185,129,0.15)]">
            <CardContent className="p-4 space-y-3">
              <button
                onClick={handleDismiss}
                className="absolute top-2.5 right-2.5 text-muted-foreground hover:text-foreground p-1 cursor-pointer transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-start gap-3 pr-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)] shrink-0 overflow-hidden">
                  {isMobile ? (
                    <Smartphone className="h-6 w-6 text-white" />
                  ) : (
                    <Monitor className="h-6 w-6 text-white" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-foreground">
                    {lang === 'ar' ? '📱 ثبّت FlashAI Pro على جهازك' : '📱 Install FlashAI Pro'}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                    {lang === 'ar'
                      ? 'تطبيق مستقل بأيقونة خاصة — يعمل بدون متصفح'
                      : 'Standalone app with its own icon — no browser needed'}
                  </p>
                </div>
              </div>

              {canAutoInstall ? (
                <Button
                  onClick={handleInstall}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-sm h-10 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] gap-2"
                >
                  <ArrowDownToLine className="h-4 w-4" />
                  {lang === 'ar' ? 'تثبيت التطبيق الآن' : 'Install App Now'}
                </Button>
              ) : (
                <div className="rounded-lg bg-muted/50 p-3 space-y-2">
                  <p className="text-[11px] text-muted-foreground font-medium">
                    {isIOS
                      ? (lang === 'ar' ? '📱 طريقة التثبيت على iOS:' : '📱 How to install on iOS:')
                      : (lang === 'ar' ? '💻 طريقة التثبيت:' : '💻 How to install:')
                    }
                  </p>
                  <div className="space-y-1.5">
                    {isIOS ? (
                      <>
                        <p className="text-[11px] text-foreground/80 flex items-start gap-2">
                          <span className="text-emerald-400 font-bold shrink-0">1.</span>
                          {lang === 'ar'
                            ? 'اضغط على زر المشاركة في أسفل الشاشة'
                            : 'Tap the Share button at the bottom'}
                        </p>
                        <p className="text-[11px] text-foreground/80 flex items-start gap-2">
                          <span className="text-emerald-400 font-bold shrink-0">2.</span>
                          {lang === 'ar'
                            ? 'اختر "إضافة إلى الشاشة الرئيسية"'
                            : 'Select "Add to Home Screen"'}
                        </p>
                        <p className="text-[11px] text-foreground/80 flex items-start gap-2">
                          <span className="text-emerald-400 font-bold shrink-0">3.</span>
                          {lang === 'ar'
                            ? 'اضغط "إضافة" — سيظهر التطبيق بأيقونته المستقلة!'
                            : 'Tap "Add" — the app appears with its own icon!'}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-[11px] text-foreground/80 flex items-start gap-2">
                          <span className="text-emerald-400 font-bold shrink-0">1.</span>
                          {lang === 'ar'
                            ? 'في Chrome: اضغط على أيقونة التثبيت في شريط العنوان (⋮ أو ⊕)'
                            : 'In Chrome: click the install icon in the address bar'}
                        </p>
                        <p className="text-[11px] text-foreground/80 flex items-start gap-2">
                          <span className="text-emerald-400 font-bold shrink-0">2.</span>
                          {lang === 'ar'
                            ? 'أو: افتح القائمة (⋮) → "تثبيت التطبيق"'
                            : 'Or: open menu (⋮) → "Install app"'}
                        </p>
                        <p className="text-[11px] text-foreground/80 flex items-start gap-2">
                          <span className="text-emerald-400 font-bold shrink-0">3.</span>
                          {lang === 'ar'
                            ? 'سيُنشأ تطبيق مستقل بأيقونته الخاصة!'
                            : 'A standalone app with its own icon will be created!'}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function PwaInstallStatus() {
  const [installed, setInstalled] = useState(getInitialState().isInstalled);
  const { lang } = useLanguageStore();

  useEffect(() => {
    const handler = () => setInstalled(true);
    window.addEventListener('appinstalled', handler);
    return () => window.removeEventListener('appinstalled', handler);
  }, []);

  if (!installed) return null;

  return (
    <div className="flex items-center gap-1.5 text-emerald-400">
      <CheckCircle2 className="h-3 w-3" />
      <span className="text-[10px] hidden sm:inline">
        {lang === 'ar' ? 'تطبيق مستقل' : 'Standalone App'}
      </span>
    </div>
  );
}