import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='flex flex-col gap-2 items-center justify-center h-full bg-neutral-800 p-2 bg-clip-content'>
      <h2 className='text-4xl font-bold'>404 - Not Found</h2>
      <p className="text-lg opacity-50 tracking-widest font-mono font-black -mt-5 select-none">....-  -----  ....-</p>
      <p className='opacity-80 font-sans'>The page you are looking for does not exist.</p>
      <Link className='text-blue-500 px-4 py-2 rounded-md underline font-sans' href="/">Return Home</Link>
    </div>
  )
}