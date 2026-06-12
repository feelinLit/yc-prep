import { useEffect, useState } from "react";
import { QuestionsProgress } from "@/components/questions/Progress";
import { QuestionCategoryBadge } from "@/components/questions/QuestionCategoryBadge";
import {
  BigButton,
  BigButtonProps,
} from "@/components/questions/voice-answer/Buttons";
import { clsx } from "clsx";
import { delay } from "@/utils";
import { QuestionOptionState, QuestionCategory } from "@/utils/questions/types";
import { questionStateVariant } from "@/utils/questions";
import { answerQuestion } from "@/utils/api";

type MatchOptionState = QuestionOptionState | "semi-selected";
type MatchOption = { option: string; state: MatchOptionState };

function matchQuestionStateVariant(
  state: MatchOptionState,
): BigButtonProps["variant"] {
  if (state == "semi-selected") {
    return "blue-answer";
  }
  return questionStateVariant(state);
}

export function MatchTerms({
  question,
  left,
  right,
  questionId,
  nextQuestion,
  category,
  progress,
}: {
  question: string;
  left: string[];
  right: string[];
  questionId: string;
  nextQuestion: () => void;
  category: QuestionCategory;
  progress: number;
}) {
  const [leftMatchOptions, setLeftMatchOptions] = useState<MatchOption[]>([]);
  const [rightMatchOptions, setRightMatchOptions] = useState<MatchOption[]>([]);
  const [selectedPairs, setSelectedPairs] = useState<{ left: number; right: number }[]>([]);
  const [loadingAnswers, setLoadingAnswers] = useState(false);

  useEffect(() => {
    setLeftMatchOptions(left.map((option) => ({ option, state: "non-selected" })));
    setRightMatchOptions(right.map((option) => ({ option, state: "non-selected" })));
    setSelectedPairs([]);
  }, [left, right, questionId]);

  function handleClick(index: number, side: "left" | "right") {
    const selectedQuestion =
      side === "left" ? leftMatchOptions[index] : rightMatchOptions[index];
    if (selectedQuestion.state != "non-selected") {
      return;
    }

    if (side === "left") {
      const selectedRightQuestion = rightMatchOptions.find(
        (q) => q.state === "semi-selected",
      );
      if (selectedRightQuestion) {
        setLeftMatchOptions((prev) =>
          prev.map((q, i) => (i === index ? { ...q, state: "selected" } : q)),
        );
        setRightMatchOptions((prev) =>
          prev.map((q) =>
            q === selectedRightQuestion ? { ...q, state: "selected" } : q,
          ),
        );

        setSelectedPairs((prev) => [
          ...prev,
          {
            left: index,
            right: rightMatchOptions.indexOf(selectedRightQuestion),
          },
        ]);
      } else if (!leftMatchOptions.some((q) => q.state === "semi-selected")) {
        setLeftMatchOptions((prev) =>
          prev.map((q, i) =>
            i === index ? { ...q, state: "semi-selected" } : q,
          ),
        );
      }
    } else {
      const selectedLeftQuestion = leftMatchOptions.find(
        (q) => q.state === "semi-selected",
      );
      if (selectedLeftQuestion) {
        setRightMatchOptions((prev) =>
          prev.map((q, i) => (i === index ? { ...q, state: "selected" } : q)),
        );
        setLeftMatchOptions((prev) =>
          prev.map((q) =>
            q === selectedLeftQuestion ? { ...q, state: "selected" } : q,
          ),
        );

        setSelectedPairs((prev) => [
          ...prev,
          {
            left: leftMatchOptions.indexOf(selectedLeftQuestion),
            right: index,
          },
        ]);
      } else if (!rightMatchOptions.some((q) => q.state === "semi-selected")) {
        setRightMatchOptions((prev) =>
          prev.map((q, i) =>
            i === index ? { ...q, state: "semi-selected" } : q,
          ),
        );
      }
    }
  }

  useEffect(() => {
    if (
      leftMatchOptions.length > 0 &&
      leftMatchOptions.every((q) => q.state === "selected") &&
      rightMatchOptions.every((q) => q.state === "selected")
    ) {
      checkAnswers();
    }
  }, [leftMatchOptions, rightMatchOptions]);

  async function checkAnswers() {
    setLoadingAnswers(true);
    const formattedPairs = selectedPairs.map((pair) => [
      leftMatchOptions[pair.left].option,
      rightMatchOptions[pair.right].option,
    ]);

    try {
      const res = await answerQuestion(questionId, formattedPairs);
      setLoadingAnswers(false);
      const resultState = res.correct ? "correct" : "incorrect";

      setLeftMatchOptions((prev) =>
        prev.map((q) => ({ ...q, state: resultState })),
      );
      setRightMatchOptions((prev) =>
        prev.map((q) => ({ ...q, state: resultState })),
      );
    } catch (err) {
      console.error("Failed to check matching answers:", err);
      setLoadingAnswers(false);
    }
    await delay(1500);
    nextQuestion();
  }

  return (
    <div className="flex h-dvh flex-col items-center gap-8 pb-6 bg-gray-500">
      <div className="flex w-full flex-col items-center gap-2">
        <QuestionsProgress progress={progress} className="w-56" />
      </div>
      <div className="flex max-w-80 flex-col gap-1.5">
        <p className="text-xl">
          <span className="font-bold">Match the Terms:</span> {question}
        </p>
        <QuestionCategoryBadge category={category} />
      </div>
      <div className="flex max-w-80 grow flex-col items-center gap-4 overflow-y-auto md:max-w-3xl md:flex-row md:gap-5">
        <div className="flex w-full flex-col gap-2.5">
          {leftMatchOptions.map(({ option, state }, index) => (
            <BigButton
              key={index}
              className={clsx("min-w-56", loadingAnswers && "animate-pulse")}
              variant={matchQuestionStateVariant(state)}
              fontWeight={state == "non-selected" ? "normal" : undefined}
              onClick={() => handleClick(index, "left")}
              disabled={state != "non-selected"}
            >
              {option}
            </BigButton>
          ))}
        </div>
        <div className="h-1 min-h-1 w-36 rounded-full bg-gray-700 md:h-36 md:w-2" />
        <div className="flex w-full flex-col gap-2.5">
          {rightMatchOptions.map(({ option, state }, index) => (
            <BigButton
              key={index}
              className={clsx("min-w-56", loadingAnswers && "animate-pulse")}
              variant={matchQuestionStateVariant(state)}
              fontWeight={state == "non-selected" ? "normal" : undefined}
              onClick={() => handleClick(index, "right")}
              disabled={state != "non-selected"}
            >
              {option}
            </BigButton>
          ))}
        </div>
      </div>
    </div>
  );
}
