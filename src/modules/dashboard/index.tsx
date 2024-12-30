import { DashboardCodeUsageMetrics } from "@components/dashboard-code-usage-metrics";
import { DashboardCompletedSalesChart } from "@components/dashboard-completed-sales-chart";
import { DashboardMetricsCard } from "@components/dashboard-metrics-card";
import { DashboardRevenueByPaymentMetric } from "@components/dashboard-revenue-by-payment-metric";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-y-6">
      <DashboardMetricsCard />
      <DashboardCompletedSalesChart />
      <div className="flex flex-col  md:px-0 gap-y-8 md:grid grid-cols-12 gap-x-5">
        <DashboardRevenueByPaymentMetric />
        <DashboardCodeUsageMetrics />
      </div>
    </div>
  );
}
