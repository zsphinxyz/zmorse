'use client'

import Footer from '@/components/Footer';
import { all, letter_imgs, morseLetter } from '@/lib/morse'
import { MorseAudio } from '@/lib/sound';
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from 'react';
import { BsPlayFill } from 'react-icons/bs';
import { PiSpeedometer, PiWaveSineBold } from 'react-icons/pi';

export default function Learn() {
  const audioRef = useRef<MorseAudio | null>(null);

  const [freq, setFreq] = useState(700);
  const [speed, setSpeed] = useState(100);
  
  useEffect(() => {
    audioRef.current = new MorseAudio(freq, speed);
    audioRef.current.initialize();
  }, [freq, speed])

  
  function playMorse(text:string) {
    audioRef.current?.initialize()
    audioRef.current?.playMorse(text)
  }

  return (
    <section className="h-full max-w-screen-lg mx-auto">
      <div className="flex justify-between items-start sm:items-center pl-2 flex-col-reverse sm:flex-row">
        <div className="flex shrink-0 gap-2 mt-2">
          <label title='Speed' htmlFor="speed" className='bg-white pl-1'>
            <PiSpeedometer className='inline-block text-black' />
            <select value={speed} name="speed" id="speed" className='text-black outline-none border-none' 
              onChange={(e) => setSpeed(Number(e.target.value))}
            >
              {/* <option disabled>Speed</option> */}
              <option value={200}>slow</option>
              <option value={100}>default</option>
              <option value={50}>fast</option>
            </select>
          </label>

          <label title='Frequency' htmlFor="freq" className='bg-white pl-1'>
            <PiWaveSineBold className='inline-block text-black' />
            <select value={freq} name="freq" id="freq" className='text-black outline-none border-none' 
              onChange={(e) => setFreq(Number(e.target.value))}
            >
              {/* <option disabled>Frequency</option> */}
              <option value={500}>low</option>
              <option value={700}>default</option>
              <option value={900}>high</option>
            </select>
          </label>

        </div>

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
                alt={img.img.replace('.png', '')} 
                className={`
                  ${img.steps==2?"hover:ani2": img.steps==3?"hover:ani3": img.steps==4?"hover:ani4": img.steps==5?"hover:ani5" : ""} 
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

      <Footer />
    </section>
  )
}



