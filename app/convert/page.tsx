'use client'
import { useEffect, useState } from "react"
import { all, all_rev } from '@/lib/morse'
import Footer from "@/components/Footer";
import { RxResume } from "react-icons/rx";

export default function Convert() {
  const [words, setWords] = useState('');
  const [morse, setMorse] = useState('');
  const [reverse, setReverse] = useState(false)

  // useEffect(()=>{
  //   setMorse(
  //     words.split('').map(word => (
  //       // @ts-ignore
  //       all[word.toUpperCase()]
  //     )).toLocaleString().replaceAll(',', ' ')
  //   )
  // }, [words])


  // useEffect(()=>{
  //   setWords(
  //     morse.split(' ').map(code => (
  //       // @ts-ignore
  //       all_rev[code]
  //     )).toString().replaceAll(',', '')
  //   )
  // }, [morse])

  useEffect(() => {
    reverse ?
      setWords(
        morse.split(' ').map(code => (
          // @ts-ignore
          all_rev[code]
        )).toString().replaceAll(',', '')
      )
      :
      setMorse(
        words.split('').map(word => (
          // @ts-ignore
          all[word.toUpperCase()]
        )).toLocaleString().replaceAll(',', ' ')
      )
  }, [words, morse, reverse])

  return (
    <section className="flex h-full gap-2 flex-col p-2 relative text-green-50">
      <h1 className="font-bold text-3xl text-center my-2 underline underline-offset-4 mb-5">Converter</h1>
      <div className="bg-[darkslateblue] basis-1/2 rounded-lg ">
        <textarea placeholder="Text..." spellCheck="false" className="h-full w-full bg-transparent text-2xl p-2 font-mono resize-none uppercase" onFocus={() => setReverse(false)} onChange={(e) => setWords(e.target.value.replaceAll(' ',''))} value={words}></textarea>
      </div>

      {/* <button className="size-10 mx-auto bg-green-300 rounded-full -mb-5 z-10 flex items-center justify-center">
        <RxResume />
      </button> */}

      <div className="bg-[darkslateblue] basis-1/2 rounded-lg ">
        <textarea placeholder="Morse Code..." spellCheck="false" className="h-full w-full bg-transparent text-xl p-2 font-mono resize-none" onFocus={() => setReverse(true)} onChange={(e) => setMorse(e.target.value.replace(/[^-. ]/g, '')?.toString())} value={morse}></textarea>
      </div>

      <Footer />

    </section>
  )
}
