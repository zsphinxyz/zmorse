'use client'

import Footer from '@/components/Footer';
import { all, letter_imgs } from '@/lib/morse'
import { motion } from "framer-motion";
import { Suspense } from "react";


export default function Learn() {

  return (
    <section className="h-full">
      <p className="text-sm text-right p-2">Credit: {''}
        <a href="https://morse.withgoogle.com/learn/" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">https://morse.withgoogle.com/learn/</a>
      </p>
      <section className="flex flex-wrap justify-center gap-x-2 gap-y-4 py-2 max-w-screen-lg mx-auto">
        {
          letter_imgs.map((img) => (
            <div key={img.id}

            >
              <Suspense fallback={"..."}>
                <motion.img draggable={false} src={`/imgs/${img.img}`} width={500} height={500} alt={img.img.replace('.png', '')} className={`select-none overflow-hidden size-[150px] object-cover bg-[#ef4136]`}
                  whileHover={{
                    animationName: `ani${img.steps}`,
                    animationTimingFunction: `steps(${img.steps})`,
                    animationIterationCount: 'infinite',
                    animationDuration: `2s`,
                    scale: 1.05,
                  }}
                  style={{
                    objectPosition: `-${(img.steps - 1) * 150}px`,
                  }}
                />
              </Suspense>
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



