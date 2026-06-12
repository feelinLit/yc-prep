"use client";

import { useEffect, useState } from "react";
import { QuestionsProgress } from "@/components/questions/Progress";
import { Title } from "@/components/questions/voice-answer/Title";
import { BigButton } from "@/components/questions/voice-answer/Buttons";
import { useRouter } from "next/navigation";

export default function Finish() {
  const router = useRouter();
  const [transcript, setTranscript] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("onboardingTranscript");
    if (stored) setTranscript(stored);
  }, []);

  return (
    <div className="flex h-dvh flex-col items-center justify-between bg-orange-100 pb-6 pt-14">
      <div className="flex w-full flex-col items-center gap-4">
        <QuestionsProgress progress={100} className="w-56" />
      </div>
      <div className="flex max-w-72 flex-col gap-4 self-center p-4">
        <Title color="dark">Awesome!</Title>
        <p className="text-center text-3xl text-gray-400">
          Let&apos;s start your learning journey
        </p>
        {transcript && (
          <div className="mt-2 rounded-2xl bg-white/60 p-4">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Here&apos;s what you told us:
            </p>
            <p className="max-h-36 overflow-y-auto text-sm leading-relaxed text-gray-500">
              {transcript}
            </p>
          </div>
        )}
      </div>
      <BigButton
        className="w-64"
        onClick={() => {
          router.push("/home/levels?autoselect=1");
        }}
      >
        Start
      </BigButton>
    </div>
  );
}
