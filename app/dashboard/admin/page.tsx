
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function AdminDashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/signin");

  if (session.user.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-neutral-950 p-8 text-white">
      <h1 className="text-3xl font-bold">
        Admin Dashboard
      </h1>
      <p className="mt-2 text-neutral-400">
        Manage users, verify recruiters and monitor HireLoop.
      </p>
    </main>
  );
}
