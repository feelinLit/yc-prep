import { X } from "@/icons/X";
import { BigButton } from "@/components/questions/voice-answer/Buttons";

export function OnboardingSkipAnswerModal({
  hide,
  nextPage,
}: {
  hide: () => void;
  nextPage: () => void;
}) {
  return (
    <div className="fixed left-0 top-0 z-40 h-dvh w-screen bg-black/40 backdrop-blur-sm">
      <div
        className="fixed left-1/2 top-1/2 z-50 flex w-96 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-6 rounded-3xl bg-gray-400 bg-cover bg-bottom p-4"
        style={{
          backgroundImage:
            "url('/onboarding-skip-answer-modal-background.png')",
        }}
      >
        <X className="absolute left-4 top-4 text-gray-900" onClick={hide} />
        <p className="max-w-64 text-center text-lg">
          Are you sure you want to skip this part?
        </p>
        <h3 className="text-center text-2xl font-bold text-orange-100">
          Answering will improve your learning experience
        </h3>
        <div className="flex flex-col gap-1.5 px-2">
          <p className="text-center">
            This crucial question shapes investor insights, directly impacting
            your startup&apos;s success.
          </p>
          <p className="text-center">
            Postponing might mean missing out on customized advice when
            it&apos;s most crucial. Let&apos;s optimize your success together!
          </p>
        </div>
        <BigButton
          variant="orange-dark"
          className="mt-20 w-64 text-2xl"
          onClick={nextPage}
        >
          Answer
        </BigButton>
      </div>
    </div>
  );
}
