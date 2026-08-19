# AGENTS.md — Gharkilist Promotional Web Application Guide

> **Target Project**: Promotional Landing Page & Live Web Simulator for **Gharkilist (घर की लिस्ट)**  
> **Purpose**: Instructions and technical specifications for an AI agent to build a high-converting, interactive promotional web app for the Gharkilist mobile app.

---

## 🎯 Executive Summary & App Concept

**Gharkilist (घर की LIST)** is a modern, 100% offline, privacy-first mobile application built for Indian households to track kitchen inventory and automate monthly grocery ordering. 

### The Problem It Solves
Standard western barcode-based grocery apps fail for Indian homes because staple items (**loose atta, dals by weight, unbranded spices, and festival pooja supplies**) do not have barcodes. Indian households manually walk through their pantry each month, write paper lists, and text their local *kirana* store on WhatsApp.

### The Key Solution Features
1. **Curated Indian Pantry Catalog**: 100+ pre-filled items across 8 Indian categories with bilingual names (English + Hindi/हिन्दी).
2. **One-Tap WhatsApp Kirana Export**: Auto-formats selected items into a clean text list with total budget calculation (₹) and opens WhatsApp directly.
3. **Multi-Inventory Lists**: Separate lists for Kitchen Pantry, Monthly Kirana, Pooja Needs, Party/Festive.
4. **100% Offline & Private**: Zero tracking, zero accounts, zero cloud requirement — 100% local storage.

---

## 🎨 Design System & Aesthetics Guidelines

The promotional website must feel **ultra-premium, warm, modern, and distinctly Indian**. Visitors should be wowed at first glance by smooth animations, dynamic interactive phone simulators, and clean visual typography.

### Color Palette
- **Primary Emerald**: `#0F5132` (Rich Indian Kitchen Emerald Green)
- **Primary Mint Accent**: `#10B981` (Fresh Mint Green for success/badges)
- **Warm Saffron / Amber**: `#F59E0B` (Festival/Masala Warm Yellow-Gold)
- **Deep Slate / Navy**: `#0F172A` (Dark Mode background & high-contrast elements)
- **Warm Cream Background**: `#FAF9F5` (Soft background for Light Mode)
- **Card Background**: `#FFFFFF` / `rgba(255, 255, 255, 0.8)` (Glassmorphism backdrop-blur)
- **WhatsApp Green**: `#25D366` (For Kirana share demo & CTA elements)

### Typography
- **Primary Sans-Serif**: `Outfit` or `Plus Jakarta Sans` (Modern, readable, sleek)
- **Hindi Accent Font**: `Tiro Devanagari Hindi` or `Rozha One` or `Noto Sans Devanagari` (For authentic Indian branding headers like घर की लिस्ट)

### Aesthetic Features
- **Glassmorphism**: Soft background blur with subtle border gradients (`border: 1px solid rgba(255, 255, 255, 0.2)`).
- **Interactive Phone Frame**: Floating CSS 3D phone mockup that tilts slightly on mouse hover and contains a fully working live app simulator inside.
- **Micro-Animations**: Hover scale effects, pulse glows for Kirana WhatsApp export, tab transitions for bilingual previews.

---

## 🏗️ Structure & Required WebApp Sections

### 1. Navigation Header
- **Logo**: Custom styled Gharkilist logo with shopping bag / pantry icon and bilingual text `Gharkilist (घर की लिस्ट)`.
- **Nav Links**: `Features`, `Why Gharkilist`, `Live Demo`, `Download APK`.
- **Language Switcher**: Toggle button to switch the website preview text between English and Hindi.
- **Header Action Button**: "Get Free APK" (Glow effect button scrolling to download section).

### 2. Hero Section
- **Badge**: `✨ 100% Offline • Zero Tracking • Built for Indian Kitchens`
- **Main Heading**: "The Smart Household Pantry & Kirana List Manager for Indian Homes."
- **Sub-heading**: "Say goodbye to paper lists and barcode apps that don't recognize loose Atta or Dals. Track pantry stock, compute budget in ₹, and order via WhatsApp in one tap."
- **CTA Group**:
  - `Primary CTA`: "Download APK v1.0 (Free)" [with Android Download Icon]
  - `Secondary CTA`: "Try Interactive Demo" [with Play Icon]
- **Hero Visual**: Dual preview — A floating 3D phone screen displaying the interactive app AND a rendered WhatsApp message card popping out with an arrow showing "Instant WhatsApp Export".

### 3. Interactive Live Browser Simulator (Core Feature!)
*Build a working mini-app simulator embedded inside a styled smartphone mockup on the page.*

#### Simulator Specifications:
- **Header**: Mini Gharkilist header inside phone with search bar and category tabs (*All, Dals & Pulses, Spices, Grains, Pooja Needs, Oils & Ghee*).
- **Interactive List**: 
  - Show items like `Aashirvaad Shuddh Chakki Atta (5 KG)`, `Toor / Arhar Dal (1 KG)`, `Everest Turmeric / Haldi (200 G)`, `Tata Iodized Salt (1 KG)`, `Fortune Mustard Oil (1 L)`.
  - Visitors can click `+` / `-` steppers to increase quantity or add to cart.
- **Live Budget Bar**: Bottom bar inside phone updating in real-time (`3 Items Selected • Total: ₹640`).
- **Export Action**: Tapping "Share to Kirana (WhatsApp)" pops up a simulated WhatsApp modal showing the exact formatted text:
  ```text
  🛒 *Gharkilist — Kirana Order*
  -----------------------------
  1. Atta (Aashirvaad): 5 KG - ₹230
  2. Toor Dal: 1 KG - ₹160
  3. Turmeric Powder: 200 G - ₹50
  -----------------------------
  💵 *Estimated Total: ₹440*
  📍 Please deliver to my address. Thank you!
  ```

### 4. "Why Standard Apps Fail Indian Kitchens" (Comparison Matrix)
Create an interactive visual comparison table or card grid:
| Feature | Generic Western Apps | Gharkilist (घर की लिस्ट) |
| :--- | :--- | :--- |
| **Loose Staples (Atta/Dal by KG)** | ❌ Fails (Requires barcode) | ✅ **100% Pre-cataloged with KG/G units** |
| **Bilingual Item Names** | ❌ English only | ✅ **Bilingual (English + Hindi/हिन्दी)** |
| **Kirana Ordering** | ❌ Forces unwanted in-app checkout | ✅ **1-Tap Formatted WhatsApp Export** |
| **Privacy & Internet** | ❌ Requires login & tracking | ✅ **100% Offline SQLite, Zero tracking** |
| **Indian Pooja & Festival Needs** | ❌ Not available | ✅ **Dedicated Pooja & Festive Category** |

### 5. Key Feature Highlights Grid (Bento Grid Layout)
1. **100+ Indian Pantry Catalog**: Pre-loaded with regional names (Toor / Tuvar / Arhar Dal).
2. **One-Tap Kirana WhatsApp Export**: Formats items, quantities, and prices automatically.
3. **Multi-Inventory Switching**: Kitchen Pantry, Monthly Kirana, Pooja Supplies, Party List.
4. **100% Offline & Private**: Local SQLite database. No servers, no tracking.
5. **Item Quantity & Unit Stepper**: Built-in support for KG, G, L, ML, Packets, Pieces.
6. **Zero Ad Clutter**: Superfast, lightweight Flutter app optimized for performance.

### 6. Interactive Category & Item Explorer
A tabbed visual showcase of categories where users can explore items with their Hindi & English names:
- **🌾 Grains & Atta**: Whole Wheat Atta, Basmati Rice, Maida, Sooji, Poha.
- **🥣 Dals & Pulses**: Toor Dal, Moong Dal, Chana Dal, Rajma, Kabuli Chana.
- **🌶️ Spices & Masala**: Haldi, Lal Mirch, Dhaniya Powder, Garam Masala, Mustard Seeds.
- **🛢️ Oils & Ghee**: Desi Ghee, Mustard Oil, Sunflower Oil, Refined Oil.
- **🪔 Pooja Needs**: Kapur, Agarbatti, Diya Oil, Cotton Wicks, Roli/Kumkum.
- **🥛 Dairy & Bakery**: Milk, Paneer, Curd, Butter, Bread.

### 7. Download & Release Card Section
- **Download Box**:
  - Version: `v1.0.0 (First Testing Release)`
  - Size: `~59 MB`
  - Requirement: `Android 7.0+`
  - Direct Download Button (`.apk`)
  - **QR Code Card**: Scan QR code to download directly on smartphone.
  - **3-Step Install Guide**: 
    1. Click Download APK.
    2. Allow "Install from unknown sources" if prompted.
    3. Open Gharkilist and start managing your pantry!

### 8. Frequently Asked Questions (Accordion)
- *Is Gharkilist completely free?* (Yes, 100% free with no hidden fees).
- *Does it need internet?* (No! It is 100% local and offline).
- *How does Kirana export work?* (It generates formatted text and passes it to your installed WhatsApp app).
- *Can I add custom items?* (Yes, you can create custom items with custom units and prices).

### 9. Footer
- Branding: Gharkilist (घर की लिस्ट)
- Quick links: GitHub Repository, Release Notes, Privacy Policy, Feedback/Issue Tracker.
- Copyright & Developer credits.

---

## 💻 Tech Stack & Implementation Options

When building this webapp, choose one of the following tech stack approaches:

### Recommended Option A: Vite + React + Tailwind CSS
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS + Lucide Icons + Framer Motion (for animations)
- **State**: React state for simulator (cart, total, language toggle)

### Option B: Single File HTML5 + Vanilla JS + CSS3
- **Framework**: Pure HTML5 / CSS3 / ES6 JavaScript (No build step required)
- **Styling**: Custom CSS variables + Google Fonts + FontAwesome CDN

---

## 📊 Sample Catalog Data for Web Simulator

Include this mock dataset in the web app logic to power the simulator:

```javascript
const INDIAN_PANTRY_CATALOG = [
  { id: '1', name_en: 'Aashirvaad Atta', name_hi: 'आशीर्वाद आटा', category: 'Grains & Atta', unit: 'KG', default_qty: 5, price_per_unit: 46, icon: '🌾' },
  { id: '2', name_en: 'Toor / Arhar Dal', name_hi: 'तूर / अरहर दाल', category: 'Dals & Pulses', unit: 'KG', default_qty: 1, price_per_unit: 160, icon: '🥣' },
  { id: '3', name_en: 'Everest Turmeric (Haldi)', name_hi: 'हल्दी पाउडर', category: 'Spices & Masala', unit: 'G', default_qty: 200, price_per_unit: 0.25, icon: '🌶️' },
  { id: '4', name_en: 'Fortune Mustard Oil', name_hi: 'सरसों का तेल', category: 'Oils & Ghee', unit: 'L', default_qty: 1, price_per_unit: 145, icon: '🛢️' },
  { id: '5', name_en: 'Camphor (Kapur)', name_hi: 'भीमसेनी कपूर', category: 'Pooja Needs', unit: 'PKT', default_qty: 2, price_per_unit: 35, icon: '🪔' },
  { id: '6', name_en: 'Tata Iodized Salt', name_hi: 'टाटा नमक', category: 'Spices & Masala', unit: 'KG', default_qty: 1, price_per_unit: 28, icon: '🧂' },
  { id: '7', name_en: 'Amul Butter', name_hi: 'अमूल मक्खन', category: 'Dairy & Bakery', unit: 'G', default_qty: 500, price_per_unit: 0.56, icon: '🧈' },
  { id: '8', name_en: 'Basmati Rice', name_hi: 'बास्मती चावल', category: 'Grains & Atta', unit: 'KG', default_qty: 5, price_per_unit: 110, icon: '🍚' }
];
```

---

## ⚡ Execution Checklist for the AI Builder Agent

When you start building the promotional web app:
1. **Initialize Project**: Set up Vite + React + Tailwind or single-page web app structure.
2. **Configure Design System**: Set up CSS variables for primary emerald `#0F5132`, saffron `#F59E0B`, dark slate, and fonts (`Outfit`, Devanagari).
3. **Build Components**:
   - Header with bilingual state toggle.
   - Hero section with dual CTA buttons and app preview.
   - Phone Simulator widget with live item addition & budget calculator.
   - WhatsApp export simulation modal.
   - Problem vs Solution comparison matrix.
   - Bento grid features & catalog browser.
   - Download section with APK info & QR code mockup.
   - FAQ accordion & Footer.
4. **Polish & Test**:
   - Ensure responsive layout across Mobile, Tablet, and Desktop viewports.
   - Verify smooth transitions, hover effects, and crisp typography.
   - Test WhatsApp export modal output formatting.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
