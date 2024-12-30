import { IconType } from "@lib/types";

export const SupportIcon: React.FC<IconType> = ({ scale = 1 }) => (
  <svg
    width={20 * scale}
    height={20 * scale}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="10" cy="10" r="9" stroke="white" />
    <path
      d="M5.60449 14.3931C5.60449 13.5049 5.95732 12.6531 6.58534 12.0251C7.21337 11.397 8.06516 11.0442 8.95333 11.0442C9.8415 11.0442 10.6933 11.397 11.3213 12.0251C11.9493 12.6531 12.3022 13.5049 12.3022 14.3931H5.60449ZM8.95333 10.6256C7.56566 10.6256 6.4417 9.50166 6.4417 8.11398C6.4417 6.72631 7.56566 5.60236 8.95333 5.60236C10.341 5.60236 11.465 6.72631 11.465 8.11398C11.465 9.50166 10.341 10.6256 8.95333 10.6256Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.8838 6.02072C12.9245 6.02072 13.7675 7.03763 13.7675 8.29315C13.7675 9.54866 12.9245 10.5257 11.8838 10.5257C12.5499 10.5257 13.1888 10.8449 13.6598 11.4131C14.1308 11.9814 14.3954 12.752 14.3954 13.5556H13.319"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
