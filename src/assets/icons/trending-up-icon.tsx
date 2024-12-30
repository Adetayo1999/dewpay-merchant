import { IconType } from "@lib/types";

export const TrendingUpIcon: React.FC<IconType> = ({ scale = 1 }) => (
  <svg
    width={scale * 25}
    height={scale * 21}
    viewBox="0 0 25 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.4486 5.48828L18.7402 7.46267L13.8568 11.6701L9.85408 8.22139L2.43896 14.6188L3.84994 15.8344L9.85408 10.6614L13.8568 14.1101L20.1612 8.68697L22.4528 10.6614V5.48828H16.4486Z"
      fill="#00B69B"
    />
  </svg>
);
