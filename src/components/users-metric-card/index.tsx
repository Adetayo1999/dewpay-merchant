import { TrendingUpIcon } from "@assets/icons/trending-up-icon";
import clsx from "clsx";

export const UsersMetricCard = () => {
  return (
    <div className="bg-[#122A2C] flex justify-between  rounded-[0.938rem] py-[1.938rem] px-[4.563rem]">
      <div className="border-r border-[#FFFFFF] flex-[0.3] ">
        <h2 className="font-bold text-white text-3xl mb-2">Users</h2>
        <p className="text-base text-[#FFFFFF80] max-w-xs">
          View number of unique users that patronizes your business
        </p>
      </div>
      <div className="flex-[0.3]">
        <div className="flex justify-between gap-x-12 mb-4">
          <div className="h-[2.856rem] w-[2.856rem] flex items-center justify-center rounded-full bg-[#8280FF] bg-opacity-[0.21]">
            <svg
              width="22"
              height="15"
              viewBox="0 0 26 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.587821"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.73535 4.62472C5.73535 6.86823 7.55407 8.68694 9.79757 8.68694C12.0411 8.68694 13.8598 6.86823 13.8598 4.62472C13.8598 2.38122 12.0411 0.5625 9.79757 0.5625C7.55407 0.5625 5.73535 2.38122 5.73535 4.62472ZM15.8929 8.68682C15.8929 10.3694 17.2569 11.7335 18.9396 11.7335C20.6222 11.7335 21.9862 10.3694 21.9862 8.68682C21.9862 7.00419 20.6222 5.64015 18.9396 5.64015C17.2569 5.64015 15.8929 7.00419 15.8929 8.68682Z"
                fill="#8280FF"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.78519 10.7188C4.99032 10.7188 1.05641 13.183 0.662771 18.0299C0.641329 18.294 1.14624 18.8432 1.40093 18.8432H18.1771C18.94 18.8432 18.9518 18.2293 18.94 18.0308C18.6424 13.0476 14.6475 10.7188 9.78519 10.7188ZM24.4806 18.843H20.5682C20.5682 16.5571 19.8128 14.4475 18.5382 12.7504C21.9961 12.7893 24.8191 14.5384 25.0316 18.2337C25.0401 18.3826 25.0316 18.843 24.4806 18.843Z"
                fill="#8280FF"
              />
            </svg>
          </div>
          <div className="">
            <p className="text-sm text-[#FFFFFF80] mb-1">Total Unique users</p>
            <h2 className="text-white font-bold text-2xl ">764</h2>
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
    </div>
  );
};
