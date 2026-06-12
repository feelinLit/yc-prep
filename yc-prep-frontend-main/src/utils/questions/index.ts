import { BigButtonProps } from "@/components/questions/voice-answer/Buttons";
import { QuestionOptionState } from "@/utils/questions/types";

export function questionStateVariant(
  state: QuestionOptionState,
): BigButtonProps["variant"] {
  switch (state) {
    case "non-selected":
      return "ghost";
    case "selected":
      return "gray-answer";
    case "correct":
      return "green-answer";
    case "incorrect":
      return "red-answer";
  }
}
