import { useEffect, useMemo, useState } from "react";
import { Presentation } from "@/icons/Presentation";
import { TrueFalse } from "@/components/questions/true-false";

// Demo-only: the "AI" that writes the Demo Day question is mocked. We read the
// startup the user described during onboarding (stored in sessionStorage), fake
// a short "generating" delay, then build a personalized yes/no investor question
// from that context. No model is actually called.

const DEFAULT_STARTUP =
  "an AI app that helps solo founders turn their side projects into fundable startups";

function readStartupContext(): string {
  if (typeof window === "undefined") return DEFAULT_STARTUP;
  const transcript = window.sessionStorage.getItem("onboardingTranscript");
  const cleaned = transcript?.trim();
  return cleaned && cleaned.length > 0 ? cleaned : DEFAULT_STARTUP;
}

// Trim a long pitch down to a short, quotable snippet for the question text.
function snippet(startup: string): string {
  const oneLine = startup.replace(/\s+/g, " ").trim();
  if (oneLine.length <= 120) return oneLine;
  return oneLine.slice(0, 117).trimEnd() + "…";
}

function generateQuestion(startup: string): string {
  return `An investor at Demo Day has just heard your pitch — "${snippet(
    startup,
  )}". They ask: is your market large enough to support a venture-scale, $1B+ outcome?`;
}

export function DemoDay({ onFinish }: { onFinish: () => void }) {
  const [generating, setGenerating] = useState(true);
  const startup = useMemo(readStartupContext, []);
  const question = useMemo(() => generateQuestion(startup), [startup]);

  useEffect(() => {
    const timer = setTimeout(() => setGenerating(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (generating) {
    return (
      <div className="flex h-dvh flex-col items-center justify-center gap-6 bg-gray-500 px-8 text-center">
        <Presentation className="size-12 animate-pulse text-accent" />
        <p className="animate-pulse text-xl font-semibold text-white">
          Generating your Demo Day question…
        </p>
        <p className="max-w-xs text-sm text-gray-200">
          Tailoring an investor question to your startup.
        </p>
      </div>
    );
  }

  return (
    <TrueFalse
      question={question}
      questionId="mock-demo-day"
      category="Market and Customers"
      progress={100}
      nextQuestion={onFinish}
    />
  );
}
