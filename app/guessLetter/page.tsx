import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Guess the Letter",
	description: "Guess the letter from Morse Code.",
	keywords: [
		"guessLetter",
		"guess letter",
		"Morse Code Guessing Game",
		"Morse Code Guess",
	],
};

export default function GuessLetterPage() {
	return redirect("/guessr?q=letter");
}
