import { useEffect, useState } from "react"

function useCountUp(to = 0, ms = 800) {
  const [v, setV] = useState(0)
  useEffect(() => {
    const start = performance.now()
    let raf
    const step = (t) => {
      const p = Math.min(1, (t - start) / ms)
      setV(Math.round(p * to))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [to, ms])
  return v
}

export default function StatsTicker() {
  const linksToday = useCountUp(1243, 900)
  const usersOnline = useCountUp(267, 1000)
  const uptime = useCountUp(99, 700) 

  return (
    <div className="grid grid-cols-3 gap-2 rounded-xl border border-border bg-card p-3 text-center text-xs sm:text-sm">
      <div className="rounded-lg bg-background p-3">
        <div className="font-semibold">{linksToday.toLocaleString()}</div>
        <div className="text-muted-foreground">Links today</div>
      </div>
      <div className="rounded-lg bg-background p-3">
        <div className="font-semibold">{usersOnline.toLocaleString()}</div>
        <div className="text-muted-foreground">Users online</div>
      </div>
      <div className="rounded-lg bg-background p-3">
        <div className="font-semibold">{uptime}%</div>
        <div className="text-muted-foreground">Uptime</div>
      </div>
    </div>
  )
}
