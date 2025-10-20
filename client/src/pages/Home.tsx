import UrlShortenerForm from "../components/URLShortnerForm.js"
import {Navbar} from "../components/Navbar.js"
import { Link2, MousePointerClick, Sparkles } from "lucide-react"
import StatsRow from '../components/StatsRow.js'
import { useGetHomeQuery } from "../api/appApi.js"

export default function HomePage() {
  const {data} = useGetHomeQuery({})
  return (
    <main className="min-h-dvh bg-background text-foreground flex flex-col">
      <Navbar />

      <section className="relative flex-1 overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-800">
        <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-lighten">
          <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-20%,rgba(52,211,153,0.18),transparent),radial-gradient(800px_400px_at_80%_120%,rgba(16,185,129,0.18),transparent)]" />
        </div>

        <Sparkles aria-hidden="true" className="absolute top-6 left-3 h-8 w-8 text-emerald-200/35 md:h-12 md:w-12" />
        <Link2 aria-hidden="true" className="absolute top-10 right-6 h-10 w-10 text-emerald-300/25 md:h-14 md:w-14" />
        <MousePointerClick
          aria-hidden="true"
          className="absolute bottom-10 left-8 h-9 w-9 text-emerald-100/25 md:h-12 md:w-12"
        />



        <div className="mx-auto flex h-full max-w-screen-xl flex-col items-center justify-center px-4 py-16 md:py-20 mt-16 md:mt-10">
          <div className="w-full max-w-4xl">
            <div className="mx-auto max-w-3xl text-center text-primary-foreground mb-12">
              <h2 className="text-balance text-4xl font-bold tracking-tight md:text-6xl text-white drop-shadow-lg">
                Shorten links. Share faster.
              </h2>
              <p className="mt-4 text-pretty text-base text-white/80 md:text-lg font-light">
                A clean, mobile‑first URL shortener with a friendly green feel.
              </p>
            </div>

            <div className="mb-12">
              <div className="bg-white mx-auto w-full max-w-2xl rounded-3xl border-2 border-emerald-200/50 bg-background p-6 shadow-2xl ring-4 ring-emerald-500/20 backdrop-blur-sm sm:p-8 md:p-10 transition-all hover:shadow-emerald-500/10 hover:ring-emerald-500/30">
                <div className="flex items-center gap-2 mb-4">
                  
                  <h3 className="text-lg font-semibold text-foreground">Shorten a long link</h3>
                </div>
                <UrlShortenerForm />
              </div>
            </div>

            <StatsRow stats={data?.data} />
          </div>
        </div>
      </section>


    </main>
  )
}
