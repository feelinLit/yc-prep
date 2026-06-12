import { cn } from "@/utils";

export type BigButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?:
    | "dark"
    | "green-dark"
    | "green-answer"
    | "red-answer"
    | "orange-dark"
    | "blue-answer"
    | "gray-answer"
    | "ghost"
    | "ghost-dark";
  size?: "big" | "bigger";
  fontWeight?: "normal" | "bold";
  className?: string;
  disabled?: boolean;
};
export function BigButton({
  children,
  onClick,
  variant = "dark",
  size = "big",
  fontWeight = "bold",
  className,
  disabled,
}: BigButtonProps) {
  return (
    <button
      className={cn(
        "flex min-h-[60px] items-center justify-center rounded-lg border-2 p-4 text-white transition-all active:scale-95 text-center",
        variant == "dark" && "border-gray-400 bg-gray-400",
        variant == "green-dark" &&
          "border-accent bg-accent text-gray-400",
        variant == "green-answer" &&
          "border-green-700 bg-green-700 text-accent",
        variant == "red-answer" && "border-red-700 bg-red-700 text-red-100",
        variant == "orange-dark" &&
          "border-orange-100 bg-orange-100 text-gray-400",
        variant == "blue-answer" && "border-blue-700 bg-blue-700 text-blue-200",
        variant == "gray-answer" && "border-gray-700 bg-gray-700 text-gray-100",
        variant == "ghost" && "border-white",
        variant == "ghost-dark" && "border-gray-400 text-gray-400",
        size == "bigger" && "min-h-[80px] p-6 text-lg",
        fontWeight == "bold" && "font-bold",
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
