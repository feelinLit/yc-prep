"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SingleChoice } from "@/components/questions/single-choice";
import { VoiceAnswer } from "@/components/questions/voice-answer";
import { TrueFalse } from "@/components/questions/true-false";
import { MatchTerms } from "@/components/questions/match-terms";
import { DemoDay } from "@/components/questions/demo-day";
import { markLessonComplete } from "@/utils/lessons";

const singleChoiceQuestion = "How are you going to get users/customers?";
const singleChoiceOptions = ["SEO", "Ads", "Word of mouth", "Direct Sales"];

const trueFalseQuestion = "You should focus on growth before product-market fit.";

const matchTermsQuestion = "Match the startup stage with its goal.";
const matchTermsLeft = ["Pre-seed", "Seed", "Series A", "Series B"];
const matchTermsRight = ["Build MVP", "Find PMF", "Scale Sales", "Expand Market"];

export default function QuestionPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextQuestion = () => {
    console.log("Next question");
  };

  const finishDemoLesson = () => {
    const round = Number(searchParams.get("round"));
    const milestone = Number(searchParams.get("milestone"));
    if (round && milestone) markLessonComplete(round, milestone);
    router.push("/home/levels");
  };

  if (id == "demo-day")
    return <DemoDay onFinish={() => router.push("/home/levels")} />;

  if (id == "voice-answer")
    return <VoiceAnswer question={singleChoiceQuestion} nextQuestion={nextQuestion} />;
  
  if (id == "single-choice")
    return (
      <SingleChoice 
        question={singleChoiceQuestion} 
        options={singleChoiceOptions}
        questionId="mock-single-choice"
        category="Growth Strategies"
        progress={33}
        nextQuestion={nextQuestion} 
      />
    );
    
  if (id == "true-false")
    return (
      <TrueFalse 
        question={trueFalseQuestion} 
        questionId="mock-true-false"
        category="Startup 101"
        progress={50}
        nextQuestion={nextQuestion} 
      />
    );
    
  if (id == "match-terms")
    return (
      <MatchTerms
        question={matchTermsQuestion}
        left={matchTermsLeft}
        right={matchTermsRight}
        questionId="mock-match-terms"
        category="Startup 101"
        progress={66}
        nextQuestion={nextQuestion}
      />
    );

  if (id == "demo-lesson")
    return (
      <MatchTerms
        question="Match the startup terms with their correct descriptions."
        left={["Angel Investor", "Burn Rate", "Equity Financing", "Series A Funding"]}
        right={[
          "A high net worth individual who provides financial backing for small startups or entrepreneurs.",
          "The rate at which a new company spends its venture capital to finance overhead before generating positive cash flow from operations.",
          "Raising capital through the sale of shares.",
          "The first significant round of business financing.",
        ]}
        questionId="QCvoHRstqAr9HqUUMWVk"
        category="Growth Strategies"
        progress={50}
        nextQuestion={finishDemoLesson}
      />
    );

  return null;
}
