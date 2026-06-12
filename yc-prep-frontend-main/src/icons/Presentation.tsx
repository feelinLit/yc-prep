export function Presentation({
  size = 64,
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
      viewBox="0 0 94 77"
      fill="currentColor"
    >
      <path d="M0 8.74228e-07H94V10H0V8.74228e-07Z" />
      <path d="M5 55H89V60C89 62.7614 86.7614 65 84 65H10C7.23858 65 5 62.7614 5 60V55Z" />
      <path d="M79 65V4.37114e-07L89 0V60C89 62.7614 86.7614 65 84 65H79Z" />
      <path d="M42 77V65H52V77H42Z" />
      <path d="M10 65C7.23858 65 5 62.7614 5 60L5 4.37114e-07L15 0L15 65H10Z" />
      <path d="M55 18H72V27H55V18Z" />
      <path d="M55 34H72V43H55V34Z" />
      <path d="M35 18.0379C34.67 18.0128 34.3365 18 34 18C26.8203 18 21 23.8203 21 31C21 38.1797 26.8203 44 34 44C41.1797 44 47 38.1797 47 31C47 30.6635 46.9872 30.33 46.9621 30H35V18.0379Z" />
    </svg>
  );
}
