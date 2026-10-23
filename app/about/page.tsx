"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function About() {
  const [lang, setLang] = useState<"ar" | "en">("ar");

  useEffect(() => {
    const savedLang = localStorage.getItem('siteLang') as "ar" | "en";
    if (savedLang) {
      setLang(savedLang);
      document.documentElement.lang = savedLang;
      document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
    }
  }, []);

  const t = {
    ar: { title: "من نحن", p1: "نحن علامة تجارية متخصصة في تصميم وتنفيذ علب الهدايا الفاخرة، الشوكولاتة، والعطور.", p2: "نؤمن بأن التفاصيل الصغيرة تصنع فرقاً كبيراً، ولذلك نضع لمساتنا الفنية في كل منتج لنقدم لك تجربة استثنائية تعكس ذوقك الرفيع.", back: "العودة للرئيسية" },
    en: { title: "About Us", p1: "We are a brand specialized in designing and crafting luxury gift boxes, chocolate boxes, and perfumes.", p2: "We believe small details make a big difference, so we add our artistic touch to every product to give you an exceptional experience that reflects your fine taste.", back: "Back to Home" }
  };
  const text = t[lang];

  return (
    <div className={`min-h-screen bg-[#fdfbf7] text-[#3e2723] font-cairo flex flex-col ${lang === 'ar' ? 'rtl' : 'ltr'} animate-fade-in-up`} dir={lang === 'ar' ? 'rtl' : 'ltr'} translate="no">
      <header className="w-full border-b border-[#e0d8cf] p-6 flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="text-[#d4af37] hover:text-[#3e2723] transition-colors text-sm font-bold flex items-center gap-2 active:scale-95">
          <span>→</span> {text.back}
        </Link>
        <h1 className="font-playfair text-xl font-bold">PIXEL BOX</h1>
      </header>
      <main className="flex-grow flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-5xl md:text-6xl font-bold mb-8 text-[#d4af37]">{text.title}</h2>
          <div className="w-24 h-1 bg-[#d4af37] mx-auto mb-12 rounded-full"></div>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-light mb-8">{text.p1}</p>
          <p className="text-lg text-gray-600 leading-relaxed font-light">{text.p2}</p>
        </div>
      </main>
      <footer className="border-t border-[#e0d8cf] py-6 text-center text-gray-500 text-sm">© 2026 Pixel Box Ads.</footer>
    </div>
  );
}