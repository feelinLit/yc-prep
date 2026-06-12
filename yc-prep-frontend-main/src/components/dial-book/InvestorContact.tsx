import { Round } from "@/utils/rounds/types";
import { clsx } from "clsx";
import Image from "next/image";
import { Mail } from "@/icons/Mail";

export function InvestorContact({
  active,
  name,
  avatar,
  round,
  investment,
  summaryID,
}: {
  active: boolean;
  name: string;
  avatar: string;
  round: Round;
  investment: number;
  summaryID?: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div
        className={clsx(
          "flex size-16 items-center justify-center rounded-full",
          !active
            ? "bg-gray-100"
            : clsx(
                round == "Friends and family" && "bg-accent",
                round == "Pre-seed" && "bg-yellow-100",
                round == "Seed" && "bg-orange-400",
                round == "Series A" && "bg-red-200",
                round == "Series B" && "bg-purple-50",
                round == "Series C" && "bg-blue-100",
              ),
        )}
      >
        <Image
          src={avatar}
          alt={name}
          width={48}
          height={48}
          className="size-8"
        />
      </div>
      <div className="flex w-40 flex-col">
        <p className={clsx("font-bold", !active && "text-gray-100")}>{name}</p>
        <p className={clsx("text-sm", !active && "text-gray-100")}>{round}</p>
      </div>
      <div className="flex items-center gap-2">
        <Image
          src="/dollar-banknote.png"
          alt="paid balance"
          width={40}
          height={40}
          className={clsx("size-6", !active && "grayscale")}
          style={{ imageRendering: "pixelated" }}
          priority
        />
        <span className={active ? "text-accent" : "text-gray-100"}>
          {investment}
        </span>
      </div>
      <Mail className={clsx("cursor-pointer", !summaryID && "invisible")} />
    </div>
  );
}
