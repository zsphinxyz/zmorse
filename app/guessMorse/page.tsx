import GuessMorse from '@/components/guessMorse'
import React from 'react'

export default function page() {
  return (
    <main className="flex w-full items-center flex-col bg-[#425554] h-full">
      <h1 className="font-bold text-3xl text-center my-2 underline underline-offset-4 mb-5"></h1>
      <GuessMorse />
      {/* <Letter_morse /> */}
    </main>
  )
}
