/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatCurrency } from "@lib/number-formatter";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const CodeUsageCard: React.FC<{
  title: string;
  usage: number;
  amount: number;
}> = (props) => {
  return (
    <div className="bg-white shadow-[0px_12px_32px_0px_#3326AE14] rounded-xl px-6 py-5 flex-1">
      <p className="text-xs md:text-sm text-[#8E95A9] mb-2">
        {props.title} {`(${props.usage})`}
      </p>
      <h2 className="font-semibold text-[#7D8592] text-lg md:text-2xl">
        {formatCurrency(props.amount, "NGN")}
      </h2>
    </div>
  );
};

export const DashboardCodeUsageMetrics = () => {
  return (
    <div className="shadow-[0px_8px_32px_0px_#3326AE14] bg-white rounded-2xl md:h-[33.313rem] col-span-6 px-4 md:px-8 py-8">
      <div className="mb-8">
        <p className="text-[#7D8592] text-sm md:text-base font-medium  text-center md:text-center">
          Code Usage
        </p>
      </div>
      <div className=" flex flex-wrap gap-y-5  md:grid grid-cols-2  gap-x-5 mb-10">
        <CodeUsageCard
          amount={21100876.45}
          title="Most used code"
          usage={2134}
        />
        <CodeUsageCard
          amount={21100876.45}
          title="Least used code"
          usage={2134}
        />
      </div>
      <div className="">
        <p className="font-medium mb-4 text-[#8E95A9] text-xs md:text-sm">
          Jan 16 - Jan 30
        </p>
        <CodeUsageChart />
      </div>
    </div>
  );
};

const data = [
  { week: "16", value: 60 },
  { week: "18", value: 20 },
  { week: "20", value: 120 },
  { week: "24", value: 40 },
  { week: "26", value: 100 },
  { week: "28", value: 80 },
  { week: "30", value: 120 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#15707A] text-white  rounded-md shadow-md p-2">
        <p className="">{`${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const CodeUsageChart = () => {
  return (
    <>
      <div className="hidden md:block">
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data}>
            {/* Gradient Definitions */}
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F5F2FF" stopOpacity={0.1} />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#F5F2FF" stopOpacity={0.5} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="2 2" vertical={false} />
            <XAxis
              dataKey="week"
              tick={{ fill: "#7D8592", fontSize: 12 }}
              tickMargin={10}
              tickLine={false}
              axisLine={{ stroke: "#E5E5EF", strokeWidth: 1 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#15707A"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="md:hidden">
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data}>
            {/* Gradient Definitions */}
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F5F2FF" stopOpacity={0.1} />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#F5F2FF" stopOpacity={0.5} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="2 2" vertical={false} />
            <XAxis
              dataKey="week"
              tick={{ fill: "#7D8592", fontSize: 8 }}
              tickMargin={10}
              tickLine={false}
              axisLine={{ stroke: "#E5E5EF", strokeWidth: 1 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#15707A"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
