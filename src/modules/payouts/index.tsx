import { useState, useCallback } from "react";
import { PayoutsTable } from "@components/tables/payouts-table";
import { NewPayoutModal } from "@components/modals/payouts/new-payout-modal";
import { useGetAllPayoutsQuery } from "../../store/api/merchantApi";

export default function PayoutsPage() {
  const [isNewPayoutModalOpen, setIsNewPayoutModalOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");

  const { data: payoutsData, isLoading, refetch } = useGetAllPayoutsQuery();

  const handleNewPayout = useCallback(() => {
    setIsNewPayoutModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsNewPayoutModalOpen(false);
  }, []);

  const handlePayoutSuccess = useCallback(() => {
    setIsNewPayoutModalOpen(false);
    refetch(); // Refresh the payouts list
  }, [refetch]);

  return (
    <div className="flex flex-col gap-y-6">
      <PayoutsTable
        data={payoutsData?.bulk_transfers || []}
        isLoading={isLoading}
        searchFilter={searchFilter}
        onSearchChange={setSearchFilter}
        onNewPayout={handleNewPayout}
      />

      <NewPayoutModal
        isOpen={isNewPayoutModalOpen}
        onClose={handleCloseModal}
        onSuccess={handlePayoutSuccess}
      />
    </div>
  );
}
