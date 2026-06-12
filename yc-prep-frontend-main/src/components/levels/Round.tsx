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
  selectedMilestone,
  onMilestoneSelect,
}: {
  round: RoundType;
  milestones: Milestone[];
  currentRound: number;
  currentMilestone: number;
  selectedMilestone?: number;
  onMilestoneSelect?: (milestone: number | null) => void;
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
        "flex flex-col w-full mb-6 border rounded-2xl overflow-visible transition-all duration-300 shadow-md bg-gray-800/20",
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
            // Auto-selection (e.g. right after onboarding) may target a still-locked
            // milestone, so allow the selected milestone's popup to show regardless of lock.
            const isSelected = selectedMilestone === milestone;

            // When a milestone is selected, it's the active one (white) and the rest dim
            // to gray; otherwise fall back to lock-based dimming. Solved lessons stay
            // bright (green) even if the backend still considers them locked.
            const dimmed =
              selectedMilestone !== undefined ? !isSelected : isLocked && !solved;

            return (
              <div
                key={index}
                className={clsx("relative", alignmentClasses[index % alignmentClasses.length])}
              >
                <Component
                  number={milestone}
                  className={clsx(
                    "transition-all duration-200 hover:scale-110",
                    isLocked ? "cursor-not-allowed" : "cursor-pointer",
                    dimmed ? "opacity-35" : "drop-shadow-[0_0_8px_rgba(255,255,255,0.05)]",
                    isSelected && "scale-110",
                  )}
                  onClick={() => {
                    if (!isLocked) {
                      onMilestoneSelect?.(isSelected ? null : milestone);
                    }
                  }}
                />
                {isSelected && (
                  <div className="absolute bottom-full left-1/2 mb-3 -translate-x-1/2 z-20 flex flex-col items-center gap-2 rounded-2xl bg-gray-800 border border-gray-600 px-5 py-4 shadow-2xl w-52">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Lesson {milestone}</span>
                      <span className={clsx("text-base font-bold", theme.text)}>{round}</span>
                    </div>
                    <button
                      className={clsx(
                        "w-full rounded-xl py-2.5 text-sm font-bold uppercase tracking-wider transition-all hover:brightness-110 active:scale-95",
                        theme.bg, theme.text, "border", theme.border,
                      )}
                      onClick={() => router.push(`/questions/demo-lesson?round=${roundNum}&milestone=${milestone}`)}
                    >
                      Start
                    </button>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 size-4 rotate-45 bg-gray-800 border-r border-b border-gray-600" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className={clsx("flex w-full max-w-sm cursor-pointer items-center justify-center gap-4 py-3 rounded-xl hover:brightness-110 transition-all font-semibold", theme.bg, theme.text)}>
          <p className="text-center text-sm uppercase tracking-wider">
            Demo day
          </p>
          <Presentation className="size-5" />
        </div>
      </div>
    </div>
  );
}

