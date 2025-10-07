interface AccountIconProps {
  scale?: number;
  color?: string;
}

export const AccountIcon = ({
  scale = 1,
  color = "currentColor",
}: AccountIconProps) => (
  <svg
    width={24 * scale}
    height={24 * scale}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 9C3 6.79086 4.79086 5 7 5H17C19.2091 5 21 6.79086 21 9V18C21 20.2091 19.2091 22 17 22H7C4.79086 22 3 20.2091 3 18V9Z"
      stroke={color}
      strokeWidth="2"
    />
    <path
      d="M3 9L12 15L21 9"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="9" r="2" stroke={color} strokeWidth="2" />
  </svg>
);
