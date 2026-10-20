"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const supabaseUrl = "https://nngvbcabtppkhfnnpnnt.supabase.co";
const supabaseKey = "sb_publishable_1Ds5k-Sjn4gGpaXWnciS6w_F4wQf9Yc";
const supabase = createClient(supabaseUrl, supabaseKey);

const whatsappNumber = "966580647288";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [hoveredReview, setHoveredReview] = useState<number | null>(null);

  useEffect(() => {
    // أول ما الصفحة تفتح، بنشوف لو المستخدم كان مختار لغة قبل كده
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
    localStorage.setItem('siteLang', newLang); // السطر ده بيحفظ اللغة في المتصفح
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  const t = {
    ar: {
      subtitle: "الإبداع في ", highlight: "كل بكسل",
      desc: "نصنع لك تصاميم إعلانية وهويات بصرية تخطف الأنظار، بلمسة يدوية فاخرة.",
      noProducts: "لا توجد منتجات حالياً", cta: "اكتشف أعمالنا", inquire: "استفسر الآن",
      availableColors: "متاح بعدة ألوان - اضغط للتفاصيل",
      account: "حسابي", cart: "السلة", settings: "الإعدادات",
      testimonialsTitle: "ماذا يقول عملاؤنا؟", faqTitle: "الأسئلة الشائعة",
      q1: "كيف يمكنني الطلب؟", a1: "يمكنك الضغط على زر (استفسر الآن) لأي منتج، وسنرد عليك عبر واتساب فوراً لترتيب التفاصيل.",
      q2: "كم تستغرق مدة التنفيذ؟", a2: "تختلف حسب المنتج، ولكن في الغالب تستغرق التصاميم من 3 إلى 5 أيام عمل.",
      q3: "هل يمكنني طلب تصميم مخصص؟", a3: "بالتأكيد! نحن نصنع تصاميم مخصصة بالكامل حسب طلبك.",
      footerDesc: "نصنع الإبداع في كل بكسل. تصاميم فاخرة تليق بعلامتك التجارية.",
      quickLinks: "روابط سريعة", privacy: "سياسة الخصوصية", terms: "الشروط والأحكام",
      contactUs: "تواصل معنا", contactDesc: "فريقنا جاهز لمساعدتك.", clickHere: "اضغط هنا",
      copyright: "© 2026 Pixel Box Ads. All rights reserved."
    },
    en: {
      subtitle: "Creativity in ", highlight: "Every Pixel",
      desc: "We craft eye-catching ad designs and visual identities with a luxurious handmade touch.",
      noProducts: "No products available", cta: "Discover Our Work", inquire: "Inquire Now",
      availableColors: "Available in multiple colors - Click for details",
      account: "Account", cart: "Cart", settings: "Settings",
      testimonialsTitle: "What Our Clients Say", faqTitle: "Frequently Asked Questions",
      q1: "How can I order?", a1: "Click the (Inquire Now) button on any product, and we will contact you via WhatsApp immediately.",
      q2: "How long does it take?", a2: "It varies by product, but designs usually take 3 to 5 business days.",
      q3: "Can I request a custom design?", a3: "Absolutely! We create fully customized designs based on your requirements.",
      footerDesc: "We craft creativity in every pixel. Luxury designs that fit your brand.",
      quickLinks: "Quick Links", privacy: "Privacy Policy", terms: "Terms & Conditions",
      contactUs: "Contact Us", contactDesc: "Our team is ready to help you.", clickHere: "Click Here",
      copyright: "© 2026 Pixel Box Ads. All rights reserved."
    }
  };

  const text = t[lang];

  const reviews = [
    { text: lang === 'ar' ? "تصميماتهم فاقت توقعاتي، اهتمامهم بالتفاصيل لا يوصف!" : "Their designs exceeded my expectations!", name: lang === 'ar' ? "سارة م." : "Sarah M." },
    { text: lang === 'ar' ? "تعامل راقي وتسليم في الوقت المحدد. أنصح بهم بشدة." : "Professional service and delivered on time.", name: lang === 'ar' ? "أحمد ك." : "Ahmed K." },
    { text: lang === 'ar' ? "أفضل تجربة تصميم مررت بها، شكراً لكم." : "Best design experience I've had, thank you.", name: lang === 'ar' ? "خالد ع." : "Khalid A." }
  ];

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xl bg-black text-white font-cairo">Loading...</div>;

  return (
    <div className={`min-h-screen bg-[#050505] text-white font-cairo ${lang === 'ar' ? 'rtl' : 'ltr'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'} translate="no">
      
      <header className="sticky top-0 w-full z-50 bg-black/60 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] flex items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:shadow-[0_0_20px_#D4AF37]">
              <span className="font-playfair text-xl font-bold text-white z-10 group-hover:text-[#D4AF37] transition-colors duration-300">P</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#D4AF37]/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </div>
            <h1 className="font-playfair text-xl tracking-widest uppercase text-white transition-all duration-300 group-hover:text-[#D4AF37] group-hover:tracking-[0.2em]">Pixel Box</h1>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative group/icon text-gray-400 hover:text-[#D4AF37] transition-all duration-300 hover:scale-110 flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              <span className="text-[10px] mt-1 opacity-0 group-hover/icon:opacity-100 transition-opacity">{text.account}</span>
            </button>
            
            <button className="relative group/icon text-gray-400 hover:text-[#D4AF37] transition-all duration-300 hover:scale-110 flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <span className="text-[10px] mt-1 opacity-0 group-hover/icon:opacity-100 transition-opacity">{text.cart}</span>
            </button>

            <div className="relative group/settings">
              <button className="text-gray-400 hover:text-[#D4AF37] transition-all duration-300 hover:scale-110 hover:rotate-90 flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-[10px] mt-1 opacity-0 group-hover/settings:opacity-100 transition-opacity">{text.settings}</span>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-[#111] border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover/settings:opacity-100 group-hover/settings:visible transition-all duration-300 z-50">
                <ul className="py-2 text-sm text-gray-300">
                  <li><button className="w-full text-right px-4 py-2 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-colors">{text.account}</button></li>
                  <li><button className="w-full text-right px-4 py-2 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-colors">{lang === 'ar' ? 'تسجيل الخروج' : 'Logout'}</button></li>
                </ul>
              </div>
            </div>

            <button onClick={toggleLang} className="px-5 py-2 border border-white/20 hover:border-[#D4AF37] text-sm font-bold rounded-full transition-all duration-300 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10">
              {lang === 'ar' ? 'English' : 'عربي'}
            </button>
          </div>
        </div>
      </header>

      <section className="pt-32 pb-24 px-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none"></div>
        <h2 className="font-playfair text-5xl md:text-8xl font-bold mb-6 flex flex-wrap justify-center items-center gap-x-4">
          <span>{text.subtitle}</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]">{text.highlight}</span>
        </h2>
        <p className="max-w-2xl mx-auto text-gray-400 text-lg mb-10 font-light">{text.desc}</p>
        <a href="#products" className="inline-block px-10 py-5 bg-white text-black font-bold text-lg rounded-full hover:bg-[#D4AF37] hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)]">{text.cta}</a>
      </section>

      <main id="products" className="max-w-7xl mx-auto px-6 py-20">
        {products.length === 0 ? (
          <p className="text-center text-gray-500 text-xl">{text.noProducts}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              const displayName = lang === 'en' && product.name_en ? product.name_en : product.name;
              const waMessage = encodeURIComponent(lang === 'ar' ? `مرحباً بكسل بوكس، أود الاستفسار عن منتج: ${displayName}` : `Hello Pixel Box, I would like to inquire about: ${displayName}`);
              const waLink = `https://wa.me/${whatsappNumber}?text=${waMessage}`;

              return (
                <div key={product.id} className="group relative bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden flex flex-col transition-all duration-500 hover:border-[#D4AF37]/40 hover:shadow-[0_20px_50px_-10px_rgba(212,175,55,0.2)]">
                  <Link href={`/products/${product.id}`}>
                    <div className="relative aspect-square bg-[#000] flex items-center justify-center overflow-hidden cursor-pointer">
                      <div className="w-full h-full flex items-center justify-center p-8 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 group-hover:-translate-y-2 group-hover:drop-shadow-[0_20px_20px_rgba(212,175,55,0.3)]">
                        {product.image_url ? (
                          <img src={product.image_url} alt={displayName} className="w-full h-full object-contain" />
                        ) : (
                          <span className="text-white/10 font-playfair text-3xl italic tracking-widest">{displayName}</span>
                        )}
                      </div>
                      {product.offer && <span className="absolute top-4 right-4 bg-[#D4AF37] text-black text-[10px] font-black px-3 py-1 uppercase tracking-wider z-20">{product.offer}</span>}
                    </div>
                  </Link>
                  <div className="p-6 flex flex-col flex-grow bg-[#0a0a0a]">
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-playfair text-xl font-bold mb-2 text-white group-hover:text-[#D4AF37] transition-colors duration-300 cursor-pointer">{displayName}</h3>
                    </Link>
                    <p className="text-[#D4AF37] text-sm mb-6 opacity-80 cursor-pointer hover:underline" onClick={() => window.location.href = `/products/${product.id}`}>
                      {text.availableColors}
                    </p>
                    <div className="mt-auto">
                      <a href={waLink} target="_blank" rel="noopener noreferrer" className="relative overflow-hidden w-full py-3 bg-transparent border border-[#D4AF37] text-[#D4AF37] font-bold text-sm rounded-lg flex items-center justify-center gap-2 transition-all duration-500 hover:bg-[#D4AF37] hover:text-black group/btn">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] group-hover/btn:translate-x-[150%] transition-transform duration-1000"></div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className="w-4 h-4 relative z-10">
                          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                        </svg>
                        <span className="relative z-10">{text.inquire}</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <section className="py-20 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-playfair font-bold mb-12 text-white">{text.testimonialsTitle}</h2>
          <div className="flex justify-center gap-8 mb-10 h-32 items-center">
            {reviews.map((review, idx) => (
              <div key={idx} className="relative" onMouseEnter={() => setHoveredReview(idx)} onMouseLeave={() => setHoveredReview(null)}>
                <div className={`w-20 h-20 rounded-full flex items-center justify-center border-2 transition-all duration-300 cursor-pointer ${hoveredReview === idx ? 'border-[#D4AF37] bg-[#D4AF37] text-black scale-110 shadow-[0_0_20px_rgba(212,175,55,0.4)]' : 'border-white/20 text-gray-400 hover:border-[#D4AF37]'}`}>
                  <span className="font-bold text-sm">{review.name}</span>
                </div>
                <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 bg-[#1a1a1a] text-white text-sm p-4 rounded-xl border border-[#D4AF37]/30 shadow-xl transition-all duration-300 pointer-events-none ${hoveredReview === idx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  "{review.text}"
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#D4AF37]/30"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-playfair font-bold text-center mb-12 text-white">{text.faqTitle}</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-white/10 rounded-xl overflow-hidden bg-[#0a0a0a] transition-all duration-300 hover:border-[#D4AF37]/30">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-right p-6 flex justify-between items-center text-lg font-bold text-white hover:text-[#D4AF37] transition-colors">
                <span>{text[`q${i}` as keyof typeof text]}</span>
                <span className={`text-2xl transform transition-transform duration-300 ${openFaq === i ? 'rotate-45 text-[#D4AF37]' : 'rotate-0'}`}>+</span>
              </button>
              <div className={`transition-all duration-500 ease-in-out overflow-hidden ${openFaq === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-6 pt-0 text-gray-400 border-t border-white/5">
                  {text[`a${i}` as keyof typeof text]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 py-12 bg-black">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right">
          <div>
            <h4 className="font-playfair text-xl text-white mb-4">Pixel Box</h4>
            <p className="text-gray-500 text-sm leading-relaxed">{text.footerDesc}</p>
          </div>
          <div>
            <h4 className="font-playfair text-xl text-white mb-4">{text.quickLinks}</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/privacy" className="hover:text-[#D4AF37] transition-colors">{text.privacy}</Link></li>
              <li><Link href="/terms" className="hover:text-[#D4AF37] transition-colors">{text.terms}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-playfair text-xl text-white mb-4">{text.contactUs}</h4>
            <p className="text-gray-500 text-sm mb-4">{text.contactDesc}</p>
            <a href={`https://wa.me/${whatsappNumber}`} className="text-[#D4AF37] text-sm hover:underline">{text.clickHere}</a>
          </div>
        </div>
        <div className="text-center text-gray-600 text-sm mt-12 border-t border-white/5 pt-6">
          {text.copyright}
        </div>
      </footer>
    </div>
  );
}