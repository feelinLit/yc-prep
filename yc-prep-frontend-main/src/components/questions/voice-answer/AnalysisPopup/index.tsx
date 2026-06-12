import { AnalysisProgress } from "@/components/questions/voice-answer/AnalysisPopup/AnalysisProgress";
import { BigButton } from "@/components/questions/voice-answer/Buttons";
import { AnalysisResponse, TruncatedString } from "@/utils/analysis/types";
import { useEffect, useState } from "react";
import { SubscribeModal } from "@/components/modals/SubscribeModal";

function FullAdvice({ advice, index }: { advice: string; index: number }) {
  return (
    <li className="flex gap-1 text-sm">
      <span>{index + 1}.</span>
      {advice}
    </li>
  );
}

function TruncatedAdvice({
  advice,
  index,
}: {
  advice: TruncatedString;
  index: number;
}) {
  return (
    <li className="flex gap-1">
      <span>{index + 1}.</span>
      <span>
        {advice.head} <span className="blur-sm">{advice.tail}</span>
      </span>
    </li>
  );
}

export function AnalysisPopup({
  analysisResponse,
  nextQuestion,
}: {
  analysisResponse: AnalysisResponse;
  nextQuestion: () => void;
}) {
  const [displaySubscribePopup, setDisplaySubscribePopup] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setDisplaySubscribePopup(true);
    }, 5000);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-50 flex h-dvh w-screen justify-center  bg-gradient-to-r from-gray-800 to-gray-900 p-6">
      <div className="flex h-full max-w-96 flex-col items-center justify-between gap-4">
        <AnalysisProgress score={analysisResponse.analysis.score} />
        <div className="flex h-full w-full flex-col gap-4 overflow-y-auto">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-medium">Advices</h3>
            <ol className="flex flex-col gap-2">
              {analysisResponse.type == "full" &&
                analysisResponse.analysis.advices.map((advice, i) => (
                  <FullAdvice key={i} advice={advice} index={i} />
                ))}
              {analysisResponse.type == "truncated" &&
                analysisResponse.analysis.advices.map((advice, i) => (
                  <TruncatedAdvice key={i} advice={advice} index={i} />
                ))}
            </ol>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-medium">Further actions</h3>
            <ol className="flex flex-col gap-2">
              {analysisResponse.type == "full" &&
                analysisResponse.analysis.infoToThink.map((advice, i) => (
                  <FullAdvice key={i} advice={advice} index={i} />
                ))}
              {analysisResponse.type == "truncated" &&
                analysisResponse.analysis.infoToThink.map((advice, i) => (
                  <TruncatedAdvice key={i} advice={advice} index={i} />
                ))}
            </ol>
          </div>
          <div className="flex flex-col"></div>
        </div>
        <BigButton className="w-64" onClick={nextQuestion}>
          Next question
        </BigButton>
      </div>
      {displaySubscribePopup && (
        <SubscribeModal hide={() => setDisplaySubscribePopup(false)} />
      )}
    </div>
  );
}
