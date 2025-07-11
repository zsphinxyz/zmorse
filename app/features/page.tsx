import Link from "next/link";

export default function FeaturePage() {
  return (
    <div>
      <h1 className="p-3 text-2xl font-medium underline mb-1">- features -</h1>
      <ul className="font-sans [list-style-type:circle] ml-10 text-neutral-200 *:leading-8">
        <li className="opacity-50 list-disc">Adjust audio Frequency and speed.</li>
        <li className="opacity-50 list-disc">Save morse code as audio file in <Link href="/convert" className="link">convert</Link> page.</li>
        <li className="opacity-50 list-disc">Play audio on letter guessing page.</li>
        <li>More audio controls (pause, resume, restart).</li>
        <li>Button that plays A-Z in <Link href="/" className="link">learn</Link> page.</li>
        <li>Guess letters and words from Audio.</li>
        <li>Highlight current playing word in <Link href="/convert" className="link">convert</Link> page and <Link href="/" className="link">learn</Link> page..</li>
        <li>Write morse code via mouse clicks.</li>
      </ul>
    </div>
  )
}
