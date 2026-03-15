"use client";

import { useEffect, useRef, useState } from "react";
import { BiPause, BiPlay } from "react-icons/bi";
import { useFreq, useSpeed } from "@/components/audioControls";
import { all, all_rev } from "@/lib/morse";
import { MorseAudio } from "@/lib/sound";

export default function Convert() {
	const [words, setWords] = useState("");
	const [morse, setMorse] = useState("");
	const [reverse, setReverse] = useState(false);
	const [isAudioPlaying, setAudioPlaying] = useState(false);
	const [play, setPlay] = useState(false);

	const audioRef = useRef<MorseAudio | null>(null);
	const { freq } = useFreq();
	const { speed } = useSpeed();

	useEffect(() => {
		if (play) {
			audioRef.current = new MorseAudio(freq, speed);
		}
	}, [play, freq, speed]);

	useEffect(() => {
		if (reverse) {
			setWords(
				morse
					.split(" ")
					.map(
						(code) =>
							// @ts-expect-error gotta fix later
							all_rev[code],
					)
					.join(""),
			);
		} else {
			setMorse(
				words
					.split("")
					.map((word) => all[word.toUpperCase()])
					.join(" "),
			);
		}
	}, [words, morse, reverse]);

	function playAudio(morse: string) {
		if (morse) {
			audioRef.current?.adx.resume();
			audioRef.current
				?.playMorseString(morse)
				.then(() => setAudioPlaying(false));
			setAudioPlaying(true);
		}
	}

	function handleReverse(b: boolean) {
		setReverse(b);
		if (!play) setPlay(true);
	}

	// function stopAudio() {
	//   audioRef.current?.stopAudio()
	//   setAudioPlaying(false)
	// }

	function downloadAudio() {
		audioRef.current?.downloadAudio(morse);
	}

	return (
		<section className="flex h-full gap-2 flex-col relative text-green-50">
			<h1 className="font-bold text-3xl text-center my-2 underline underline-offset-4 mb-5">
				Converter
			</h1>

			<div className="bg-[darkslateblue] basis-1/2 rounded-lg -mb-5">
				<textarea
					placeholder="Text..."
					spellCheck="false"
					className="h-full w-full bg-transparent text-2xl p-2 font-mono resize-none uppercase"
					onFocus={() => handleReverse(false)}
					onChange={(e) => setWords(e.target.value.replaceAll(" ", ""))}
					value={words}
				></textarea>
			</div>

			<div className="size-10 mx-auto bg-green-500 hover:bg-green-600 transition-colors rounded-full -mb-5 z-10 flex items-center justify-center">
				{isAudioPlaying ? (
					<button type="button" className="w-full text-center h-full">
						<BiPause className="mx-auto text-xl" />
					</button>
				) : (
					<button
						type="button"
						onClick={() => playAudio(morse)}
						className="w-full text-center h-full"
					>
						<BiPlay className="mx-auto text-xl" />
					</button>
				)}
			</div>

			<div className="bg-[darkslateblue] basis-1/2 rounded-lg ">
				<textarea
					placeholder="Morse Code..."
					spellCheck="false"
					className="h-full w-full bg-transparent text-xl p-2 font-mono resize-none"
					onFocus={() => handleReverse(true)}
					onChange={(e) =>
						setMorse(e.target.value.replace(/[^-. ]/g, "")?.toString())
					}
					value={morse}
				></textarea>
			</div>

			<div className="">
				<button
					type="button"
					onClick={downloadAudio}
					disabled={!morse}
					className="disabled:opacity-50 mx-auto block bg-blue-500 hover:bg-blue-600 text-white px-2 py-0.5 rounded-sm"
				>
					Download Audio
				</button>
			</div>
		</section>
	);
}
