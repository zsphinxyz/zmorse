'use client'
import { useEffect, useState } from "react"
import {all, all_rev} from '@/lib/morse'

export default function Convert() {
  const [words, setWords] = useState('');
  const [morse, setMorse] = useState('');

  useEffect(()=>{
    setMorse(
      words.split('').map(word => (
        // @ts-ignore
        all[word.toUpperCase()]
      )).toLocaleString().replaceAll(',', ' ')
    )
  }, [words])


  useEffect(()=>{
    setWords(
      morse.split(' ').map(code => (
        // @ts-ignore
        all_rev[code]
      )).toString().replaceAll(',', '')
    )
  }, [morse])

  return (
    <section className="flex h-full gap-2 flex-col p-2 relative text-green-50">
      <h1 className="font-bold text-3xl text-center my-2 underline underline-offset-4 mb-5">Converter</h1>
      <div className="bg-[steelblue] basis-1/2 rounded-lg ">
        <textarea placeholder="Text..." spellCheck="false" className="h-full w-full bg-transparent text-2xl p-2 font-mono resize-none capitalize" onChange={(e)=>setWords(e.target.value)} value={words}></textarea>
      </div>

      <div className="bg-[steelblue] basis-1/2 rounded-lg ">
        <textarea placeholder="Morse Code..." spellCheck="false" className="h-full w-full bg-transparent text-xl p-2 font-mono resize-none" onChange={(e)=>setMorse( e.target.value.replace(/[^-. ]/g,'')?.toString())} value={morse}></textarea>
      </div>


    </section>
  )
}