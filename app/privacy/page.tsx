"use client";
import Link from "next/link";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#3e2723] font-cairo flex flex-col animate-fade-in-up" dir="rtl">
      <header className="w-full border-b border-[#e0d8cf] p-6 flex justify-between items-center max-w-4xl mx-auto">
        <Link href="/" className="text-[#d4af37] hover:text-[#3e2723] transition-colors text-sm font-bold flex items-center gap-2 active:scale-95">
          <span>→</span> العودة للرئيسية
        </Link>
        <h1 className="font-playfair text-xl font-bold">PIXEL BOX</h1>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-20 flex-grow w-full">
        <h1 className="text-4xl font-playfair font-bold mb-10 text-[#d4af37]">سياسة الخصوصية</h1>
        <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
          <p>نحن في Pixel Box Ads نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية.</p>
          <p>نحن نجمع المعلومات التي تقدمها لنا طواعية (مثل اسمك ورقم هاتفك) عند تواصلك معنا عبر واتساب أو وسائل التواصل الاجتماعي.</p>
          <p>نستخدم هذه المعلومات فقط للتواصل معك بخصوص استفساراتك أو طلباتك. لن نشارك بياناتك مع أي طرف ثالث لأغراض تسويقية.</p>
          <p>لأي استفسارات، يمكنك التواصل معنا مباشرة.</p>
        </div>
      </main>
      <footer className="border-t border-[#e0d8cf] py-6 text-center text-gray-500 text-sm">© 2026 Pixel Box Ads.</footer>
    </div>
  );
}