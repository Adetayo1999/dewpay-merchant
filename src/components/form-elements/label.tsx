import clsx from "clsx";

export const renderInputLabel = (
  label: string | React.ReactNode,
  required?: boolean
) => {
  if (typeof label === "string")
    return (
      <label
        className={clsx(
          `text-sm  text-[#7D8592] font-medium`,
          required
            ? "relative after:absolute after:content-['*'] after:text-red-600"
            : ""
        )}
      >
        {label}
      </label>
    );
  return label;
};
