
export default function Footer() {
  return (
    <div className="py-1 text-center w-full text-sm">
      &copy;{new Date().getFullYear()}; by {' '} <a href="https://github.com/zsphinxyz" target="_blank" className="text-blue-400 underline">
         zsphinx 
      </a>
    </div>
  )
}
