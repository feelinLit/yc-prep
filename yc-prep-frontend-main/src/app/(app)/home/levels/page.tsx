"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Round } from "@/components/levels/Round";
import { getDetailedProgress, getUserData, DetailedProgress, UserProfile } from "@/utils/api";
import { getCompletedLessons } from "@/utils/lessons";
import { Round as RoundType } from "@/utils/rounds/types";

const ROUNDS: { name: RoundType; num: number }[] = [
  { name: "Friends and family", num: 1 },
  { name: "Pre-seed", num: 2 },
  { name: "Seed", num: 3 },
];

export default function Levels() {
  const searchParams = useSearchParams();
  const autoselect = searchParams.get("autoselect") === "1";

  const [detailedProgress, setDetailedProgress] = useState<DetailedProgress[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<{ round: number; milestone: number } | null>(null);

  useEffect(() => {
    Promise.all([getDetailedProgress(), getUserData()])
      .then(([progressData, profileData]) => {
        setDetailedProgress(progressData);
        setProfile(profileData);
        setLoading(false);
        if (autoselect) {
          // Right after onboarding: highlight lesson 4 of Friends and family (round 1).
          setSelected({ round: 1, milestone: 4 });
        }
      })
      .catch((err) => {
        console.error("Failed to load levels progress:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-xl text-gray-100">
        Loading progress...
      </div>
    );
  }

  const currentRound = profile?.round ?? 1;
  const currentMilestone = profile?.milestone ?? 1;
  const completedLessons = getCompletedLessons();

  return (
    <div className="flex flex-col overflow-y-auto pb-8">
      {ROUNDS.map(({ name, num }) => {
        const roundData = detailedProgress.find((r) => r.round === num);
        const milestones = (roundData?.milestones ?? []).map((m) => ({
          ...m,
          solved: m.solved || completedLessons.has(`${num}-${m.milestone}`),
        }));

        return (
          <Round
            key={num}
            round={name}
            milestones={milestones}
            currentRound={currentRound}
            currentMilestone={currentMilestone}
            selectedMilestone={selected?.round === num ? selected.milestone : undefined}
            onMilestoneSelect={(milestone) =>
              setSelected(milestone !== null ? { round: num, milestone } : null)
            }
          />
        );
      })}
    </div>
  );
}
