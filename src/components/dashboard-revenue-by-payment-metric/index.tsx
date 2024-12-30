import { formatCurrency } from "@lib/number-formatter";
import React, { useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer, PieProps } from "recharts";

const ChartLegenedInfo: React.FC<{
  color: string;
  title: string;
  amount: number;
  percentage: number;
}> = (props) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-x-3">
        <div
          className="h-2 w-2 rounded-full "
          style={{ background: props.color }}
        />
        <p className="text-sm text-[#8E95A9]">{props.title}</p>
      </div>
      <div className="flex items-center gap-x-8">
        <h6 className="text-sm text-[#7D8592]">
          {formatCurrency(props.amount, "NGN")}
        </h6>
        <p className="text-sm text-[#8E95A9]">{props.percentage}%</p>
      </div>
    </div>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const DashboardRevenueByPaymentMetric = () => {
  return (
    <div className=" shadow-[0px_8px_32px_0px_#3326AE05] rounded-2xl h-[33.313rem] col-span-6 p-8">
      <div className="">
        <p className="text-[#7D8592] font-medium ">Revenue by Payment Method</p>
      </div>
      <div className="mb-5">
        <CustomActiveShapePieChart />
      </div>
      <div className="grid grid-cols-2 gap-y-4 gap-x-10 ">
        <ChartLegenedInfo
          amount={21100.45}
          color="#FF8901"
          percentage={64.2}
          title="USSD"
        />
        <ChartLegenedInfo
          amount={21100.45}
          color="#00C3F8"
          percentage={64.2}
          title="Payment link"
        />
        <ChartLegenedInfo
          amount={21100.45}
          color="#2F80ED"
          percentage={64.2}
          title="Service 3"
        />
        <ChartLegenedInfo
          amount={21100.45}
          color="#FF392B"
          percentage={64.2}
          title="Service 4"
        />
      </div>
    </div>
  );
};

interface DataProps {
  name: string;
  value: number;
  fill: string;
}

const data: DataProps[] = [
  { name: "USSD", value: 300, fill: "#FF8901" },
  { name: "Payment link", value: 200, fill: "#00C3F8" },
  { name: "Service 3", value: 400, fill: "#2F80ED" },
  { name: "Service 4", value: 300, fill: "#FF392B" },
];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const CustomActiveShapePieChart: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: PieProps, index: number) => {
    setActiveIndex(index);
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={90}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomActiveShapePieChart;
