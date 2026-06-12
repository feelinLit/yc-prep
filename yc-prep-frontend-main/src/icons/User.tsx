export function User({
  size = 26,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 35 40"
      strokeWidth="1.5"
      fill="currentColor"
    >
      <path d="M27.5 10C27.5 15.5228 23.0228 20 17.5 20C11.9772 20 7.5 15.5228 7.5 10C7.5 4.47715 11.9772 0 17.5 0C23.0228 0 27.5 4.47715 27.5 10Z" />
      <path d="M0 28.3333C0 25.1117 2.61167 22.5 5.83333 22.5H29.1667C32.3883 22.5 35 25.1117 35 28.3333C35 34.7767 29.7767 40 23.3333 40H11.6667C5.22334 40 0 34.7767 0 28.3333Z" />
    </svg>
  );
}
