
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  // Get logged-in user session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // If user is not logged in
  if (!session) {
    redirect("/signin");
  }

  // Get user role
  const role = session.user.role;

  // Redirect based on role
  switch (role) {
    case "seeker":
      redirect("/dashboard/seeker");

    case "recruiter":
      redirect("/dashboard/recruiter");

    case "admin":
      redirect("/dashboard/admin");

    default:
      redirect("/signin");
  }
}
