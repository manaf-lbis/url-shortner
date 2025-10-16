export default function ShinyButton({
  children,
  size = "md",
  color = "green",
  type = "button",
  className = "",
  disabled = false,
  onClick,
}) {
  const sizeCls = size === "sm" ? "h-9 px-3 text-sm" : size === "lg" ? "h-12 px-6 text-base" : "h-11 px-4 text-sm"

  const duration = size === "lg" ? 900 : size === "sm" ? 650 : 800
  const shineWidth = size === "lg" ? "180%" : size === "sm" ? "120%" : "145%"

  const colorCls =
    color === "green"
      ? "bg-emerald-600 text-white hover:bg-emerald-600/95"
      : color === "outline"
        ? "border border-emerald-600 text-emerald-700 hover:bg-emerald-50"
        : "bg-foreground text-background hover:opacity-95"

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={[
        "group relative inline-flex items-center justify-center overflow-hidden rounded-md font-medium transition",
        "shadow-sm hover:shadow-emerald-500/20 hover:ring-1 hover:ring-emerald-400/30",
        "disabled:cursor-not-allowed disabled:opacity-60",
        sizeCls,
        colorCls,
        className,
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-1/2 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-80 transition-transform ease-out group-hover:translate-x-[220%]"
        style={{ width: shineWidth, transitionDuration: `${duration}ms` }}
      />
      {size !== "sm" && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-20"
          style={{
            background: "radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 60%)",
          }}
        />
      )}
      <span className="relative">{children}</span>
    </button>
  )
}
