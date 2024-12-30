/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { InputHTMLAttributes, useState } from "react";
import { FieldError } from "react-hook-form";
import { FaCheck } from "react-icons/fa";
import clsx from "clsx";

interface CustomCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
  labelClassName?: string;
  state?: boolean;
  checkBoxClassName?: string;
  hasLabel?: boolean;
  variant?: boolean;
  checkmarkClassname?: string;
}

const CustomCheckbox = React.forwardRef(
  (
    {
      label,
      labelClassName,
      state = false,
      hasLabel = true,
      checkBoxClassName,
      checkmarkClassname,
      variant,
      ...rest
    }: CustomCheckboxProps,
    ref
  ) => {
    const [cbState, setCBState] = useState(state);

    return (
      <label className="flex items-center justify-between cursor-pointer">
        <div className="flex gap-x-[1.875rem] items-center">
          <input
            type="checkbox"
            className="hidden"
            {...rest}
            ref={ref as any}
            checked={cbState}
            onChange={(e) => setCBState(e.target.checked)}
          />
          <div
            className={clsx(
              "relative w-[1.3rem] h-[1.3rem] md:w-[1.5rem] md:h-[1.5rem] rounded transition duration-300 flex justify-center items-center border-2  border-[#7D8592]",
              variant && cbState && "bg-[#7D8592]",
              checkBoxClassName
            )}
          >
            <FaCheck
              className={clsx({
                "text-xs md:text-sm": true,
                [`${checkmarkClassname}`]: true,
                "text-white visible": variant && cbState,
                "text-[#7D8592] visible": !variant && cbState,
                invisible: !cbState,
              })}
            />
          </div>
          {hasLabel ? (
            <h5
              className={clsx(
                "text-sm text-[#212529] font-medium",
                labelClassName
              )}
            >
              {label}
            </h5>
          ) : null}
        </div>
      </label>
    );
  }
);

export default CustomCheckbox;
