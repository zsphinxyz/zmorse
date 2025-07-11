'use client'

import AudioControls, { useFreq, useSpeed } from '@/components/audioControls';
import { all, letter_imgs } from '@/lib/morse'
import { MorseAudio } from '@/lib/sound';
import { motion } from "framer-motion";
import { useEffect, useState, useRef} from 'react';
import { BsPlayFill } from 'react-icons/bs';

export default function Learn() {
  const audioRef = useRef<MorseAudio | null>(null);

  const {freq} = useFreq();
  const {speed} = useSpeed();
  const [play, setPlay] = useState(false);


  function playMorse(text: string) {
    setPlay(true);
    if (audioRef.current?.adx.state == "suspended") {
      audioRef.current.adx.resume();
    }
    audioRef.current?.playMorseLetter(text)
  }

  useEffect(() => {
    if (play) {
      audioRef.current = new MorseAudio(freq, speed);
    }
  }, [freq, speed, play, audioRef])

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
          <AudioControls />
          <p className="text-sm text-right p-2 w-full">Credit: {''}
            <a href="https://morse.withgoogle.com/learn/" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">https://morse.withgoogle.com/learn/</a>
          </p>
        </div>
        <section className="flex flex-wrap justify-center gap-x-2 gap-y-4 py-2 max-w-screen-lg mx-auto">
          {
            letter_imgs.map((img) => (
              <div key={img.id}
                role='button'
                aria-labelledby='button'
                onClick={() => playMorse(all[img.img[0]])}
                className='relative group cursor-pointer'
              >
                <motion.img
                  draggable={false}
                  src={`/imgs/${img.img}`}
                  width={500} height={500}
                  alt={`Morse Code Letter ${img.img[0]} . ${img.img.replace('.png', '')}`}
                  className={`
                  ${img.steps == 2 ? "hover:ani2" : img.steps == 3 ? "hover:ani3" : img.steps == 4 ? "hover:ani4" : img.steps == 5 ? "hover:ani5" : ""} 
                  rounded-md select-none overflow-hidden size-[150px] group-hover:scale-105 object-cover transition-transform bg-[#ef4136]
                  
                  `}
                  style={{
                    objectPosition: `-${(img.steps - 1) * 150}px`,
                  }}
                />
                <div className="absolute  top-1 right-1 opacity-0 group-hover:opacity-70 transition-opacity pointer-events-none">
                  <BsPlayFill className='text-white text-xl border rounded-full' />
                </div>
                <p className="text-center font-mono mt-1">
                  <span className="text-xl font-bold">{img.img[0]}</span>
                  <span className="opacity-80 font-sans">{img.img.replace('.png', '').slice(1)} </span>
                  <span className="bg-white/10 px-1 rounded-sm text-white font-bold tracking-tighter">{all[img.img[0]]}</span>
                </p>
              </div>
            ))
          }
        </section>
      </section>
  )
}