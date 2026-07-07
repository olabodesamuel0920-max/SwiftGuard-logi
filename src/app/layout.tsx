import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import MobileNavigation from "@/components/MobileNavigation";
import Loader from "@/components/Loader";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Swift Guard Logistics — Delivery Command Centre",
  description: "Advanced secure delivery and errand command deck. On time, every time.",
  metadataBase: new URL("https://swiftguardlogistics.com"),
  openGraph: {
    title: "Swift Guard Logistics — Command Centre",
    description: "Advanced secure delivery and errand command deck. On time, every time.",
    url: "/",
    siteName: "Swift Guard Logistics",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swift Guard Logistics — Command Centre",
    description: "Advanced secure delivery and errand command deck. On time, every time.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${spaceGrotesk.variable} h-full antialiased font-sans`}
    >
      <body className="min-h-full flex flex-col bg-[#050610] text-[#f7f9ff] relative">
        <ThemeProvider>
          {/* Cyber ambient noise overlay */}
          <div className="noise" aria-hidden="true" />
          
          {/* Cinematic boot loader */}
          <Loader />

          {/* Navigation stack */}
          <Header />
          
          {/* Main content viewport */}
          <main className="flex-grow">
            {children}
          </main>

          {/* Mobile Bottom bar */}
          <MobileNavigation />
        </ThemeProvider>
      </body>
    </html>
  );
}
