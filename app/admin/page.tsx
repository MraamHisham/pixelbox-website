"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nngvbcabtppkhfnnpnnt.supabase.co";
const supabaseKey = "sb_publishable_1Ds5k-Sjn4gGpaXWnciS6w_F4wQf9Yc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Admin() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
      if (data) setUsers(data);
      setLoading(false);
    }
    fetchUsers();
  }, []);

  const downloadCSV = () => {
    const headers = ["Name", "Email", "Created At"];
    const csvRows = users.map(u => [
      u.full_name || "N/A",
      u.email,
      new Date(u.created_at).toLocaleDateString()
    ]);
    const csvContent = [headers, ...csvRows].map(e => e.join(",")).join("\n");
    
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center font-cairo text-xl">جاري التحميل...</div>;

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#3e2723] font-cairo p-8" dir="rtl">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl border border-[#e0d8cf] p-8 animate-fade-in-up">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-playfair text-3xl font-bold text-[#d4af37]">لوحة التحكم (المستخدمين)</h1>
          <button onClick={downloadCSV} className="bg-[#d4af37] text-white font-bold py-2 px-6 rounded-lg hover:bg-[#c19b2e] transition active:scale-95">
            تحميل شيت Excel
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-[#f5f1eb] text-[#3e2723]">
                <th className="p-4 border-b">الاسم</th>
                <th className="p-4 border-b">البريد الإلكتروني</th>
                <th className="p-4 border-b">تاريخ التسجيل</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr><td colSpan={3} className="p-8 text-center text-gray-500">لا يوجد مستخدمين مسجلين حالياً.</td></tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="hover:bg-[#fdfbf7] transition">
                    <td className="p-4 border-b font-bold">{u.full_name || "غير محدد"}</td>
                    <td className="p-4 border-b text-gray-600">{u.email}</td>
                    <td className="p-4 border-b text-gray-500">{new Date(u.created_at).toLocaleDateString('ar-EG')}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}