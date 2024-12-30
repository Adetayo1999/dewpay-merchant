import { IconType } from "@lib/types";

export const TransactionIcon: React.FC<IconType> = ({ scale = 1 }) => (
  <svg
    width={scale * 18}
    height={scale * 18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 1.5H7.5C6.90326 1.5 6.33097 1.73705 5.90901 2.15901C5.48705 2.58097 5.25 3.15326 5.25 3.75V9C5.25 9.59674 5.48705 10.169 5.90901 10.591C6.33097 11.0129 6.90326 11.25 7.5 11.25H15C15.5967 11.25 16.169 11.0129 16.591 10.591C17.0129 10.169 17.25 9.59674 17.25 9V3.75C17.25 3.15326 17.0129 2.58097 16.591 2.15901C16.169 1.73705 15.5967 1.5 15 1.5ZM15.75 9C15.75 9.19891 15.671 9.38968 15.5303 9.53033C15.3897 9.67098 15.1989 9.75 15 9.75H7.5C7.30109 9.75 7.11032 9.67098 6.96967 9.53033C6.82902 9.38968 6.75 9.19891 6.75 9V3.75C6.75 3.55109 6.82902 3.36032 6.96967 3.21967C7.11032 3.07902 7.30109 3 7.5 3H15C15.1989 3 15.3897 3.07902 15.5303 3.21967C15.671 3.36032 15.75 3.55109 15.75 3.75V9ZM13.125 6C12.8475 6.00165 12.5804 6.10583 12.375 6.2925C12.2137 6.14591 12.0133 6.04933 11.7982 6.01448C11.5831 5.97963 11.3625 6.00802 11.1631 6.09619C10.9638 6.18437 10.7944 6.32854 10.6755 6.51118C10.5566 6.69382 10.4933 6.90706 10.4933 7.125C10.4933 7.34294 10.5566 7.55618 10.6755 7.73882C10.7944 7.92146 10.9638 8.06563 11.1631 8.15381C11.3625 8.24198 11.5831 8.27037 11.7982 8.23552C12.0133 8.20067 12.2137 8.10409 12.375 7.9575C12.5104 8.0806 12.6739 8.16879 12.8511 8.21443C13.0283 8.26008 13.214 8.26179 13.3921 8.21942C13.5701 8.17706 13.7352 8.09189 13.8728 7.97131C14.0105 7.85074 14.1167 7.69839 14.1822 7.52748C14.2477 7.35658 14.2705 7.17228 14.2486 6.99057C14.2267 6.80886 14.1609 6.63523 14.0567 6.48474C13.9526 6.33425 13.8133 6.21144 13.6509 6.12697C13.4885 6.0425 13.308 5.99892 13.125 6ZM12 12.75C11.8011 12.75 11.6103 12.829 11.4697 12.9697C11.329 13.1103 11.25 13.3011 11.25 13.5V14.25C11.25 14.4489 11.171 14.6397 11.0303 14.7803C10.8897 14.921 10.6989 15 10.5 15H3C2.80109 15 2.61032 14.921 2.46967 14.7803C2.32902 14.6397 2.25 14.4489 2.25 14.25V11.25H3C3.19891 11.25 3.38968 11.171 3.53033 11.0303C3.67098 10.8897 3.75 10.6989 3.75 10.5C3.75 10.3011 3.67098 10.1103 3.53033 9.96967C3.38968 9.82902 3.19891 9.75 3 9.75H2.25V9C2.25 8.80109 2.32902 8.61032 2.46967 8.46967C2.61032 8.32902 2.80109 8.25 3 8.25C3.19891 8.25 3.38968 8.17098 3.53033 8.03033C3.67098 7.88968 3.75 7.69891 3.75 7.5C3.75 7.30109 3.67098 7.11032 3.53033 6.96967C3.38968 6.82902 3.19891 6.75 3 6.75C2.40326 6.75 1.83097 6.98705 1.40901 7.40901C0.987053 7.83097 0.75 8.40326 0.75 9V14.25C0.75 14.8467 0.987053 15.419 1.40901 15.841C1.83097 16.2629 2.40326 16.5 3 16.5H10.5C11.0967 16.5 11.669 16.2629 12.091 15.841C12.5129 15.419 12.75 14.8467 12.75 14.25V13.5C12.75 13.3011 12.671 13.1103 12.5303 12.9697C12.3897 12.829 12.1989 12.75 12 12.75ZM4.5 13.5H5.25C5.44891 13.5 5.63968 13.421 5.78033 13.2803C5.92098 13.1397 6 12.9489 6 12.75C6 12.5511 5.92098 12.3603 5.78033 12.2197C5.63968 12.079 5.44891 12 5.25 12H4.5C4.30109 12 4.11032 12.079 3.96967 12.2197C3.82902 12.3603 3.75 12.5511 3.75 12.75C3.75 12.9489 3.82902 13.1397 3.96967 13.2803C4.11032 13.421 4.30109 13.5 4.5 13.5Z"
      fill="currentColor"
    />
  </svg>
);
