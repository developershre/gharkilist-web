export interface PantryItem {
  id: string;
  name_en: string;
  name_hi: string;
  category: string;
  unit: string;
  default_qty: number;
  price_per_unit: number; // in INR per unit or per 100g
  icon: string;
  brand?: string;
}

export const INDIAN_PANTRY_CATALOG: PantryItem[] = [
  { id: '1', name_en: 'Aashirvaad Shuddh Chakki Atta', name_hi: 'आशीर्वाद चक्की आटा', category: 'Grains & Atta', unit: 'KG', default_qty: 5, price_per_unit: 46, icon: '🌾', brand: 'Aashirvaad' },
  { id: '2', name_en: 'Toor / Arhar Dal', name_hi: 'तूर / अरहर दाल', category: 'Dals & Pulses', unit: 'KG', default_qty: 1, price_per_unit: 160, icon: '🥣' },
  { id: '3', name_en: 'Everest Turmeric (Haldi)', name_hi: 'हल्दी पाउडर', category: 'Spices & Masala', unit: 'G', default_qty: 200, price_per_unit: 0.25, icon: '🌶️', brand: 'Everest' },
  { id: '4', name_en: 'Fortune Mustard Oil', name_hi: 'सरसों का तेल', category: 'Oils & Ghee', unit: 'L', default_qty: 1, price_per_unit: 145, icon: '🛢️', brand: 'Fortune' },
  { id: '5', name_en: 'Camphor (Bhimseni Kapur)', name_hi: 'भीमसेनी कपूर', category: 'Pooja Needs', unit: 'PKT', default_qty: 2, price_per_unit: 35, icon: '🪔' },
  { id: '6', name_en: 'Tata Iodized Salt', name_hi: 'टाटा आयोडीन नमक', category: 'Spices & Masala', unit: 'KG', default_qty: 1, price_per_unit: 28, icon: '🧂', brand: 'Tata' },
  { id: '7', name_en: 'Amul Pasteurised Butter', name_hi: 'अमूल मक्खन', category: 'Dairy & Bakery', unit: 'G', default_qty: 500, price_per_unit: 0.56, icon: '🧈', brand: 'Amul' },
  { id: '8', name_en: 'India Gate Basmati Rice', name_hi: 'बास्मती चावल', category: 'Grains & Atta', unit: 'KG', default_qty: 5, price_per_unit: 110, icon: '🍚', brand: 'India Gate' },
  { id: '9', name_en: 'Yellow Moong Dal (Dhuli)', name_hi: 'मूंग दाल धुली', category: 'Dals & Pulses', unit: 'KG', default_qty: 1, price_per_unit: 140, icon: '🥣' },
  { id: '10', name_en: 'Catch Red Chili (Lal Mirch)', name_hi: 'लाल मिर्च पाउडर', category: 'Spices & Masala', unit: 'G', default_qty: 200, price_per_unit: 0.38, icon: '🌶️', brand: 'Catch' },
  { id: '11', name_en: 'Amul Cow Desi Ghee', name_hi: 'गाय का देशी घी', category: 'Oils & Ghee', unit: 'L', default_qty: 1, price_per_unit: 620, icon: '🧈', brand: 'Amul' },
  { id: '12', name_en: 'Cycle Pure Agarbatti', name_hi: 'साइकिल अगरबत्ती', category: 'Pooja Needs', unit: 'PKT', default_qty: 3, price_per_unit: 45, icon: '🪔', brand: 'Cycle' },
  { id: '13', name_en: 'Fresh Paneer', name_hi: 'ताज़ा पनीर', category: 'Dairy & Bakery', unit: 'G', default_qty: 200, price_per_unit: 0.45, icon: '🥛', brand: 'Amul' },
  { id: '14', name_en: 'Thick Poha / Chira', name_hi: 'मोटा पोहा', category: 'Grains & Atta', unit: 'KG', default_qty: 1, price_per_unit: 60, icon: '🥣' },
  { id: '15', name_en: 'Kala Chana / Bengal Gram', name_hi: 'काला चणा', category: 'Dals & Pulses', unit: 'KG', default_qty: 1, price_per_unit: 110, icon: '🧆' },
  { id: '16', name_en: 'Cotton Wicks (Rui Batti)', name_hi: 'रुई की बत्ती', category: 'Pooja Needs', unit: 'PKT', default_qty: 2, price_per_unit: 20, icon: '🪔' },
];

export const CATEGORIES = [
  { id: 'all', label_en: 'All Items', label_hi: 'सभी सामान', icon: '📋' },
  { id: 'grains', label_en: 'Grains & Atta', label_hi: 'अनाज और आटा', icon: '🌾' },
  { id: 'dals', label_en: 'Dals & Pulses', label_hi: 'दालें', icon: '🥣' },
  { id: 'spices', label_en: 'Spices & Masala', label_hi: 'मसाले', icon: '🌶️' },
  { id: 'oils', label_en: 'Oils & Ghee', label_hi: 'तेल और घी', icon: '🛢️' },
  { id: 'pooja', label_en: 'Pooja Needs', label_hi: 'पूजा सामग्री', icon: '🪔' },
  { id: 'dairy', label_en: 'Dairy & Bakery', label_hi: 'दूध और बेकरी', icon: '🥛' },
];

export const INVENTORY_LISTS = [
  { id: 'monthly', label_en: 'Monthly Kirana', label_hi: 'मासिक किराना' },
  { id: 'rakhi', label_en: 'Rakhi Festival', label_hi: 'राखी त्योहार' },
  { id: 'diwali', label_en: 'Diwali Pooja', label_hi: 'दिवाली पूजा' },
  { id: 'party', label_en: 'Weekend Feast', label_hi: 'वीकेंड दावत' },
];
