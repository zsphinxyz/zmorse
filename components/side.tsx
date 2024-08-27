'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  {
    icon: "💀",
    title: "Guess the Letter",
    link: '/'
  }, {
    icon: "🧭",
    title: "Guess the Morse",
    link: '/guessMorse'
  }, {
    icon: "🎓",
    title: "Learn Morse Code",
    link: '/learn'
  },
]


export default function SideBar() {
  const path = usePathname();
  return (

    <aside className="basis-1/3 flex min-h-dvh flex-col gap-3 pt-10 shrink-0 max-w-14 sm:max-w-72 bg-white/10 px-1 sm:px-3">
      {
        links.map(link => (
          <Link title={link.title} key={link.link} href={link.link} className="flex hover:scale-110 sm:hover:scale-105 transition group justify-center py-2 rounded-md items-center sm:justify-start sm:pl-2 gap-2 relative " style={{background: path == link.link ? '#0aa00a': '#0a0a0a'}}> {link.icon}
            <span className="hidden sm:block">{link.title}</span>
            <span className="hidden group-hover:flex transition delay-1000 items-center sm:scale-0 absolute h-full pl-1 left-[calc(100%+10px)] w-28 rounded-md bg-neutral-200 text-black text-xs font-medium top-1/2 -translate-y-1/2 ">{link.title}</span>
          </Link>
        ))
      }
    </aside>

  )
}
