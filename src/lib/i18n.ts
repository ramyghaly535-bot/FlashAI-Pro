export type Lang = 'en' | 'ar';

const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Header
    'app.name': 'FlashAI Pro',
    'app.subtitle': 'AI-Powered Multi-OS Mobile Flashing Engine v2.0',
    'header.encrypted': 'End-to-End Encrypted',
    'header.reset': 'Reset',
    'nav.dashboard': 'Dashboard',
    'nav.devices': 'Devices',
    'nav.security': 'Security',

    // Hero
    'hero.title': 'Smart Mobile Flashing',
    'hero.desc': 'AI-powered firmware analysis, multi-threaded download engine, and automated flashing for Apple, Samsung, and Xiaomi devices.',

    // Status Bar
    'status.ready': 'Ready',
    'status.scanning': 'Scanning USB',
    'status.detected': 'Device Detected',
    'status.analyzing': 'AI Analyzing',
    'status.downloading': 'Downloading',
    'status.flashing': 'Flashing',
    'status.completed': 'Completed',
    'status.error': 'Error',
    'status.connected': 'Device Connected',
    'status.secure': 'Secure Channel',
    'status.online': 'Online',

    // Device Detection Panel
    'usb.title': 'USB Device Monitor',
    'usb.connected': 'Connected',
    'usb.scanning_badge': 'Scanning',
    'usb.waiting': 'Waiting',
    'usb.select_brand': 'Select device brand to scan (or auto-detect):',
    'usb.auto_detect': 'Auto-Detect Device',
    'usb.scan_brand': 'Scan for {brand} Device',
    'usb.scanning_msg': 'Scanning USB ports...',
    'usb.disconnect': 'Disconnect Device',

    // Device Info Card
    'device.title': 'Device Information',
    'device.no_device': 'No device connected',
    'device.no_device_hint': 'Connect a device via USB to see its details',
    'device.identified': 'Identified',
    'device.brand': 'Brand',
    'device.model': 'Model',
    'device.serial': 'Serial Number',
    'device.vendor_id': 'Vendor ID',
    'device.product_id': 'Product ID',
    'device.storage': 'Storage',
    'device.os_version': 'OS Version',
    'device.connection_mode': 'Connection Mode',

    // Firmware Analysis Panel
    'firmware.title': 'AI Firmware Analysis',
    'firmware.analysis_complete': 'Analysis Complete',
    'firmware.ai_processing': 'AI Processing',
    'firmware.connect_first': 'Connect a device first',
    'firmware.ai_will': 'AI will analyze your',
    'firmware.and_fetch': 'and fetch the latest official signed firmware from',
    'firmware.servers': 'servers.',
    'firmware.analyze_btn': 'Analyze & Fetch Official Firmware',
    'firmware.analyzing_msg': 'AI is analyzing device parameters...',
    'firmware.contacting': 'Contacting {brand} servers',
    'firmware.version': 'Version',
    'firmware.build': 'Build',
    'firmware.region': 'Region',
    'firmware.released': 'Released',
    'firmware.size': 'Size',
    'firmware.signed': 'Signed',
    'firmware.download_btn': 'Download & Flash Firmware',

    // Download Manager
    'download.title': 'Download Manager',
    'download.awaiting': 'Awaiting firmware download',
    'download.progress': 'Progress',
    'download.speed': 'Speed',
    'download.threads': 'Threads',
    'download.integrity': 'Integrity',
    'download.verified': 'Verified',
    'download.pending': 'Pending',
    'download.downloading_badge': 'Downloading',
    'download.flash_title': 'Flash Engine',
    'download.flash_badge': 'Flashing',
    'download.completed_badge': 'Completed',
    'download.flash_progress': 'Flashing Progress',
    'download.current_partition': 'Current Partition',
    'download.partitions': 'Partitions',
    'download.eta': 'ETA',
    'download.flash_success': 'Flash Successful!',
    'download.rebooting_msg': 'Device is rebooting to factory state',
  },
  ar: {
    // Header
    'app.name': 'FlashAI Pro',
    'app.subtitle': 'محرك فلاش ذكي للأجهزة المحمولة متعدد الأنظمة v2.0',
    'header.encrypted': 'مشفّر من طرف لطرف',
    'header.reset': 'إعادة تعيين',
    'nav.dashboard': 'لوحة التحكم',
    'nav.devices': 'الأجهزة',
    'nav.security': 'الأمان',

    // Hero
    'hero.title': 'فلاش الأجهزة الذكية',
    'hero.desc': 'تحليل البرامج الثابتة بالذكاء الاصطناعي، محرك تحميل متعدد المسارات، وتثبيت تلقائي لأجهزة أبل، سامسونج، وشاومي.',

    // Status Bar
    'status.ready': 'جاهز',
    'status.scanning': 'فحص USB',
    'status.detected': 'تم اكتشاف الجهاز',
    'status.analyzing': 'الذكاء الاصطناعي يحلل',
    'status.downloading': 'جاري التحميل',
    'status.flashing': 'جاري التثبيت',
    'status.completed': 'مكتمل',
    'status.error': 'خطأ',
    'status.connected': 'الجهاز متصل',
    'status.secure': 'قناة آمنة',
    'status.online': 'متصل',

    // Device Detection Panel
    'usb.title': 'مراقب أجهزة USB',
    'usb.connected': 'متصل',
    'usb.scanning_badge': 'جاري الفحص',
    'usb.waiting': 'في الانتظار',
    'usb.select_brand': 'اختر ماركة الجهاز للفحص (أو اكتشاف تلقائي):',
    'usb.auto_detect': 'اكتشاف تلقائي',
    'usb.scan_brand': 'فحص جهاز {brand}',
    'usb.scanning_msg': 'جاري فحص منافذ USB...',
    'usb.disconnect': 'فصل الجهاز',

    // Device Info Card
    'device.title': 'معلومات الجهاز',
    'device.no_device': 'لا يوجد جهاز متصل',
    'device.no_device_hint': 'قم بتوصيل جهاز عبر USB لعرض تفاصيله',
    'device.identified': 'تم التعريف',
    'device.brand': 'الشركة المصنعة',
    'device.model': 'الموديل',
    'device.serial': 'الرقم التسلسلي',
    'device.vendor_id': 'معرف البائع',
    'device.product_id': 'معرف المنتج',
    'device.storage': 'التخزين',
    'device.os_version': 'إصدار النظام',
    'device.connection_mode': 'وضع الاتصال',

    // Firmware Analysis Panel
    'firmware.title': 'تحليل البرامج الثابتة بالذكاء الاصطناعي',
    'firmware.analysis_complete': 'اكتمل التحليل',
    'firmware.ai_processing': 'معالجة بالذكاء الاصطناعي',
    'firmware.connect_first': 'قم بتوصيل جهاز أولاً',
    'firmware.ai_will': 'سيقوم الذكاء الاصطناعي بتحليل',
    'firmware.and_fetch': 'وجلب أحدث برنامج ثابت رسمي موقّع من سيرفرات',
    'firmware.servers': '.',
    'firmware.analyze_btn': 'تحليل وجلب البرنامج الثابت الرسمي',
    'firmware.analyzing_msg': 'الذكاء الاصطناعي يحلل معلمات الجهاز...',
    'firmware.contacting': 'الاتصال بسيرفرات {brand}',
    'firmware.version': 'الإصدار',
    'firmware.build': 'البنية',
    'firmware.region': 'المنطقة',
    'firmware.released': 'تاريخ الإصدار',
    'firmware.size': 'الحجم',
    'firmware.signed': 'التوقيع',
    'firmware.download_btn': 'تحميل وتثبيت البرنامج الثابت',

    // Download Manager
    'download.title': 'مدير التحميل',
    'download.awaiting': 'في انتظار تحميل البرنامج الثابت',
    'download.progress': 'التقدم',
    'download.speed': 'السرعة',
    'download.threads': 'المسارات',
    'download.integrity': 'السلامة',
    'download.verified': 'تم التحقق',
    'download.pending': 'قيد الانتظار',
    'download.downloading_badge': 'جاري التحميل',
    'download.flash_title': 'محرك التثبيت',
    'download.flash_badge': 'جاري التثبيت',
    'download.completed_badge': 'مكتمل',
    'download.flash_progress': 'تقدم التثبيت',
    'download.current_partition': 'القسم الحالي',
    'download.partitions': 'الأقسام',
    'download.eta': 'الوقت المتبقي',
    'download.flash_success': 'تم التثبيت بنجاح!',
    'download.rebooting_msg': 'الجهاز يعيد التشغيل إلى حالة المصنع',
  },
};

export function t(key: string, lang: Lang, params?: Record<string, string>): string {
  let text = translations[lang]?.[key] ?? translations.en[key] ?? key;
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      text = text.replace(`{${k}}`, v);
    });
  }
  return text;
}

export const isRTL = (lang: Lang) => lang === 'ar';