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

  useEffect(() => {
    async function fetchProduct() {
      if (!params.id) return;
      
      const { data: productData } = await supabase.from("products").select("*").eq("id", params.id).single();
      const { data: colorsData } = await supabase.from("product_colors").select("*").eq("product_id", params.id);

      if (productData) {
        setProduct(productData);
        const allowedColors = ['Black', 'White', 'Navy Blue', 'Brown', 'Pink', 'Red', 'Olive'];
        const filteredColors = (colorsData || []).filter(c => allowedColors.includes(c.color_name));
        
        setColors(filteredColors);
        setSelectedImage(productData.image_url || '');
      }
      setLoading(false);
    }
    fetchProduct();
  }, [params.id]);

  if (loading) return <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center font-cairo text-xl">جاري التحميل...</div>;
  if (!product) return <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center font-cairo text-xl">المنتج غير موجود</div>;

  const waMessage = encodeURIComponent(`مرحباً بكسل بوكس، أود الاستفسار عن منتج: ${product.name}`);
  const waLink = `https://wa.me/${whatsappNumber}?text=${waMessage}`;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-cairo" dir="rtl" translate="no">
      <header className="w-full border-b border-white/10 p-6 flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="text-[#D4AF37] hover:text-white transition-colors text-sm font-bold flex items-center gap-2">
          <span>→</span> العودة للمتجر
        </Link>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
          
          {/* صورة المنتج مع الأنيميشن */}
          <div className="relative aspect-square bg-[#000] rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center group perspective-1000 shadow-[0_0_50px_rgba(212,175,55,0.1)] hover:shadow-[0_0_80px_rgba(212,175,55,0.2)] transition-shadow duration-700">
            <div className="w-full h-full transition-transform duration-1000 ease-in-out group-hover:rotate-y-360 flex items-center justify-center overflow-hidden rounded-3xl p-8">
              {selectedImage ? (
                <img 
                  key={selectedImage} // عشان الصورة تعمل أنيميشن لما تتغير
                  src={selectedImage} 
                  alt={product.name} 
                  className="w-full h-full object-contain transition-all duration-700 animate-fade-in drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]" 
                />
              ) : (
                <span className="text-white/10 font-playfair text-4xl italic tracking-widest">PIXEL BOX</span>
              )}
            </div>
            {product.offer && (
              <span className="absolute top-6 right-6 bg-[#D4AF37] text-black text-sm font-black px-6 py-2 uppercase tracking-wider z-20 shadow-lg">{product.offer}</span>
            )}
          </div>

          {/* تفاصيل المنتج */}
          <div className="flex flex-col justify-center">
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
              {product.name}
            </h1>
            
            <div className="w-20 h-1 bg-[#D4AF37] mb-8 rounded-full"></div>

            <p className="text-gray-400 text-lg leading-relaxed mb-12 font-light">
              {product.description || "لا يوجد وصف متاح لهذا المنتج."}
            </p>

            {/* الألوان بشكل Line راقي مع أنيميشن */}
            {colors.length > 0 && (
              <div className="mb-14">
                <span className="text-sm text-[#D4AF37] mb-4 block uppercase tracking-widest font-bold">الألوان المتاحة:</span>
                <div className="flex gap-5 flex-wrap items-center">
                  {colors.map((colorObj: any, idx: number) => {
                    const isSoldOut = colorObj.is_available === false;
                    const isSelected = selectedImage === (colorObj.color_image_url || product.image_url);
                    
                    return (
                      <button 
                        key={idx} 
                        onClick={() => {
                          if (!isSoldOut) {
                            setSelectedImage(colorObj.color_image_url ? colorObj.color_image_url : product.image_url);
                          }
                        }}
                        disabled={isSoldOut}
                        className={`relative flex flex-col items-center justify-center w-10 h-14 transition-all duration-500 group/color ${isSoldOut ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:-translate-y-2'}`}
                        title={isSoldOut ? 'سولد أوت' : colorObj.color_name}
                      >
                        <div 
                          className={`w-3 h-12 rounded-full transition-all duration-500 ${isSelected ? 'ring-2 ring-[#D4AF37] ring-offset-4 ring-offset-[#050505] scale-110 shadow-[0_0_15px_rgba(212,175,55,0.5)] animate-pulse' : 'opacity-60 group-hover/color:opacity-100'}`}
                          style={{ backgroundColor: colorObj.color_code }}
                        />
                        {isSoldOut && (<span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs">X</span>)}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="relative overflow-hidden w-full md:w-auto inline-flex py-5 px-14 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] font-bold text-lg rounded-full items-center justify-center gap-3 transition-all duration-500 hover:bg-[#D4AF37] hover:text-black hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] group/btn">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover/btn:translate-x-[150%] transition-transform duration-1000"></div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className="w-5 h-5 relative z-10">
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                </svg>
                <span className="relative z-10">استفسر الآن</span>
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
    <Suspense fallback={<div className="min-h-screen bg-[#050505] text-white flex items-center justify-center font-cairo text-xl">جاري التحميل...</div>}>
      <ProductDetails />
    </Suspense>
  );
}