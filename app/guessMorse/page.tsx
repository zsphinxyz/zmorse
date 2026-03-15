import { Metadata } from 'next'
import { redirect } from 'next/navigation';

export const metadata:Metadata = {
  title: "Guess the Morse Code",
  description: "Guess the Morse Code from letter.",
  keywords: ["guessMorse", "guess Morse Code", "Morse Code Guessing Game", "Morse Code Guess"]
}

export default function GuessLetterPage() {
  return redirect("/guessr");
}

