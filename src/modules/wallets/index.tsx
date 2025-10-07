import { MerchantWallets } from "@components/merchant-wallets";
import { WalletTransactionTable } from "@components/tables/wallet-transaction-table";

export default function WalletsPage() {
  return (
    <div className="flex flex-col gap-y-10">
      <MerchantWallets />
      <WalletTransactionTable />
    </div>
  );
}
