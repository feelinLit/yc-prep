import Image from "next/image";
import { Phone } from "@/icons/Phone";

export default function InvestorCall() {
  return (
    <div className="flex h-dvh flex-col items-center justify-around">
      <div className="flex flex-col items-center gap-16">
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/investor-avatars/woman-afroamerican.png"
            alt="Investor avatar"
            width={400}
            height={400}
            className="size-24"
          />
          <span className="text-4xl font-bold">Alice Smith</span>
        </div>
        <span className="text-5xl">00:26</span>
      </div>
      <div className="flex size-24 items-center justify-center rounded-full bg-red-500">
        <Phone className="rotate-[135deg]" />
      </div>
    </div>
  );
}
