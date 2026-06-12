import { useState } from "react";
import { Title } from "@/components/questions/voice-answer/Title";
import { BigButton } from "@/components/questions/voice-answer/Buttons";
import { AnswerExplanation } from "@/components/questions/voice-answer/AnswerExplanation";
import { QuestionsProgress } from "@/components/questions/Progress";
import { AnalysisResponse } from "@/utils/analysis/types";
import { AnalysisPopup } from "@/components/questions/voice-answer/AnalysisPopup";

export function Correct({
  analysisResponse,
  nextQuestion,
}: {
  analysisResponse: AnalysisResponse;
  nextQuestion: () => void;
}) {
  const [displayAnalytics, setDisplayAnalytics] = useState(false);
  const handleLookAnalysisClick = () => {
    setDisplayAnalytics(true);
  };

  return (
    <div className="flex h-dvh flex-col items-center justify-between bg-bright-green pb-6">
      <div className="flex w-full flex-col items-center gap-2">
        <QuestionsProgress progress={80} className="w-56" />
      </div>
      <div className="flex max-w-80 flex-col items-center gap-4 self-center p-4">
        <Title color="white">Great answer!</Title>
      </div>
      <div className="flex max-w-72 flex-col items-center gap-4 self-center p-4">
        <AnswerExplanation>
          {analysisResponse.analysis.summary}
        </AnswerExplanation>
      </div>
      <div className="flex flex-col gap-3">
        <BigButton variant="ghost" onClick={nextQuestion} className="w-64">
          Next question
        </BigButton>
        <BigButton
          variant="dark"
          onClick={handleLookAnalysisClick}
          className="w-64"
        >
          Look the analysis
        </BigButton>
      </div>
      {displayAnalytics && (
        <AnalysisPopup
          nextQuestion={nextQuestion}
          analysisResponse={analysisResponse}
        />
      )}
    </div>
  );
}
