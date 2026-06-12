"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getQuestions } from "@/utils/api";
import { SingleChoice } from "@/components/questions/single-choice";
import { TrueFalse } from "@/components/questions/true-false";
import { MatchTerms } from "@/components/questions/match-terms";
import type { QuestionCategory } from "@/utils/questions/types";
import { VoiceAnswer } from "@/components/questions/voice-answer";
import { generateLessonQuestion } from "@/actions/generate-question";

const ROUND_TO_CATEGORY: Record<number, QuestionCategory> = {
  1: "Startup 101",
  2: "Founder Traits",
  3: "Product Development",
  4: "Growth Strategies",
  5: "Management Operations",
  6: "Market and Customers",
};

export default function QuestionsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const roundParam = searchParams.get("round");
  const milestoneParam = searchParams.get("milestone");

  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [phase, setPhase] = useState<"quiz" | "ai-loading" | "ai">("quiz");
  const [aiQuestion, setAiQuestion] = useState("");

  const roundNum = roundParam ? parseInt(roundParam) : 1;
  const milestoneNum = milestoneParam ? parseInt(milestoneParam) : 1;

  useEffect(() => {
    if (!roundParam || !milestoneParam) {
      router.push("/home/levels");
      return;
    }

    getQuestions(roundNum, milestoneNum)
      .then((data) => {
        if (!data || data.length === 0) {
          router.push("/home/levels");
        } else {
          setQuestions(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load questions:", err);
        router.push("/home/levels");
      });
  }, [roundParam, milestoneParam, roundNum, milestoneNum, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-xl text-gray-100 bg-gray-500">
        Loading questions...
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);
  const category = ROUND_TO_CATEGORY[roundNum] || "Startup 101";

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setPhase("ai-loading");
      generateLessonQuestion(roundNum, milestoneNum).then(({ question }) => {
        setAiQuestion(question);
        setPhase("ai");
      });
    }
  };

  if (phase === "ai-loading") {
    return (
      <div className="flex h-screen items-center justify-center text-xl text-gray-100 bg-gray-500">
        Preparing your challenge...
      </div>
    );
  }

  if (phase === "ai") {
    return (
      <VoiceAnswer
        question={aiQuestion}
        nextQuestion={() => router.push("/home/levels")}
      />
    );
  }

  if (currentQuestion.type === "multiple choice") {
    return (
      <SingleChoice
        question={currentQuestion.question}
        options={currentQuestion.answers}
        questionId={currentQuestion.id}
        nextQuestion={handleNext}
        category={category}
        progress={progressPercent}
      />
    );
  }

  if (currentQuestion.type === "boolean") {
    return (
      <TrueFalse
        question={currentQuestion.question}
        questionId={currentQuestion.id}
        nextQuestion={handleNext}
        category={category}
        progress={progressPercent}
      />
    );
  }

  if (currentQuestion.type === "match terms") {
    return (
      <MatchTerms
        question={currentQuestion.question}
        left={currentQuestion.left}
        right={currentQuestion.right}
        questionId={currentQuestion.id}
        nextQuestion={handleNext}
        category={category}
        progress={progressPercent}
      />
    );
  }

  return null;
}
