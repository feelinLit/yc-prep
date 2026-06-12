import { useState } from "react";
import { Prepare } from "@/components/questions/voice-answer/Prepare";
import { Answer } from "@/components/questions/voice-answer/Answer";
import { AnalysisResponse } from "@/utils/analysis/types";
import { Correct } from "@/components/questions/voice-answer/Correct";
import { Wrong } from "@/components/questions/voice-answer/Wrong";

export function VoiceAnswer({
  question,
  nextQuestion,
}: {
  question: string;
  nextQuestion: () => void;
}) {
  const [prepared, setPrepared] = useState(false);
  const [analysisResponse, setAnalysis] = useState<AnalysisResponse | null>(
    null,
  );

  if (!prepared) {
    return <Prepare setPrepared={setPrepared} />;
  }
  if (!analysisResponse) {
    return <Answer question={question} setAnalysis={setAnalysis} />;
  }
  if (analysisResponse.analysis.score >= 60) {
    return (
      <Correct
        analysisResponse={analysisResponse}
        nextQuestion={nextQuestion}
      />
    );
  } else {
    return (
      <Wrong analysisResponse={analysisResponse} nextQuestion={nextQuestion} />
    );
  }
}
