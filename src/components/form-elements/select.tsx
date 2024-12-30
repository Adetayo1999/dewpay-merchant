import React, { SelectHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import clsx from "clsx";
import { renderInputLabel } from "./label";

interface CustomSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string | React.ReactNode;
  error?: FieldError;
  options: { label: string; value: string }[];
}

export const CustomSelect: React.FC<CustomSelectProps> = React.forwardRef(
  (
    { label, className, error, options, required, ...rest },
    ref: React.ForwardedRef<HTMLSelectElement>
  ) => {
    return (
      <div>
        <div className="flex flex-col gap-y-2 mb-1">
          {label && renderInputLabel(label, required)}
          <div className="relative">
            <select
              className={clsx(
                "text-sm placeholder:text-[#7D8592] border border-[#D8E0F0] rounded-lg px-4 py-3 h-[3rem] md:h-[3.5rem] bg-transparent w-full",
                "focus:ring-2 focus:ring-primary focus:ring-opacity-40 outline-none transition-all duration-200",
                className
              )}
              {...rest}
              ref={ref}
              required={required}
            >
              {options.map((op, idx) => (
                <option key={idx} value={op.value}>
                  {op.label}
                </option>
              ))}
            </select>
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
