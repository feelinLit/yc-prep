import { useState, useEffect } from "react";
import { QuestionsProgress } from "@/components/questions/Progress";
import { QuestionCategoryBadge } from "@/components/questions/QuestionCategoryBadge";
import { BigButton } from "@/components/questions/voice-answer/Buttons";
import { FeedbackBanner } from "@/components/questions/FeedbackBanner";
import { QuestionOptionState, QuestionCategory } from "@/utils/questions/types";
import { questionStateVariant } from "@/utils/questions";
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
  const [trueState, setTrueState] = useState<QuestionOptionState>("non-selected");
  const [falseState, setFalseState] = useState<QuestionOptionState>("non-selected");
  const [loadingAnswers, setLoadingAnswers] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [shakeOption, setShakeOption] = useState<"true" | "false" | null>(null);

  useEffect(() => {
    setTrueState("non-selected");
    setFalseState("non-selected");
    setFeedback(null);
    setShakeOption(null);
  }, [questionId]);

  async function handleOptionClick(option: boolean) {
    if (trueState === "non-selected" && falseState === "non-selected") {
      if (option) setTrueState("selected");
      else setFalseState("selected");

      setLoadingAnswers(true);
      try {
        const res = await answerQuestion(questionId, option);
        setLoadingAnswers(false);
        const resultState = res.correct ? "correct" : "incorrect";
        if (option) setTrueState(resultState);
        else setFalseState(resultState);

        if (!res.correct) {
          setShakeOption(option ? "true" : "false");
          setTimeout(() => setShakeOption(null), 500);
        }
        setFeedback(res.correct ? "correct" : "incorrect");
      } catch (err) {
        console.error("Failed to check answer:", err);
        setLoadingAnswers(false);
      }
    }
  }

  const answered = trueState !== "non-selected" || falseState !== "non-selected";

  return (
    <div className="flex h-dvh flex-col items-center justify-between gap-8 pb-6 bg-gray-500">
      <div className="flex w-full flex-col items-center gap-2">
        <QuestionsProgress progress={progress} className="w-56" />
      </div>
      <div className="flex max-w-80 flex-col gap-1.5">
        <p className="text-2xl">{question}</p>
        <QuestionCategoryBadge category={category} />
      </div>
      <div className="flex h-full max-w-80 flex-col items-center justify-center gap-6">
        <div className="flex w-fit flex-col gap-4">
          <BigButton
            className={clsx(
              "min-w-56",
              loadingAnswers && "animate-pulse",
              shakeOption === "true" && "animate-shake",
            )}
            size="bigger"
            fontWeight={trueState === "non-selected" ? "normal" : undefined}
            variant={questionStateVariant(trueState)}
            onClick={() => handleOptionClick(true)}
            disabled={answered}
          >
            True
          </BigButton>
          <BigButton
            className={clsx(
              "min-w-56",
              loadingAnswers && "animate-pulse",
              shakeOption === "false" && "animate-shake",
            )}
            size="bigger"
            fontWeight={falseState === "non-selected" ? "normal" : undefined}
            variant={questionStateVariant(falseState)}
            onClick={() => handleOptionClick(false)}
            disabled={answered}
          >
            False
          </BigButton>
        </div>
      </div>

      {feedback && (
        <FeedbackBanner result={feedback} onContinue={nextQuestion} />
      )}
    </div>
  );
}
