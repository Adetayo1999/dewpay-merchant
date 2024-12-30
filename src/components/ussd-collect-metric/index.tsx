import { ChartIcon } from "@assets/icons/chart-icon";
import { TrendingUpIcon } from "@assets/icons/trending-up-icon";
import { formatCurrency } from "@lib/number-formatter";
import clsx from "clsx";
import { Link } from "react-router-dom";

export const USSDCollectMetricsCard = () => {
  return (
    <div className="bg-[#122A2C] rounded-[0.938rem] py-[1.938rem] px-[2rem] md:px-[4.563rem] grid gap-y-10  grid-cols-1 md:grid-cols-12">
      <div className="md:col-span-4 flex flex-col items-end md:items-start  md:justify-start text-right md:text-left ">
        <h2 className="font-bold text-white text-xl md:text-3xl mb-2">
          USSD Collect
        </h2>
        <p className="text-xs md:text-base  max-w-xs md:max-w-fit   text-[#FFFFFF80]">
          Total amount of funds collected through USSD{" "}
        </p>
      </div>
      <div className="md:col-span-4 md:border-l  border-[#FFFFFF] border-opacity-40 md:pl-6 ">
        <div className="md:hidden flex justify-end pb-5">
          <div className="w-[45%] bg-[#FFFFFF] h-[1px] bg-opacity-40 " />
        </div>
        <div
          className={clsx(
            "flex justify-between md:justify-start gap-x-10 mb-2 ",
            ""
          )}
        >
          <div
            className={clsx(
              "h-[2.856rem] w-[2.856rem] flex items-center justify-center rounded-full",
              "bg-opacity-[0.21] bg-[#4AD991] text-[#4AD991]"
            )}
          >
            <ChartIcon scale={0.8} />
          </div>
          <div className="">
            <p className="text-xs md:text-sm text-[#FFFFFF80] mb-4">
              Total USSD Collections
            </p>
            <h2 className="text-white font-bold text-xl md:text-2xl">
              {formatCurrency(21100000, "NGN")}
            </h2>
          </div>
        </div>
        <div className="">
          <p className="flex text-xs justify-end md:justify-start items-center gap-x-1 md:text-sm text-[#FFFFFF80]">
            <span>
              <TrendingUpIcon scale={0.8} />
            </span>
            <span className={clsx("text-[#00B69B]")}>8.5%</span>
            <span>increase</span>
            <span>from yesterday</span>
          </p>
        </div>
      </div>
      <div className="md:col-span-4 flex flex-col gap-y-5 ">
        <div className="md:hidden flex justify-end ">
          <div className="w-[45%] bg-[#FFFFFF] h-[1px] bg-opacity-40 " />
        </div>
        <div className="flex flex-col items-end md:items-stretch">
          <p className="text-xs md:text-sm text-[#FFFFFF80] mb-2">
            In-Use codes
          </p>
          <div className="flex  flex-col md:flex-row gap-y-2 md:gap-y-0  items-end md:justify-between md:items-center ">
            <h4 className="text-xl md:text-2xl font-bold text-white">10</h4>
            <p className="text-xs md:hidden text-[#FFFFFF80] ">
              Last used 29/03/2024
            </p>
            <Link
              to="#"
              className="text-white hidden md:block underline text-sm text-opacity-70"
            >
              View All Codes
            </Link>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm hidden md:block text-[#FFFFFF80] ">
            Last used 29/03/2024
          </p>
          <Link
            to="#"
            className="text-white md:hidden underline text-xs text-opacity-70"
          >
            View All Codes
          </Link>
          <Link
            to="#"
            className="text-white text-xs md:text-sm text-opacity-70 underline"
          >
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
};
