"use client";

import { Balance } from "@/components/Balance";
import Link from "next/link";
import { clsx } from "clsx";
import { usePathname } from "next/navigation";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const segments = pathname.split("/");

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto px-4 md:px-8 py-6 overflow-y-auto">
      <div className="md:hidden">
        <Balance />
      </div>
      <div className="flex w-full text-2xl md:text-lg border-b border-gray-800/80 mb-6 max-w-md">
        <Link
          href="/home/levels"
          className={clsx(
            "w-full pb-3 text-center transition-all font-semibold",
            segments[2] == "levels"
              ? "border-b-2 border-accent text-accent"
              : "border-transparent text-gray-100 hover:text-white",
          )}
        >
          levels
        </Link>
        <Link
          href="/home/topics"
          className={clsx(
            "w-full pb-3 text-center transition-all font-semibold",
            segments[2] == "topics"
              ? "border-b-2 border-accent text-accent"
              : "border-transparent text-gray-100 hover:text-white",
          )}
        >
          topics
        </Link>
      </div>
      {children}
    </div>
  );
}

