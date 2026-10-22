"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";

const supabaseUrl = "https://nngvbcabtppkhfnnpnnt.supabase.co";
const supabaseKey = "sb_publishable_1Ds5k-Sjn4gGpaXWnciS6w_F4wQf9Yc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const router = useRouter();

  useEffect(() => {
    const savedLang = localStorage.getItem('siteLang') as "ar" | "en";
    if (savedLang) {
      setLang(savedLang);
      document.documentElement.lang = savedLang;
      document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
    }

    async function fetchData() {
      const { data } = await supabase.from("products").select("*").eq("is_visible", true);
      if (data) {
        setProducts(data);
        setFilteredProducts(data);
      }
      
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      
      setLoading(false);
    }
    fetchData();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => { authListener.subscription.unsubscribe(); };
  }, []);

  const toggleLang = () => {
    const newLang = lang === "ar" ? "en" : "ar";
    setLang(newLang);
    localStorage.setItem('siteLang', newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    if (category === "All") setFilteredProducts(products);
    else setFilteredProducts(products.filter(p => p.category === category));
  };

  const t = {
    ar: {
      navHome: "الرئيسية", navProducts: "المنتجات", navAbout: "من نحن", navContact: "تواصل معنا",
      heroTitle: "الإبداع في كل بكسل", heroSubtitle: "نصنع لك تصاميم إعلانية وهويات بصرية تخطف الأنظار، بلمسة يدوية فاخرة.", heroCta: "اطلب تصميمك",
      categoriesTitle: "تصنيفاتنا",
      catAll: "الكل", 
      cat1: "علب هدايا مخصصة", 
      cat2: "ريزن | طباعة | أكريليك | حفر ليزر", 
      cat3: "علب صلبة وليزر",
      latestProducts: "أحدث المنتجات", noProducts: "لا توجد منتجات في هذا التصنيف حالياً.", currency: "ر.س",
      login: "تسجيل الدخول", logout: "تسجيل الخروج",
      footerDesc: "نصنع الإبداع في كل بكسل.", quickLinks: "روابط سريعة", privacy: "سياسة الخصوصية", terms: "الشروط والأحكام", contactUs: "تواصل معنا", copyright: "© 2026 Pixel Box Ads. All rights reserved."
    },
    en: {
      navHome: "Home", navProducts: "Products", navAbout: "About Us", navContact: "Contact Us",
      heroTitle: "Creativity in Every Pixel", heroSubtitle: "We craft eye-catching ad designs and visual identities with a luxurious handmade touch.", heroCta: "Order Your Design",
      categoriesTitle: "Our Categories",
      catAll: "All", 
      cat1: "Custom Gift Boxes", 
      cat2: "Resin | DTF | Acrylic | Laser Engravin", 
      cat3: "Hardcover & Laser Boxes",
      latestProducts: "Latest Products", noProducts: "No products in this category.", currency: "SAR",
      login: "Login", logout: "Logout",
      footerDesc: "We craft creativity in every pixel.", quickLinks: "Quick Links", privacy: "Privacy Policy", terms: "Terms & Conditions", contactUs: "Contact Us", copyright: "© 2026 Pixel Box Ads. All rights reserved."
    }
  };

  const text = t[lang];

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xl bg-[#fdfbf7] text-[#3e2723] font-cairo">Loading...</div>;

  return (
    <div className={`min-h-screen bg-[#fdfbf7] text-[#3e2723] font-cairo ${lang === 'ar' ? 'rtl' : 'ltr'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'} translate="no">
      
      {/* 1. قسم الـ Hero */}
      <section className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-[center_top]" style={{ backgroundImage: "url('https://nngvbcabtppkhfnnpnnt.supabase.co/storage/v1/object/public/product-images/web.jpg')" }}></div>
        <div className="absolute inset-y-0 left-0 w-full md:w-1/2 bg-gradient-to-r from-black/80 to-transparent"></div>

        <header className="absolute top-0 w-full z-50 py-6 px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between relative">
            <nav className="hidden md:flex gap-8 text-sm font-bold text-white drop-shadow-md mx-auto">
              <Link href="/" className="hover:text-[#d4af37] transition active:scale-95">{text.navHome}</Link>
              <Link href="#products" className="hover:text-[#d4af37] transition active:scale-95">{text.navProducts}</Link>
              <Link href="#categories" className="hover:text-[#d4af37] transition active:scale-95">{text.categoriesTitle}</Link>
              <Link href="/about" className="hover:text-[#d4af37] transition active:scale-95">{text.navAbout}</Link>
              <Link href="/contact" className="hover:text-[#d4af37] transition active:scale-95">{text.navContact}</Link>
            </nav>
            
            <div className="flex items-center gap-6 text-white drop-shadow-md absolute left-0">
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold hidden md:block">أهلاً، {user.user_metadata?.full_name || 'عميل'}</span>
                  <button onClick={handleLogout} className="text-sm border border-white px-3 py-1 rounded-full hover:bg-white hover:text-black transition active:scale-95">{text.logout}</button>
                </div>
              ) : (
                <Link href="/login" className="text-sm border border-white px-3 py-1 rounded-full hover:bg-white hover:text-black transition active:scale-95 flex items-center gap-2">
                  {text.login}
                </Link>
              )}
              <button onClick={toggleLang} className="text-sm font-bold border border-white text-white px-4 py-1 rounded-full hover:bg-white hover:text-black transition active:scale-95">
                {lang === 'ar' ? 'English' : 'عربي'}
              </button>
            </div>
          </div>
        </header>

        <div className="absolute top-1/2 -translate-y-1/2 left-8 md:left-16 z-20 max-w-xl text-right">
          <h2 className="font-playfair text-5xl md:text-7xl font-bold mb-6 text-[#d4af37] leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">{text.heroTitle}</h2>
          <p className="text-lg md:text-xl mb-10 text-white font-medium drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">{text.heroSubtitle}</p>
          <Link href="#products" className="inline-block bg-[#d4af37] text-white px-10 py-4 rounded-sm font-bold text-xl hover:bg-[#c19b2e] transition-all duration-300 shadow-xl active:scale-95">{text.heroCta}</Link>
        </div>
      </section>

      {/* 2. قسم التصنيفات */}
      <section id="categories" className="max-w-7xl mx-auto px-6 py-24 bg-[#fdfbf7]">
        <h2 className="font-playfair text-4xl font-bold text-center mb-12 animate-fade-in-up">{text.categoriesTitle}</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={() => handleCategoryClick("All")} className={`px-8 py-3 rounded-full border border-[#e0d8cf] text-sm font-bold transition-all duration-300 active:scale-95 ${activeCategory === "All" ? 'bg-[#d4af37] text-white shadow-md' : 'bg-white text-[#3e2723] hover:bg-[#f5f1eb]'}`}>{text.catAll}</button>
          <button onClick={() => handleCategoryClick("Gift Boxes")} className={`px-8 py-3 rounded-full border border-[#e0d8cf] text-sm font-bold transition-all duration-300 active:scale-95 ${activeCategory === "Gift Boxes" ? 'bg-[#d4af37] text-white shadow-md' : 'bg-white text-[#3e2723] hover:bg-[#f5f1eb]'}`}>{text.cat1}</button>
          <button onClick={() => handleCategoryClick("Resin")} className={`px-8 py-3 rounded-full border border-[#e0d8cf] text-sm font-bold transition-all duration-300 active:scale-95 ${activeCategory === "Resin" ? 'bg-[#d4af37] text-white shadow-md' : 'bg-white text-[#3e2723] hover:bg-[#f5f1eb]'}`}>{text.cat2}</button>
          <button onClick={() => handleCategoryClick("Hardcover")} className={`px-8 py-3 rounded-full border border-[#e0d8cf] text-sm font-bold transition-all duration-300 active:scale-95 ${activeCategory === "Hardcover" ? 'bg-[#d4af37] text-white shadow-md' : 'bg-white text-[#3e2723] hover:bg-[#f5f1eb]'}`}>{text.cat3}</button>
        </div>
      </section>

      {/* 3. المنتجات */}
      <section id="products" className="max-w-7xl mx-auto px-6 py-24 bg-white border-t border-[#e0d8cf]">
        <h2 className="font-playfair text-4xl font-bold text-center mb-12 animate-fade-in-up">{text.latestProducts}</h2>
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">{text.noProducts}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => {
              const displayName = lang === 'en' && product.name_en ? product.name_en : product.name;
              return (
                <div key={product.id} className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-2xl transition-all duration-500 touch-card animate-fade-in-up border border-[#e0d8cf]">
                  <Link href={`/products/${product.id}?lang=${lang}`}>
                    <div className="relative aspect-square bg-[#f5f1eb] overflow-hidden">
                      {product.image_url ? (
                        <img src={product.image_url} alt={displayName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      ) : (
                        <div className="flex items-center justify-center h-full text-[#8d6e63]">صورة المنتج</div>
                      )}
                    </div>
                  </Link>
                  <div className="p-5 text-center">
                    <Link href={`/products/${product.id}?lang=${lang}`}>
                      <h3 className="font-playfair text-lg font-bold mb-1 group-hover:text-[#d4af37] transition">{displayName}</h3>
                    </Link>
                    <p className="text-[#d4af37] font-bold">{product.price} {text.currency}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. الفوتر */}
      <footer className="bg-[#2a1b19] text-[#fdfbf7] py-12 border-t border-[#5d4037]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right">
          <div>
            <h4 className="font-playfair text-2xl font-bold text-[#d4af37] mb-4">PIXEL BOX</h4>
            <p className="text-sm text-gray-400">{text.footerDesc}</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">{text.quickLinks}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/privacy" className="hover:text-[#d4af37] transition active:scale-95">{text.privacy}</Link></li>
              <li><Link href="/terms" className="hover:text-[#d4af37] transition active:scale-95">{text.terms}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">{text.contactUs}</h4>
            <p className="text-sm text-gray-400 mb-2">pixelads823@gmail.com</p>
            <div className="flex justify-center md:justify-start gap-4 mt-4">
              <a href="https://wa.me/966580647288" target="_blank" className="text-2xl hover:text-[#d4af37] transition active:scale-95">💬</a>
              <a href="https://www.instagram.com/pixel_box_ads" target="_blank" className="text-2xl hover:text-[#d4af37] transition active:scale-95">📸</a>
            </div>
          </div>
        </div>
        <div className="text-center text-xs mt-12 pt-6 border-t border-[#5d4037] text-gray-500">{text.copyright}</div>
      </footer>
    </div>
  );
}