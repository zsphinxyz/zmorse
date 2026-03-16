import type { Metadata } from "next";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { morseLetter } from "@/lib/morse";

export const metadata: Metadata = {
	title: "Guess the Morse Code",
	description: "Guess Morse Code from the word.",
	keywords: [
		"guessMorse",
		"guess Morse Code",
		"Morse Code Guessing Game",
		"Morse Code Guesser",
	],
};

export default async function GuessWord({
	searchParams,
}: {
	searchParams: Promise<{ guess: string }>;
}) {
	let isCorrect = false;

	function converter(word: string) {
		return word.split("").map((letter) => morseLetter[letter.toUpperCase()]);
	}

	// const URL = "https://random-word.ryanrk.com/api/en/word/random?length=5";
	// const URL = "https://api.datamuse.com/words?sp=?????&max=1";
	const URL = "https://random-word-api.herokuapp.com/word?length=5";

	const res = await fetch(URL, { cache: "force-cache" });
	const word = await res
		.json()
		.then((data) => data[0])
		.catch(() =>
			Array.from(
				{ length: 5 },
				(_) => Object.keys(morseLetter)[Math.floor(Math.random() * 26)],
			).join(""),
		);

	const guessWord = (await searchParams).guess;

	// console.log(word, converter(word))
	// console.log(guessWord)

	if (guessWord?.toLowerCase().trim() === word?.toLowerCase()) {
		isCorrect = true;
	}

	async function handleNextWord() {
		"use server";
		revalidatePath("/guessWord");
		redirect("/guessWord");
	}

	return (
		<main className="flex w-full items-center flex-col bg-[#553054] h-full">
			<h1 className="font-bold text-3xl text-center mt-7 mb-4 underline underline-offset-4">
				Guess the word
			</h1>

			<div className="my-5">
				<h1 className="text-3xl font-bold text-center">
					{converter(word).map((letter) => (
						<span
							key={`${letter}-${Math.random()}`}
							className="inline-block m-0.5 bg-black/10 text-sm sm:text-lg lg:text-xl px-2 py-1 font-mono rounded-md"
						>
							{letter}
						</span>
					))}
				</h1>
			</div>

			{isCorrect && (
				<div className="">
					{word.split("").map((letter: string) => (
						<span
							key={`${letter}-${Math.random()}`}
							className="inline-block m-1 bg-green-500 text-sm sm:text-lg lg:text-xl px-2 py-1 font-mono rounded-md uppercase"
						>
							{letter}
						</span>
					))}
				</div>
			)}

			{!isCorrect && (
				<div className="">
					{guessWord?.split("").map((letter: string, index) => {
						const isLetter =
							letter.toLocaleLowerCase() ===
							word.toLowerCase().split("")[index];
						return (
							<span
								key={`${letter}-${Math.random()}`}
								className={`inline-block m-1 ${isLetter ? "bg-green-500" : "bg-black/40"} text-sm sm:text-lg lg:text-xl px-2 py-1 font-mono rounded-md uppercase`}
							>
								{letter}
							</span>
						);
					})}
				</div>
			)}

			{!isCorrect && (
				<form className="flex flex-col gap-2" autoComplete="off">
					<input
						type="text"
						required
						name="guess"
						id="guess"
						className="text-black px-2 py-1 rounded-sm uppercase mb-1"
						placeholder="Guess the word"
					/>
					<button
						type="submit"
						className="bg-white/90 font-medium hover:bg-white text-black p-2 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Submit
					</button>
				</form>
			)}

			{isCorrect && (
				<form
					className="w-full flex justify-center my-3"
					action={handleNextWord}
				>
					<button
						type="submit"
						className="bg-white/90 font-medium hover:bg-white text-black p-2 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Next Word ▶
					</button>
				</form>
			)}

			<form action={handleNextWord}>
				<button type="submit" className="mt-2 text-blue-400 underline">
					Skip
				</button>
			</form>
		</main>
	);
}
