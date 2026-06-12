export function MilestoneComplete({
  size = 64,
  className,
  onClick,
  number,
}: {
  size?: number;
  className?: string;
  onClick?: () => void;
  number?: number;
}) {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 91 82"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M41.0073 4C41.0073 1.79077 42.7984 0 45.0073 0C46.2027 0 47.2749 0.523682 48.0073 1.35425V1.20581L66.0073 9L49.0073 16.3611V22.136L88.9507 73.428C91.5073 76.7117 89.1675 81.5 85.0054 81.5H5.0093C0.847189 81.5 -1.49265 76.7117 1.06399 73.428L41.0073 22.136V4ZM29 49.9999L44.5078 31C45.1245 30.3747 45.4321 30.4171 46.0078 31L64.5078 53L52.5078 47.5C51.9496 47.2803 51.624 47.2465 51 47.5L45.5078 50.5L41.615 44.1569C41.5 44 41.3688 44.0302 41.1864 44.1569L28.5078 50.5L29 49.9999Z"
      />
      <text
        x="60%"
        y="90%"
        textAnchor="middle"
        fontSize="24"
        fontWeight="bold"
        fill="#2A3C44"
      >
        {number}
      </text>
    </svg>
  );
}

export function MilestoneIncomplete({
  size = 64,
  className,
  onClick,
  number,
}: {
  size?: number;
  className?: string;
  onClick?: () => void;
  number?: number;
}) {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 91 82"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M45.0073 0C42.7984 0 41.0073 1.79077 41.0073 4V22.136L1.06399 73.428C-1.49265 76.7117 0.847189 81.5 5.0093 81.5H85.0054C89.1675 81.5 91.5073 76.7117 88.9507 73.428L49.0073 22.136V16.3611L66.0073 9L48.0073 1.20581V1.35425C47.2749 0.523682 46.2027 0 45.0073 0ZM44.5078 31L29 49.9999L28.5078 50.5L41.1864 44.1569C41.3688 44.0302 41.5 44 41.615 44.1569L45.5078 50.5L51 47.5C51.624 47.2465 51.9496 47.2803 52.5078 47.5L64.5078 53L46.0078 31C45.4321 30.4171 45.1245 30.3747 44.5078 31ZM24 56.5L37.5 51L42 56C43.1003 57.0608 43.9556 57.1073 46 56L50.5 52.5C51.8145 51.6504 52.5888 51.6406 54 52L68.5 58L83 75H6L24 56.5Z"
      />
      <text x="60%" y="87%" textAnchor="middle" fontSize="20" fontWeight="bold">
        {number}
      </text>
    </svg>
  );
}
