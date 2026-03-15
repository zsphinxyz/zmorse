import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Guess the Morse Audio",
	description: "Guess the letter from Audio.",
	keywords: [
		"guessMorse",
		"guess Morse Code",
		"Morse Code Guessing Game",
		"Morse Code Guessr",
		"Morse code audio guessr",
	],
};

export default function GuessLetterPage() {
	return redirect("/guessr?q=audio");
}
