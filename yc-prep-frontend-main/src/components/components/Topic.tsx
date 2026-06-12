import { QuestionCategory } from "@/utils/questions/types";
import Image from "next/image";
import { clsx } from "clsx";

export function Topic({
  topic,
  percent = 0,
}: {
  topic: QuestionCategory;
  percent?: number;
}) {
  return (
    <div
      className={clsx(
        "flex cursor-pointer items-center gap-2 rounded-3xl p-4",
        topic == "Startup 101" && "bg-gray-300 text-gray-100",
        topic == "Product Development" && "bg-purple-700 text-purple-100",
        topic == "Management Operations" && "bg-blue-700 text-blue-100",
        topic == "Growth Strategies" && "bg-green-700 text-green-100",
        topic == "Market and Customers" && "bg-yellow-700 text-yellow-100",
        topic == "Founder Traits" && "bg-orange-700 text-orange-100",
        topic == "Industry knowledge" && "bg-red-700 text-red-100",
      )}
    >
      <div className="flex size-14 min-w-14 items-center justify-center rounded-xl bg-current p-2">
        <Image
          src={clsx(
            topic == "Startup 101" && "/topics/startup-101.png",
            topic == "Product Development" && "/topics/product-development.png",
            topic == "Management Operations" &&
              "/topics/management-operations.png",
            topic == "Growth Strategies" && "/topics/growth-strategies.png",
            topic == "Market and Customers" &&
              "/topics/market-and-customers.png",
            topic == "Founder Traits" && "/topics/founder-traits.png",
            topic == "Industry knowledge" && "/topics/industry-knowledge.png",
          )}
          alt="Startup 101"
          className="size-8"
          width={140}
          height={140}
        />
      </div>
      <div className="flex flex-col justify-between">
        <h2 className="text-lg font-semibold">{topic}</h2>
        <p className="text-xs">
          {topic == "Startup 101" &&
            "Basics of turning ideas into viable startups"}
          {topic == "Product Development" &&
            "Principles of designing and iterating customer-centric products"}
          {topic == "Management Operations" &&
            "Essentials of managing startup operations and team dynamics"}
          {topic == "Growth Strategies" &&
            "Tactics for scaling startups through marketing and sales innovations"}
          {topic == "Market and Customers" &&
            "Strategies for understanding and targeting your market"}
          {topic == "Founder Traits" &&
            "Key personal qualities and skills for founder success"}
          {topic == "Industry knowledge" &&
            "Insights into industry trends innovations, and the competitive landscape."}
        </p>
      </div>
      <div className="relative size-12 min-w-12">
        <svg
          className="h-full w-full"
          fill="currentColor"
          viewBox="0 0 100 100"
        >
          <circle
            style={{
              strokeDasharray: "400, 400",
              transition: "stroke-dashoffset 0.35s",
              transform: "rotate(-90deg)",
              transformOrigin: "50% 50%",
            }}
            strokeWidth="5"
            strokeLinecap="round"
            cx="50"
            cy="50"
            r="40"
            fill={clsx(
              topic == "Startup 101" && "#6E828C",
              topic == "Product Development" && "#574EA5",
              topic == "Management Operations" && "#0B50B8",
              topic == "Growth Strategies" && "#339B75",
              topic == "Market and Customers" && "#B0903D",
              topic == "Founder Traits" && "#B07242",
              topic == "Industry knowledge" && "#B04850",
            )}
            stroke="currentColor"
            strokeDashoffset={`calc(400 - (250 * ${percent}) / 100)`}
          ></circle>
          <path
            transform="translate(44, 38) scale(2.5)"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.93333 4.2C7.46667 4.6 7.46667 5.4 6.93333 5.8L1.6 9.8C0.940763 10.2944 0 9.82405 0 9L0 1C0 0.175955 0.940764 -0.294427 1.6 0.2L6.93333 4.2Z"
          />
        </svg>
      </div>
    </div>
  );
}
