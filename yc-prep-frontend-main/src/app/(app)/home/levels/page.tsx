"use client";

import { useEffect, useState } from "react";
import { Round } from "@/components/levels/Round";
import { getDetailedProgress, getUserData, DetailedProgress, UserProfile } from "@/utils/api";
import { Round as RoundType } from "@/utils/rounds/types";

const ROUNDS: { name: RoundType; num: number }[] = [
  { name: "Friends and family", num: 1 },
  { name: "Pre-seed", num: 2 },
  { name: "Seed", num: 3 },
];

export default function Levels() {
  const [detailedProgress, setDetailedProgress] = useState<DetailedProgress[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getDetailedProgress(), getUserData()])
      .then(([progressData, profileData]) => {
        setDetailedProgress(progressData);
        setProfile(profileData);
        setLoading(false);
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

  return (
    <div className="flex flex-col overflow-y-auto pb-8">
      {ROUNDS.map(({ name, num }) => {
        const roundData = detailedProgress.find((r) => r.round === num);
        const milestones = roundData?.milestones ?? [];

        return (
          <Round
            key={num}
            round={name}
            milestones={milestones}
            currentRound={currentRound}
            currentMilestone={currentMilestone}
          />
        );
      })}
    </div>
  );
}
