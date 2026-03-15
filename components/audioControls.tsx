"use client";

import { useEffect } from "react";
import { PiSpeedometer, PiWaveSineBold } from "react-icons/pi";
import { create } from "zustand";

type TFreq = {
	/** 500, 700, 900 */
	freq: number;
	setFreq: (num: number) => void;
};
export const useFreq = create<TFreq>()((set) => ({
	freq: 700,
	setFreq: (num: number) => set(() => ({ freq: num })),
}));

type TSpeed = {
	/** 150, 100, 50 */
	speed: number;
	setSpeed: (num: number) => void;
};
export const useSpeed = create<TSpeed>()((set) => ({
	speed: 100,
	setSpeed: (num: number) => set(() => ({ speed: num })),
}));

export default function AudioControls() {
	const { freq, setFreq } = useFreq();
	const { speed, setSpeed } = useSpeed();

	useEffect(() => {
		if (typeof window !== "undefined") {
			const localFreq = window.localStorage.getItem("frequency");
			const localSpeed = window.localStorage.getItem("speed");
			if (!localFreq) {
				window.localStorage.setItem("frequency", freq.toString());
			}
			if (!localSpeed) {
				window.localStorage.setItem("speed", speed.toString());
			}
			if (localFreq && localSpeed) {
				setFreq(Number(localFreq));
				setSpeed(Number(localSpeed));
			}
		}
	}, [freq, speed, setFreq, setSpeed]);

	function handleFreq(e: React.ChangeEvent<HTMLSelectElement>) {
		setFreq(Number(e.target.value));
		window.localStorage.setItem("frequency", e.target.value);
	}

	function handleSpeed(e: React.ChangeEvent<HTMLSelectElement>) {
		setSpeed(Number(e.target.value));
		window.localStorage.setItem("speed", e.target.value);
	}

	return (
		<div className="flex shrink-0 gap-2">
			<label title="Speed" htmlFor="speed" className="bg-white pl-1">
				<PiSpeedometer className="inline-block text-black" />
				<select
					value={speed}
					name="speed"
					id="speed"
					className="text-black outline-none border-none"
					onChange={(e) => handleSpeed(e)}
				>
					{/* <option disabled>Speed</option> */}
					<option value={150}>slow</option>
					<option value={100}>default</option>
					<option value={50}>fast</option>
				</select>
			</label>

			<label title="Frequency" htmlFor="freq" className="bg-white pl-1">
				<PiWaveSineBold className="inline-block text-black" />
				<select
					value={freq}
					name="freq"
					id="freq"
					className="text-black outline-none border-none"
					onChange={(e) => handleFreq(e)}
				>
					{/* <option disabled>Frequency</option> */}
					<option value={500}>low</option>
					<option value={700}>default</option>
					<option value={900}>high</option>
				</select>
			</label>

			{/*       
        <div className="w-24 ml-2">
          {
            isAudioPlaying ?
              <label htmlFor="stop" className='cursor-pointer bg-red-500 flex items-center px-2 rounded-sm hover:bg-red-600 transition-colors'>
                <BiPause className='text-lg' />
                <button name="stop" id="stop" type="button" onClick={stopAudio} className='w-full'>Stop</button>
              </label>
              :
              <label htmlFor="playA-Z" className='cursor-pointer bg-red-500 flex items-center px-2 rounded-sm hover:bg-red-600 transition-colors'>
                <BiPlay className='text-lg' />
                <button name="playA-Z" id="playA-Z" type="button" onClick={playAtoZ} className='w-full'>Play A-Z</button>
              </label>
          }
        </div> 
      */}
		</div>
	);
}
