import { IconType } from "@lib/types";

export const ComplianceIcon: React.FC<IconType> = ({ scale = 1 }) => {
  return (
    <svg
      width={scale * 21}
      height={scale * 21}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="10.5"
        cy="10.5"
        r="9.5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="8"
        y1="9.50073"
        x2="13.84"
        y2="9.50073"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="8"
        y1="12.3"
        x2="13.84"
        y2="12.3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="8"
        y1="6.70154"
        x2="11.04"
        y2="6.70154"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
