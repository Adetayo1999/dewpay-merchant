import { IconType } from "@lib/types";

export const TrendingDownIcon: React.FC<IconType> = ({ scale = 1 }) => (
  <svg
    width={scale * 24}
    height={scale * 25}
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.001 18.3145L18.291 16.0245L13.411 11.1445L9.41098 15.1445L2.00098 7.72445L3.41098 6.31445L9.41098 12.3145L13.411 8.31445L19.711 14.6045L22.001 12.3145V18.3145H16.001Z"
      fill="#EF533A"
    />
  </svg>
);
