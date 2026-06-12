"use client";

import { useState, useEffect } from "react";
import { Title } from "@/components/questions/voice-answer/Title";
import {
  QuestionProgress,
  QuestionsProgress,
} from "@/components/questions/Progress";
import { BigButton } from "@/components/questions/voice-answer/Buttons";
import { useRouter } from "next/navigation";
import { OnboardingSkipAnswerModal } from "@/components/modals/OnboardingSkipAnswerModal";

const interval = 150; // 15 seconds total
export default function Prepare() {
  const router = useRouter();

  const [displayModal, setDisplayModal] = useState(false);
  const [intervalID, setIntervalID] = useState<NodeJS.Timeout | null>(null);

  const handleSkip = async () => {
    if (intervalID) {
      clearInterval(intervalID);
    }
    setDisplayModal(true);
  };
  const handleReady = async () => {
    await router.push("/onboarding/tell-about");
  };

  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const intervalID = setInterval(() => {
      setProgress((p) => {
        if (p <= 1) {
          clearInterval(intervalID);
          handleReady();
        }
        return p - 1;
      });
    }, interval);
    setIntervalID(intervalID);

    return () => clearInterval(intervalID);
  }, []);

  return (
    <div className="flex h-dvh flex-col items-center justify-between bg-orange-100 pb-6 pt-14">
      <div className="flex w-full flex-col items-center gap-2">
        <QuestionsProgress progress={60} className="w-56" />
        <Title color="dark">So, tell me about your startup:</Title>
      </div>
      <div className="flex max-w-64 flex-col items-center gap-8 self-center p-4">
        <QuestionProgress variant="dark" progress={progress} title="Prepare" />
        <Title className="invisible" color="dark">
          How are you going to get users/customers?
        </Title>
      </div>
      <div className="flex flex-col gap-3">
        <BigButton onClick={handleSkip} className="w-64" variant="ghost-dark">
          Skip for now
        </BigButton>
        <BigButton onClick={handleReady} className="w-64">
          Ready!
        </BigButton>
      </div>
      {displayModal && (
        <OnboardingSkipAnswerModal
          hide={() => setDisplayModal(false)}
          nextPage={() => router.push("/onboarding/finish")}
        />
      )}
    </div>
  );
}
