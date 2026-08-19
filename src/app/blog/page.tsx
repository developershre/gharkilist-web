'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Search, 
  Tag, 
  Calendar, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Info,
  Clock,
  ExternalLink
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';

interface BlogUpdate {
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
}

const BLOG_UPDATES: BlogUpdate[] = [
  {
    id: 'update-100',
    version: 'v1.0.0',
    date_en: 'August 19, 2026',
    date_hi: '19 अगस्त, 2026',
    title_en: 'v1.0.0 — First Stable Testing Release',
    title_hi: 'v1.0.0 — पहला स्थिर टेस्टिंग रिलीज',
    category: 'release',
    excerpt_en: 'This release compiles all development iterations into a polished testing build, introducing list management extensions, multi-item editing capabilities, local query caching, and progressive web application (PWA) configurations.',
    excerpt_hi: 'यह रिलीज सभी विकास चरणों को एक पॉलिश टेस्टिंग बिल्ड में संकलित करता है, जिसमें सूची प्रबंधन विस्तार, मल्टी-आइटम संपादन क्षमताएं, स्थानीय क्वेरी कैशिंग और प्रोग्रेसिव वेब एप्लिकेशन (PWA) कॉन्फ़िगरेशन शामिल हैं।',
    bullets_en: [
      "PWA Configuration: Full web assets added (web/index.html, web/manifest.json, etc.) allowing the app to run as a web app.",
      "List Duplication: Duplicate an entire inventory list (items, quantities, and units) directly from the switcher sheet.",
      "Multi-Item Selection: Bulk selection mode for batch deletion, bulk category relocation, or batch marking.",
      "Branding Assets: Consolidated brand logos under assets/icon/logo.png and adaptive android icons.",
      "Build Scripts: Added build_apk.sh to automate optimized builds, splitting targets per ABI and obfuscating codes.",
      "Cache Layer: Implemented memory caching (catalog_cache.dart) to store catalog search and decrease list rendering delays.",
      "Database & Provider Optimizations: Refactored query execution using prepared statements and cached query indexes to reduce disk writes and prevent unnecessary UI redraws."
    ],
    bullets_hi: [
      "PWA कॉन्फ़िगरेशन: पूरे वेब एसेट्स (web/index.html, web/manifest.json, आदि) जोड़े गए ताकि ऐप वेब ऐप के रूप में चल सके।",
      "लिस्ट डुप्लीकेशन: स्विचर शीट से सीधे एक पूरी इन्वेंट्री लिस्ट (सामान, मात्रा और इकाइयां) को कॉपी या डुप्लिकेट करें।",
      "मल्टी-आइटम सिलेक्शन: बैच डिलीट करने, श्रेणी बदलने या बैच मार्किंग के लिए बल्क सिलेक्शन मोड।",
      "ब्रांडिंग एसेट्स: assets/icon/logo.png और एडैप्टिव एंड्रॉइड आइकॉन के तहत ब्रांड लोगो को एकीकृत किया गया।",
      "बिल्ड स्क्रिप्ट्स: कोड को सुरक्षित करने और बिल्ड साइज को कम करने के लिए स्वचालित build_apk.sh स्क्रिप्ट जोड़ी गई।",
      "कैश लेयर: सर्च को स्टोर करने और रेंडरिंग देरी को कम करने के लिए मेमोरी कैशिंग (catalog_cache.dart) लागू की गई।",
      "डेटाबेस और प्रोवाइडर अनुकूलन: डिस्क राइट्स को कम करने और यूआई रीड्रॉ को रोकने के लिए तैयार स्टेटमेंट्स और कैश क्वेरी इंडेक्स का उपयोग किया गया।"
    ],
    apkLink: '/GharKiList-v1.0.1.apk',
    apkSize: '~59 MB'
  },
  {
    id: 'update-090',
    version: 'v0.9.0',
    date_en: 'August 17, 2026',
    date_hi: '17 अगस्त, 2026',
    title_en: 'v0.9.0 — Settings Persistence & Android Dev Security',
    title_hi: 'v0.9.0 — सेटिंग्स दृढ़ता और एंड्रॉइड देव सुरक्षा',
    category: 'improvement',
    excerpt_en: 'Focused on persistence settings across app sessions and securing local developer network configurations.',
    excerpt_hi: 'ऐप सत्रों में सेटिंग्स को सहेजने और स्थानीय डेवलपर नेटवर्क कॉन्फ़िगरेशन को सुरक्षित करने पर ध्यान केंद्रित किया गया।',
    bullets_en: [
      "Android Network Security: Added network_security_config.xml to allow cleartext HTTP traffic during local development.",
      "Settings Persistence: Integrated shared_preferences inside app_settings_provider.dart to save language and theme configurations.",
      "Edit Sheet Logic: Improved the bottom popup quantity picker and naming logic in item_detail_sheet.dart for smoother typing.",
      "Test Suite Updates: Added widget and provider tests verifying persistent state loads."
    ],
    bullets_hi: [
      "एंड्रॉइड नेटवर्क सुरक्षा: स्थानीय विकास के दौरान क्लियरटेक्स्ट HTTP ट्रैफ़िक की अनुमति देने के लिए network_security_config.xml जोड़ा गया।",
      "सेटिंग्स दृढ़ता: भाषा और थीम प्राथमिकताओं को सहेजने के लिए shared_preferences को एकीकृत किया गया।",
      "संपादन शीट तर्क: बेहतर टाइपिंग अनुभव के लिए मात्रा पिकर और नामकरण तर्क में सुधार किया गया।",
      "टेस्ट सूट अपडेट: सहेजी गई सेटिंग्स की जांच के लिए विजेट और प्रोवाइडर परीक्षण जोड़े गए।"
    ]
  },
  {
    id: 'update-080',
    version: 'v0.8.0',
    date_en: 'August 17, 2026',
    date_hi: '17 अगस्त, 2026',
    title_en: 'v0.8.0 — State Management Refactoring',
    title_hi: 'v0.8.0 — स्टेट मैनेजमेंट रिफैक्टरिंग',
    category: 'improvement',
    excerpt_en: 'Migrated the entire UI layer from manual Stateful state-updates to standard provider notifications, separating the presentation layer from inventory database transactions.',
    excerpt_hi: 'पूरी यूआई परत को मैन्युअल स्टेटफुल अपडेट से मानक प्रोवाइडर नोटिफिकेशन पर माइग्रेट किया गया, जिससे प्रेजेंटेशन लेयर डेटाबेस ट्रांजेक्शन से अलग हो गई।',
    bullets_en: [
      "Inventory Provider: Added app_inventory_provider.dart to handle list selections, item creations, edits, and deletions.",
      "Settings Provider: Added app_settings_provider.dart to manage active theme settings and language selection.",
      "UI Refactoring: Updated catalog_browse_view.dart, inventory_home_view.dart, and settings_view.dart to utilize standard Consumer widgets."
    ],
    bullets_hi: [
      "इवेंट्री प्रोवाइडर: लिस्ट सिलेक्शन, आइटम क्रिएशन और डिलीट करने के लिए app_inventory_provider.dart जोड़ा गया।",
      "सेटिंग्स प्रोवाइडर: एक्टिव थीम सेटिंग्स और भाषा चयन को प्रबंधित करने के लिए app_settings_provider.dart जोड़ा गया।",
      "यूआई रिफैक्टरिंग: मानक कंज्यूमर विजेट्स का उपयोग करने के लिए सभी प्रमुख दृश्यों को अपडेट किया गया।"
    ]
  },
  {
    id: 'update-070',
    version: 'v0.7.0',
    date_en: 'August 17, 2026',
    date_hi: '17 अगस्त, 2026',
    title_en: 'v0.7.0 — Dynamic Bilingual Localization & Unit Tests',
    title_hi: 'v0.7.0 — गतिशील द्विभाषी स्थानीयकरण और यूनिट टेस्ट',
    category: 'feature',
    excerpt_en: 'Introduced robust bilingual toggles throughout all views, allowing seamless toggling between English and Hindi.',
    excerpt_hi: 'सभी दृश्यों में मजबूत द्विभाषी टॉगल पेश किए गए, जिससे अंग्रेजी और हिंदी के बीच सहज बदलाव संभव हुआ।',
    bullets_en: [
      "Bilingual Coverage: Applied dynamic translations to all list buttons, placeholders, dialogs, error messages, and form fields.",
      "Unit Tests: Created test/unit_test.dart to verify key-value translations, locale loading boundaries, and currency parsing logic."
    ],
    bullets_hi: [
      "द्विभाषी कवरेज: सभी सूची बटन, प्लेसहोल्डर, संवाद, त्रुटि संदेशों और फ़ील्ड्स में गतिशील अनुवाद लागू किया गया।",
      "यूनिट टेस्ट: अनुवाद की शुद्धता और मुद्रा पार्सिंग तर्क को सत्यापित करने के लिए test/unit_test.dart बनाया गया।"
    ]
  },
  {
    id: 'update-060',
    version: 'v0.6.0',
    date_en: 'August 16, 2026',
    date_hi: '16 अगस्त, 2026',
    title_en: 'v0.6.0 — WebP Asset Migration & Adaptive Android Icons',
    title_hi: 'v0.6.0 — WebP एसेट माइग्रेशन और एडैप्टिव एंड्रॉइड आइकॉन',
    category: 'improvement',
    excerpt_en: "Optimized the application's storage footprint and added native Android themed icon support.",
    excerpt_hi: 'ऐप के स्टोरेज साइज को अनुकूलित किया गया और नेटिव एंड्रॉइड थीम वाले आइकॉन का समर्थन जोड़ा गया।',
    bullets_en: [
      "Adaptive Launcher Icons: Configured XML configurations and added monochrome adaptive icon assets to support Android 13+ Material You themed icons.",
      "WebP Asset Optimization: Migrated all pantry placeholder PNG images to compressed .webp assets, reducing image sizes by over 89% and shortening cold-boot latency."
    ],
    bullets_hi: [
      "एडेप्टिव लॉन्चर आइकॉन: एंड्रॉइड 13+ थीम वाले आइकॉन का समर्थन करने के लिए एक्सएमएल और मोनोक्रोम एसेट कॉन्फ़िगर किए गए।",
      "WebP एसेट अनुकूलन: सभी पेंट्री इमेजेस को कंप्रेस्ड .webp एसेट्स में माइग्रेट किया गया, जिससे आकार 89% से अधिक कम हुआ और ऐप तेजी से खुला।"
    ]
  },
  {
    id: 'update-050',
    version: 'v0.5.0',
    date_en: 'August 16, 2026',
    date_hi: '16 अगस्त, 2026',
    title_en: 'v0.5.0 — Advanced Inventory Management UI',
    title_hi: 'v0.5.0 — उन्नत इन्वेंट्री प्रबंधन यूआई',
    category: 'feature',
    excerpt_en: 'Polished the user experience with advanced list filtering, custom item creation, and improved UI feedback.',
    excerpt_hi: 'उन्नत सूची फ़िल्टरिंग, कस्टम आइटम निर्माण और बेहतर यूआई फीडबैक के साथ उपयोगकर्ता अनुभव को बेहतर बनाया गया।',
    bullets_en: [
      "Custom Additions: Added add_item_form_view.dart to support creating items not present in the default catalog.",
      "Custom List Dialog: Added create_list_dialog.dart for adding user-defined custom lists.",
      "Category Filter Sheets: Added inventory_filter_sheet.dart to filter items by category or stock limits.",
      "Brand Identity: Implemented a custom canvas-painted vector logo (gharkilist_logo.dart) for unique branding.",
      "Interactive UI Components: Created inventory_item_tile.dart and inventory_tag_bar.dart to provide rich swipe gestures and tab-based navigation."
    ],
    bullets_hi: [
      "कस्टम एडिशन: डिफ़ॉल्ट कैटलॉग में अनुपस्थित सामानों को जोड़ने के लिए add_item_form_view.dart जोड़ा गया।",
      "कस्टम सूची संवाद: उपयोगकर्ता-परिभाषित कस्टम सूचियां जोड़ने के लिए create_list_dialog.dart जोड़ा गया।",
      "श्रेणी फ़िल्टर शीट्स: श्रेणियों या स्टॉक सीमाओं द्वारा सामानों को फ़िल्टर करने के लिए inventory_filter_sheet.dart जोड़ा गया।",
      "ब्रांड पहचान: यूनीक ब्रांडिंग के लिए कस्टम कैनवास-पेंटेड वेक्टर लोगो (gharkilist_logo.dart) लागू किया गया।",
      "इंटरैक्टिव यूआई घटक: स्वाइप जेस्चर और टैब-आधारित नेविगेशन प्रदान करने के लिए नए विजेट्स बनाए गए।"
    ]
  },
  {
    id: 'update-040',
    version: 'v0.4.0',
    date_en: 'August 16, 2026',
    date_hi: '16 अगस्त, 2026',
    title_en: 'v0.4.0 — Assets & Build Ignore Setup',
    title_hi: 'v0.4.0 — एसेट्स और बिल्ड इग्नोर सेटअप',
    category: 'improvement',
    excerpt_en: 'Minor maintenance release to establish file storage structure and ignore rules.',
    excerpt_hi: 'फ़ाइल स्टोरेज संरचना और इग्नोर नियमों को स्थापित करने के लिए लघु रखरखाव रिलीज।',
    bullets_en: [
      "Catalog Assets: Added standard pantry catalog assets (PNG format) to assets/images/.",
      "Gitignore Updates: Configured ignore rules for Android build and Gradle cache paths."
    ],
    bullets_hi: [
      "कैटलॉग एसेट्स: assets/images/ में मानक पेंट्री कैटलॉग एसेट्स (PNG प्रारूप) जोड़े गए।",
      "Gitignore अपडेट: एंड्रॉइड बिल्ड और ग्रेडल कैश पाथ के लिए इग्नोर नियम कॉन्फ़िगर किए गए।"
    ]
  },
  {
    id: 'update-030',
    version: 'v0.3.0',
    date_en: 'August 14, 2026',
    date_hi: '14 अगस्त, 2026',
    title_en: 'v0.3.0 — Localization Service & UI Consolidation',
    title_hi: 'v0.3.0 — स्थानीयकरण सेवा और यूआई सुदृढ़ीकरण',
    category: 'improvement',
    excerpt_en: 'Initial structural improvements for translation mapping and standardized iconography.',
    excerpt_hi: 'अनुवाद मैपिंग और मानकीकृत आइकनोग्राफी के लिए प्रारंभिक संरचनात्मक सुधार।',
    bullets_en: [
      "Localization Service: Initial implementation of localization_service.dart for Hindi-English translation mapping.",
      "Standardized Iconography: Introduced ItemIconWidget to render category/item icons consistently across screens."
    ],
    bullets_hi: [
      "स्थानीयकरण सेवा: हिंदी-अंग्रेजी अनुवाद मैपिंग के लिए localization_service.dart का प्रारंभिक कार्यान्वयन।",
      "मानकीकृत आइकनोग्राफी: स्क्रीन पर श्रेणियों/आइटम आइकन को समान रूप से रेंडर करने के लिए ItemIconWidget पेश किया गया।"
    ]
  },
  {
    id: 'update-020',
    version: 'v0.2.0',
    date_en: 'August 14, 2026',
    date_hi: '14 अगस्त, 2026',
    title_en: 'v0.2.0 — Core Feature Set',
    title_hi: 'v0.2.0 — मुख्य फीचर सेट',
    category: 'feature',
    excerpt_en: 'Completed the initial functional prototype of Gharkilist for offline kitchen inventory and WhatsApp local kirana sharing.',
    excerpt_hi: 'ऑफ़लाइन रसोई सूची प्रबंधन और WhatsApp लोकल किराना साझाकरण के लिए प्रारंभिक कार्यात्मक प्रोटोटाइप पूरा किया गया।',
    bullets_en: [
      "SQLite Database Helper: Implemented database_helper.dart for offline, privacy-first local storage.",
      "Bilingual Indian Pantry Catalog: Predefined catalog containing over 100 Indian pantry items across 8 categories.",
      "WhatsApp Share Service: Formats grocery lists with item totals and shares formatted texts to WhatsApp.",
      "Key Views: Implemented Browse, Home Dashboard, Add/Edit Bottom Sheets, Photo Capture, and Translator utilities."
    ],
    bullets_hi: [
      "SQLite डेटाबेस हेल्पर: ऑफ़लाइन, गोपनीयता-प्रथम स्थानीय स्टोरेज के लिए database_helper.dart लागू किया गया।",
      "द्विभाषी पेंट्री कैटलॉग: 8 श्रेणियों में 100 से अधिक भारतीय पेंट्री सामानों का प्री-लोडेड कैटलॉग।",
      "WhatsApp शेयर सेवा: किराना सूची को कुल अनुमानित बजट के साथ प्रारूपित करता है और WhatsApp पर भेजता है।",
      "मुख्य स्क्रीन: ब्राउज़, होम डैशबोर्ड, जोड़ने/संपादन के लिए बॉटम शीट्स और अनुवादक उपयोगिताएँ शुरू की गईं।"
    ]
  },
  {
    id: 'update-010',
    version: 'v0.1.0',
    date_en: 'August 14, 2026',
    date_hi: '14 अगस्त, 2026',
    title_en: 'v0.1.0 — Skeleton Initialization',
    title_hi: 'v0.1.0 — ढांचागत शुरुआत (स्केलेटन इनिशियलाइजेशन)',
    category: 'release',
    excerpt_en: 'Initial Flutter workspace generation with project metadata and starter configs.',
    excerpt_hi: 'प्रोजेक्ट मेटाडेटा और स्टार्टर कॉन्फ़िगरेशन के साथ प्रारंभिक फ़्लटर वर्कस्पेस जेनरेशन।',
    bullets_en: [
      "Project Setup: Generated Flutter application skeleton with standard Android packages.",
      "Metadata Configurations: Configured package names, versions, and SDK environment requirements."
    ],
    bullets_hi: [
      "प्रोजेक्ट सेटअप: मानक एंड्रॉइड पैकेज के साथ फ़्लटर आवेदन ढांचा तैयार किया गया।",
      "मेटाडेटा कॉन्फ़िगरेशन: पैकेज नाम, संस्करण और एसडीके पर्यावरण आवश्यकताओं को कॉन्फ़िगर किया गया।"
    ]
  },
  {
    id: 'update-spotlight',
    date_en: 'August 05, 2026',
    date_hi: '05 अगस्त, 2026',
    title_en: 'Feature Spotlight — Curated Staples & Indian Kitchen Units',
    title_hi: 'फीचर स्पॉटलाइट — भारतीय रसोई की आवश्यकताएं और इकाइयाँ',
    category: 'feature',
    excerpt_en: 'Standard Western apps rely on barcode scanning of packaged supermarket items. Here is how Gharkilist catalog support for loose Atta, unbranded spices, and dedicated festive Pooja needs is built.',
    excerpt_hi: 'साधारण पश्चिमी ऐप्स बारकोड पर निर्भर करते हैं। जानिए कैसे घर की लिस्ट ऐप में खुले सामान (आटा, दाल), पिसे मसालों और समर्पित पूजा सामग्री के लिए विशेष कैटलॉग तैयार किया गया है।',
    bullets_en: [
      "Bilingual Item Catalog: Items pre-mapped with English and Hindi regional names for quick search.",
      "Built-in Metric Steppers: Support for Indian measurements (KG, G, Litre, ML, Packets, Pieces).",
      "Dedicated Pooja Category: Catalog of camphor (kapur), cotton wicks (batti), incense (agarbatti), and festive pooja lists."
    ],
    bullets_hi: [
      "द्विभाषी खोज कैटलॉग: त्वरित बोलकर/लिखकर खोजने के लिए अंग्रेजी और क्षेत्रीय हिंदी नाम एक साथ प्री-मैप्ड।",
      "भारतीय माप इकाइयाँ: भारतीय परिवारों के माप जैसे किलो (KG), ग्राम (G), लीटर (L), पैकेट और पीस का समर्थन।",
      "विशेष पूजा सामग्री श्रेणी: भीमसेनी कपूर, बत्ती, अगरबत्ती, दीया तेल और त्योहार पूजन लिस्ट शामिल।"
    ]
  }
];

export default function BlogPage() {
  const { lang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'release' | 'feature' | 'improvement'>('all');
  const [expandedNotes, setExpandedNotes] = useState<Record<string, boolean>>({
    'update-100': true, // Keep the latest update expanded by default
  });

  const toggleExpand = (id: string) => {
    setExpandedNotes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredUpdates = useMemo(() => {
    return BLOG_UPDATES.filter((post) => {
      const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
      const titleText = lang === 'hi' ? post.title_hi : post.title_en;
      const excerptText = lang === 'hi' ? post.excerpt_hi : post.excerpt_en;
      const matchesSearch = 
        !searchQuery ||
        titleText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        excerptText.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, lang]);

  const categories = [
    { id: 'all', label_en: 'All Updates', label_hi: 'सभी अपडेट्स' },
    { id: 'release', label_en: 'Releases', label_hi: 'वर्जन रिलीज' },
    { id: 'feature', label_en: 'Features', label_hi: 'फीचर हाइलाइट्स' },
    { id: 'improvement', label_en: 'Improvements', label_hi: 'सुधार और अनुकूलन' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      {/* Main Content Container */}
      <main className="flex-grow pt-28 pb-20 relative overflow-hidden">
        {/* Radial dot grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

        {/* Ambient background glow spheres */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-12 left-1/4 w-[450px] h-[450px] bg-gradient-to-tr from-mint/10 via-emerald/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-[450px] h-[450px] bg-gradient-to-bl from-saffron/10 via-amber-500/5 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          {/* Back Button to Homepage */}
          <div className="mb-6 animate-fade-in">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate/50 hover:text-emerald transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{lang === 'hi' ? 'मुख्य पृष्ठ पर वापस जाएं' : 'Back to Home'}</span>
            </Link>
          </div>

          {/* Page Banner Header */}
          <div className="mb-14 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 bg-emerald/[0.07] border border-emerald/20 rounded-full px-4 py-1.5 mb-4 animate-slide-up shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-mint" />
              <span className="text-[10px] font-bold text-emerald tracking-wider uppercase">
                {lang === 'hi' ? 'अपडेट्स और बदलाव' : 'App Updates & Changelog'}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate tracking-tight mb-4 animate-slide-up">
              {lang === 'hi' ? 'घर की लिस्ट में नया क्या है?' : "What's New in Gharkilist"}
            </h1>
            <p className="text-base text-slate/60 leading-relaxed max-w-2xl animate-slide-up">
              {lang === 'hi'
                ? 'हमारे विकास के सफर, नए वर्जन रिलीज, सुविधाओं के विस्तार और तकनीकी बदलावों पर नजर रखें।'
                : 'Follow our development journey, version releases, themed app icon integration, and product improvements.'}
            </p>
          </div>

          {/* Interactive Filters and Search Row */}
          <div className="bg-white/80 backdrop-blur-md border border-slate/10 p-3 rounded-2xl shadow-sm mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-slide-up">
            
            {/* Filter Pills */}
            <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-1 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`px-4 py-1.8 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                    activeCategory === cat.id
                      ? 'bg-emerald text-white border-emerald shadow-xs'
                      : 'bg-white text-slate/60 border-slate-200 hover:text-slate hover:bg-slate-50'
                  }`}
                >
                  {lang === 'hi' ? cat.label_hi : cat.label_en}
                </button>
              ))}
            </div>

            {/* Search Input Box */}
            <div className="relative w-full md:max-w-xs">
              <input
                type="text"
                placeholder={lang === 'hi' ? 'अपडेट सर्च करें...' : 'Search updates...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.8 text-xs rounded-xl border border-slate-200 outline-none focus:border-emerald text-slate bg-white placeholder:text-slate/40 shadow-inner"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

          </div>

          {/* Chronological Changelog Timeline */}
          {filteredUpdates.length === 0 ? (
            <div className="text-center py-20 bg-white/50 backdrop-blur-md border border-slate-100 rounded-3xl p-8">
              <Info className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-slate-700">{lang === 'hi' ? 'कोई अपडेट नहीं मिला' : 'No Updates Found'}</h3>
              <p className="text-xs text-slate-400 mt-1">
                {lang === 'hi' 
                  ? 'आपके खोजे गए कीवर्ड से मेल खाता हुआ कोई भी बदलाव नहीं मिला।' 
                  : 'No changes match your selected filters or search terms.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-2 animate-fade-in">
              
              {filteredUpdates.map((post) => {
                const isExpanded = !!expandedNotes[post.id];
                const displayCategory = post.category === 'release' 
                  ? (lang === 'hi' ? 'वर्जन रिलीज' : 'Release') 
                  : post.category === 'improvement'
                    ? (lang === 'hi' ? 'सुधार' : 'Improvement')
                    : (lang === 'hi' ? 'फीचर' : 'Feature');
                
                return (
                  <div key={post.id} className="group h-full">
                    
                    {/* Content Card container */}
                    <Card className="bg-white border-slate/10 hover:border-emerald/20 hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden relative p-6 sm:p-8 flex flex-col justify-between h-full">
                      
                      {/* Decorative colored strip for releases */}
                      {post.category === 'release' && (
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#03B459] to-mint" />
                      )}

                      <div>
                        {/* Date, Category, and Version Row inside Card */}
                        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400 font-bold mb-4">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <span>{lang === 'hi' ? post.date_hi : post.date_en}</span>
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                          <Badge 
                            variant={post.category === 'release' ? 'default' : 'outline'} 
                            className={`text-[10px] uppercase px-2.5 py-0.8 tracking-wider ${
                              post.category === 'release' ? 'bg-[#03B459] hover:bg-[#03B459] text-white' : 'border-slate/15 text-slate-500 hover:bg-transparent'
                            }`}
                          >
                            {displayCategory}
                          </Badge>
                          {post.version && (
                            <Badge variant="saffron" className="text-[10px] font-extrabold px-2.5 py-0.8 tracking-wide hover:bg-saffron">
                              {post.version}
                            </Badge>
                          )}
                        </div>

                        {/* Title - larger font */}
                        <h3 className="text-xl sm:text-2xl font-extrabold text-slate group-hover:text-emerald transition-colors mb-3.5 leading-tight">
                          {lang === 'hi' ? post.title_hi : post.title_en}
                        </h3>
                        
                        {/* Excerpt - larger font */}
                        <p className="text-base text-slate/70 leading-relaxed mb-5">
                          {lang === 'hi' ? post.excerpt_hi : post.excerpt_en}
                        </p>
                      </div>

                      {/* Expandable detailed release notes */}
                      <div className="border-t border-slate/5 pt-4 mt-auto">
                        <button
                          onClick={() => toggleExpand(post.id)}
                          className="flex items-center gap-1.5 text-sm font-bold text-emerald hover:text-emerald-light transition-colors"
                        >
                          <span>{lang === 'hi' ? 'विवरण और रिलीज नोट्स' : 'Detailed Release Notes'}</span>
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>

                        {isExpanded && (
                          <div className="mt-4 bg-slate-50/60 border border-slate-100 rounded-xl p-5 animate-slide-up">
                            <ul className="space-y-3 text-sm text-slate-650 list-disc pl-5 leading-relaxed">
                              {(lang === 'hi' ? post.bullets_hi : post.bullets_en).map((bullet, idx) => (
                                <li key={idx} className="marker:text-mint">{bullet}</li>
                              ))}
                            </ul>

                            {/* Direct Download Badge & APK info for releases */}
                            {post.category === 'release' && post.apkLink && (
                              <div className="mt-5 pt-4 border-t border-slate-200/50 flex flex-wrap items-center gap-3.5">
                                <Button variant="emerald" size="sm" asChild className="gap-2 text-xs font-bold px-4 py-2">
                                  <a href={post.apkLink} download>
                                    <Download className="w-4 h-4" />
                                    <span>{lang === 'hi' ? 'ऐप डाउनलोड करें' : 'Download Standalone APK'}</span>
                                  </a>
                                </Button>
                                <span className="text-xs text-slate-400 font-semibold">
                                  {lang === 'hi' ? `फ़ाइल आकार: ${post.apkSize}` : `Size: ${post.apkSize}`} &middot; Android 7.0+
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                    </Card>

                  </div>
                );
              })}

            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
