"use client";

import { usePathname, useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { accessTokenCookieName } from "@/constants";
import Link from "next/link";
import { Rocket } from "@/icons/Rocket";
import { AddressBook } from "@/icons/AddressBook";
import { Books } from "@/icons/Books";
import { User } from "@/icons/User";
import { clsx } from "clsx";
import { Dart } from "@/icons/Dart";
import { useEffect, useState } from "react";
import { getUserData, UserProfile } from "@/utils/api";
import Image from "next/image";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const segments = pathname.split("/");
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const handleLogout = () => {
    deleteCookie(accessTokenCookieName);
    router.push("/log-in");
  };

  useEffect(() => {
    getUserData()
      .then((data) => setProfile(data))
      .catch((err) => console.error("Failed to load user profile in layout:", err));
  }, []);

  const bucks = profile?.bucks ?? 0;
  const streak = profile?.dailyStreak ?? 0;
  const streakIsActive = streak > 0;
  const energy = profile?.energy ?? 5;

  const navItems = [
    {
      href: "/home/levels",
      icon: Rocket,
      label: "Levels",
      active: segments[2] === "levels",
    },
    {
      href: "/dial-book",
      icon: AddressBook,
      label: "Dial Book",
      active: segments[1] === "dial-book",
    },
    {
      href: "/home/dart",
      icon: Dart,
      label: "Mock Calls",
      active: segments[2] === "dart",
    },
    {
      href: "/home/books",
      icon: Books,
      label: "Resources",
      active: segments[2] === "books",
    },
    {
      href: "/home/users",
      icon: User,
      label: "Profile",
      active: segments[2] === "users" || segments[2] === "user",
    },
  ];

  return (
    <div className="flex h-dvh flex-col md:flex-row bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Desktop Left Sidebar */}
      <aside className="hidden md:flex flex-col w-64 min-w-[16rem] bg-gray-900/90 border-r border-gray-700/50 p-6 justify-between shrink-0">
        <div className="flex flex-col gap-8">
          {/* Logo / Branding */}
          <Link href="/home/levels" className="flex items-center gap-3 px-2 group">
            <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-tr from-accent to-orange-500 shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300">
              <Rocket className="size-6 text-gray-900" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-400">
                YC PREP
              </span>
              <span className="text-[10px] font-semibold text-accent uppercase tracking-widest -mt-1">
                Interview Academy
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 font-medium group",
                    item.active
                      ? "bg-gray-800 text-accent shadow-inner"
                      : "text-gray-100 hover:text-white hover:bg-gray-800/40"
                  )}
                >
                  <Icon
                    className={clsx(
                      "size-5 transition-transform duration-200 group-hover:scale-110",
                      item.active ? "text-accent" : "text-gray-100 group-hover:text-white"
                    )}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer (Profile & Status Card) */}
        <div className="flex flex-col gap-4 border-t border-gray-800 pt-6 cursor-pointer">
          <div className="flex items-center gap-3 px-2">
            <div className="relative size-10 rounded-full overflow-hidden bg-gray-800 border border-gray-700 group/avatar shrink-0">
              {profile?.photoURL ? (
                <Image
                  src={profile.photoURL}
                  alt={profile.displayName || "Avatar"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-sm font-semibold text-gray-300 bg-gray-700">
                  {profile?.displayName?.charAt(0) || "U"}
                </div>
              )}
              {/* Logout overlay centered on avatar */}
              <button
                onClick={handleLogout}
                className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-200 rounded-full"
                title="Log out"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </button>
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-semibold truncate">
                {profile?.displayName || "Founder"}
              </span>
              <span className="text-xs text-gray-100 truncate">
                {profile?.role || "CEO"}
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden h-full relative">
        {/* Top Right Status Bar */}
        <div className="absolute top-4 right-4 md:right-8 z-30 flex items-center gap-3 md:gap-5 bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-2xl px-4 py-2 shadow-lg">
          <div className="flex items-center gap-1.5">
            <span className="text-gray-300 text-[11px] uppercase tracking-wider hidden lg:block font-semibold">Balance</span>
            <div className="flex items-center gap-1 font-bold text-accent text-sm md:text-base">
              <Image src="/dollar-banknote.png" alt="Bucks" width={18} height={18} style={{ imageRendering: "pixelated" }} />
              <span>{bucks}</span>
            </div>
          </div>
          <div className="w-px h-5 bg-gray-700/50"></div>
          <div className="flex items-center gap-1.5">
            <span className="text-gray-300 text-[11px] uppercase tracking-wider hidden lg:block font-semibold">Streak</span>
            <div className="flex items-center gap-1 font-bold text-red-50 text-sm md:text-base">
              <Image src={streakIsActive ? "/streak-active.png" : "/streak-inactive.png"} alt="Streak" width={16} height={16} />
              <span>{streak} d</span>
            </div>
          </div>
          <div className="w-px h-5 bg-gray-700/50"></div>
          <div className="flex items-center gap-1.5">
            <span className="text-gray-300 text-[11px] uppercase tracking-wider hidden lg:block font-semibold">Energy</span>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Image key={i} src={i < energy ? "/can-fulfilled.png" : "/can-empty.png"} alt="energy" width={14} height={14} style={{ imageRendering: "pixelated" }} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {children}
        </div>

        {/* Mobile Bottom Navigation (Glassmorphism design) */}
        <nav className="flex items-center justify-around bg-gray-900/80 backdrop-blur-lg border-t border-gray-800/60 px-6 py-4 md:hidden z-20">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="relative py-1 px-3 flex flex-col items-center gap-1 group">
                <Icon
                  className={clsx(
                    "size-6 transition-all duration-200 group-active:scale-95",
                    item.active ? "text-accent" : "text-gray-100"
                  )}
                />
                {item.active && (
                  <span className="absolute bottom-0 w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_#3dd397]" />
                )}
              </Link>
            );
          })}
        </nav>
      </main>
    </div>
  );
}

