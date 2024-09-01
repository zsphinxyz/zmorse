import {Goldman} from 'next/font/google'
import Controls from './controls'

const font = Goldman({weight: ['400', '700'], subsets: ['latin']})

export default function Nav() {
  return (
    <nav className={`${font.className} h-16 flex  justify-between items-center px-5 bg-neutral-100 shadow-sm shadow-black/30`}>
      <div className="">
        <h1 className="text-3xl font-bold select-none cursor-default bg-gradient-to-tr from-blue-500 to-lime-500 bg-clip-text text-transparent ">--..MORSE
        </h1>
        
      </div>
      <div className="">
        <Controls />
      </div>
    </nav>
  )
}
