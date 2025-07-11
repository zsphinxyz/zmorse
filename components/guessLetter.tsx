'use client'

import { morseLetter } from '@/lib/morse'
import { useEffect, useRef, useState } from 'react'
import Hint from './hint';
import { FiVolume1 } from 'react-icons/fi';
import { MorseAudio } from '@/lib/sound';
import AudioControls, { useFreq, useSpeed } from './audioControls';

export default function GuessLetter() {

  const [client, setClient] = useState(false)
  const [rand, setRand] = useState(Math.floor(Math.random() * 26));
  const [randLetter, randMorse] = Object.entries(morseLetter)[rand] as string[];
  const [userAns, setUserAns] = useState('')
  const [isCorrect, setCorrect] = useState<null | boolean>(null)
  const [showHint, setShowHint] = useState(false)


  const audioRef = useRef<MorseAudio | null>(null);
  const {freq} = useFreq();
  const {speed} = useSpeed();
  
  useEffect(() => {
    audioRef.current = new MorseAudio(freq, speed);
  }, [freq, speed])


  useEffect(() => {
    setClient(true);
  }, [])


  function checkAns(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (userAns != '') {
      if (userAns == randLetter) {
        setCorrect(true)
      } else {
        setCorrect(false)
      }
    }
  }

  function nextQuest() {
    setRand(Math.floor(Math.random() * 26));
    setUserAns('');
    setCorrect(null);
    setShowHint(false)
  }

  function playAudio(morse: string) {
    if(morse) {
      audioRef.current?.adx.resume()
      audioRef.current?.playMorseString(morse)
    }
  }

  return (
    <section className="flex gap-3 flex-col items-center justify-center max-w-screen-lg mx-auto">
      <h1 className="font-bold text-3xl text-center my-2 underline underline-offset-4 mb-2">Guess the Letter</h1>
      <div className="w-full pl-2 mb-2">
        <AudioControls />
      </div>
      <form className="flex flex-col gap-3" autoComplete='off' onSubmit={checkAns}>
        <div className="flex gap-2 select-none cursor-default font-serif">
          <div className="relative text-5xl bg-white/10 size-32 rounded-lg grid place-content-center border border-white/15  hover:bg-white/15 transition">
            <button onClick={() => playAudio(randMorse)} title='Play Audio' type='button' role='button' className="z-10 absolute -top-2 -left-2 bg-white p-1 rounded-full grid place-content-center hover:scale-110 transition-transform">
              <FiVolume1 className='fill-slate-700 text-slate-700 size-5 block mx-auto' />
            </button>
            {client && randMorse}
          </div>

          <div className="text-5xl font-extrabold bg-white/10 size-32 rounded-lg grid place-content-center border border-white/15 hover:bg-white/15 transition">
            {/* {randLetter} */}
            <input autoFocus style={{ background: isCorrect === null ? 'transparent' : isCorrect == false ? '#ff000033' : '#00ff0033' }} type="text" name="userAnsLetter" id="userAnsLetter" className='w-full h-32 block text-center capitalize' value={userAns} onChange={(e) => setUserAns(e.target.value && e.target.value[e.target.value.length - 1].toUpperCase())} />
          </div>
        </div>

        {
          isCorrect ?
            <button className='bg-white/90 hover:bg-white p-2 rounded-sm text-black' onClick={nextQuest}>Next ▶</button> :
            <button type="submit" className='bg-white/90 font-medium hover:bg-white text-black p-2 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed'>Submit</button>
        }

      </form>

      {client &&
        <Hint rand={rand} hint={showHint} setHint={setShowHint} reverse={false} />
      }

    </section>
  )
}
