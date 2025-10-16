import { Stars, MousePointerClick, ShieldCheck, Link2 } from "lucide-react"

export default function FloatingIcons() {
  const item = (key, style, Icon, className) => (
    <div
      key={key}
      aria-hidden
      className={`pointer-events-none absolute text-emerald-300/25 ${className}`}
      style={style}
    >
      <Icon className="h-6 w-6 md:h-8 md:w-8" />
    </div>
  )

  return (
    <div className="absolute inset-0 -z-0 overflow-hidden">
      {[
        item("i1", { top: "12%", left: "6%" }, Stars, "animate-[pulse_6s_ease-in-out_infinite]"),
        item("i2", { top: "22%", right: "10%" }, MousePointerClick, "animate-[pulse_7s_ease-in-out_infinite]"),
        item("i3", { bottom: "18%", left: "12%" }, ShieldCheck, "animate-[pulse_8s_ease-in-out_infinite]"),
        item("i4", { bottom: "12%", right: "8%" }, Link2, "animate-[pulse_6s_ease-in-out_infinite]"),
      ]}
    </div>
  )
}
