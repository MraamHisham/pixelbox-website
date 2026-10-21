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
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xl bg-[#fdfbf7] text-[#3e2723] font-cairo">Loading...</div>;

  return (
    <div className={`min-h-screen bg-[#fdfbf7] text-[#3e2723] font-cairo ${lang === 'ar' ? 'rtl' : 'ltr'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'} translate="no">
      
      {/* 1. الهيدر (Header) */}
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-[#e0d8cf] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <h1 className="font-playfair text-2xl font-bold text-[#d4af37]">LUXORA</h1>
          <nav className="hidden md:flex gap-8 text-sm font-bold text-[#3e2723]">
            <Link href="/">الرئيسية</Link>
            <Link href="/products">المنتجات</Link>
            <Link href="/about">من نحن</Link>
            <Link href="/contact">تواصل معنا</Link>
          </nav>
          <div className="flex items-center gap-6">
            <button className="text-2xl">🛒</button> {/* أيقونة السلة */}
            <button onClick={toggleLang} className="text-sm font-bold border border-[#d4af37] text-[#d4af37] px-4 py-1 rounded-full">
              {lang === 'ar' ? 'English' : 'عربي'}
            </button>
          </div>
        </div>
      </header>

      {/* 2. قسم الـ Hero (صورة كبيرة + كلام) */}
      <section className="relative w-full h-[80vh] flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1600&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-2xl px-6 text-white">
          <h2 className="font-playfair text-5xl md:text-6xl font-bold mb-4">تفاصيل صغيرة.. تصنع فرقاً كبيراً</h2>
          <p className="text-lg mb-8">منتجات عصرية تليق بمنزلك.</p>
          <Link href="#products" className="bg-[#d4af37] text-white px-8 py-3 rounded-md font-bold hover:bg-[#c19b2e] transition">
            تسوق الآن
          </Link>
        </div>
      </section>

      {/* 3. المزايا (شحن، دفع، جودة) */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div><span className="text-3xl">🚚</span><h3 className="font-bold mt-2">شحن سريع</h3><p className="text-sm text-gray-500">لجميع مناطق المملكة</p></div>
        <div><span className="text-3xl">🛡️</span><h3 className="font-bold mt-2">دفع آمن</h3><p className="text-sm text-gray-500">بجميع الوسائل</p></div>
        <div><span className="text-3xl">⭐</span><h3 className="font-bold mt-2">جودة عالية</h3><p className="text-sm text-gray-500">في كل منتج</p></div>
        <div><span className="text-3xl">🎧</span><h3 className="font-bold mt-2">خدمة عملاء</h3><p className="text-sm text-gray-500">على مدار الساعة</p></div>
      </section>

      {/* 4. المنتجات */}
      <section id="products" className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="font-playfair text-3xl font-bold text-center mb-12">أحدث المنتجات</h2>
        {products.length === 0 ? (
          <p className="text-center text-gray-500">لا توجد منتجات حالياً.</p>
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
                    <p className="text-[#d4af37] font-bold">{product.price} ر.س</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 5. الفوتر (Footer) */}
      <footer className="bg-[#3e2723] text-[#fdfbf7] py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right">
          <div>
            <h4 className="font-playfair text-2xl font-bold text-[#d4af37] mb-4">LUXORA</h4>
            <p className="text-sm">نصنع الإبداع في كل بكسل.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">روابط سريعة</h4>
            <ul className="space-y-2 text-sm text-[#e0d8cf]">
              <li><Link href="/privacy">سياسة الخصوصية</Link></li>
              <li><Link href="/terms">الشروط والأحكام</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">تواصل معنا</h4>
            <p className="text-sm">فريقنا جاهز لمساعدتك.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}