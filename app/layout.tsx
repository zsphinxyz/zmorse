import type { Metadata } from "next";
import { Rambla } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/side";
import Nav from "@/components/nav";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from '@next/third-parties/google'
import Footer from "@/components/Footer";
import Script from "next/script";

const inter = Rambla({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Morse Code",
  description: "Learn and Play around with Morse Code. Morse Code Guessing Games and Converter",
  generator: 'Next.js',
  applicationName: 'zmorse',
  referrer: 'origin-when-cross-origin',
  keywords: ['morse', 'zmorse', 'MorseCode', 'z morse', 'morsecode', 'vercel', 'zmorsecode', '--..morse', '--..', 'morse quiz', 'morse learn', 'learn morse code', 'morse code simulator', 'morse code guessr'],
  creator: 'zsphinx',
  openGraph: {
    title: 'zmorse',
    description: 'Learn and Play around with Morse Code',
    url: 'https://zmorse.vercel.app',
    siteName: 'zmorse',
    // images: 'https://zmorse.vercel.app/thumbnail.png',
    images: [
      {
        url: 'https://zmorse.vercel.app/thumbnail.png',
        width: 972,
        height: 989,
        alt: 'Z_morse, Learn Morse Code',
      }
    ],
    type: 'website',
  },
  other: {
    ["fb:app_id"]: "1719215081802374",
    ["google-site-verification"]: "ce41r4Xfw_7tSNJDGSIs-BYCCylzs0MbHdO0s_QDxAg",
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      {/* Google */}
      <GoogleAnalytics gaId="G-75KEW87W9H" />

      {/* Vercel */}
      <Analytics />

      {/* Cloudflare */}
      <Script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "7bb98ae9a7f14beeb0f4e52c32aad7e1"}'></Script>

      <body className={inter.className + ' bg-black/90'}>
        <main className="min-h-dvh">
          <Nav />

          <div className="flex min-h-[calc(100dvh-64px)] relative">
            <p className="sr-only">Learn Morse Code with animated pictures. Morse Code Guessing games. Morse Code to Text to Audio converter.</p>
            <SideBar />
            <div className="basis-full flex flex-col px-2 pt-2">
              <div className="basis-full pb-2">
                {children}
              </div>
              <Footer />
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}

