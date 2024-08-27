'use client'

import { morseLetter } from '@/lib/morse'
import { useEffect, useState } from 'react'

export default function guessLetter() {
  
  const [client, setClient] = useState(false)
  const [rand, setRand] = useState(Math.floor(Math.random() * 26));
  const [randLetter, randMorse] = Object.entries(morseLetter)[rand]
  const [userAns, setUserAns] = useState('')
  const [isCorrect, setCorrect] = useState<null | boolean>(null)

  useEffect(()=>{
    setClient(true);
  }, [])

  function checkAns(e:any) {
    e.preventDefault();
    if(userAns != '') {
      if(userAns == randLetter){
        setCorrect(true)
      } else{
        setCorrect(false)
      }
    }
  } 

  function nextQuest() {
    setRand(Math.floor(Math.random() * 26));
    setUserAns('');
    setCorrect(null)
  }

  return (
    <section className="flex gap-3 flex-col items-center justify-center">
      <h1 className="font-bold text-3xl text-center my-2 underline underline-offset-4 mb-5">Guess the Letter</h1>
      <form className="flex flex-col gap-3" autoComplete='off' onSubmit={checkAns}>
        <div className="flex gap-2 select-none cursor-default font-serif">
          <div className="text-5xl bg-white/10 size-32 rounded-lg grid place-content-center border border-white/15  hover:bg-white/15 transition">
            {client && randMorse}
          </div>

          <div className="text-5xl font-extrabold bg-white/10 size-32 rounded-lg grid place-content-center border border-white/15 hover:bg-white/15 transition">
            {/* {randLetter} */}
            <input autoFocus style={{background: isCorrect === null ? 'transparent' : isCorrect == false ? '#ff000033' : '#00ff0033'  }} type="text" name="userAnsLetter" id="userAnsLetter" className='w-full h-32 block text-center capitalize' value={userAns} onChange={(e)=>setUserAns(e.target.value && e.target.value[e.target.value.length-1].toUpperCase())} />
          </div>
        </div>

      {
        isCorrect ? 
          <button className='bg-white/90 hover:bg-white p-2 rounded-sm text-black' onClick={nextQuest}>Next ▶</button> :
          <button type="submit" className='bg-white/90 font-medium hover:bg-white text-black p-2 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed'>Submit</button>
      }

      </form>



    </section>
  )
}
