import React from "react"
import { Users, Link2, MousePointerClick } from "lucide-react"

function useCountUp(to = 0, duration = 1200) {
  const [value, setValue] = React.useState(0)
  React.useEffect(() => {
    const start = performance.now()
    let raf: number
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration)
      setValue(Math.floor(p * to))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [to, duration])
  return value
}

const StatCard = ({label, value, icon:Icon }:{label:string, value:number, icon:any}) => (
  <li className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur text-white">
    <div className="flex items-center gap-3">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-400/15 text-emerald-200">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <div>
        <p className="text-xs/5 text-white/70">{label}</p>
        <p className="text-base font-semibold tabular-nums">{value.toLocaleString()}</p>
      </div>
    </div>
  </li>
)

interface StatsRowProps {
  stats: {
    totalUsers: number,
    totalLinks: number,
    totalClicks: number
  }
}

const  StatsRow:React.FC<StatsRowProps> = ({stats}) => {
  const users = useCountUp(stats?.totalUsers)
  const links = useCountUp(stats?.totalLinks) 
  const clicks = useCountUp(stats?.totalClicks)

  return (
    <ul className="mx-auto mt-8 grid w-full max-w-3xl grid-cols-3 gap-3">
      <StatCard icon={Users} label="Users" value={users} />
      <StatCard icon={Link2} label="Total Links" value={links} />
      <StatCard icon={MousePointerClick} label="Total Clicks" value={clicks} />
    </ul>
  )
}

export default StatsRow