import type React from "react"
import { useState, useEffect } from "react"
import ShinyButton from "./ShinyButton"
import { Mail, Lock, AlertCircle, CheckCircle } from "lucide-react"
import {  useNavigate } from "react-router-dom";
import { useLoginMutation } from "../api/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/authSlice";

interface AuthFormProps {
  type: "login" | "signup"
  testCredentials?: { email: string; password: string } | null
}

export default function AuthForm({ type, testCredentials }: AuthFormProps) {
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const navigate = useNavigate()
  const [login, { isLoading: loginLoading }] = useLoginMutation()

  useEffect(() => {
    if (testCredentials) {
      setEmail(testCredentials.email)
      setPassword(testCredentials.password)
    }
  }, [testCredentials])

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!email.trim()) return setError("Email is required")
    if (!validateEmail(email)) return setError("Please enter a valid email address")
    if (!password) return setError("Password is required")
    if (password.length < 6) return setError("Password must be at least 6 characters")
    if (type === "signup" && password !== confirmPassword) return setError("Passwords do not match")
      

    try {
      let response: any;
      if (type === "login") {
        response = await login({ email, password }).unwrap();
      } 
      dispatch(setUser(response.user));
      navigate("/dashboard");

    } catch (err:any) {
      setError(err?.data?.message || "An error occurred. Please try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-emerald-200 bg-white text-emerald-950 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />
        </div>
      </div>

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
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-emerald-200 bg-white text-emerald-950 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />
        </div>
      </div>

      {type === "signup" && (
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
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-emerald-200 bg-white text-emerald-950 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50 border border-emerald-200">
          <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          <p className="text-sm text-emerald-700">{success}</p>
        </div>
      )}

      <ShinyButton type="submit" size="md" color="green" disabled={loginLoading } className="w-full mt-6">
        {loginLoading ? "Processing..." : type === "login" ? "Sign in" : "Create account"}
      </ShinyButton>

      {type === "login" && (
        <div className="text-center">
          {/* <Link to="/forgot-password" className="text-sm text-emerald-600 hover:text-emerald-700 transition">
            Forgot password?
          </Link> */}
        </div>
      )}
    </form>
  )
}
