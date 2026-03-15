/** biome-ignore-all lint/performance/noImgElement: <motion.Image doesn't work> */
"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BiSort } from "react-icons/bi";
import { useFreq, useSpeed } from "@/components/audioControls";
import { all, letter_imgs, morseNumber, number_imgs } from "@/lib/morse";
import { MorseAudio } from "@/lib/sound";

type TSort = "az" | "diff";

export default function Learn() {
	const audioRef = useRef<MorseAudio | null>(null);

	const [sort, setSort] = useState<TSort>("az");

	const { freq } = useFreq();
	const { speed } = useSpeed();
	const [play, setPlay] = useState(false);

	function playMorse(text: string) {
		setPlay(true);
		if (audioRef.current?.adx.state === "suspended") {
			audioRef.current.adx.resume();
		}
		audioRef.current?.playMorseLetter(text);
	}

	useEffect(() => {
		if (play) {
			audioRef.current = new MorseAudio(freq, speed);
		}
	}, [freq, speed, play]);

	// function playAtoZ() {
	//   audioRef.current?.adx?.resume();
	//   audioRef.current?.playMorseString(Object.values(morseLetter).join(' ')).then(() => {
	//     setAudioPlaying(false)
	//   });
	//   setAudioPlaying(true)
	// }

	// function stopAudio() {
	//   audioRef.current?.stopAudio()
	//   setAudioPlaying(false)
	// }

	return (
		<section className="h-full max-w-screen-lg mx-auto">
			<div className="flex justify-between items-start sm:items-center pl-2 flex-col-reverse sm:flex-row">
				<label
					htmlFor="sort"
					className="shrink-0 mb-2 relative block h-5 w-9 rounded-full transition-colors [-webkit-tap-highlight-color:_transparent] has-checked:bg-green-500"
				>
					{/* <input onChange={()=>setSort(!sort)} checked={sort} type="checkbox" id="sort" className="peer sr-only" /> */}
					<select
						className="text-black px-1 py-0.5 pl-4"
						defaultValue="az"
						onChange={(e) => setSort(e.target.value as TSort)}
					>
						<option value="az">A-Z</option>
						<option value="diff">Difficulty</option>
					</select>

					<span className="absolute top-1 left-0.5 text-black">
						<BiSort />
					</span>

					{/* <span
              className="absolute inset-y-0 start-0 m-1 size-3 rounded-full bg-slate-200 transition-[inset-inline-start] peer-checked:start-4"
            ></span> */}
					{/* <span className='ml-10 w-20 block'>A-Z</span> */}
				</label>

				<p className="text-sm text-right p-2 w-full">
					Credit: {""}
					<a
						href="https://morse.withgoogle.com/learn/"
						target="_blank"
						rel="noopener noreferrer"
						className="text-blue-400 underline"
					>
						https://morse.withgoogle.com/learn/
					</a>
				</p>
			</div>
			<section className="flex flex-wrap justify-center gap-x-2 gap-y-4 py-2 max-w-screen-lg mx-auto">
				{letter_imgs
					.sort((a, b) =>
						sort === "diff" ? a.difficulty - b.difficulty : a.id - b.id,
					)
					.map((img) => (
						<button
							key={img.id}
							type="button"
							aria-labelledby="button"
							onClick={() => playMorse(all[img.img[0]])}
							className="relative group cursor-pointer"
						>
							<motion.img
								draggable={false}
								src={`/imgs/${img.img}`}
								width={500}
								height={500}
								alt={`Morse Code Letter ${img.img[0]} . ${img.img.replace(".png", "")}`}
								className="hover:ani-sprite rounded-md select-none overflow-hidden size-[150px] group-hover:scale-105 object-cover transition-transform bg-[#ef4136]"
								style={{
									objectPosition: `-${(img.steps - 1) * 150}px`,
									"--steps": img.steps,
								}}
							/>
							{/* <div className="absolute  top-1 right-1 opacity-0 group-hover:opacity-70 transition-opacity pointer-events-none">
                  <BsPlayFill className='text-white text-xl border rounded-full' />
                </div> */}
							<p className="text-center font-mono mt-1">
								<span className="text-xl font-bold">{img.img[0]}</span>
								<span className="opacity-80 font-sans">
									{img.img.replace(".png", "").slice(1)}{" "}
								</span>
								<span className="bg-white/10 px-1 rounded-sm text-white font-bold tracking-tighter">
									{all[img.img[0]]}
								</span>
							</p>
						</button>
					))}
			</section>

			<section className="border-t border-white/10 pt-5 mt-5">
				<h1 className="text-2xl pl-4 font-bold">Numbers</h1>
				<div className="flex flex-wrap justify-center gap-x-2 gap-y-4 py-2 max-w-screen-lg mx-auto">
					{Object.values(morseNumber).map((morse, i) => (
						<button
							key={morse}
							type="button"
							aria-labelledby="button"
							onClick={() => playMorse(morse)}
							className="relative group cursor-pointer"
						>
							<motion.img
								draggable={false}
								src={`/imgs/${number_imgs[i]}.png`}
								width={500}
								height={500}
								alt={`Morse Code Letter ${morse}`}
								className="hover:ani-sprite rounded-md select-none overflow-hidden size-[150px] group-hover:scale-105 object-cover transition-transform bg-[#ef4136]"
								style={{
									objectPosition: `-${5 * 150}px`,
									"--steps": 6,
								}}
							/>
							{/* <div className="absolute  top-1 right-1 opacity-0 group-hover:opacity-70 transition-opacity pointer-events-none">
                  <BsPlayFill className='text-white text-xl border rounded-full' />
                </div> */}
							<p className="text-center font-mono mt-1">
								<span className="opacity-80 font-sans">{number_imgs[i]} </span>
								<span className="bg-white/10 px-1 rounded-sm text-white font-bold tracking-tighter">
									{morse}
								</span>
							</p>
						</button>
					))}
				</div>
			</section>
		</section>
	);
}
