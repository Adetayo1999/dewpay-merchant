import { PayoutTable } from "@components/tables/payout-table";
import { TransactionMetricsCard } from "@components/transactions-metrics-card";

export default function TransactionPayout() {
  return (
    <div className="flex flex-col gap-y-6">
      <TransactionMetricsCard
        title="Payout"
        description="Total amount of funds transferred from the wallet to linked bank accounts"
      />
      <PayoutTable />
    </div>
  );
}
