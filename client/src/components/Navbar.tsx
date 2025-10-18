import ShinyButton from "./ShinyButton"

export default function Navbar() {
  return (
    <header className="w-full absolute top-0 left-0 right-0 z-10">
      <div className="mx-auto max-w-screen-lg px-4 py-4 md:py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold tracking-tight text-white">GreenLink</span>
            <span className="rounded-full bg-white/20 backdrop-blur-sm px-2 py-0.5 text-[10px] font-medium text-white animate-pulse">
              Beta
            </span>
          </div>
          <nav className="flex items-center gap-3">
            <ShinyButton color="outline" size="sm" className="bg-emarald-100 text-white/90 hover:text-emerald-900 hover:bg-emarald-50 cursor-pointer">
              Login
            </ShinyButton>
          </nav>
        </div>
      </div>
    </header>
  )
}