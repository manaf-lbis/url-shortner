import { useState } from "react"
import { Link } from "react-router-dom"
import AuthForm from "../components/AuthForm"
import FloatingIcons from "../components/FloatingIcons"
import { Navbar } from "../components/Navbar"
import { Lock } from "lucide-react"

export default function LoginPage() {
  const [testCredentials, setTestCredentials] = useState<{ email: string; password: string } | null>(null)

  const fillTestCredentials = () => {
    setTestCredentials({ email: "test@example.com", password: "password123" })
  }

  return (
    <main className="min-h-dvh bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-800 flex flex-col">
      <Navbar isLoginNeed={false} />
      <section className="relative flex-1 overflow-hidden flex items-center justify-center">
        <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-lighten">
          <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-20%,rgba(52,211,153,0.18),transparent),radial-gradient(800px_400px_at_80%_120%,rgba(16,185,129,0.18),transparent)]" />
        </div>

        <FloatingIcons />

        <div className="relative z-10 w-full max-w-md px-4">
          <div className="text-center text-white mb-8">
            <div className="flex justify-center mb-4">
              <Lock className="h-12 w-12 text-emerald-300" />
            </div>
            <h2 className="text-3xl font-semibold md:text-4xl">Welcome back</h2>
            <p className="mt-2 text-sm text-white/70 md:text-base">Sign in to your GreenLink account</p>
          </div>

          <div className="rounded-3xl border border-emerald-200 bg-white p-6 shadow-lg sm:p-8">
            <AuthForm type="login" testCredentials={testCredentials} />

            <div className="mt-6 flex items-center justify-center gap-2">
              <div className="group relative">
                <button
                  type="button"
                  onClick={fillTestCredentials}
                  className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition"
                >
                  Test Login
                </button>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-emerald-950 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-50">
                  Fill test credentials for demo
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-white/70">
            Don’t have an account?{" "}
            <Link to="/signup" className="font-medium text-emerald-300 hover:text-emerald-200 transition">
              Sign up
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
