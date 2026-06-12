import React, { useState, useEffect } from "react";
import { Balance } from "@/components/Balance";
import { Title } from "@/components/questions/voice-answer/Title";
import {
  QuestionProgress,
  QuestionsProgress,
} from "@/components/questions/Progress";
import { BigButton } from "@/components/questions/voice-answer/Buttons";

const interval = 150; // 15 seconds total
export function Prepare({
  setPrepared,
}: {
  setPrepared: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleClick = () => {
    setPrepared(true);
  };

  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const intervalID = setInterval(() => {
      setProgress((p) => {
        if (p <= 0) {
          clearInterval(intervalID);
          setPrepared(true);
        }
        return p - 1;
      });
    }, interval);

    return () => clearInterval(intervalID);
  }, []);

  return (
    <div className="flex h-dvh flex-col items-center justify-between bg-bright-yellow pb-6">
      <div className="flex w-full flex-col items-center gap-2">
        <Balance />
        <QuestionsProgress progress={20} className="w-56" />
      </div>
      <div className="flex max-w-64 flex-col items-center gap-8 self-center p-4">
        <Title color="dark">How are you going to get users/customers?</Title>
        <QuestionProgress variant="dark" progress={progress} title="Prepare" />
        <Title className="invisible" color="dark">
          How are you going to get users/customers?
        </Title>
      </div>
      <BigButton onClick={handleClick} className="w-64">
        Ready!
      </BigButton>
    </div>
  );
}
