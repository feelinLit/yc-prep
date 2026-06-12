import Image from "next/image";
import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { getUserData, UserProfile } from "@/utils/api";

export function Balance() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    getUserData()
      .then((data) => setProfile(data))
      .catch((err) => console.error("Failed to load user profile:", err));
  }, []);

  const bucks = profile?.bucks ?? 0;
  const streak = profile?.dailyStreak ?? 0;
  const streakIsActive = streak > 0;
  const energy = profile?.energy ?? 5;

  return (
    <div className="flex w-full justify-between p-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <Image
            src="/dollar-banknote.png"
            alt="paid balance"
            width={40}
            height={40}
            style={{ imageRendering: "pixelated" }}
            priority
          />
          <span className="text-lg font-bold text-accent">{bucks}</span>
        </div>
        <div className="flex items-center gap-1">
          <Image
            src={streakIsActive ? "/streak-active.png" : "/streak-inactive.png"}
            className="size-7"
            alt="paid balance"
            width={90}
            height={90}
            priority
          />
          <span
            className={clsx(
              "text-lg font-bold",
              streakIsActive ? "text-red-50" : "text-gray-100",
            )}
          >
            {streak}
          </span>
        </div>
      </div>
      <div className="flex items-center -space-x-1.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Image
            key={i}
            src={i < energy ? "/can-fulfilled.png" : "/can-empty.png"}
            alt={i < energy ? "one energy unit" : "empty energy unit"}
            width={100}
            height={80}
            className="size-8"
            style={{ imageRendering: "pixelated" }}
          />
        ))}
      </div>
    </div>
  );
}
