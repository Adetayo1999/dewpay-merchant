import { ChartIcon } from "@assets/icons/chart-icon";
import { CubeIcon } from "@assets/icons/cube-icon";
import { TrendingDownIcon } from "@assets/icons/trending-down-icon";
import { TrendingUpIcon } from "@assets/icons/trending-up-icon";
import { formatCurrency } from "@lib/number-formatter";
import clsx from "clsx";

interface DashboardMetricType {
  title: string;
  metric: number;
  percentage: number;
  icon: JSX.Element;
  currency?: string;
  iconClassName?: string;
  idx: number;
}

const DashboardMetricData: React.FC<DashboardMetricType> = (props) => {
  return (
    <div className="col-span-4 ">
      <div
        className={clsx(
          "flex  gap-x-10 mb-2 ",
          props.idx !== 2 && "border-r border-[#FFFFFF] border-opacity-40"
        )}
      >
        <div
          className={clsx(
            "h-[2.856rem] w-[2.856rem] flex items-center justify-center rounded-full ",
            props.iconClassName
          )}
        >
          {props.icon}
        </div>
        <div className="">
          <p className="text-sm text-[#FFFFFF80] mb-4">{props.title}</p>
          <h2 className="text-white font-bold text-2xl">
            {formatCurrency(props.metric, props.currency)}
          </h2>
        </div>
      </div>
      <div className="">
        <p className="flex items-center gap-x-1 text-sm text-[#FFFFFF80]">
          <span>
            {props.percentage > 0 ? (
              <TrendingUpIcon scale={0.8} />
            ) : (
              <TrendingDownIcon scale={0.8} />
            )}
          </span>
          <span
            className={clsx(
              props.percentage > 0 ? "text-[#00B69B]" : "text-[#EF533A]"
            )}
          >
            {props.percentage > 0
              ? `${props.percentage}%`
              : `${Math.abs(props.percentage)}%`}
          </span>
          <span>{props.percentage > 0 ? "increase" : "decrease"}</span>
          <span>from yesterday</span>
        </p>
      </div>
    </div>
  );
};

export const DashboardMetricsCard = () => {
  return (
    <div className="bg-[#122A2C] rounded-[0.938rem] py-[1.938rem] px-[4.563rem] grid grid-cols-12 gap-x-10">
      {data.map((item, idx) => (
        <DashboardMetricData {...item} key={idx} idx={idx} />
      ))}
    </div>
  );
};

const data: Array<Omit<DashboardMetricType, "idx">> = [
  {
    title: "Total Sales Volume",
    metric: 45293,
    percentage: 8.5,
    icon: <CubeIcon scale={0.8} />,
    iconClassName: "text-[#FEC53D] bg-[#FEC53D] bg-opacity-[0.21]  ",
  },
  {
    title: "No. of Transaction",
    metric: 104000,
    percentage: 8.5,
    icon: <CubeIcon scale={0.8} />,
    iconClassName: "text-[#FF9066] bg-[#FF9066] bg-opacity-[0.21]",
  },
  {
    title: "Total Transaction",
    metric: 21100000,
    percentage: -8.5,
    icon: <ChartIcon scale={0.8} />,
    currency: "NGN",
    iconClassName: "bg-opacity-[0.21] bg-[#4AD991] text-[#4AD991]",
  },
];
