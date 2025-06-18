import { Metadata } from 'next'
import Learn from './learn'

export const metadata:Metadata = {
  title: "Learn Morse Code",
  description: "Learn the Morse Code from animated pictures",
  keywords: ["learnMorseCode", "Learn Morse Code", "Learn Morse Code animated", "morse.withgoogle.com"]
}

export default function page() {
  return (
    <Learn />
  )
}
