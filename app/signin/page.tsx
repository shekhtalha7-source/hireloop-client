"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import logo from "@/app/assets/logo.png"
import Image from "next/image"

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await signIn.email({
      email,
      password,
      callbackURL: "/",
    })

    if (error) {
      setError(error.message ?? "Something went wrong. Please try again.")
      setLoading(false)
      return
    }

    router.push("/")
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-neutral-950 px-4">
      <Link href="/" className="mb-8">
        <Image src={logo} alt="hireloop" className="h-10 w-auto" priority />
      </Link>

      <div className="w-full max-w-md rounded-xl border border-neutral-800 bg-neutral-900 p-8">
        <h1 className="text-2xl font-bold text-white">Sign in</h1>
        <p className="mt-1 text-sm text-neutral-400">
          Welcome back! Enter your details to continue.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm text-neutral-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-violet-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm text-neutral-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-violet-500 focus:outline-none"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="bg-gradient-to-b from-violet-500 to-violet-700 text-white hover:from-violet-400 hover:to-violet-600 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-neutral-800" />
          <span className="text-xs text-neutral-500">or</span>
          <div className="h-px flex-1 bg-neutral-800" />
        </div>

        <Button
          variant="outline"
          size="lg"
          className="w-full border-neutral-700 bg-transparent text-white hover:bg-neutral-800"
          onClick={() =>
            signIn.social({ provider: "google", callbackURL: "/" })
          }
        >
          Continue with Google
        </Button>

        <p className="mt-6 text-center text-sm text-neutral-400">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-violet-400 hover:text-violet-300">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
