export interface BlogUpdate {
  id: string;
  version?: string;
  date_en: string;
  date_hi: string;
  title_en: string;
  title_hi: string;
  category: 'release' | 'feature' | 'improvement';
  excerpt_en: string;
  excerpt_hi: string;
  bullets_en: string[];
  bullets_hi: string[];
  apkLink?: string;
  apkSize?: string;
  content_en?: string;
  content_hi?: string;
}

export const INITIAL_BLOG_POSTS: BlogUpdate[] = [
  {
    id: 'update-006',
    version: 'v0.0.6+1',
    date_en: 'August 20, 2026',
    date_hi: '20 अगस्त, 2026',
    title_en: 'v0.0.6+1 — Installation Bug Fix',
    title_hi: 'v0.0.6+1 — इंस्टॉलेशन बग फिक्स',
    category: 'release',
    excerpt_en: 'This release fixes installation issues and consolidates to a universal APK for all device architectures.',
    excerpt_hi: 'यह रिलीज़ इंस्टॉलेशन समस्याओं को ठीक करती है और सभी डिवाइस आर्किटेक्चर के लिए एक यूनिवर्सल APK में समेकित करती है।',
    bullets_en: [
      "Universal APK: Single APK containing native libraries for all supported architectures (ARM64, ARM32, x86_64).",
      "V1/V2 Signing: Enabled both signing configurations for consistent validation across Android versions.",
      "Native Library Extraction: Set extractNativeLibs=true to prevent installation crashes."
    ],
    bullets_hi: [
      "यूनिवर्सल APK: सभी समर्थित आर्किटेक्चर के लिए नेटिव लाइब्रेरी वाला एकल APK।",
      "V1/V2 साइनिंग: Android संस्करणों में सुसंगत सत्यापन के लिए दोनों साइनिंग कॉन्फ़िगरेशन सक्षम।",
      "नेटिव लाइब्रेरी एक्सट्रैक्शन: इंस्टॉलेशन क्रैश को रोकने के लिए extractNativeLibs=true सेट।"
    ],
    apkLink: '/api/apks/latest',
    apkSize: '~27 MB'
  },
  {
    id: 'update-005',
    version: 'v0.0.6',
    date_en: 'August 19, 2026',
    date_hi: '19 अगस्त, 2026',
    title_en: 'v0.0.6 — Fixed Drag and Drop Feature',
    title_hi: 'v0.0.6 — ड्रैग एंड ड्रॉप फीचर फिक्स किया गया',
    category: 'improvement',
    excerpt_en: 'This release resolves a critical issue with the drag-and-drop item reordering when list filters or search queries are active.',
    excerpt_hi: 'यह रिलीज़ सक्रिय फ़िल्टर या खोज क्वेरी होने पर ड्रैग-एंड-ड्रॉप आइटम रीऑर्डरिंग से संबंधित एक महत्वपूर्ण समस्या का समाधान करता है।',
    bullets_en: [
      "Drag-and-Drop Reordering: Fixed incorrect index mapping when reordering items while filtering by category, search query, or stock status.",
      "Visual Order Mapping: The reorder logic now correctly maps visual list positions back to database order indexes."
    ],
    bullets_hi: [
      "ड्रैग-एंड-ड्रॉप रीऑर्डरिंग: श्रेणी, खोज क्वेरी या स्टॉक स्थिति के अनुसार फ़िल्टर करते समय आइटम रीऑर्डरिंग में गलत इंडेक्स मैपिंग को ठीक किया गया।",
      "विज़ुअल ऑर्डर मैपिंग: रीऑर्डर लॉजिक अब विज़ुअल सूची की स्थिति को डेटाबेस ऑर्डर इंडेक्स पर सही ढंग से मैप करता है।"
    ],
    apkLink: '/api/apks/latest',
    apkSize: '~21 MB'
  }
];
