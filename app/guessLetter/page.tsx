import Footer from "@/components/Footer";
import GuessLetter from "@/components/guessLetter";
import { Metadata } from "next";

export const metadata:Metadata = {
  title: "Guess the Letter",
  description: "Guess the letter from Morse Code.",
  keywords: ["guessLetter", "guess letter", "Morse Code Guessing Game", "Morse Code Guess"]
}

export default function Home() {
  return (
    <main className="flex w-full items-center flex-col text-white bg-slate-700 h-full bg-clip-content p-2">
      <h1 className="font-bold text-3xl text-center my-2 underline underline-offset-4 mb-5"></h1>
      <GuessLetter />
      <Footer />
    </main>
  );
}
