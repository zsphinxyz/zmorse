"use client";

import { useEffect, useRef, useState } from "react";
import { useFreq, useSpeed } from "@/components/audioControls";
import { all_rev } from "@/lib/morse";
import { MorseAudio } from "@/lib/sound";

export default function Page() {
	const [key, setKey] = useState("Space");

	const audioRef = useRef<MorseAudio | null>(null);
	const lightRef = useRef<HTMLDivElement>(null);
	const morseRef = useRef<HTMLParagraphElement>(null);
	const morseStringRef = useRef<HTMLParagraphElement>(null);
	const convertRef = useRef<HTMLParagraphElement>(null);
	const mappedKey = useRef<HTMLInputElement>(null);

	// const isOn = useRef(false);
	const pressStart = useRef(0);
	const restTimer = useRef(0);
	const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

	const { freq } = useFreq();
	const { speed } = useSpeed();

	function handleDown() {
		pressStart.current = performance.now();
		restTimer.current = 0;
		// console.log("Down: ", restTimer.current);
		if (timer.current) {
			clearTimeout(timer.current);
			timer.current = null;
		}
		if (audioRef.current) {
			audioRef.current.play();
			// isOn.current = true;
			lightRef.current?.setAttribute("data-on", "true");
		}
	}

	function handleUp() {
		restTimer.current = performance.now();
		// console.log("UP: ", restTimer.current);
		if (audioRef.current) {
			audioRef.current.end();
			// isOn.current = false;
			lightRef.current?.setAttribute("data-on", "false");

			if (pressStart.current) {
				const duration = performance.now() - pressStart.current;
				if (morseRef.current)
					morseRef.current.innerText += duration < speed * 3 ? "." : "-";
				pressStart.current = 0;
			}

			if (timer.current) {
				clearTimeout(timer.current);
			}
			timer.current = setTimeout(() => {
				if (morseRef.current) {
					if (morseStringRef.current)
						morseStringRef.current.innerText += ` ${morseRef.current.innerText}`;
					if (convertRef.current)
						convertRef.current.innerText += convert(morseRef.current.innerText);
					morseRef.current.innerText = "";
				}
				timer.current = null;
			}, speed * 4);
		} else {
			audioRef.current = new MorseAudio(freq, speed);
		}
	}

	useEffect(() => {
		audioRef.current?.setFreq(freq);
		audioRef.current?.setSpeed(speed);
	}, [freq, speed]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <prevent rerendering>
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (
				e.code !== key ||
				e.repeat ||
				document.activeElement === mappedKey.current
			)
				return;
			handleDown();
		};

		const handleKeyUp = (e: KeyboardEvent) => {
			if (
				e.code !== key ||
				e.repeat ||
				document.activeElement === mappedKey.current
			)
				return;
			handleUp();
		};

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
			if (timer.current) clearTimeout(timer.current);
		};
	}, [key]);

	function handleKeyInput(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.repeat) return;
		// if (mappedKey.current) {
		if (mappedKey.current) mappedKey.current.style.scale = "0.9";
		setTimeout(() => {
			if (mappedKey.current) mappedKey.current.style.scale = "1";
		}, 250);
		// }
		setKey(e.code);
	}

	function convert(morseString: string | undefined) {
		if (morseString) {
			// @ts-expect-error fix later
			const letter = all_rev[morseString];
			return letter ? letter : "#";
		}
		return "#";
	}

	function clearAll() {
		if (morseStringRef.current) morseStringRef.current.innerText = "";
		if (convertRef.current) convertRef.current.innerText = "";
	}

	return (
		<section className="flex h-full gap-2 flex-col relative bg-[#1e3f44]">
			<section className="p-2 flex flex-col h-full gap-2 w-full max-w-3xl mx-auto">
				<div className="w-full  h-full gap-2 flex flex-col *:flex-1 *:min-h-20 border border-white/30 p-2 rounded-lg">
					<p
						className="p-2 rounded-md font-mono bg-white/5 tracking-[-2] [word-spacing:5px]"
						ref={morseStringRef}
					/>
					<p
						className="p-2 rounded-md tracking-wider bg-white/5"
						ref={convertRef}
					/>
				</div>

				<div className="flex flex-col gap-2 bg-black/15 rounded-md p-2 w-full mt-auto">
					<div className="w-full flex justify-between items-center">
						<div
							title="Keyboard Key"
							className="bg-white/10 rounded-sm shadow-black/50 text-sm shadow-sm"
						>
							<input
								type="text"
								id="key"
								readOnly
								ref={mappedKey}
								onKeyDown={handleKeyInput}
								value={key}
								className="bg-transparent min-w-16 text-center [field-sizing:content] px-2 focus:outline-green-500"
							/>
						</div>
						<div
							title="Display"
							ref={morseRef}
							className="bg-white/10 text-white px-1 leading-[1] w-16 h-full text-center rounded-sm overflow-hidden text-nowrap shadow-sm shadow-black/50"
						/>

						{/** biome-ignore lint/a11y/useKeyWithClickEvents: <intended for this button> */}
						{/** biome-ignore lint/a11y/noStaticElementInteractions: <intended for this button> */}
						<div
							title="Clear"
							onClick={clearAll}
							className="bg-white/10 select-none cursor-pointer shadow-black/50 shadow-sm px-2 text-sm rounded-sm active:scale-95"
						>
							Clear
						</div>
					</div>

					<div className="w-full">
						<button
							type="button"
							onMouseDown={handleDown}
							onMouseUp={handleUp}
							onTouchStart={handleDown}
							onTouchEnd={handleUp}
							className="bg-gradient-radial block relative select-none text-center from-slate-800 to-slate-900 rounded-lg py-20 w-full max-w-80 mx-auto touch-none border-2 border-neutral-400 [box-shadow:4px_6px_2px_#25252566] active:[box-shadow:1px_1px_0_#25252566] active:scale-[.99] transition-all duration-[25ms]"
						>
							<div
								ref={lightRef}
								data-on="null"
								className="size-2 rounded-full data-[on=null]:bg-black bg-gray-300 data-[on=true]:bg-red-500 data-[on=true]:[box-shadow:0_0_20px_red] absolute top-3 right-3"
							/>
							<p className="text-sm opacity-20 pointer-events-none select-none block">
								Click to Send Morse Code <br /> OR press {key}.
							</p>
						</button>
					</div>
				</div>
			</section>
		</section>
	);
}
