"use client";

import { Balance } from "@/components/Balance";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto px-4 md:px-8 py-6 overflow-y-auto">
      <div className="md:hidden">
        <Balance />
      </div>
      {children}
    </div>
  );
}
