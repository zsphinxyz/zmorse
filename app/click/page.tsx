
export default function page() {
  return (
    <section className="flex h-full gap-2 flex-col relative bg-[darkviolet]">
      <section className="p-2 flex flex-col gap-2 h-full items-center justify-center">

        <div className="bg-slate-700 w-full max-w-3xl h-1/2">
          <div className="">
            ..-.
          </div>
        </div>

        <div className="h-1/2 w-full max-w-3xl grid place-content-center">
          <div className="bg-gradient-radial from-slate-800 to-slate-900 rounded-lg p-20 grid place-content-center border-2 border-neutral-400 [box-shadow:2px_2px_0_#25252566]">
            <p className="text-sm opacity-20 pointer-events-none select-none">Hover over this pad and click to send</p>
          </div>
        </div>

      </section>
    </section>
  )
}
