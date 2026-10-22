"use client";
import Link from "next/link";

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#3e2723] font-cairo flex flex-col animate-fade-in-up" dir="rtl">
      <header className="w-full border-b border-[#e0d8cf] p-6 flex justify-between items-center max-w-4xl mx-auto">
        <Link href="/" className="text-[#d4af37] hover:text-[#3e2723] transition-colors text-sm font-bold flex items-center gap-2 active:scale-95">
          <span>→</span> العودة للرئيسية
        </Link>
        <h1 className="font-playfair text-xl font-bold">PIXEL BOX</h1>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-20 flex-grow w-full">
        <h1 className="text-4xl font-playfair font-bold mb-10 text-[#d4af37]">الشروط والأحكام</h1>
        <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
          <p>باستخدامك لموقع Pixel Box Ads، فإنك توافق على الشروط التالية:</p>
          <p>جميع التصميمات والمنتجات المعروضة هي ملك لنا ولا يجوز إعادة بيعها أو استخدامها لأغراض تجارية دون إذن مسبق.</p>
          <p>الأسعار (إن وجدت) قابلة للتغيير، وتخضع للتقييم الفردي لكل مشروع بناءً على متطلبات العميل.</p>
          <p>نحتفظ بالحق في تحديث هذه الشروط في أي وقت.</p>
        </div>
      </main>
      <footer className="border-t border-[#e0d8cf] py-6 text-center text-gray-500 text-sm">© 2026 Pixel Box Ads.</footer>
    </div>
  );
}