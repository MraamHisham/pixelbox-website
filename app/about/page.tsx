"use client";

import Link from "next/link";

export default function About() {
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
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <h2 className="font-playfair text-5xl md:text-6xl font-bold mb-8 text-[#d4af37]">من نحن</h2>
          <div className="w-24 h-1 bg-[#d4af37] mx-auto mb-12 rounded-full"></div>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-light mb-8">
            نحن علامة تجارية متخصصة في تصميم وتنفيذ علب الهدايا الفاخرة، الشوكولاتة، والعطور.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed font-light">
            نؤمن بأن التفاصيل الصغيرة تصنع فرقاً كبيراً، ولذلك نضع لمساتنا الفنية في كل منتج لنقدم لك تجربة استثنائية تعكس ذوقك الرفيع. نعمل بشغف لنحول أفكارك إلى واقع ملموس يخطف الأنظار.
          </p>
        </div>
      </main>

      <footer className="border-t border-[#e0d8cf] py-6 text-center text-gray-500 text-sm">
        © 2026 Pixel Box Ads.
      </footer>
    </div>
  );
}