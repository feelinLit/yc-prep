"use client";

import { useState } from "react";
import { QuestionsProgress } from "@/components/questions/Progress";
import { Title } from "@/components/questions/voice-answer/Title";
import { BigButton } from "@/components/questions/voice-answer/Buttons";
import { clsx } from "clsx";
import { useRouter } from "next/navigation";

const defaultRoles = ["CEO", "CTO", "CMO"];
export default function Role() {
  const router = useRouter();

  const [role, setRole] = useState("");
  const [otherEnabled, setOtherEnabled] = useState(false);
  const [otherRole, setOtherRole] = useState("");

  function handleDefaultClick(r: string) {
    setRole(r);
    setOtherEnabled(false);
  }

  function handleOtherClick() {
    if (!otherEnabled) {
      setOtherEnabled(true);
      setRole(otherRole);
    }
  }

  return (
    <div className="flex h-dvh flex-col items-center justify-between bg-orange-100 pb-6 pt-14">
      <div className="flex w-full flex-col items-center gap-4">
        <QuestionsProgress progress={5} className="w-56" />
        <Title color="dark">What is your role?</Title>
      </div>
      <div className="flex max-w-64 flex-col items-center gap-4 self-center p-4">
        {defaultRoles.map((r) => (
          <BigButton
            key={r}
            className="w-64"
            variant={role == r ? "dark" : "ghost-dark"}
            onClick={() => handleDefaultClick(r)}
          >
            {r}
          </BigButton>
        ))}
        <BigButton
          className="w-64"
          variant={otherEnabled ? "dark" : "ghost-dark"}
          onClick={handleOtherClick}
        >
          Other...
        </BigButton>
        <input
          value={otherRole}
          onChange={(e) => {
            setOtherRole(e.target.value);
            setRole(e.target.value);
          }}
          className={clsx(
            "w-56 border-b-2 border-b-gray-400 bg-transparent text-2xl text-gray-400 focus:outline-none",
            !otherEnabled && "invisible",
          )}
          placeholder="Your role"
        />
      </div>
      <BigButton
        className="w-64"
        disabled={!role}
        onClick={() => {
          localStorage.setItem("userRole", role);
          router.push("/onboarding/location");
        }}
      >
        Next
      </BigButton>
    </div>
  );
}
