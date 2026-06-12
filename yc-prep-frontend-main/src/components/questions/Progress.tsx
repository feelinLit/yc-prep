import { clsx } from "clsx";
import { cn } from "@/utils";

export function QuestionProgress({
  variant,
  progress,
  title,
}: {
  variant: "light" | "dark";
  progress: number;
  title?: string;
}) {
  return (
    <div
      className={clsx(
        "relative flex h-6 w-full items-center rounded-full px-0.5 ring-[2px]",
        variant == "light" ? "ring-bright-yellow" : "ring-gray-400",
      )}
    >
      <div
        className={clsx(
          "h-5 rounded-full transition-all",
          variant == "light" ? "bg-bright-yellow" : "bg-gray-400",
        )}
        style={{ width: `${progress}%` }}
      />
      {title && (
        <div className="absolute left-0 top-1 flex h-4 w-full items-center justify-center text-sm font-bold text-white">
          {title}
        </div>
      )}
    </div>
  );
}
export function QuestionsProgress({
  progress,
  color = "white",
  className,
}: {
  progress: number;
  color?: "white" | "green" | "yellow" | "red";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-2.5 w-full items-center rounded-full bg-gray-700",
        className,
      )}
    >
      <div
        className={clsx(
          "h-2.5 rounded-full transition-all",
          color == "white" && "bg-white",
          color == "green" && "bg-bright-green",
          color == "yellow" && "bg-bright-yellow",
          color == "red" && "bg-bright-red",
        )}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
