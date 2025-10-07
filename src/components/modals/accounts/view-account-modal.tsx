import {
  useGetReservedAccountQuery,
  ReservedAccount,
} from "../../../store/api/merchantApi";
import { format } from "date-fns";
import { showCopySuccessToast } from "@components/toast/custom-toast";

interface ViewAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountNumber: string | null;
  onSetPin: (account: ReservedAccount) => void;
}

export const ViewAccountModal = ({
  isOpen,
  onClose,
  accountNumber,
  onSetPin,
}: ViewAccountModalProps) => {
  const {
    data: account,
    isLoading,
    error,
  } = useGetReservedAccountQuery(
    {
      account_no: accountNumber!,
      merchant_id: localStorage.getItem("merchantId") || "",
    },
    { skip: !accountNumber || !isOpen }
  );

  const handleCopyAccountNumber = () => {
    if (account?.account_number) {
      navigator.clipboard.writeText(account.account_number);
      showCopySuccessToast();
    }
  };

  const handleCopyReference = () => {
    if (account?.reference) {
      navigator.clipboard.writeText(account.reference);
      showCopySuccessToast();
    }
  };

  if (!isOpen || !accountNumber) return null;

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-center mt-4 text-gray-600">
            Loading account details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !account) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error</h3>
            <p className="text-gray-600 mb-6">
              Failed to load account details. Please try again.
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Account Details
            </h3>
            <p className="text-sm text-gray-500">
              Created on{" "}
              {format(new Date(account.created_at), "MMM dd, yyyy 'at' HH:mm")}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSetPin(account)}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Set PIN
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-6">
            {/* Account Overview */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-gray-900">
                  Account Overview
                </h4>
                <div className="flex items-center gap-2">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Name
                  </label>
                  <p className="text-gray-900 font-medium">
                    {account.account_name}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Balance
                  </label>
                  <p className="text-gray-900 font-medium text-lg">
                    ₦{account.balance.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Account Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Number
                </label>
                <div className="flex items-center gap-2">
                  <p className="text-gray-900 font-mono text-sm bg-white px-3 py-2 rounded border flex-1">
                    {account.account_number}
                  </p>
                  <button
                    onClick={handleCopyAccountNumber}
                    className="px-3 py-2 bg-primary text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
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
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    Copy
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bank
                </label>
                <p className="text-gray-900">{account.bank_name}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <a
                  href={`mailto:${account.email}`}
                  className="text-primary hover:text-green-700 underline"
                >
                  {account.email}
                </a>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <a
                  href={`tel:${account.phone}`}
                  className="text-primary hover:text-green-700"
                >
                  {account.phone}
                </a>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reference
                </label>
                <div className="flex items-center gap-2">
                  <p className="text-gray-900 font-mono text-sm bg-white px-3 py-2 rounded border flex-1 truncate">
                    {account.reference}
                  </p>
                  <button
                    onClick={handleCopyReference}
                    className="px-3 py-2 bg-primary text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
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
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    Copy
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Created
                </label>
                <p className="text-gray-900">
                  {format(
                    new Date(account.created_at),
                    "MMM dd, yyyy 'at' HH:mm"
                  )}
                </p>
              </div>
            </div>

            {/* Account Actions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-800 mb-2">
                Quick Actions
              </h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onSetPin(account)}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  Set Account PIN
                </button>
                <button
                  onClick={handleCopyAccountNumber}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
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
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Copy Account Number
                </button>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 mt-6">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => onSetPin(account)}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Set PIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
