


"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  CreditCard,
  Settings,
  FileText,
  Bookmark,
  User,
  PlusCircle,
  UserCheck,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menus = {
  seeker: [
    { name: "Dashboard", url: "/dashboard/seeker", icon: LayoutDashboard },
    { name: "Find Jobs", url: "/jobs", icon: Briefcase },
    { name: "My Applications", url: "/dashboard/seeker/applications", icon: FileText },
    { name: "Saved Jobs", url: "/dashboard/seeker/saved-jobs", icon: Bookmark },
    { name: "My Profile", url: "/dashboard/seeker/profile", icon: User },
    { name: "Settings", url: "/dashboard/seeker/settings", icon: Settings },
  ],

  recruiter: [
    { name: "Dashboard", url: "/dashboard/recruiter", icon: LayoutDashboard },
    { name: "Add  Job", url: "/dashboard/recruiter/jobs/new", icon: PlusCircle },
    { name: "Manage Jobs", url: "/dashboard/recruiter/jobs", icon: Briefcase },
    { name: "Applicants", url: "/dashboard/recruiter/applicants", icon: Users },
    { name: "Company", url: "/dashboard/recruiter/company", icon: Building2 },
    { name: "Payments", url: "/dashboard/recruiter/payments", icon: CreditCard },
    { name: "Settings", url: "/dashboard/recruiter/settings", icon: Settings },
  ],

  admin: [
    { name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
    { name: "Users", url: "/dashboard/admin/users", icon: Users },
    { name: "Companies", url: "/dashboard/admin/companies", icon: Building2 },
    { name: "Jobs", url: "/dashboard/admin/jobs", icon: Briefcase },
    { name: "Payments", url: "/dashboard/admin/payments", icon: CreditCard },
    { name: "Verification", url: "/dashboard/admin/verification", icon: ShieldCheck },
    { name: "Reports", url: "/dashboard/admin/reports", icon: BarChart3 },
    { name: "Settings", url: "/dashboard/admin/settings", icon: Settings },
  ],
};

export default function DashboardSidebar() {
  const pathname = usePathname();

  const role = pathname.startsWith("/dashboard/admin")
    ? "admin"
    : pathname.startsWith("/dashboard/recruiter")
    ? "recruiter"
    : "seeker";

  const currentMenu = menus[role];

  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="px-4 py-3 text-2xl font-bold">
          HireLoop
        </h2>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {role.charAt(0).toUpperCase() + role.slice(1)} Menu
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {currentMenu.map((item) => {
                const Icon = item.icon;
                const active =
                  pathname === item.url ||
                  (item.url !== "/jobs" &&
                    item.url !== "/dashboard/seeker" &&
                    item.url !== "/dashboard/recruiter" &&
                    item.url !== "/dashboard/admin" &&
                    pathname.startsWith(item.url + "/"));

                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
  render={<Link href={item.url} />}
  isActive={active}
>
  <Icon />
  <span>{item.name}</span>
</SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <p className="px-4 py-3 text-sm text-muted-foreground">
          HireLoop Dashboard
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
