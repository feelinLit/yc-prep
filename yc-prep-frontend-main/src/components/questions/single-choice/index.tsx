import { useState, useEffect } from "react";
import { Balance } from "@/components/Balance";
import { QuestionsProgress } from "@/components/questions/Progress";
import { QuestionCategoryBadge } from "@/components/questions/QuestionCategoryBadge";
import { BigButton } from "@/components/questions/voice-answer/Buttons";
import { QuestionOptionState, QuestionCategory } from "@/utils/questions/types";
import { questionStateVariant } from "@/utils/questions";
import { delay } from "@/utils";
import { answerQuestion } from "@/utils/api";

type SingleChoiceOption = { option: string; state: QuestionOptionState };

export function SingleChoice({
  question,
  options,
  questionId,
  nextQuestion,
  category,
  progress,
}: {
  question: string;
  options: string[];
  questionId: string;
  nextQuestion: () => void;
  category: QuestionCategory;
  progress: number;
}) {
  const [singleChoiceOptions, setSingleChoiceOptions] = useState<SingleChoiceOption[]>([]);
  const [loadingAnswers, setLoadingAnswers] = useState(false);

  useEffect(() => {
    setSingleChoiceOptions(options.map((option) => ({ option, state: "non-selected" })));
  }, [options, questionId]);

  async function handleOptionClick(index: number) {
    if (singleChoiceOptions.every(({ state }) => state == "non-selected")) {
      setSingleChoiceOptions((prev) =>
        prev.map((option, i) =>
          i === index ? { ...option, state: "selected" } : option,
        ),
      );
      setLoadingAnswers(true);
      try {
        const res = await answerQuestion(questionId, options[index]);
        setLoadingAnswers(false);
        setSingleChoiceOptions((prev) =>
          prev.map((option, i) => {
            if (index != i) {
              return option;
            }
            return {
              ...option,
              state: res.correct ? "correct" : "incorrect",
            };
          }),
        );
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
          {singleChoiceOptions.map(({ option, state }, index) => (
            <BigButton
              key={index}
              size="bigger"
              fontWeight="normal"
              className={loadingAnswers ? "animate-pulse" : undefined}
              variant={questionStateVariant(state)}
              disabled={singleChoiceOptions.some(
                ({ state }) => state != "non-selected",
              )}
              onClick={() => handleOptionClick(index)}
            >
              {option}
            </BigButton>
          ))}
        </div>
      </div>
    </div>
  );
}
