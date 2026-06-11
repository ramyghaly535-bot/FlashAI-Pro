import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlashAI Pro - AI-Powered Mobile Flashing Engine",
  description: "Professional AI-powered multi-OS mobile flashing software supporting Apple iOS, Samsung, and Xiaomi/Redmi devices with automated firmware analysis, multi-threaded downloads, and one-click factory restore.",
  keywords: ["FlashAI", "mobile flashing", "iOS restore", "Samsung Odin", "Xiaomi Fastboot", "AI firmware", "factory reset"],
  authors: [{ name: "FlashAI Pro Team" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "FlashAI Pro - AI-Powered Mobile Flashing Engine",
    description: "Professional AI-powered multi-OS mobile flashing software",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}