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
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => 
        p.category && p.category.toLowerCase().includes(category.toLowerCase())
      ));
    }
  };

  const t = {
    ar: {
      navHome: "الرئيسية", navProducts: "المنتجات", navAbout: "من نحن", navContact: "تواصل معنا",
      heroTitle: "الإبداع في كل بكسل", heroSubtitle: "نصنع لك تصاميم إعلانية وهويات بصرية تخطف الأنظار، بلمسة يدوية فاخرة.", heroCta: "اطلب تصميمك",
      categoriesTitle: "تصنيفاتنا",
      catAll: "الكل", catGift: "علب هدايا", catResin: "ريزن", catDTF: "طباعة DTF", catAcrylic: "أكريليك", catLaser: "ليزر", catHardcover: "علب صلبة", catTote: "شنط توت",
      latestProducts: "أحدث المنتجات", noProducts: "لا توجد منتجات في هذا التصنيف حالياً.", currency: "ر.س",
      login: "تسجيل الدخول", logout: "تسجيل الخروج",
      footerDesc: "نصنع الإبداع في كل بكسل.", quickLinks: "روابط سريعة", privacy: "سياسة الخصوصية", terms: "الشروط والأحكام", contactUs: "تواصل معنا", copyright: "© 2026 Pixel Box Ads. All rights reserved."
    },
    en: {
      navHome: "Home", navProducts: "Products", navAbout: "About Us", navContact: "Contact Us",
      heroTitle: "Creativity in Every Pixel", heroSubtitle: "We craft eye-catching ad designs and visual identities with a luxurious handmade touch.", heroCta: "Order Your Design",
      categoriesTitle: "Our Categories",
      catAll: "All", catGift: "Gift Boxes", catResin: "Resin", catDTF: "DTF", catAcrylic: "Acrylic", catLaser: "Laser", catHardcover: "Hardcover", catTote: "Tote Bags",
      latestProducts: "Latest Products", noProducts: "No products in this category.", currency: "SAR",
      login: "Login", logout: "Logout",
      footerDesc: "We craft creativity in every pixel.", quickLinks: "Quick Links", privacy: "Privacy Policy", terms: "Terms & Conditions", contactUs: "Contact Us", copyright: "© 2026 Pixel Box Ads. All rights reserved."
    }
  };

  const text = t[lang];

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xl bg-[#fdfbf7] text-[#3e2723] font-cairo">Loading...</div>;

  const categoriesList = [
    { id: "All", label: text.catAll },
    { id: "Gift Boxes", label: text.catGift },
    { id: "Resin", label: text.catResin },
    { id: "DTF", label: text.catDTF },
    { id: "Acrylic", label: text.catAcrylic },
    { id: "Laser", label: text.catLaser },
    { id: "Hardcover", label: text.catHardcover },
    { id: "Tote Bags", label: text.catTote },
  ];

  return (
    <div className={`min-h-screen bg-[#fdfbf7] text-[#3e2723] font-cairo ${lang === 'ar' ? 'rtl' : 'ltr'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'} translate="no">
      
      {/* قسم الـ Hero */}
      <section className="relative w-full h-[100dvh] overflow-hidden bg-black">
        
        {/* الصورة كاملة في الموبايل (مركزة على اليمين) وبتغطي الشاشة في اللاب */}
        <div className="absolute inset-0 bg-cover bg-[center_top] md:bg-center" style={{ backgroundImage: "url('https://nngvbcabtppkhfnnpnnt.supabase.co/storage/v1/object/public/product-images/web.jpg')" }}></div>
        
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-y-0 left-0 w-full md:w-1/2 bg-gradient-to-r from-black/80 to-transparent"></div>

        {/* الشريط اللي فوق (شفاف بالكامل) */}
        <header className="absolute top-0 w-full z-50 py-4 px-4 md:py-6 md:px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 relative">
            
            <nav className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm font-bold text-white drop-shadow-md mx-auto w-full">
              <Link href="/" className="hover:text-[#d4af37] active:scale-90 transition-all">{text.navHome}</Link>
              <Link href="#products" className="hover:text-[#d4af37] active:scale-90 transition-all">{text.navProducts}</Link>
              <Link href="#categories" className="hover:text-[#d4af37] active:scale-90 transition-all">{text.categoriesTitle}</Link>
              <Link href="/about" className="hover:text-[#d4af37] active:scale-90 transition-all">{text.navAbout}</Link>
              <Link href="/contact" className="hover:text-[#d4af37] active:scale-90 transition-all">{text.navContact}</Link>
            </nav>

            <div className="flex items-center gap-4 text-white drop-shadow-md md:absolute md:left-0 mt-2 md:mt-0">
              {user ? (
                <button onClick={handleLogout} className="text-xs md:text-sm border border-white px-3 py-1.5 md:px-4 md:py-2 rounded-full hover:bg-white hover:text-black active:scale-90 transition-all">{text.logout}</button>
              ) : (
                <Link href="/login" className="text-xs md:text-sm border border-white px-3 py-1.5 md:px-4 md:py-2 rounded-full hover:bg-white hover:text-black active:scale-90 transition-all">
                  {text.login}
                </Link>
              )}
              <button onClick={toggleLang} className="text-xs md:text-sm font-bold border border-white text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full hover:bg-white hover:text-black active:scale-90 transition-all">
                {lang === 'ar' ? 'EN' : 'عربي'}
              </button>
            </div>
          </div>
        </header>

        {/* الكلام */}
        <div className="absolute top-1/2 -translate-y-1/2 left-6 md:left-16 z-20 max-w-[85%] md:max-w-xl text-right mt-10 md:mt-0">
          <h2 className="font-playfair text-4xl md:text-7xl font-bold mb-4 md:mb-6 text-[#d4af37] leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
            {text.heroTitle}
          </h2>
          <p className="text-sm md:text-xl mb-8 md:mb-10 text-white font-medium drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
            {text.heroSubtitle}
          </p>
          <Link href="#products" className="inline-block bg-[#d4af37] text-white px-8 py-3 md:px-10 md:py-4 rounded-md font-bold text-lg md:text-xl hover:bg-[#c19b2e] hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl">
            {text.heroCta}
          </Link>
        </div>
      </section>

      {/* التصنيفات */}
      <section id="categories" className="max-w-7xl mx-auto px-6 py-24 bg-[#fdfbf7] text-center">
        <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-12">{text.categoriesTitle}</h2>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {categoriesList.map((cat) => (
            <button key={cat.id} onClick={() => handleCategoryClick(cat.id)} className={`px-6 py-2 md:px-8 md:py-3 rounded-full text-xs md:text-sm font-bold border transition-all duration-300 hover:scale-105 hover:-translate-y-1 active:scale-90 ${activeCategory === cat.id ? 'bg-[#d4af37] text-white border-[#d4af37] shadow-lg' : 'bg-white text-[#3e2723] border-[#e0d8cf] hover:border-[#d4af37] hover:text-[#d4af37]'}`}>
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* المنتجات (اتنين جنب بعض) */}
      <section id="products" className="max-w-7xl mx-auto px-4 md:px-6 py-24 bg-white border-t border-[#e0d8cf]">
        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-12">{text.latestProducts}</h2>
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">{text.noProducts}</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {filteredProducts.map((product) => {
              const displayName = lang === 'en' && product.name_en ? product.name_en : product.name;
              return (
                <div key={product.id} className="group bg-white rounded-xl shadow-sm overflow-hidden border border-[#e0d8cf] hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-2 active:scale-95 transition-all duration-300">
                  <Link href={`/products/${product.id}?lang=${lang}`}>
                    <div className="relative aspect-square bg-[#f5f1eb] overflow-hidden">
                      {product.image_url ? (
                        <img src={product.image_url} alt={displayName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      ) : (
                        <div className="flex items-center justify-center h-full text-[#8d6e63] text-sm md:text-base">صورة المنتج</div>
                      )}
                    </div>
                  </Link>
                  <div className="p-3 md:p-5 text-center">
                    <Link href={`/products/${product.id}?lang=${lang}`}>
                      <h3 className="font-playfair text-sm md:text-lg font-bold mb-1 group-hover:text-[#d4af37] transition-colors">{displayName}</h3>
                    </Link>
                    <p className="text-[#d4af37] font-bold text-xs md:text-base">{product.price} {text.currency}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* الفوتر */}
      <footer className="bg-[#2a1b19] text-[#fdfbf7] py-12 border-t border-[#5d4037]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right">
          <div>
            <h4 className="font-playfair text-2xl font-bold text-[#d4af37] mb-4">PIXEL BOX</h4>
            <p className="text-sm text-gray-400">{text.footerDesc}</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">{text.quickLinks}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/privacy" className="hover:text-[#d4af37] hover:scale-105 active:scale-90 inline-block transition-all">{text.privacy}</Link></li>
              <li><Link href="/terms" className="hover:text-[#d4af37] hover:scale-105 active:scale-90 inline-block transition-all">{text.terms}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">{text.contactUs}</h4>
            <p className="text-sm text-gray-400 mb-2">pixelads823@gmail.com</p>
            <div className="flex justify-center md:justify-start gap-4 mt-4">
              <a href="https://wa.me/966580647288" target="_blank" className="text-2xl hover:text-[#d4af37] hover:scale-125 active:scale-90 transition-all">💬</a>
              <a href="https://www.instagram.com/pixel_box_ads" target="_blank" className="text-2xl hover:text-[#d4af37] hover:scale-125 active:scale-90 transition-all">📸</a>
            </div>
          </div>
        </div>
        <div className="text-center text-xs mt-12 pt-6 border-t border-[#5d4037] text-gray-500">{text.copyright}</div>
      </footer>
    </div>
  );
}