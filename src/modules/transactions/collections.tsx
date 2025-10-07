import { CollectionsTable } from "@components/tables/collections-table";
import { TransactionMetricsCard } from "@components/transactions-metrics-card";

export default function TransactionCollections() {
  return (
    <div className="flex flex-col gap-y-6">
      <TransactionMetricsCard
        title="Collections"
        description="Total amount of funds collected through USSD and payment links "
      />
      <CollectionsTable />
    </div>
  );
}
