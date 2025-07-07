import type { Metadata } from "next";
import { Rambla } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/side";
import Nav from "@/components/nav";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Rambla({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Morse Code",
  description: "Learn and Play around with Morse Code. Morse Code Guessing Games and Converter",
  generator: 'Next.js',
  applicationName: 'zmorse',
  referrer: 'origin-when-cross-origin',
  keywords: ['morse', 'zmorse', 'MorseCode', 'zmorse.vercel.app', 'z morse', 'morsecode', 'morse code', 'z morse code', 'zmorse vercel', 'vercel', 'zmorsecode', '--..morse', '--..', 'morse quiz', 'morse learn', 'learn morse code'],
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

      <GoogleAnalytics gaId="G-75KEW87W9H" />

      <Analytics />
      <body className={inter.className + ' bg-black/90'}>
        <main className="h-dvh">
          <Nav />

          <div className="flex min-h-[calc(100dvh-64px)] relative">
            <p className="sr-only">Learn Morse Code with animated pictures. Morse Code Guessing game. Morse Code to Text to Audio converter.</p>
            <SideBar />
            <div className="basis-full">
              {children}
            </div>
          </div>

        </main>
      </body>
    </html>
  );
}

