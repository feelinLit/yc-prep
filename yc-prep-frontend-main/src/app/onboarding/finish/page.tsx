"use client";

import { QuestionsProgress } from "@/components/questions/Progress";
import { Title } from "@/components/questions/voice-answer/Title";
import { BigButton } from "@/components/questions/voice-answer/Buttons";
import { useRouter } from "next/navigation";

export default function Finish() {
  const router = useRouter();
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
