import { CustomDropdown } from "@components/custom-dropdown";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const options = [
  {
    title: "Weekly",
    value: "weekly",
  },
  {
    title: "Monthly",
    value: "monthly",
  },
];

export const DashboardCompletedSalesChart = () => {
  return (
    <div className="md:h-[31.875rem] rounded-2xl shadow-[0px_8px_32px_0px_#3326AE14] px-4 md:px-8 py-4 ">
      <div className="flex flex-col gap-y-4 md:flex-row md:justify-between md:items-center mb-8">
        <div className="flex items-center gap-x-2">
          <span className="h-2 w-2 bg-primary rounded-full"></span>
          <span className="text-xs md:text-sm text-[#797D8C]">
            Completed Sales Transaction
          </span>
        </div>

        <CustomDropdown options={options} />
      </div>
      <div className="">
        <Chart />
      </div>
    </div>
  );
};

const data = [
  { week: "wk 23", value: 1_000_000 },
  { week: "wk 24", value: 1_500_000 },
  { week: "wk 25", value: 2_000_000 },
  { week: "wk 26", value: 2_500_000 },
  { week: "wk 27", value: 2_400_000 },
  { week: "wk 28", value: 2_000_000 },
  { week: "wk 29", value: 1_200_000 },
  { week: "wk 30", value: 2_500 },
  { week: "wk 31", value: 1_000_000 },
  { week: "wk 32", value: 800_000 },
  { week: "wk 33", value: 1_200_000 },
  { week: "wk 34", value: 1_500_000 },
];

// Custom Tooltip Component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#15707A] text-white text-xs md:text-sm  rounded-md shadow-md p-2">
        <p className="">{`${
          payload[0].value >= 1_000_000
            ? `${(payload[0].value / 1_000_000).toFixed(1)}M`
            : payload[0].value
        }`}</p>
      </div>
    );
  }
  return null;
};

// background: linear-gradient(180deg, #F5F2FF 0%, rgba(255, 255, 255, 0) 100%);  // #623CEA14
const Chart = () => {
  return (
    <>
      <div className="hidden md:block">
        <ResponsiveContainer width="100%" height={300}>
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
            <YAxis
              tick={{ fill: "#7D8592", fontSize: 12 }}
              tickFormatter={(value) => `${value / 1_000_000}M`}
              axisLine={false}
              tickMargin={10}
              orientation="left"
              tickLine={false}
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
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart
            data={data}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
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
            <YAxis
              tick={{ fill: "#7D8592", fontSize: 8 }}
              tickFormatter={(value) => `${value / 1_000_000}M`}
              axisLine={false}
              tickMargin={20}
              orientation="left"
              tickLine={false}
              domain={["auto", "auto"]}
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
