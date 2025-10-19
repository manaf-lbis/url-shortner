import type React from "react"
import { useState } from "react"
import ShinyButton from "./ShinyButton"
import { Mail, Lock, AlertCircle, CheckCircle } from "lucide-react"
import OtpInput from "./OtpInput"

export default function SignupForm() {
  const [step, setStep] = useState<"credentials" | "otp">("credentials")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!email.trim()) {
      setError("Email is required")
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    if (!password) {
      setError("Password is required")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess("OTP sent to your email")
      setStep("otp")
    }, 1500)
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP")
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess("Account created successfully! Redirecting to login...")
      setTimeout(() => {
        window.location.href = "/login"
      }, 1500)
    }, 1500)
  }

  const handleResend = () => {
    setError("")
    setSuccess("OTP resent to your email")
  }

  return (
    <form onSubmit={step === "credentials" ? handleCredentialsSubmit : handleOtpSubmit} className="space-y-4">
      {step === "credentials" ? (
        <>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-emerald-950 mb-2">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-600/50" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-emerald-200 bg-white text-emerald-950 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-emerald-950 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-600/50" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-emerald-200 bg-white text-emerald-950 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-emerald-950 mb-2">
              Confirm password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-600/50" />
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-emerald-200 bg-white text-emerald-950 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-emerald-950 mb-2">
              Enter 6-digit OTP
            </label>
            <OtpInput value={otp} onChange={setOtp} email={email} onResend={handleResend} />
          </div>

          {/* Resend OTP */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setStep("credentials")
                setOtp("")
              }}
              className="text-sm text-emerald-600 hover:text-emerald-700 transition"
            >
              Change email?
            </button>
          </div>
        </>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50 border border-emerald-200">
          <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          <p className="text-sm text-emerald-700">{success}</p>
        </div>
      )}

      {/* Submit Button */}
      <ShinyButton type="submit" size="md" color="green" disabled={loading} className="w-full mt-6">
        {loading ? "Processing..." : step === "credentials" ? "Continue" : "Verify OTP"}
      </ShinyButton>
    </form>
  )
}
