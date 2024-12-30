import { ChartIcon } from "@assets/icons/chart-icon";
import { TrendingUpIcon } from "@assets/icons/trending-up-icon";
import { formatCurrency } from "@lib/number-formatter";
import clsx from "clsx";
import { Link } from "react-router-dom";

export const USSDCollectMetricsCard = () => {
  return (
    <div className="bg-[#122A2C] rounded-[0.938rem] py-[1.938rem] px-[4.563rem] grid grid-cols-12 gap-x-10">
      <div className="col-span-4 px-8">
        <h2 className="font-bold text-white text-3xl mb-2">USSD Collect</h2>
        <p className="text-base text-[#FFFFFF80]">
          Total amount of funds collected through USSD{" "}
        </p>
      </div>
      <div className="col-span-4 border-l  border-[#FFFFFF] border-opacity-40 pl-6 ">
        <div className={clsx("flex  gap-x-10 mb-2 ", "")}>
          <div
            className={clsx(
              "h-[2.856rem] w-[2.856rem] flex items-center justify-center rounded-full",
              "bg-opacity-[0.21] bg-[#4AD991] text-[#4AD991]"
            )}
          >
            <ChartIcon scale={0.8} />
          </div>
          <div className="">
            <p className="text-sm text-[#FFFFFF80] mb-4">
              Total USSD Collections
            </p>
            <h2 className="text-white font-bold text-2xl">
              {formatCurrency(21100000, "NGN")}
            </h2>
          </div>
        </div>
        <div className="">
          <p className="flex items-center gap-x-1 text-sm text-[#FFFFFF80]">
            <span>
              <TrendingUpIcon scale={0.8} />
            </span>
            <span className={clsx("text-[#00B69B]")}>8.5%</span>
            <span>increase</span>
            <span>from yesterday</span>
          </p>
        </div>
      </div>
      <div className="col-span-4 flex flex-col gap-y-5 ">
        <div className="">
          <p className="text-sm text-[#FFFFFF80] mb-2">In-Use codes</p>
          <div className="flex justify-between items-center">
            <h4 className="text-2xl font-bold text-white">10</h4>

            <Link
              to="#"
              className="text-white underline text-sm text-opacity-70"
            >
              View All Codes
            </Link>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-[#FFFFFF80] ">Last used 29/03/2024</p>
          <Link to="#" className="text-white text-sm text-opacity-70 underline">
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
};
