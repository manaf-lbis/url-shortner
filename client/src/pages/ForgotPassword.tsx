import FloatingIcons from "../components/FloatingIcons"
import { KeyRound } from "lucide-react"
import ForgotPasswordForm from "../components/ForgotPasswordForm"
import { Link } from "react-router-dom"

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-dvh bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-800 flex flex-col">
      <section className="relative flex-1 overflow-hidden flex items-center justify-center">
        <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-lighten">
          <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-20%,rgba(52,211,153,0.18),transparent),radial-gradient(800px_400px_at_80%_120%,rgba(16,185,129,0.18),transparent)]" />
        </div>

        <FloatingIcons />

        <div className="relative z-10 w-full max-w-md px-4">
          <div className="text-center text-white mb-8">
            <div className="flex justify-center mb-4">
              <KeyRound className="h-12 w-12 text-emerald-300" />
            </div>
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">Reset password</h2>
            <p className="mt-2 text-pretty text-sm/6 text-white/70 md:text-base">Enter your email to receive an OTP</p>
          </div>

          <div className="rounded-3xl border border-emerald-200 bg-white p-6 shadow-lg ring-1 ring-emerald-500/10 sm:p-8">
            <ForgotPasswordForm />
          </div>

          <div className="mt-6 text-center text-sm text-white/70">
            Remember your password?{" "}
            <Link to="/login" className="font-medium text-emerald-300 hover:text-emerald-200 transition">
              Sign in
            </Link>
          </div>
        </div>
      </section>

     
    </main>
  )
}
