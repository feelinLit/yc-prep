import { useState, useEffect } from "react";
import { Balance } from "@/components/Balance";
import { QuestionsProgress } from "@/components/questions/Progress";
import { QuestionCategoryBadge } from "@/components/questions/QuestionCategoryBadge";
import { BigButton } from "@/components/questions/voice-answer/Buttons";
import { QuestionOptionState, QuestionCategory } from "@/utils/questions/types";
import { questionStateVariant } from "@/utils/questions";
import { delay } from "@/utils";
import { clsx } from "clsx";
import { answerQuestion } from "@/utils/api";

export function TrueFalse({
  question,
  questionId,
  nextQuestion,
  category,
  progress,
}: {
  question: string;
  questionId: string;
  nextQuestion: () => void;
  category: QuestionCategory;
  progress: number;
}) {
  const [trueState, setTrueState] =
    useState<QuestionOptionState>("non-selected");
  const [falseState, setFalseState] =
    useState<QuestionOptionState>("non-selected");

  const [loadingAnswers, setLoadingAnswers] = useState(false);

  useEffect(() => {
    setTrueState("non-selected");
    setFalseState("non-selected");
  }, [questionId]);

  async function handleOptionClick(option: boolean) {
    if (trueState == "non-selected" && falseState == "non-selected") {
      if (option) {
        setTrueState("selected");
      } else {
        setFalseState("selected");
      }
      setLoadingAnswers(true);
      try {
        const res = await answerQuestion(questionId, option);
        setLoadingAnswers(false);
        if (option) {
          setTrueState(res.correct ? "correct" : "incorrect");
        } else {
          setFalseState(res.correct ? "correct" : "incorrect");
        }
      } catch (err) {
        console.error("Failed to check answer:", err);
        setLoadingAnswers(false);
      }
      await delay(1000);
      nextQuestion();
    }
  }

  return (
    <div className="flex h-dvh flex-col items-center justify-between gap-8 pb-6 bg-gray-500">
      <div className="flex w-full flex-col items-center gap-2">
        <Balance />
        <QuestionsProgress progress={progress} className="w-56" />
      </div>
      <div className="flex max-w-80 flex-col gap-1.5">
        <p className="text-2xl">{question}</p>
        <QuestionCategoryBadge category={category} />
      </div>
      <div className="flex h-full max-w-80 flex-col items-center justify-center gap-6">
        <div className="flex w-fit flex-col gap-4">
          <BigButton
            className={clsx("min-w-56", loadingAnswers && "animate-pulse")}
            size="bigger"
            fontWeight={trueState == "non-selected" ? "normal" : undefined}
            variant={questionStateVariant(trueState)}
            onClick={() => handleOptionClick(true)}
            disabled={
              trueState != "non-selected" || falseState != "non-selected"
            }
          >
            True
          </BigButton>
          <BigButton
            className={clsx("min-w-56", loadingAnswers && "animate-pulse")}
            size="bigger"
            fontWeight={falseState == "non-selected" ? "normal" : undefined}
            variant={questionStateVariant(falseState)}
            onClick={() => handleOptionClick(false)}
            disabled={
              falseState != "non-selected" || trueState != "non-selected"
            }
          >
            False
          </BigButton>
        </div>
      </div>
    </div>
  );
}
