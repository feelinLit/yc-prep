import { cn } from "@/utils";

type FeedbackBannerProps = {
  result: "correct" | "incorrect";
  onContinue: () => void;
};

export function FeedbackBanner({ result, onContinue }: FeedbackBannerProps) {
  const isCorrect = result === "correct";

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 animate-slide-up px-6 pb-8 pt-5 shadow-2xl",
        isCorrect ? "bg-green-700" : "bg-red-700",
      )}
    >
      <div className="mx-auto flex max-w-sm flex-col gap-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl font-bold animate-pop-in",
              isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700",
            )}
          >
            {isCorrect ? "✓" : "✗"}
          </div>
          <div>
            <p className="text-lg font-bold text-white">
              {isCorrect ? "Correct!" : "Incorrect!"}
            </p>
            <p className={cn("text-sm", isCorrect ? "text-green-50" : "text-red-50")}>
              {isCorrect ? "Great job, keep it up!" : "Don't worry, keep going!"}
            </p>
          </div>
        </div>
        <button
          onClick={onContinue}
          className={cn(
            "w-full rounded-lg border-2 py-3 text-base font-bold transition-all active:scale-95",
            isCorrect
              ? "border-green-100 bg-green-100 text-green-700 hover:bg-green-50"
              : "border-red-100 bg-red-100 text-red-700 hover:bg-red-50",
          )}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
