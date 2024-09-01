'use client'

import { Dispatch, SetStateAction } from "react"
import { letter_imgs } from '@/lib/morse'

export default function Hint({rand, hint, setHint, reverse}:{rand:number, hint:boolean, setHint:Dispatch<SetStateAction<boolean>>, reverse:boolean}) {

  return (
    <div className="flex flex-col mt-5" >
      <button className="text-white/70 flex gap-1 mx-auto cursor-help" onClick={() => setHint(!hint)}>Ans: <span className="size-5 bg-white/70 text-black font-serif font-medium grid place-content-center rounded-full">?</span></button>

      <div className="ring-1 ring-white/20 bg-white/5 group " style={{ display: hint ? 'flex' : 'none', flexDirection: reverse ? 'column-reverse' : 'column' }}>
        <img draggable={false} src={`/imgs/${letter_imgs[rand].img}`} width={500} height={500} alt={'hint image'} className={`${reverse ? `group-hover:opacity-100 opacity-0 [animation-play-state:paused] group-hover:[animation-play-state:running] ` : 'peer'} overflow-hidden size-[150px] object-cover select-none transition delay-100`}
          style={{
            animationName: `ani${letter_imgs[rand].steps}`,
            animationTimingFunction: `steps(${letter_imgs[rand].steps})`,
            animationIterationCount: '1',
            animationDuration: `2s`,
            objectPosition: `-${(letter_imgs[rand].steps - 1) * 150}px`,
          }}
        />
        <p className={`text-white/50 text-lg text-center font-medium ${reverse ? '' : 'group-hover:opacity-100 opacity-0' } transition delay-100 block`}>{letter_imgs[rand].img.replace('.png', '')}</p>
      </div>

    </div>
  )
}
