import { IconType } from "@lib/types";

export const RejectedIcon: React.FC<IconType> = ({ scale = 1 }) => (
  <svg
    width={scale * 16}
    height={scale * 16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 1.5C4.416 1.5 1.5 4.416 1.5 8C1.5 11.584 4.416 14.5 8 14.5C11.584 14.5 14.5 11.584 14.5 8C14.5 4.416 11.584 1.5 8 1.5ZM8 2.5C11.0435 2.5 13.5 4.9565 13.5 8C13.5 11.0435 11.0435 13.5 8 13.5C4.9565 13.5 2.5 11.0435 2.5 8C2.5 4.9565 4.9565 2.5 8 2.5ZM6.11 5.39L5.39 6.11L7.282 8L5.391 9.89L6.111 10.61L8 8.7185L9.89 10.6085L10.61 9.89L8.7185 8L10.6085 6.11L9.89 5.39L8 7.282L6.11 5.391V5.39Z"
      fill="#EF533A"
    />
  </svg>
);
