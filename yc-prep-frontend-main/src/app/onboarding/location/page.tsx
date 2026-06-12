"use client";

import { useState } from "react";
import { QuestionsProgress } from "@/components/questions/Progress";
import { Title } from "@/components/questions/voice-answer/Title";
import { BigButton } from "@/components/questions/voice-answer/Buttons";
import { MapPin } from "@/icons/MapPin";
import { useRouter } from "next/navigation";

export default function Location() {
  const router = useRouter();
  const [location, setLocation] = useState("");

  return (
    <div className="flex h-dvh flex-col items-center justify-between bg-orange-100 pb-6 pt-14">
      <div className="flex w-full flex-col items-center gap-4">
        <QuestionsProgress progress={30} className="w-56" />
        <Title color="dark">Where are you located?</Title>
      </div>
      <div className="flex max-w-64 flex-col items-center gap-4 self-center p-4">
        <div className="relative w-56">
          <MapPin className="absolute left-0 text-gray-400" />
          <input
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            className="w-56 border-b-2 border-b-gray-400 bg-transparent pl-7 text-2xl text-gray-400 focus:outline-none"
            placeholder="City, Country"
          />
        </div>
      </div>
      <BigButton
        className="w-64"
        disabled={!location}
        onClick={() => router.push("/onboarding/prepare")}
      >
        Next
      </BigButton>
    </div>
  );
}
