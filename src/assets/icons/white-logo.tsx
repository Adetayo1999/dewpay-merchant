import { IconType } from "@lib/types";

export const WhiteLogo: React.FC<IconType> = ({ scale = 1 }) => (
  <svg
    width={scale * 27}
    height={scale * 25}
    viewBox="0 0 27 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.989"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.69137 0.0361978C12.3987 -0.0805575 15.0865 0.0851312 17.7549 0.533264C23.6807 1.95167 26.6262 5.72573 26.5916 11.8553C26.5977 15.2056 25.622 18.2248 23.6645 20.913C21.2587 23.6433 18.221 24.9873 14.5516 24.9447C11.2746 25.0184 7.9977 25.0184 4.7207 24.9447C8.14118 23.2539 10.2951 20.5477 11.1826 16.826C11.4436 15.2186 11.3331 13.6354 10.8512 12.0762C9.49618 8.32417 8.15223 4.56856 6.81943 0.809412C6.82261 0.64052 6.89625 0.511614 7.04035 0.422805C7.9365 0.27258 8.82017 0.143785 9.69137 0.0361978Z"
      fill="white"
    />
    <path
      opacity="0.972"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.38965 5.77905C5.37496 7.56584 6.27704 9.40675 7.0959 11.302C7.85843 13.4334 7.36136 15.2191 5.6047 16.6593C3.9658 17.6878 2.40096 17.5958 0.910182 16.3831C-0.224642 14.8162 -0.298286 13.1962 0.689264 11.5229C1.89635 9.58636 3.12982 7.67177 4.38965 5.77905Z"
      fill="white"
    />
  </svg>
);
