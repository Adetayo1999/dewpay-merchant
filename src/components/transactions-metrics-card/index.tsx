import { ChartIcon } from "@assets/icons/chart-icon";
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
    <div className="col-span-4 border-l border-[#FFFFFF] border-opacity-40 pl-8">
      <div className={clsx("flex  gap-x-10 mb-2")}>
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

export const TransactionMetricsCard: React.FC<{
  title: string;
  description: string;
}> = (props) => {
  return (
    <div className="bg-[#122A2C] rounded-[0.938rem] py-[1.938rem] px-[4.563rem] grid grid-cols-12 gap-x-10">
      <div className="col-span-4 px-8">
        <h2 className="font-bold text-white text-3xl mb-2">{props.title}</h2>
        <p className="text-base text-[#FFFFFF80]">{props.description}</p>
      </div>
      {data.map((item, idx) => (
        <DashboardMetricData {...item} key={idx} idx={idx} />
      ))}
    </div>
  );
};

const data: Array<Omit<DashboardMetricType, "idx">> = [
  {
    title: "Total Collections",
    metric: 21100000,
    percentage: 8.5,
    icon: <ChartIcon scale={0.8} />,
    iconClassName: "bg-opacity-[0.21] bg-[#4AD991] text-[#4AD991]",
    currency: "NGN",
  },
  {
    title: "Total Payouts",
    metric: 21100000,
    percentage: 8.5,
    icon: <ChartIcon scale={0.8} />,
    currency: "NGN",
    iconClassName: "bg-opacity-[0.21] bg-[#FF9066] text-[#FF9066]",
  },
];
