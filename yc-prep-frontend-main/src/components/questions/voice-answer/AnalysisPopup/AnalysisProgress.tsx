import { QuestionsProgress } from "@/components/questions/Progress";
import { AwardOk } from "@/icons/AwardOk";
import { AwardWarn } from "@/icons/AwardWarn";
import { AwardStar } from "@/icons/AwardStar";
import { clsx } from "clsx";

export function AnalysisProgress({ score }: { score: number }) {
  const emotion = score >= 80 ? "green" : score >= 60 ? "yellow" : "red";
  return (
    <div className="flex gap-4 rounded-3xl bg-gray-400 p-4">
      <div
        className={clsx(
          "flex size-16 max-h-16 flex-shrink-0 items-center justify-center rounded-xl text-gray-700",
          emotion == "green" && "bg-bright-green",
          emotion == "yellow" && "bg-bright-yellow",
          emotion == "red" && "bg-bright-red",
        )}
      >
        {emotion == "green" && <AwardStar />}
        {emotion == "yellow" && <AwardOk />}
        {emotion == "red" && <AwardWarn />}
      </div>
      <div className="flex h-full flex-shrink flex-col justify-between">
        <p className="text-sm font-medium">
          You answered this question better than {score}% users
        </p>
        <QuestionsProgress color={emotion} progress={score} />
      </div>
    </div>
  );
}
