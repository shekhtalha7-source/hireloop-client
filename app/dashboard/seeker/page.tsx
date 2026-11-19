
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function SeekerDashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/signin");

  if (session.user.role !== "seeker") {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-neutral-950 p-8 text-white">
      <h1 className="text-3xl font-bold">
        Seeker Dashboard
      </h1>
      <p className="mt-2 text-neutral-400">
        Find jobs, apply for opportunities and manage your applications.
      </p>
    </main>
  );
}
