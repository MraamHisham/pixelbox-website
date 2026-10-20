"use client";

import { useState } from "react";
import Link from "next/link";

export default function Terms() {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const toggleLang = () => setLang(lang === "ar" ? "en" : "ar");

  const t = {
    ar: {
      title: "الشروط والأحكام",
      p1: "باستخدامك لموقع Pixel Box Ads، فإنك توافق على الشروط التالية:",
      p2: "جميع التصميمات والمنتجات المعروضة هي ملك لنا ولا يجوز إعادة بيعها أو استخدامها لأغراض تجارية دون إذن مسبق.",
      p3: "الأسعار (إن وجدت) قابلة للتغيير، وتخضع للتقييم الفردي لكل مشروع بناءً على متطلبات العميل.",
      p4: "نحتفظ بالحق في تحديث هذه الشروط في أي وقت.",
      back: "العودة للرئيسية"
    },
    en: {
      title: "Terms and Conditions",
      p1: "By using the Pixel Box Ads website, you agree to the following terms:",
      p2: "All designs and products displayed are our property and may not be resold or used for commercial purposes without prior permission.",
      p3: "Prices (if applicable) are subject to change and are assessed individually for each project based on client requirements.",
      p4: "We reserve the right to update these terms at any time.",
      back: "Back to Home"
    }
  };

  const text = t[lang];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-cairo flex flex-col" dir={lang === 'ar' ? 'rtl' : 'ltr'} translate="no">
      <header className="w-full border-b border-white/10 p-6 flex justify-between items-center max-w-4xl mx-auto">
        <Link href="/" className="text-[#D4AF37] hover:text-white transition-colors text-sm font-bold flex items-center gap-2">
          <span>←</span> {text.back}
        </Link>
        <button onClick={toggleLang} className="px-4 py-1.5 border border-white/20 hover:border-[#D4AF37] text-xs font-bold rounded-full transition-all duration-300 hover:text-[#D4AF37]">
          {lang === 'ar' ? 'English' : 'عربي'}
        </button>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-20 flex-grow w-full">
        <h1 className="text-4xl font-playfair font-bold mb-10 text-[#D4AF37]">{text.title}</h1>
        <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
          <p>{text.p1}</p>
          <p>{text.p2}</p>
          <p>{text.p3}</p>
          <p>{text.p4}</p>
        </div>
      </main>

      <footer className="border-t border-white/10 py-6 text-center text-gray-600 text-sm">
       © 2026 Pixel Box Ads.
      </footer>
    </div>
  );
}