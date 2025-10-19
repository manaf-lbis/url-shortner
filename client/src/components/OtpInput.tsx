import type React from "react"
import { useRef, useState, useEffect } from "react"
import { RotateCcw } from "lucide-react"

interface OtpInputProps {
  value: string
  onChange: (value: string) => void
  email?: string
  onResend?: () => void
}

export default function OtpInput({ value, onChange, email, onResend }: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [timeLeft, setTimeLeft] = useState(30)
  const [canResend, setCanResend] = useState(false)

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true)
      return
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft])

  const handleChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return

    const newOtp = value.split("")
    newOtp[index] = val
    const otpString = newOtp.join("")

    onChange(otpString.slice(0, 6))

    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleResend = () => {
    setTimeLeft(30)
    setCanResend(false)
    onChange("")
    if (onResend) {
      onResend()
    }
  }

  return (
    <div className="space-y-4">
      {email && (
        <div className="text-center mb-4">
          <p className="text-sm text-emerald-600">OTP sent to</p>
          <p className="text-sm font-medium text-emerald-950">{email}</p>
        </div>
      )}

      {/* OTP Input Fields */}
      <div className="flex gap-2 justify-center">
        {Array.from({ length: 6 }).map((_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[index] || ""}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-12 text-center text-lg font-semibold rounded-lg border-2 border-emerald-200 bg-white text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
          />
        ))}
      </div>

      <div className="flex items-center justify-center gap-2">
        {!canResend ? (
          <div className="text-center">
            <p className="text-sm text-emerald-600">
              Resend OTP in <span className="font-semibold">{timeLeft}s</span>
            </p>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600 hover:bg-emerald-100 hover:border-emerald-300 transition group relative"
            title="Resend OTP"
          >
            <RotateCcw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-300" />
            <span className="text-sm font-medium">Resend OTP</span>
          </button>
        )}
      </div>
    </div>
  )
}
