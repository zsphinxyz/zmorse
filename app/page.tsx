import GuessLetter from "@/components/guessLetter";

export default function Home() {
  return (
    <main className="flex w-full items-center flex-col text-white bg-slate-700 h-full">
      <h1 className="font-bold text-3xl text-center my-2 underline underline-offset-4 mb-5"></h1>
      <GuessLetter />
      {/* <Letter_morse /> */}
    </main>
  );
}
