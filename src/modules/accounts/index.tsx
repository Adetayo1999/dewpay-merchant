import { useState } from "react";
import { AccountsTable } from "@components/tables/accounts-table";
import { CreateAccountModal } from "@components/modals/accounts/create-account-modal";
import { ViewAccountModal } from "@components/modals/accounts/view-account-modal";
import { SetAccountPinModal } from "@components/modals/accounts/set-account-pin-modal";
import { ReservedAccount } from "../../store/api/merchantApi";

export default function AccountsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isSetPinModalOpen, setIsSetPinModalOpen] = useState(false);
  const [selectedAccountNumber, setSelectedAccountNumber] = useState<
    string | null
  >(null);
  const [selectedAccount, setSelectedAccount] =
    useState<ReservedAccount | null>(null);

  const handleCreateAccount = () => {
    setIsCreateModalOpen(true);
  };

  const handleViewAccount = (accountNumber: string) => {
    setSelectedAccountNumber(accountNumber);
    setIsViewModalOpen(true);
  };

  const handleSetPin = (account: ReservedAccount) => {
    setSelectedAccount(account);
    setIsSetPinModalOpen(true);
  };

  const handleCreateModalSuccess = () => {
    setIsCreateModalOpen(false);
    // The table will automatically refresh due to RTK Query cache invalidation
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedAccountNumber(null);
  };

  const handleCloseSetPinModal = () => {
    setIsSetPinModalOpen(false);
    setSelectedAccount(null);
  };

  const handleSetPinSuccess = () => {
    setIsSetPinModalOpen(false);
    setSelectedAccount(null);
    // Optionally refresh account data
  };

  return (
    <div className="flex flex-col gap-y-6">
      {/* Header with Create Account Button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Reserved Account</h1>
          <p className="text-gray-600 mt-1">
            Manage your reserved bank accounts for seamless transactions
          </p>
        </div>
        <button
          onClick={handleCreateAccount}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Create Account
        </button>
      </div>

      {/* Accounts Table */}
      <AccountsTable
        onViewAccount={handleViewAccount}
        onSetPin={handleSetPin}
      />

      {/* Modals */}
      <CreateAccountModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateModalSuccess}
      />

      <ViewAccountModal
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        accountNumber={selectedAccountNumber}
        onSetPin={handleSetPin}
      />

      <SetAccountPinModal
        isOpen={isSetPinModalOpen}
        onClose={handleCloseSetPinModal}
        account={selectedAccount}
        onSuccess={handleSetPinSuccess}
      />
    </div>
  );
}
