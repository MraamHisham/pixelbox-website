"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const supabaseUrl = "https://nngvbcabtppkhfnnpnnt.supabase.co";
const supabaseKey = "sb_publishable_1Ds5k-Sjn4gGpaXWnciS6w_F4wQf9Yc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedLang = localStorage.getItem('siteLang') as "ar" | "en";
    if (savedLang) {
      setLang(savedLang);
      document.documentElement.lang = savedLang;
      document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
    }

    async function fetchData() {
      const { data } = await supabase.from("products").select("*").eq("is_visible", true);
      if (data) setProducts(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const toggleLang = () => {
    const newLang = lang === "ar" ? "en" : "ar";
    setLang(newLang);
    localStorage.setItem('siteLang', newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  const t = {
    ar: {
      navHome: "الرئيسية",
      navProducts: "المنتجات",
      navAbout: "من نحن",
      navContact: "تواصل معنا",
      heroTitle: "الإبداع في كل بكسل",
      heroSubtitle: "نصنع لك تصاميم إعلانية وهويات بصرية تخطف الأنظار، بلمسة يدوية فاخرة.",
      heroCta: "اطلب تصميمك",
      fastShipping: "شحن سريع",
      fastShippingDesc: "لجميع مناطق المملكة",
      securePayment: "دفع آمن",
      securePaymentDesc: "بجميع الوسائل",
      quality: "جودة عالية",
      qualityDesc: "في كل منتج",
      support: "خدمة عملاء",
      supportDesc: "على مدار الساعة",
      latestProducts: "أحدث المنتجات",
      noProducts: "لا توجد منتجات حالياً.",
      currency: "ر.س",
      footerDesc: "نصنع الإبداع في كل بكسل.",
      quickLinks: "روابط سريعة",
      privacy: "سياسة الخصوصية",
      terms: "الشروط والأحكام",
      contactUs: "تواصل معنا",
      copyright: "© 2026 Pixel Box Ads. All rights reserved."
    },
    en: {
      navHome: "Home",
      navProducts: "Products",
      navAbout: "About Us",
      navContact: "Contact Us",
      heroTitle: "Creativity in Every Pixel",
      heroSubtitle: "We craft eye-catching ad designs and visual identities with a luxurious handmade touch.",
      heroCta: "Order Your Design",
      fastShipping: "Fast Shipping",
      fastShippingDesc: "To all regions of the Kingdom",
      securePayment: "Secure Payment",
      securePaymentDesc: "All payment methods",
      quality: "High Quality",
      qualityDesc: "In every product",
      support: "Customer Support",
      supportDesc: "24/7 Service",
      latestProducts: "Latest Products",
      noProducts: "No products available.",
      currency: "SAR",
      footerDesc: "We craft creativity in every pixel.",
      quickLinks: "Quick Links",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      contactUs: "Contact Us",
      copyright: "© 2026 Pixel Box Ads. All rights reserved."
    }
  };

  const text = t[lang];

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xl bg-[#fdfbf7] text-[#3e2723] font-cairo">Loading...</div>;

  return (
    <div className={`min-h-screen bg-[#fdfbf7] text-[#3e2723] font-cairo ${lang === 'ar' ? 'rtl' : 'ltr'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'} translate="no">
      
      {/* 1. قسم الـ Hero */}
      <section className="relative w-full min-h-screen bg-[#fdfbf7] flex items-center justify-center p-4 md:p-8 lg:p-12 pt-24 overflow-hidden">
        
        {/* حاوية الصورة المصغرة (عشان الحواف تبان) */}
        <div className="relative w-full h-[85vh] rounded-3xl overflow-hidden shadow-2xl">
          
          {/* الصورة كخلفية جوه الحاوية */}
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: "url('https://nngvbcabtppkhfnnpnnt.supabase.co/storage/v1/object/public/product-images/web.jpg')" }}
          ></div>

          {/* تدرج داكن على الشمال عشان الكلام يبان */}
          <div className="absolute inset-y-0 left-0 w-full md:w-2/3 bg-gradient-to-r from-black/80 to-transparent"></div>

          {/* الشريط اللي فوق (شفاف) */}
          <header className="absolute top-0 w-full z-30 py-6 px-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between relative">
              
              {/* اللينكات في النص */}
              <nav className="hidden md:flex gap-8 text-sm font-bold text-white drop-shadow-lg mx-auto">
                <Link href="/" className="hover:text-[#d4af37] transition">{text.navHome}</Link>
                <Link href="#products" className="hover:text-[#d4af37] transition">{text.navProducts}</Link>
                <Link href="/about" className="hover:text-[#d4af37] transition">{text.navAbout}</Link>
                <Link href="/contact" className="hover:text-[#d4af37] transition">{text.navContact}</Link>
              </nav>

              {/* الأيقونات واللغة */}
              <div className="flex items-center gap-6 text-white drop-shadow-lg absolute left-0">
                <button className="text-2xl">🛒</button>
                <button onClick={toggleLang} className="text-sm font-bold border border-white text-white px-4 py-1 rounded-full hover:bg-white hover:text-black transition">
                  {lang === 'ar' ? 'English' : 'عربي'}
                </button>
              </div>
            </div>
          </header>

          {/* الكلام (مثبت في الشمال) */}
          <div className="absolute top-1/2 -translate-y-1/2 left-8 md:left-16 z-20 max-w-xl text-right">
            <h2 className="font-playfair text-5xl md:text-7xl font-bold mb-6 text-[#d4af37] leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
              {text.heroTitle}
            </h2>
            <p className="text-lg md:text-xl mb-10 text-white font-medium drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
              {text.heroSubtitle}
            </p>
            <Link href="#products" className="inline-block bg-[#d4af37] text-white px-10 py-4 rounded-sm font-bold text-xl hover:bg-[#c19b2e] transition-all duration-300 shadow-xl">
              {text.heroCta}
            </Link>
          </div>
        </div>
      </section>

      {/* 3. المزايا */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-t border-[#e0d8cf] bg-[#fdfbf7]">
        <div><span className="text-3xl">🚚</span><h3 className="font-bold mt-2">{text.fastShipping}</h3><p className="text-sm text-gray-500">{text.fastShippingDesc}</p></div>
        <div><span className="text-3xl">🛡️</span><h3 className="font-bold mt-2">{text.securePayment}</h3><p className="text-sm text-gray-500">{text.securePaymentDesc}</p></div>
        <div><span className="text-3xl">⭐</span><h3 className="font-bold mt-2">{text.quality}</h3><p className="text-sm text-gray-500">{text.qualityDesc}</p></div>
        <div><span className="text-3xl">🎧</span><h3 className="font-bold mt-2">{text.support}</h3><p className="text-sm text-gray-500">{text.supportDesc}</p></div>
      </section>

      {/* 4. المنتجات */}
      <section id="products" className="max-w-7xl mx-auto px-6 py-16 bg-[#fdfbf7]">
        <h2 className="font-playfair text-3xl font-bold text-center mb-12">{text.latestProducts}</h2>
        {products.length === 0 ? (
          <p className="text-center text-gray-500">{text.noProducts}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => {
              const displayName = lang === 'en' && product.name_en ? product.name_en : product.name;
              return (
                <div key={product.id} className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-500">
                  <Link href={`/products/${product.id}?lang=${lang}`}>
                    <div className="relative aspect-square bg-[#f5f1eb] overflow-hidden">
                      {product.image_url ? (
                        <img src={product.image_url} alt={displayName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="flex items-center justify-center h-full text-[#8d6e63]">صورة المنتج</div>
                      )}
                    </div>
                  </Link>
                  <div className="p-5 text-center">
                    <Link href={`/products/${product.id}?lang=${lang}`}>
                      <h3 className="font-playfair text-lg font-bold mb-1">{displayName}</h3>
                    </Link>
                    <p className="text-[#d4af37] font-bold">{product.price} {text.currency}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 5. الفوتر */}
      <footer className="bg-[#3e2723] text-[#fdfbf7] py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right">
          <div>
            <h4 className="font-playfair text-2xl font-bold text-[#d4af37] mb-4">PIXEL BOX</h4>
            <p className="text-sm">{text.footerDesc}</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">{text.quickLinks}</h4>
            <ul className="space-y-2 text-sm text-[#e0d8cf]">
              <li><Link href="/privacy">{text.privacy}</Link></li>
              <li><Link href="/terms">{text.terms}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">{text.contactUs}</h4>
            <p className="text-sm">info@pixelboxads.shop</p>
          </div>
        </div>
        <div className="text-center text-xs mt-8 border-t border-[#5d4037] pt-6">
          {text.copyright}
        </div>
      </footer>
    </div>
  );
}