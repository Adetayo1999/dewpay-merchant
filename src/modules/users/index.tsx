import { CustomersTable } from "@components/tables/customers-table";
import { UsersMetricCard } from "@components/users-metric-card";

export default function Customers() {
  return (
    <div className="flex flex-col gap-y-6">
      <UsersMetricCard />
      <CustomersTable />
    </div>
  );
}
