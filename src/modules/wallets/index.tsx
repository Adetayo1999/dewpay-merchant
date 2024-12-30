import { MerchantWallets } from "@components/merchant-wallets";
import { SettlementAccountsTable } from "@components/tables/settlement-accounts-table";

export default function WalletsPage() {
  return (
    <div className="flex flex-col gap-y-10">
      <MerchantWallets />
      <SettlementAccountsTable />
    </div>
  );
}
