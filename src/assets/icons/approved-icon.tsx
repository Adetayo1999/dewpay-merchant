import { IconType } from "@lib/types";

export const ApprovedIcon: React.FC<IconType> = ({ scale = 1 }) => (
  <svg
    width={scale * 17}
    height={scale * 17}
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.27 11.37H6.98L11.54 6.80998L10.83 6.09998L6.63 10.31L4.71 8.38998L4 9.09998L6.27 11.37Z"
      fill="#40997E"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.60012 1.49999C10.2001 1.59999 11.7001 2.39999 12.8001 3.49999C14.1001 4.89999 14.8001 6.59999 14.8001 8.59999C14.8001 10.2 14.2001 11.7 13.2001 13C12.2001 14.2 10.8001 15.1 9.20012 15.4C7.60012 15.7 6.00012 15.5 4.60012 14.7C3.20012 13.9 2.10012 12.7 1.50012 11.2C0.90012 9.69999 0.80012 7.99999 1.30012 6.49999C1.80012 4.89999 2.70012 3.59999 4.10012 2.69999C5.40012 1.79999 7.00012 1.39999 8.60012 1.49999ZM9.10012 14.4C10.4001 14.1 11.6001 13.4 12.5001 12.3C13.3001 11.2 13.8001 9.89999 13.7001 8.49999C13.7001 6.89999 13.1001 5.29999 12.0001 4.19999C11.0001 3.19999 9.80012 2.59999 8.40012 2.49999C7.10012 2.39999 5.70012 2.69999 4.60012 3.49999C3.50012 4.29999 2.70012 5.39999 2.30012 6.79999C1.90012 8.09999 1.90012 9.49999 2.50012 10.8C3.10012 12.1 4.00012 13.1 5.20012 13.8C6.40012 14.5 7.80012 14.7 9.10012 14.4Z"
      fill="#40997E"
    />
  </svg>
);
