"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Privacy() {
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
    ar: {
      title: "سياسة الخصوصية",
      p1: "نحن في Pixel Box Ads نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية.",
      p2: "نحن نجمع المعلومات التي تقدمها لنا طواعية (مثل اسمك ورقم هاتفك) عند تواصلك معنا عبر واتساب أو وسائل التواصل الاجتماعي.",
      p3: "نستخدم هذه المعلومات فقط للتواصل معك بخصوص استفساراتك أو طلباتك. لن نشارك بياناتك مع أي طرف ثالث لأغراض تسويقية.",
      p4: "لأي استفسارات، يمكنك التواصل معنا مباشرة.",
      back: "العودة للرئيسية"
    },
    en: {
      title: "Privacy Policy",
      p1: "At Pixel Box Ads, we respect your privacy and are committed to protecting your personal data.",
      p2: "We collect information that you voluntarily provide to us (such as your name and phone number) when you contact us via WhatsApp or social media.",
      p3: "We use this information only to contact you regarding your inquiries or requests. We will not share your data with any third party for marketing purposes.",
      p4: "For any inquiries, you can contact us directly.",
      back: "Back to Home"
    }
  };
  const text = t[lang];

  return (
    <div className={`min-h-screen bg-[#fdfbf7] text-[#3e2723] font-cairo flex flex-col ${lang === 'ar' ? 'rtl' : 'ltr'} animate-fade-in-up`} dir={lang === 'ar' ? 'rtl' : 'ltr'} translate="no">
      <header className="w-full border-b border-[#e0d8cf] p-6 flex justify-between items-center max-w-4xl mx-auto">
        <Link href="/" className="text-[#d4af37] hover:text-[#3e2723] transition-colors text-sm font-bold flex items-center gap-2 active:scale-95">
          <span>←</span> {text.back}
        </Link>
        <h1 className="font-playfair text-xl font-bold">PIXEL BOX</h1>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-20 flex-grow w-full">
        <h1 className="text-4xl font-playfair font-bold mb-10 text-[#d4af37]">{text.title}</h1>
        <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
          <p>{text.p1}</p>
          <p>{text.p2}</p>
          <p>{text.p3}</p>
          <p>{text.p4}</p>
        </div>
      </main>
      <footer className="border-t border-[#e0d8cf] py-6 text-center text-gray-500 text-sm">© 2026 Pixel Box Ads.</footer>
    </div>
  );
}