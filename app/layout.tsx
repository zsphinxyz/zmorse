import type { Metadata } from "next";
import { Inter, Rambla } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/side";
import Nav from "@/components/nav";
import { Analytics } from "@vercel/analytics/react";

const inter = Rambla({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Morse Code",
  description: "Play around wiht Morse Code.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Analytics />
      <body className={inter.className + ' bg-black/90'}>
        <main className="h-dvh"> 

          <Nav />

          <div className="flex min-h-[calc(100dvh-64px)]">
            <SideBar />
            <div className="basis-full">{children}</div>
          </div>

        </main>
      </body>
    </html>
  );
}
