
import Footer from "@/components/Footer"
import { morseLetter } from "@/lib/morse"
import { revalidatePath } from "next/cache"
// https://random-word-api.herokuapp.com/word

export default async function GuessWord({searchParams}: {searchParams: {guess: string}}) {
  let isCorrect = false

  function converter(word: string) {
    return word.split('').map(letter => morseLetter[letter.toUpperCase()])
  }
  
  const res = await fetch('https://random-word.ryanrk.com/api/en/word/random?length=5')
  const word = await res.json().then(data => data[0])

  const guessWord = searchParams.guess

  // console.log(word, converter(word))
  // console.log(guessWord)

  if (guessWord?.toLowerCase().trim() === word?.toLowerCase()) {
    isCorrect = true
  }

  async function handleNextWord() {
    'use server'
    revalidatePath('/guessWord')
    // redirect('/guessWord')
  }

  return (
    <main className="flex w-full p-2 items-center flex-col bg-[#553054] bg-clip-content h-full">
      <h1 className="font-bold text-3xl text-center mt-7 mb-4 underline underline-offset-4">Guess the word</h1>
      
      <div className="my-5">
        <h1 className="text-3xl font-bold text-center">
          {converter(word).map((letter: string, index: number) => (
            <span key={index} className="inline-block m-0.5 bg-black/10 text-sm sm:text-lg lg:text-xl px-2 py-1 font-mono rounded-md">{letter}</span>
          ))}
        </h1>
      </div>

      { isCorrect &&
        <div className="">
          {
            word.split('').map((letter: string, index: number) => (
              <span key={index} className="inline-block m-1 bg-green-500 text-sm sm:text-lg lg:text-xl px-2 py-1 font-mono rounded-md uppercase">{letter}</span>
            ))
          }
      </div>
      }

      {
      !isCorrect &&
      <form className="flex flex-col gap-2" autoComplete="off">
        <input type="text" name="guess" id="guess" className="text-black px-2 py-1 rounded-sm uppercase mb-1" placeholder="Guess the word" />
        <button type="submit" className="bg-white/90 font-medium hover:bg-white text-black p-2 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed">Submit</button>
      </form>
      }


     {isCorrect && 
     <form className="w-full flex justify-center my-3" action={handleNextWord}>
       <button className="bg-white/90 font-medium hover:bg-white text-black p-2 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed">Next Word ▶</button>
     </form>
     }

     
    <Footer />
     
    </main>
  )
}