import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

type CustomButtonVariants = "primary" | "secondary" | "danger" | "auth";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: CustomButtonVariants;
}

const variants: Record<CustomButtonVariants, string> = {
  primary:
    "border border-[#04242633] disabled:bg-[#2022240D] bg-primary disabled:text-[#0424264D] text-[#F5F5F5] ",
  danger:
    " disabled:bg-[#2022240D] bg-[#FF4747] disabled:text-[#0424264D] text-white",
  secondary: "",
  auth: "hover:bg-[#FFFFFF] hover:border-primary hover:text-primary border-[#FFFFFF] bg-transparent border md:border-[#04242633] md:disabled:bg-[#2022240D] md:bg-primary md:disabled:text-[#0424264D] text-white md:text-[#F5F5F5]",
};

export const CustomButton: React.FC<CustomButtonProps> = ({
  variant,
  className,
  children,
  ...rest
}) => {
  return (
    <button
      className={clsx(
        "transition duration-300 disabled:cursor-not-allowed ",
        variants[variant],
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
