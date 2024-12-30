import { ArrowRightIcon } from "@assets/icons/arrow-right-icon";
import { TimesIcon } from "@assets/icons/times-icon";
import clsx from "clsx";

export const TwoFAContainer: React.FC<{
  children: React.ReactNode;
  goBack: VoidFunction;
  onCancel?: VoidFunction;
  hasCancelBtn?: boolean;
  containerClassName?: string;
}> = ({
  children,
  goBack,
  hasCancelBtn = false,
  onCancel,
  containerClassName,
}) => {
  return (
    <div
      className={clsx(
        "border border-[#DEE2E6] rounded-lg max-w-[30.813rem] shadow-[0px_0px_2px_0px_#0000001F] p-[0.625rem]",
        containerClassName
      )}
    >
      <div className="mb-3 flex justify-between items-center">
        <button
          onClick={goBack}
          className="rotate-180 bg-[#15707A29] hover:bg-primary hover:text-white h-7 w-7 rounded-full flex justify-center items-center text-primary "
        >
          {" "}
          <ArrowRightIcon scale={0.8} />{" "}
        </button>
        {hasCancelBtn && (
          <button
            onClick={onCancel}
            className="bg-[#15707A29] h-7 w-7 rounded-full flex justify-center items-center text-primary "
          >
            <TimesIcon />
          </button>
        )}
      </div>
      <div className="">{children}</div>
    </div>
  );
};
