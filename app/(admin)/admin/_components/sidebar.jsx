"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Car, Calendar, Cog, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { SignOutButton } from "@clerk/nextjs";

// Navigation items
const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    label: "Cars",
    icon: Car,
    href: "/admin/cars",
  },
  {
    label: "Test Drives",
    icon: Calendar,
    href: "/admin/test-drives",
  },
  {
    label: "Settings",
    icon: Cog,
    href: "/admin/settings",
  },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-full flex-col overflow-y-auto bg-white/90 backdrop-blur-xl shadow-2xl border-r border-white/20">
        <div className="p-8">
          <Link href="/admin">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Vehiql Admin
            </h1>
          </Link>
        </div>
        <div className="flex flex-col w-full px-4 space-y-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-x-3 text-gray-600 text-sm font-semibold rounded-2xl px-6 py-4 transition-all duration-300 hover:bg-yellow-50 hover:text-yellow-700 group",
                pathname === route.href
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg transform scale-105"
                  : ""
              )}
            >
              <route.icon className={cn(
                "h-5 w-5 transition-transform duration-300 group-hover:scale-110",
                pathname === route.href ? "text-black" : ""
              )} />
              {route.label}
            </Link>
          ))}
        </div>
        <div className="mt-auto p-6">
          <SignOutButton>
            <button className="flex items-center gap-x-3 text-gray-500 text-sm font-semibold transition-all duration-300 hover:text-red-600 hover:bg-red-50 rounded-2xl px-6 py-3 w-full">
              <LogOut className="h-5 w-5" />
              Log out
            </button>
          </SignOutButton>
        </div>
      </div>

      {/* Mobile Bottom Tabs */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-gray-200 flex justify-around items-center h-20 shadow-2xl">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex flex-col items-center justify-center text-gray-500 text-xs font-semibold transition-all duration-300 rounded-2xl p-3",
              pathname === route.href 
                ? "text-black bg-yellow-400 shadow-lg transform scale-105" 
                : "hover:bg-gray-100"
            )}
          >
            <route.icon className="h-6 w-6 mb-1" />
            {route.label}
          </Link>
        ))}
      </div>
    </>
  );
};