import { USSDCOllectCollectionsTable } from "@components/tables/ussd-collect-collections-table";
import { USSDCollectMetricsCard } from "@components/ussd-collect-metric";

export default function USSDCollectCollections() {
  return (
    <div className="flex flex-col gap-y-6">
      <USSDCollectMetricsCard />
      <USSDCOllectCollectionsTable />
    </div>
  );
}
