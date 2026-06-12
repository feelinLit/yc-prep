import { cn } from "@/utils";

export function Title({
  children,
  color = "white",
  className,
}: {
  children: React.ReactNode;
  color?: "white" | "dark";
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "text-center text-3xl font-bold",
        color == "white" ? "text-white" : "text-gray-700",
        className,
      )}
    >
      {children}
    </h1>
  );
}
