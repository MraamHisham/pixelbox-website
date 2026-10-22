"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import Link from "next/link";

const supabaseUrl = "https://nngvbcabtppkhfnnpnnt.supabase.co";
const supabaseKey = "sb_publishable_1Ds5k-Sjn4gGpaXWnciS6w_F4wQf9Yc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage(error.message);
      else router.push("/");
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName, phone: phone } }
      });
      if (error) setMessage(error.message);
      else {
        // تسجيل الدخول التلقائي بعد إنشاء الحساب
        const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
        if (!loginError) router.push("/");
        else setMessage("تم إنشاء الحساب، يرجى تسجيل الدخول.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#3e2723] font-cairo flex items-center justify-center p-6" dir="rtl">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-[#e0d8cf] p-8 animate-fade-in-up">
        
        <div className="text-center mb-8">
          <h1 className="font-playfair text-4xl font-bold text-[#d4af37] mb-2">PIXEL BOX</h1>
          <p className="text-gray-500">{isLogin ? "تسجيل الدخول" : "إنشاء حساب جديد"}</p>
        </div>

        {message && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm text-center animate-fade-in">{message}</div>}

        <form onSubmit={handleAuth} className="space-y-5">
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-bold mb-1">الاسم بالكامل</label>
                <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full p-3 rounded-lg border border-[#e0d8cf] focus:outline-none focus:border-[#d4af37] transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">رقم التليفون</label>
                <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-3 rounded-lg border border-[#e0d8cf] focus:outline-none focus:border-[#d4af37] transition-colors" />
              </div>
            </>
          )}
          <div>
            <label className="block text-sm font-bold mb-1">البريد الإلكتروني</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 rounded-lg border border-[#e0d8cf] focus:outline-none focus:border-[#d4af37] transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">كلمة المرور</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 rounded-lg border border-[#e0d8cf] focus:outline-none focus:border-[#d4af37] transition-colors" />
          </div>
          
          <button type="submit" disabled={loading} className="w-full bg-[#d4af37] text-white font-bold py-3 rounded-lg hover:bg-[#c19b2e] transition-all duration-300 active:scale-95 disabled:opacity-50">
            {loading ? "جاري التحميل..." : (isLogin ? "دخول" : "إنشاء حساب")}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-500">{isLogin ? "ليس لديك حساب؟" : "لديك حساب بالفعل؟"} </span>
          <button onClick={() => setIsLogin(!isLogin)} className="text-[#d4af37] font-bold hover:underline active:scale-95">
            {isLogin ? "أنشئ حساب" : "تسجيل الدخول"}
          </button>
        </div>

        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-gray-400 hover:text-[#d4af37] transition">← العودة للرئيسية</Link>
        </div>
      </div>
    </div>
  );
}