import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./providers/CartProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GameHubb - Игровой магазин",
  description: "Покупка игровой валюты и товаров",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
        <CartProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
