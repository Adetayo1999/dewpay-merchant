import { UsersTable } from "@components/tables/users-table";
import { UsersMetricCard } from "@components/users-metric-card";

export default function Users() {
  return (
    <div className="flex flex-col gap-y-6">
      <UsersMetricCard />
      <UsersTable />
    </div>
  );
}
