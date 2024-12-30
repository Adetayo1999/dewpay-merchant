import { IconType } from "@lib/types";

export const PhoneIcon: React.FC<IconType> = ({ scale = 1 }) => {
  return (
    <svg
      width={scale * 28}
      height={scale * 44}
      viewBox="0 0 28 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.3561 33.9995H12.6843M4.66885 2.5022H23.3653C24.0734 2.5022 24.7525 2.81786 25.2535 3.37985C25.7544 3.94184 26.0363 4.70419 26.0371 5.49943V38.5006C26.0371 40.1552 24.8417 41.4978 23.3684 41.4978H4.67196C3.9639 41.4978 3.28478 41.1821 2.78381 40.6201C2.28284 40.0582 2.00098 39.2958 2.00015 38.5006V5.49943C2.00015 4.70419 2.28122 3.94147 2.78161 3.37883C3.28199 2.81618 3.96078 2.50313 4.66885 2.5022Z"
        stroke="currentColor"
        strokeWidth="3.50554"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
