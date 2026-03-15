"use client";

import { useEffect, useRef, useState } from "react";
import { FiVolume1 } from "react-icons/fi";
import { morseLetter } from "@/lib/morse";
import { MorseAudio } from "@/lib/sound";
import { useFreq, useSpeed } from "./audioControls";

export default function GuessAudio() {
	const [client, setClient] = useState(false);
	const [userAns, setUserAns] = useState("");

	const [rand, setRand] = useState(Math.floor(Math.random() * 26));
	const [isCorrect, setCorrect] = useState<null | boolean>(null);

	const [randLetter, randMorse] = Object.entries(morseLetter)[rand] as string[];

	const audioRef = useRef<MorseAudio | null>(null);
	const { freq } = useFreq();
	const { speed } = useSpeed();

	const audioIconRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		audioRef.current = new MorseAudio(freq, speed);
	}, [freq, speed]);

	useEffect(() => {
		setClient(true);
	}, []);

	function playAudio(morse: string) {
		if (morse) {
			audioRef.current?.adx.resume();
			audioRef.current?.playMorseString(morse);
		}
	}

	function checkAns(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (userAns !== "") {
			if (userAns === randLetter) {
				setCorrect(true);
			} else {
				setCorrect(false);
			}
		}
	}

	function reset() {
		if (audioIconRef.current) {
			audioIconRef.current.style.opacity = "0";
			setTimeout(() => (audioIconRef.current!.style.opacity = "1"), 250);
		}
		setRand(Math.floor(Math.random() * 26));
		setUserAns("");
		setCorrect(null);
	}

	return (
		<section className="flex gap-3 flex-col items-center justify-center max-w-screen-lg mx-auto">
			<h1 className="font-bold text-3xl text-center my-2 underline underline-offset-4 mb-2">
				Guess the Letter from Audio
			</h1>
			<form
				className="flex flex-col gap-3"
				autoComplete="off"
				onSubmit={checkAns}
			>
				<div className="flex gap-2 select-none cursor-default font-serif">
					<button
						type="button"
						ref={audioIconRef}
						onClick={() => playAudio(client ? randMorse : "")}
						className="group relative text-5xl bg-white/10 size-32 rounded-lg grid place-content-center border border-white/15  hover:bg-white/15 transition-opacity"
					>
						<FiVolume1 className="text-white text-7xl ml-4 block group-active:scale-95 transition-transform" />
					</button>

					<div className="text-5xl font-extrabold bg-white/10 size-32 rounded-lg grid place-content-center border border-white/15 hover:bg-white/15 transition">
						{/* {client && randLetter} */}
						<input
							autoFocus
							style={{
								background:
									isCorrect === null
										? "transparent"
										: isCorrect === false
											? "#ff000033"
											: "#00ff0033",
							}}
							type="text"
							name="userAnsLetter"
							id="userAnsLetter"
							className="w-full h-32 block text-center capitalize"
							value={userAns}
							onChange={(e) =>
								setUserAns(
									e.target.value?.[e.target.value.length - 1].toUpperCase(),
								)
							}
						/>
					</div>
				</div>

				{isCorrect ? (
					<button
						type="button"
						className="bg-white/90 hover:bg-white p-2 rounded-sm text-black"
						onClick={reset}
					>
						Next ▶
					</button>
				) : (
					<button
						type="submit"
						className="bg-white/90 font-medium hover:bg-white text-black p-2 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Submit
					</button>
				)}
			</form>
		</section>
	);
}
