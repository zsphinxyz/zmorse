"use client";

import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
import { letter_imgs } from "@/lib/morse";

export default function Hint({
	rand,
	hint,
	setHint,
	reverse,
}: {
	rand: number;
	hint: boolean;
	setHint: Dispatch<SetStateAction<boolean>>;
	reverse: boolean;
}) {
	const img = letter_imgs[rand];
	return (
		<div className="flex flex-col mt-5">
			<button
				type="button"
				className="text-white/70 flex gap-1 mx-auto cursor-help"
				onClick={() => setHint(!hint)}
			>
				Ans:{" "}
				<span className="size-5 bg-white/70 text-black font-serif font-medium grid place-content-center rounded-full">
					?
				</span>
			</button>

			<div
				className="ring-1 ring-white/20 bg-white/5 group "
				style={{
					display: hint ? "flex" : "none",
					flexDirection: reverse ? "column-reverse" : "column",
				}}
			>
				<Image
					draggable={false}
					src={`/imgs/${img.img}`}
					width={500}
					height={500}
					alt={"hint image"}
					className={`${reverse ? `group-hover:opacity-100 group-hover:ani-sprite opacity-0 [animation-play-state:paused] group-hover:[animation-play-state:running] ` : "peer"} overflow-hidden size-[150px] object-cover select-none transition delay-100`}
					style={{ objectPosition: `-${(img.steps - 1) * 150}px` }}
				/>
				<p
					className={`text-white/50 text-lg text-center font-medium ${reverse ? "" : "group-hover:opacity-100 opacity-0"} transition delay-100 block`}
				>
					{img.img.replace(".png", "")}
				</p>
			</div>
		</div>
	);
}
