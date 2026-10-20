import type { Metadata } from "next";
import { Playfair_Display, Cairo } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const cairo = Cairo({ subsets: ["arabic"], variable: "--font-cairo" });

export const metadata: Metadata = {
  title: "Pixel Box Ads | تصميمات فاخرة",
  description: "وكالة إعلانات وتصميمات هاند ميد",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" translate="no">
      <body className={`${playfair.variable} ${cairo.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}