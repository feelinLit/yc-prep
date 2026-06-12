import { X } from "@/icons/X";
import Image from "next/image";
import { BigButton } from "@/components/questions/voice-answer/Buttons";

export function SubscribeModal({ hide }: { hide: () => void }) {
  return (
    <div className="fixed left-0 top-0 z-40 h-dvh w-screen bg-black/40 backdrop-blur-sm">
      <div
        className="fixed left-1/2 top-1/2 z-50 flex w-80 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-6 rounded-3xl bg-cover bg-bottom p-4"
        style={{
          backgroundImage: "url('/subscribe-modal-background.png')",
        }}
      >
        <X className="absolute left-4 top-4 text-gray-900" onClick={hide} />
        <p className="max-w-64 text-center text-lg">
          You have already used all the answer analyzes for today
        </p>
        <h3 className="text-3xl font-bold text-accent">
          Expand your limits!
        </h3>
        <div className="flex flex-col gap-1.5 px-2">
          <div className="flex gap-1">
            <Image
              src="/investor.png"
              alt="Investor"
              width={24}
              height={24}
              className="size-6"
            />
            <span>call investors any time</span>
          </div>
          <div className="flex gap-1">
            <Image
              src="/insights.png"
              alt="Insights"
              width={24}
              height={24}
              className="size-6"
            />
            <span>get insights and recommendations about your answers</span>
          </div>
          <div className="flex gap-1">
            <Image
              src="/unlimited-energy.png"
              alt="Unlimited energy"
              width={24}
              height={24}
              className="size-6"
            />
            <span>get unlimited energy to practice more</span>
          </div>
          <div className="flex gap-1">
            <Image
              src="/Books.png"
              alt="Books icon"
              width={24}
              height={24}
              className="size-6"
            />
            <span>practice specific topics</span>
          </div>
        </div>
        <BigButton variant="green-dark" className="mt-20 w-64">
          Subscribe
        </BigButton>
      </div>
    </div>
  );
}
