import React, { InputHTMLAttributes, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FieldError } from "react-hook-form";
import clsx from "clsx";
import { renderInputLabel } from "./label";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | React.ReactNode;
  error?: FieldError;
  hasError?: boolean;
}

export const AuthCustomInput: React.FC<CustomInputProps> = React.forwardRef(
  (
    { label, className, error, type, name, required, ...rest },
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handlePasswordToggle = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.preventDefault();
      setIsPasswordVisible((prev) => !prev);
    };

    return (
      <div>
        <div className="flex flex-col gap-y-2 mb-1">
          {label && renderInputLabel(label, required)}
          <div className="relative">
            <input
              className={clsx(
                "text-sm placeholder:text-[#7D8592] border border-[#D8E0F0] rounded-lg px-4 py-3 h-[3rem] md:h-[3.5rem] bg-white md:bg-transparent w-full",
                "focus:ring-2 md:focus:ring-primary focus:ring-white focus:ring-opacity-40 outline-none transition-all duration-200",
                type === "password" ? "pr-8" : "",
                className
              )}
              type={isPasswordVisible ? "text" : type}
              name={name}
              {...rest}
              ref={ref}
              required={required}
            />
            {name?.includes("password") && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7D8592] hover:text-opacity-90 "
                onClick={handlePasswordToggle}
              >
                {!isPasswordVisible ? (
                  <FaEye className="" />
                ) : (
                  <FaEyeSlash className="" />
                )}
              </button>
            )}
          </div>
        </div>
        <div className="h-4">
          {error && (
            <span className="text-xs text-red-500 font-bold">
              {error.message || "field required"}
            </span>
          )}
        </div>
      </div>
    );
  }
);

export const ModalInput: React.FC<CustomInputProps> = React.forwardRef(
  (
    { label, className, error, type, name, required, hasError = true, ...rest },
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handlePasswordToggle = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.preventDefault();
      setIsPasswordVisible((prev) => !prev);
    };

    return (
      <div>
        <div className="flex flex-col gap-y-2 mb-1">
          {label && renderInputLabel(label, required)}
          <div className="relative">
            <input
              className={clsx(
                "text-xs md:text-sm placeholder:text-[#ACACAC] border border-[#D1D1D1] rounded-lg px-4 py-3 h-[3rem]  bg-transparent w-full",
                "focus:ring-2 focus:ring-primary focus:ring-opacity-40 outline-none transition-all duration-200",
                type === "password" ? "pr-8" : "",
                className
              )}
              type={isPasswordVisible ? "text" : type}
              name={name}
              {...rest}
              ref={ref}
              required={required}
            />
            {name?.includes("password") && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7D8592] hover:text-opacity-90 "
                onClick={handlePasswordToggle}
              >
                {!isPasswordVisible ? (
                  <FaEye className="" />
                ) : (
                  <FaEyeSlash className="" />
                )}
              </button>
            )}
          </div>
        </div>
        {hasError && (
          <div className="h-4">
            {error && (
              <span className="text-xs text-red-500 font-bold">
                {error.message || "field required"}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);
