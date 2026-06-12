import { useState } from "react";
import { clsx } from "clsx";
import { useRouter } from "next/navigation";
import { ArrowLittleUp } from "@/icons/ArrowLittleUp";
import { MilestoneComplete, MilestoneIncomplete } from "@/icons/Milestone";
import { Presentation } from "@/icons/Presentation";
import { Round as RoundType } from "@/utils/rounds/types";

type Milestone = {
  milestone: number;
  solved: boolean;
};

const ROUND_NUMBER_MAP: Record<RoundType, number> = {
  "Friends and family": 1,
  "Pre-seed": 2,
  "Seed": 3,
  "Series A": 4,
  "Series B": 5,
  "Series C": 6,
};

const alignmentClasses = [
  "self-start",
  "self-center",
  "self-end",
  "self-center",
];

export function Round({
  round,
  milestones,
  currentRound,
  currentMilestone,
}: {
  round: RoundType;
  milestones: Milestone[];
  currentRound: number;
  currentMilestone: number;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const roundNum = ROUND_NUMBER_MAP[round];

  const roundColorThemes: Record<RoundType, { border: string; text: string; bg: string; dot: string }> = {
    "Friends and family": { border: "border-accent/20", text: "text-accent", bg: "bg-accent/5", dot: "bg-accent" },
    "Pre-seed": { border: "border-yellow-100/20", text: "text-yellow-100", bg: "bg-yellow-100/5", dot: "bg-yellow-100" },
    "Seed": { border: "border-orange-400/20", text: "text-orange-400", bg: "bg-orange-400/5", dot: "bg-orange-400" },
    "Series A": { border: "border-red-200/20", text: "text-red-200", bg: "bg-red-200/5", dot: "bg-red-200" },
    "Series B": { border: "border-purple-50/20", text: "text-purple-50", bg: "bg-purple-50/5", dot: "bg-purple-50" },
    "Series C": { border: "border-blue-100/20", text: "text-blue-100", bg: "bg-blue-100/5", dot: "bg-blue-100" },
  };

  const theme = roundColorThemes[round];

  return (
    <div
      className={clsx(
        "flex flex-col w-full mb-6 border rounded-2xl overflow-hidden transition-all duration-300 shadow-md bg-gray-800/20",
        theme.border
      )}
    >
      <div
        className="flex w-full cursor-pointer items-center justify-between bg-gray-800/80 hover:bg-gray-800 px-6 py-4 transition-colors"
        onClick={() => setCollapsed((c) => !c)}
      >
        <div className="flex items-center gap-3">
          <span className={clsx("size-2.5 rounded-full animate-pulse", theme.dot)} />
          <h2 className={clsx("text-xl font-bold tracking-wide", theme.text)}>{round}</h2>
        </div>
        <ArrowLittleUp
          className={clsx(
            "size-5 transition-transform duration-300 text-gray-100",
            collapsed && "rotate-180",
          )}
        />
      </div>
      <div
        className={clsx(
          "flex w-full flex-col items-center transition-all duration-300",
          collapsed ? "invisible h-0 opacity-0 overflow-hidden" : "opacity-100 py-6",
        )}
      >
        <div className="flex w-72 flex-col -space-y-1 pb-6">
          {milestones.map(({ milestone, solved }, index) => {
            const isLocked =
              roundNum > currentRound ||
              (roundNum === currentRound && milestone > currentMilestone);

            const Component = solved ? MilestoneComplete : MilestoneIncomplete;

            return (
              <Component
                key={index}
                number={milestone}
                className={clsx(
                  alignmentClasses[index % alignmentClasses.length],
                  "transition-all duration-200 hover:scale-110",
                  isLocked ? "opacity-35 cursor-not-allowed" : "cursor-pointer drop-shadow-[0_0_8px_rgba(255,255,255,0.05)]",
                )}
                onClick={() => {
                  if (!isLocked) {
                    router.push(`/questions?round=${roundNum}&milestone=${milestone}`);
                  }
                }}
              />
            );
          })}
        </div>
        <div className={clsx("flex w-full max-w-sm cursor-pointer items-center justify-center gap-4 py-3 rounded-xl hover:brightness-110 transition-all font-semibold", theme.bg, theme.text)}>
          <p className="w-28 text-center text-sm uppercase tracking-wider">
            Demo day
          </p>
          <Presentation className="size-5" />
          <p className="w-28 text-center text-sm uppercase tracking-wider truncate">
            {round}
          </p>
        </div>
      </div>
    </div>
  );
}

