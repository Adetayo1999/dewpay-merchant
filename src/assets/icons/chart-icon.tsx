import { IconType } from "@lib/types";

export const ChartIcon: React.FC<IconType> = ({ scale = 1 }) => {
  return (
    <svg
      width={scale * 22}
      height={scale * 22}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.97608 19.1445H20.7483C21.4027 19.1445 21.9331 19.675 21.9331 20.3294C21.9331 20.9837 21.4027 21.5142 20.7483 21.5142H1.79126C1.13691 21.5142 0.606445 20.9837 0.606445 20.3294V1.37231C0.606445 0.71796 1.13691 0.1875 1.79126 0.1875C2.44562 0.1875 2.97608 0.71796 2.97608 1.37231V19.1445Z"
        fill="currentColor"
      />
      <path
        opacity="0.5"
        d="M7.39245 14.0305C6.94491 14.5079 6.19511 14.5321 5.71774 14.0845C5.24036 13.637 5.21617 12.8872 5.66371 12.4098L10.1068 7.67054C10.5396 7.20886 11.2588 7.16882 11.7402 7.57961L15.247 10.572L19.8159 4.78468C20.2214 4.27109 20.9664 4.18344 21.48 4.58891C21.9936 4.99437 22.0813 5.73942 21.6758 6.25301L16.3441 13.0065C15.9277 13.534 15.1563 13.6098 14.6451 13.1736L11.0622 10.1161L7.39245 14.0305Z"
        fill="currentColor"
      />
      <path
        opacity="0.5"
        d="M7.39245 14.0305C6.94491 14.5079 6.19511 14.5321 5.71774 14.0845C5.24036 13.637 5.21617 12.8872 5.66371 12.4098L10.1068 7.67054C10.5396 7.20886 11.2588 7.16882 11.7402 7.57961L15.247 10.572L19.8159 4.78468C20.2214 4.27109 20.9664 4.18344 21.48 4.58891C21.9936 4.99437 22.0813 5.73942 21.6758 6.25301L16.3441 13.0065C15.9277 13.534 15.1563 13.6098 14.6451 13.1736L11.0622 10.1161L7.39245 14.0305Z"
        fill="currentColor"
      />
    </svg>
  );
};