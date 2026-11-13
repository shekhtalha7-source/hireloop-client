
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import logo from "@/app/assets/logo.png";

export default function SignUpPage() {
  const router = useRouter();

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error and loading states
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle signup form submission
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      console.log("📝 User Data:", { name, email });
      // Create a new account using Better Auth
      const { error: signUpError } = await signUp.email({
        
        name,
        email,
        password,
        callbackURL: "/",
      });

      // Check signup error
      if (signUpError) {
        setError(
          signUpError.message ?? "Signup failed. Please try again."
        );
        return;
      }

      // Signup successful
      router.push("/");

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to connect. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  // Signup page UI
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

      {/* Signup Card */}
      <div className="w-full max-w-md rounded-xl border border-neutral-800 bg-neutral-900 p-8">

        <h1 className="text-2xl font-bold text-white">
          Sign up
        </h1>

        <p className="mt-1 text-sm text-neutral-400">
          Create an account to get started.
        </p>

        {/* Signup Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col gap-4"
        >

          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="name"
              className="text-sm text-neutral-300"
            >
              Name
            </label>

            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-violet-500 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm text-neutral-300"
            >
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

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-sm text-neutral-300"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              required
              minLength={8}
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

          {/* Signup Button */}
          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="bg-gradient-to-b from-violet-500 to-violet-700 text-white hover:from-violet-400 hover:to-violet-600 disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create Account"}
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

        {/* Signin Link */}
        <p className="mt-6 text-center text-sm text-neutral-400">
          Already have an account?{" "}

          <Link
            href="/signin"
            className="text-violet-400 hover:text-violet-300"
          >
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}
