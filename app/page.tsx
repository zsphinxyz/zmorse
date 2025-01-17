'use client'

import Footer from '@/components/Footer';
import { all, letter_imgs } from '@/lib/morse'
import { motion } from "framer-motion";
import {Suspense, useRef } from "react";
import { BsPlayFill } from 'react-icons/bs';


export default function Learn() {
  const dotSound = useRef<HTMLAudioElement>(null)
  const dashSound = useRef<HTMLAudioElement>(null)

  function playDot() {
    return new Promise((resolve) =>{
      if(dotSound.current) {
        dotSound.current.play()
        dotSound.current.onended = () => resolve('played dot sound')
      }
    })
  }

  function playDash() {
    return new Promise((resolve) =>{
      if(dashSound.current) {
        dashSound.current.play()
        dashSound.current.onended = () => resolve('played dash sound')
      }
    })
  }

  async function playSound(morse:string){
    const morseList = morse.split('');

    for(let i=0; i < morseList.length; i++) {
      if(morseList[i] == '.') {
        await playDot()
      }
      else {
        await playDash()
      }
    }
  }

  return (
    <section className="h-full">
      <div className="flex">
        <audio hidden controls ref={dotSound} src="/dot.mp3"></audio>
        <audio hidden controls ref={dashSound} src="/dash.mp3"></audio>
        {/* <button type="button" onClick={playSound}>click</button> */}
      </div>
      <p className="text-sm text-right p-2">Credit: {''}
        <a href="https://morse.withgoogle.com/learn/" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">https://morse.withgoogle.com/learn/</a>
      </p>
      <section className="flex flex-wrap justify-center gap-x-2 gap-y-4 py-2 max-w-screen-lg mx-auto">
        {
          letter_imgs.map((img) => (
            <div key={img.id}
              role='button'
              aria-labelledby='button'
              onClick={() =>playSound(all[img.img[0]])}
              className='relative group cursor-pointer'
            >
              <Suspense fallback={"..."}>
                <motion.img draggable={false} src={`/imgs/${img.img}`} width={500} height={500} alt={img.img.replace('.png', '')} className={`select-none overflow-hidden size-[150px] group-hover:scale-105 object-cover transition-transform bg-[#ef4136]`}
                  whileHover={{
                    animationName: `ani${img.steps}`,
                    animationTimingFunction: `steps(${img.steps})`,
                    animationIterationCount: 'infinite',
                    animationDuration: `2s`,
                  }}
                  style={{
                    objectPosition: `-${(img.steps - 1) * 150}px`,
                  }}
                />
              </Suspense>
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



