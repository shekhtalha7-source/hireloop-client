
"use client";

// STEP 1: Import required tools
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

// STEP 2: Import Better Auth client
import { authClient } from "@/lib/auth-client";

// STEP 3: Import Button component
import { Button } from "@/components/ui/button";

// STEP 4: Import logo
import logo from "@/app/assets/logo.png";

// STEP 5: Main SignIn Component
export default function SignInPage() {

  // Router: Navigate to another page
  const router = useRouter();

  // State: Store user input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State: Store error and loading status
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // STEP 6: Handle Login Form Submission
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

    // Prevent page reload
    e.preventDefault();

    // Clear previous error
    setError(null);

    // Start loading
    setLoading(true);

    try {

      // Send login request to Better Auth
      const { error: signInError } = await authClient.signIn.email({
  email,
  password,
  callbackURL: "/dashboard",
});

 // Check login error
if (signInError) {
  setError(
    signInError.message ?? "Something went wrong. Please try again."
  );
  return;
}

// Login successful
router.push("/dashboard");
router.refresh();

     
     

      // Handle unexpected errors
      setError("Unable to connect. Please try again.");

    } finally {

      // Stop loading
      setLoading(false);
    }
  }

  // STEP 7: UI Design
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-neutral-950 px-4">

      {/* Logo */}
      <Link href="/" className="mb-8">
        <Image
          src={logo}
          alt="hireloop"
          className="h-10 w-auto"
          priority
        />
      </Link>

      {/* Login Card */}
      <div className="w-full max-w-md rounded-xl border border-neutral-800 bg-neutral-900 p-8">

        <h1 className="text-2xl font-bold text-white">
          Sign in
        </h1>

        <p className="mt-1 text-sm text-neutral-400">
          Welcome back! Enter your details to continue.
        </p>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col gap-4"
        >

          {/* Email Input */}
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

          {/* Password Input */}
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

          {/* Error Message */}
          {error && (
            <p className="text-sm text-red-400">
              {error}
            </p>
          )}

          {/* Login Button */}
          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="bg-gradient-to-b from-violet-500 to-violet-700 text-white hover:from-violet-400 hover:to-violet-600 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>

        </form>

        {/* OR Divider */}
        <div className="my-6 flex items-center gap-3">

          <div className="h-px flex-1 bg-neutral-800" />

          <span className="text-xs text-neutral-500">
            or
          </span>

          <div className="h-px flex-1 bg-neutral-800" />

        </div>

        {/* Google Login */}
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="w-full border-neutral-700 bg-transparent text-white hover:bg-neutral-800"
          onClick={async () => {

            const { error } = await authClient.signIn.social({
              provider: "google",
             callbackURL: "/dashboard",
            });

            if (error) {
             setError(error.message || "Login failed");
            }

          }}
        >
          Continue with Google
        </Button>

        {/* Signup Link */}
        <p className="mt-6 text-center text-sm text-neutral-400">

          Don&apos;t have an account?{" "}

          <Link
            href="/signup"
            className="text-violet-400 hover:text-violet-300"
          >
            Sign up
          </Link>

        </p>

      </div>
    </div>
  );
}
