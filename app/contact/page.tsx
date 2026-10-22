"use client";

import Link from "next/link";

const whatsappNumber = "966580647288"; 
const emailAddress = "pixelads823@gmail.com"; 
const instagramLink = "https://www.instagram.com/pixel_box_ads"; 

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#3e2723] font-cairo flex flex-col" dir="rtl" translate="no">
      
      {/* هيدر بسيط */}
      <header className="w-full border-b border-[#e0d8cf] p-6 flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="text-[#d4af37] hover:text-[#3e2723] transition-colors text-sm font-bold flex items-center gap-2 active:scale-95">
          <span>→</span> العودة للرئيسية
        </Link>
        <h1 className="font-playfair text-xl font-bold">PIXEL BOX</h1>
      </header>

      {/* محتوى الصفحة */}
      <main className="flex-grow flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto text-center w-full animate-fade-in-up">
          <h2 className="font-playfair text-5xl md:text-6xl font-bold mb-6 text-[#d4af37]">تواصل معنا</h2>
          <p className="text-lg text-gray-600 mb-16">فريقنا جاهز لمساعدتك في تنفيذ تصميمك الخاص. اختر وسيلة التواصل المفضلة لك.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* واتساب */}
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" 
               className="bg-white p-8 rounded-3xl shadow-sm border border-[#e0d8cf] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group active:scale-95">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">💬</div>
              <h3 className="text-xl font-bold mb-2">واتساب</h3>
              <p className="text-gray-500 text-sm">تواصل معنا مباشرة</p>
            </a>

            {/* الإيميل (تم إصلاحه عشان يفتح تطبيق البريد) */}
            <a href={`mailto:${emailAddress}`} 
               className="bg-white p-8 rounded-3xl shadow-sm border border-[#e0d8cf] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group active:scale-95">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">✉️</div>
              <h3 className="text-xl font-bold mb-2">البريد الإلكتروني</h3>
              <p className="text-gray-500 text-sm">راسلنا في أي وقت</p>
            </a>

            {/* إنستجرام */}
            <a href={instagramLink} target="_blank" rel="noopener noreferrer" 
               className="bg-white p-8 rounded-3xl shadow-sm border border-[#e0d8cf] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group active:scale-95">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">📸</div>
              <h3 className="text-xl font-bold mb-2">إنستجرام</h3>
              <p className="text-gray-500 text-sm">شاهد أحدث أعمالنا</p>
            </a>

          </div>
        </div>
      </main>

      <footer className="border-t border-[#e0d8cf] py-6 text-center text-gray-500 text-sm">
        © 2026 Pixel Box Ads.
      </footer>
    </div>
  );
}