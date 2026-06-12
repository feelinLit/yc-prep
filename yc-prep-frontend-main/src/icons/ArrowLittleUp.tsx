export function ArrowLittleUp({
  size = 24,
  className,
  onClick,
}: {
  size?: number;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 28 13"
      strokeWidth="3"
      stroke="currentColor"
      fill="none"
    >
      <path d="M27 11L15.2194 1.93802C14.5005 1.38501 13.4995 1.38501 12.7806 1.93802L1 11" />
    </svg>
  );
}
