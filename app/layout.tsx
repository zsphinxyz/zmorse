import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import SideBar from "@/components/side";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <main className="flex gap-2">
          <SideBar />
          <div className="basis-full">{children}</div>
        </main>
      </body>
    </html>
  );
}
