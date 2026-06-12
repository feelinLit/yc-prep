import { cn } from "@/utils";
import type { QuestionCategory } from "@/utils/questions/types";

export function QuestionCategoryBadge({
  category,
}: {
  category: QuestionCategory;
}) {
  return (
    <span
      className={cn(
        "w-fit rounded-full px-1.5 py-1 text-sm text-white",
        category == "Startup 101" && "bg-gray-100",
        category == "Product Development" && "bg-purple-100",
        category == "Management Operations" && "bg-bright-blue",
        category == "Growth Strategies" && "bg-accent",
        category == "Market and Customers" && "bg-yellow-100",
        category == "Founder Traits" && "bg-orange-400",
        category == "Industry knowledge" && "bg-yellow-100",
      )}
    >
      {category}
    </span>
  );
}
