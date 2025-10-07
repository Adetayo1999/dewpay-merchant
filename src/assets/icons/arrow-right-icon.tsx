import { IconType } from "@lib/types";

export const ArrowRightIcon: React.FC<IconType> = ({ scale = 1 }) => (
  <svg
    width={scale * 18}
    height={scale * 19}
    viewBox="0 0 18 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.46875 4.90723L11.5312 9.96973L6.46875 15.0322"
      stroke="currentColor"
      strokeOpacity="0.4"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
