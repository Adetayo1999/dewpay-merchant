import React, { TextareaHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import clsx from "clsx";
import { renderInputLabel } from "./label";

interface CustomTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string | React.ReactNode;
  error?: FieldError;
  hasError?: boolean;
}

export const ModalTextarea: React.FC<CustomTextareaProps> = React.forwardRef(
  (
    { label, className, error, required, hasError = true, ...rest },
    ref: React.ForwardedRef<HTMLTextAreaElement>
  ) => {
    return (
      <div>
        <div className="flex flex-col gap-y-2 mb-1">
          {label && renderInputLabel(label, required)}
          <div className="relative">
            <textarea
              className={clsx(
                "text-sm placeholder:text-[#ACACAC] border border-[#D1D1D1] rounded-lg px-4 py-3  bg-transparent w-full",
                "focus:ring-2 focus:ring-primary focus:ring-opacity-40 outline-none transition-all duration-200",
                className
              )}
              {...rest}
              ref={ref}
              required={required}
            ></textarea>
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
