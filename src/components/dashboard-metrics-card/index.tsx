import { ChartIcon } from "@assets/icons/chart-icon";
import { CubeIcon } from "@assets/icons/cube-icon";
import { UsersIcon } from "@assets/icons/users-icon";
import { WalletIcon } from "@assets/icons/wallet-icon";
import { formatCurrency } from "@lib/number-formatter";
import clsx from "clsx";
import { useGetMerchantBalanceQuery } from "../../store/api/merchantApi";

interface DashboardMetricType {
  title: string;
  metric: number;
  percentage: number;
  icon: JSX.Element;
  currency?: string;
  iconClassName?: string;
  idx: number;
  optionalMetric?: string | number;
}

const DashboardMetricData: React.FC<DashboardMetricType> = (props) => {
  return (
    <div className="md:col-span-3 border-b md:border-none border-[#FFFFFF] border-opacity-20 pb-4 md:pb-0 last:border-none ">
      <div
        className={clsx(
          "flex justify-between items-center md:justify-start  gap-x-4 mb-2 "
          // props.idx !== 2 && " md:border-r border-[#FFFFFF] border-opacity-40"
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
          <div className="flex items-center gap-x-2 mb-2">
            <p className="text-xs md:text-sm text-[#FFFFFF80]">{props.title}</p>
            {props.optionalMetric && (
              <span
                className="text-xs font-bold text-white px-2 py-1 rounded-sm"
                style={{
                  backgroundColor: props.iconClassName?.includes(
                    "text-[#4AD991]"
                  )
                    ? "#4AD991"
                    : props.iconClassName?.includes("text-[#FF9066]")
                    ? "#FF9066"
                    : props.iconClassName?.includes("text-[#FEC53D]")
                    ? "#FEC53D"
                    : props.iconClassName?.includes("text-[#9B51E0]")
                    ? "#9B51E0"
                    : "#6B7280",
                }}
              >
                {props.optionalMetric}
              </span>
            )}
          </div>
          <h2 className="text-white font-bold text-xl md:text-2xl">
            {formatCurrency(props.metric, props.currency)}
          </h2>
        </div>
      </div>
      {/* <div className="">
        <p className="justify-end md:justify-start flex items-center gap-x-1  text-xs md:text-sm text-[#FFFFFF80]">
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
      </div> */}
    </div>
  );
};

export const DashboardMetricsCard = () => {
  const { data: balanceData, isLoading, error } = useGetMerchantBalanceQuery();

  if (isLoading) {
    return (
      <div className="bg-[#122A2C] rounded-[0.938rem] py-[1.938rem] px-[2.5rem] gap-y-[2rem] md:gap-y-0 flex flex-col md:px-[4.563rem] md:grid md:grid-cols-12 gap-x-10">
        {[1, 2, 3, 4].map((idx) => (
          <div
            key={idx}
            className="md:col-span-3 border-b md:border-none border-[#FFFFFF] border-opacity-20 pb-4 md:pb-0 last:border-none"
          >
            <div className="flex justify-between md:justify-start gap-x-10 mb-2">
              <div className="h-[2.856rem] w-[2.856rem] bg-gray-600 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-600 rounded animate-pulse mb-2"></div>
                <div className="h-6 bg-gray-600 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#122A2C] rounded-[0.938rem] py-[1.938rem] px-[2.5rem] text-center">
        <p className="text-white">Failed to load balance data</p>
      </div>
    );
  }

  const balance = balanceData?.balance;

  const metrics = [
    {
      title: "Total Revenue",
      metric: parseFloat(balance?.total_revenue || "0"),
      percentage: 8.5, // This would come from API in real app
      icon: <ChartIcon scale={0.8} />,
      currency: "NGN",
      iconClassName: "text-[#4AD991] bg-[#4AD991] bg-opacity-[0.21]",
    },
    {
      title: "Total Transactions",
      metric: balance?.total_txn || 0,
      percentage: 8.5,
      icon: <CubeIcon scale={0.8} />,
      iconClassName: "text-[#FF9066] bg-[#FF9066] bg-opacity-[0.21]",
    },
    {
      title: "Pending Settlement",
      metric: parseFloat(balance?.pending_settllement || "0"),
      percentage: -8.5,
      icon: <WalletIcon scale={0.8} />,
      currency: "NGN",
      iconClassName: "text-[#FEC53D] bg-[#FEC53D] bg-opacity-[0.21]",
    },
    {
      title: "Total Customers",
      metric: balance?.customers || 0,
      percentage: 8.5,
      icon: <UsersIcon scale={0.8} />,
      iconClassName: "text-[#9B51E0] bg-[#9B51E0] bg-opacity-[0.21]",
      optionalMetric: `${balance?.new_customers || 0}`, // Example optional metric
    },
  ];

  return (
    <div className="bg-[#122A2C] rounded-[0.938rem] py-[1.938rem] px-[2.5rem] gap-y-[2rem] md:gap-y-0 flex flex-col md:px-[4.563rem] md:grid md:grid-cols-12 gap-x-10">
      {metrics.map((item, idx) => (
        <DashboardMetricData {...item} key={idx} idx={idx} />
      ))}
    </div>
  );
};
