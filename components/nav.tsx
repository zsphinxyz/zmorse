import {Goldman} from 'next/font/google'
import AudioControls from './audioControls'

const font = Goldman({weight: ['400', '700'], subsets: ['latin']})

export default function Nav() {
  return (
    <nav className="px-5 bg-gradient-to-r from-neutral-200 to-slate-400 shadow-sm shadow-black/30">
      <section className={`max-w-screen-2xl mx-auto h-16 flex justify-between items-center `}>
        <div className="">
          <h1 className={`${font.className} text-xl sm:text-2xl md:text-3xl font-bold select-none cursor-default bg-gradient-to-br from-blue-500 to-pink-500 bg-clip-text text-transparent`}>
            ။:MORSE
          </h1>
        </div>

        <div className="text-sm font-normal">
          <AudioControls />
        </div>
      </section>
    </nav>
  )
}
