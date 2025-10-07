interface StatementsIconProps {
  scale?: number;
  color?: string;
}

export const StatementsIcon = ({
  scale = 1,
  color = "currentColor",
}: StatementsIconProps) => (
  <svg
    width={24 * scale}
    height={24 * scale}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 12L11 14L15 10"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
      stroke={color}
      strokeWidth="2"
    />
    <path
      d="M12 8V12L15 15"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
