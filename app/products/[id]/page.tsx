"use client";

import { useEffect, useState, Suspense } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { useParams } from "next/navigation";

const supabaseUrl = "https://nngvbcabtppkhfnnpnnt.supabase.co";
const supabaseKey = "sb_publishable_1Ds5k-Sjn4gGpaXWnciS6w_F4wQf9Yc";
const supabase = createClient(supabaseUrl, supabaseKey);

const whatsappNumber = "966580647288";

function ProductDetails() {
  const params = useParams();
  const [product, setProduct] = useState<any>(null);
  const [colors, setColors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>('');
  
  const [lang, setLang] = useState<"ar" | "en">("ar");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang') as "ar" | "en";
    if (urlLang) {
      setLang(urlLang);
      document.documentElement.lang = urlLang;
      document.documentElement.dir = urlLang === "ar" ? "rtl" : "ltr";
    }

    async function fetchProduct() {
      if (!params.id) return;
      
      const { data: productData } = await supabase.from("products").select("*").eq("id", params.id).single();
      // التعديل الأول: إضافة شرط is_visible هنا عشان يجيب الألوان الظاهرة بس
      const { data: colorsData } = await supabase.from("product_colors").select("*").eq("product_id", params.id).eq("is_visible", true);

      if (productData) {
        setProduct(productData);
        setColors(colorsData || []);
        setSelectedImage(productData.image_url || '');
      }
      setLoading(false);
    }
    fetchProduct();
  }, [params.id]);

  if (loading) return <div className="min-h-screen bg-[#fdfbf7] text-[#3e2723] flex items-center justify-center font-cairo text-xl">جاري التحميل...</div>;
  if (!product) return <div className="min-h-screen bg-[#fdfbf7] text-[#3e2723] flex items-center justify-center font-cairo text-xl">المنتج غير موجود</div>;

  const waMessage = encodeURIComponent(lang === 'ar' ? `مرحباً بكسل بوكس، أود الاستفسار عن منتج: ${product.name}` : `Hello Pixel Box, I would like to inquire about: ${product.name}`);
  const waLink = `https://wa.me/${whatsappNumber}?text=${waMessage}`;

  const t = {
    ar: { back: "العودة للمتجر", notAvailable: "لا يوجد وصف متاح لهذا المنتج.", availableColors: "الألوان المتاحة:", inquire: "اطلب تصميمك", soldOut: "سولد أوت", currency: "ر.س", hint: "مرر أو المس لرؤية المنتج 360°" },
    en: { back: "Back to Store", notAvailable: "No description available for this product.", availableColors: "Available Colors:", inquire: "Order Your Design", soldOut: "Sold Out", currency: "SAR", hint: "Hover or touch to see 360°" }
  };
  const text = t[lang];
  const displayName = lang === 'en' && product.name_en ? product.name_en : product.name;

  return (
    <div className={`min-h-screen bg-[#fdfbf7] text-[#3e2723] font-cairo ${lang === 'ar' ? 'rtl' : 'ltr'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'} translate="no">
      <header className="w-full border-b border-[#e0d8cf] p-6 flex items-center justify-between max-w-7xl mx-auto">
        <Link href={`/?lang=${lang}`} className="text-[#d4af37] hover:text-[#3e2723] transition-colors text-sm font-bold flex items-center gap-2 active:scale-90 touch-btn">
          <span>→</span> {text.back}
        </Link>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          
          <div className="relative aspect-square bg-[#f5f1eb] rounded-3xl border border-[#e0d8cf] overflow-hidden flex items-center justify-center group perspective-1000 shadow-sm hover:shadow-xl transition-shadow duration-700">
            {/* التعديل الثاني: تغيير p-8 إلى p-0 عشان الصورة تلزق في الفريم */}
            <div className="w-full h-full transition-transform duration-1000 ease-in-out group-hover:rotate-y-360 group-active:rotate-y-360 flex items-center justify-center overflow-hidden rounded-3xl p-0">
              {selectedImage ? (
                /* التعديل الثاني: تغيير object-contain إلى object-cover عشان الصورة تملأ الإطار */
                <img key={selectedImage} src={selectedImage} alt={displayName} className="w-full h-full object-cover transition-all duration-700 animate-fade-in drop-shadow-md" />
              ) : (
                <span className="text-[#d4af37]/20 font-playfair text-4xl italic tracking-widest">PIXEL BOX</span>
              )}
            </div>
            <div className="absolute bottom-4 text-xs text-gray-500 bg-white/80 px-3 py-1 rounded-full backdrop-blur-sm z-20 pointer-events-none opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity">
              {text.hint}
            </div>
            {product.offer && (
              <span className="absolute top-6 right-6 bg-[#d4af37] text-white text-sm font-black px-6 py-2 uppercase tracking-wider z-20 shadow-lg">{product.offer}</span>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6 text-[#3e2723] leading-tight">{displayName}</h1>
            <div className="w-20 h-1 bg-[#d4af37] mb-8 rounded-full"></div>
            <p className="text-gray-600 text-lg leading-relaxed mb-12 font-light">{product.description || text.notAvailable}</p>

            {colors.length > 0 && (
              <div className="mb-14">
                <span className="text-sm text-[#d4af37] mb-4 block uppercase tracking-widest font-bold">{text.availableColors}</span>
                <div className="flex gap-5 flex-wrap items-center">
                  {colors.map((colorObj: any, idx: number) => {
                    const isSoldOut = colorObj.is_available === false;
                    const isSelected = selectedImage === (colorObj.color_image_url || product.image_url);
                    
                    return (
                      <button 
                        key={idx} 
                        onClick={() => { 
                          if (!isSoldOut) {
                            const newImage = colorObj.color_image_url ? colorObj.color_image_url : product.image_url;
                            setSelectedImage(newImage);
                          } 
                        }} 
                        disabled={isSoldOut}
                        className={`relative flex flex-col items-center justify-center w-12 h-16 transition-all duration-300 active:scale-90 touch-btn group/color ${isSoldOut ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:-translate-y-2'}`} 
                        title={isSoldOut ? text.soldOut : colorObj.color_name}
                      >
                        <div className={`w-4 h-14 rounded-full transition-all duration-500 ${isSelected ? 'ring-2 ring-[#d4af37] ring-offset-4 ring-offset-[#fdfbf7] scale-110 shadow-[0_0_15px_rgba(212,175,55,0.5)] animate-pulse' : 'opacity-60 group-hover/color:opacity-100'} ${isSoldOut ? 'grayscale' : ''}`} style={{ backgroundColor: colorObj.color_code }} />
                        {isSoldOut && (<span className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg drop-shadow-md">X</span>)}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="relative overflow-hidden w-full md:w-auto inline-flex py-5 px-14 bg-[#d4af37] text-white font-bold text-lg rounded-md items-center justify-center gap-3 transition-all duration-300 hover:bg-[#c19b2e] active:scale-95 touch-btn hover:shadow-xl">
                <span className="relative z-10">{text.inquire}</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ProductPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fdfbf7] text-[#3e2723] flex items-center justify-center font-cairo text-xl">جاري التحميل...</div>}>
      <ProductDetails />
    </Suspense>
  );
}