"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const whatsappNumber = "966580647288"; 
const emailAddress = "pixelads823@gmail.com"; 
const instagramLink = "https://www.instagram.com/pixel_box_ads"; 
const gmailComposeLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}`;

export default function Contact() {
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
    ar: { title: "تواصل معنا", subtitle: "فريقنا جاهز لمساعدتك في تنفيذ تصميمك الخاص. اختر وسيلة التواصل المفضلة لك.", whatsapp: "واتساب", whatsappDesc: "تواصل معنا مباشرة", email: "البريد الإلكتروني", emailDesc: "راسلنا في أي وقت", instagram: "إنستجرام", instagramDesc: "شاهد أحدث أعمالنا", back: "العودة للرئيسية" },
    en: { title: "Contact Us", subtitle: "Our team is ready to help you bring your custom design to life. Choose your preferred contact method.", whatsapp: "WhatsApp", whatsappDesc: "Chat with us directly", email: "Email", emailDesc: "Email us anytime", instagram: "Instagram", instagramDesc: "See our latest work", back: "Back to Home" }
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
        <div className="max-w-4xl mx-auto text-center w-full">
          <h2 className="font-playfair text-5xl md:text-6xl font-bold mb-6 text-[#d4af37]">{text.title}</h2>
          <p className="text-lg text-gray-600 mb-16">{text.subtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="bg-white p-8 rounded-3xl shadow-sm border border-[#e0d8cf] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group active:scale-95">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">💬</div>
              <h3 className="text-xl font-bold mb-2">{text.whatsapp}</h3>
              <p className="text-gray-500 text-sm">{text.whatsappDesc}</p>
            </a>
            <a href={gmailComposeLink} target="_blank" rel="noopener noreferrer" className="bg-white p-8 rounded-3xl shadow-sm border border-[#e0d8cf] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group active:scale-95">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">✉️</div>
              <h3 className="text-xl font-bold mb-2">{text.email}</h3>
              <p className="text-gray-500 text-sm">{text.emailDesc}</p>
            </a>
            <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="bg-white p-8 rounded-3xl shadow-sm border border-[#e0d8cf] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group active:scale-95">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">📸</div>
              <h3 className="text-xl font-bold mb-2">{text.instagram}</h3>
              <p className="text-gray-500 text-sm">{text.instagramDesc}</p>
            </a>
          </div>
        </div>
      </main>
      <footer className="border-t border-[#e0d8cf] py-6 text-center text-gray-500 text-sm">© 2026 Pixel Box Ads.</footer>
    </div>
  );
}