import { formatCurrency } from "@lib/number-formatter";
import { useGetMerchantBalanceQuery } from "../../store/api/merchantApi";

export const MerchantWallets = () => {
  const { data: balanceData, isLoading, error } = useGetMerchantBalanceQuery();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
          >
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center">
        <p className="text-gray-600">Failed to load wallet data</p>
      </div>
    );
  }

  const balance = balanceData?.balance;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Account Information Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="bg-orange-500 rounded-full p-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 0C3.588 0 0 3.588 0 8s3.588 8 8 8 8-3.588 8-8-3.588-8-8-8zm0 12c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm1-3H7V4h2v5z"
                fill="white"
              />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-800 leading-relaxed">
              To Fund your wallet, use either your bank ussd or internet banking
              to transfer to the above account details and your wallet is
              automatically funded
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="space-y-3">
            <div>
              <span className="text-sm font-semibold text-gray-800">
                Wallet Account Number:
              </span>
              <span className="text-sm text-gray-600 ml-2">
                {balanceData?.account_no || "Not available"}
              </span>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-800">
                Wallet Account Name:
              </span>
              <span className="text-sm text-gray-600 ml-2">
                {balanceData?.account_name || "Not available"}
              </span>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-800">Bank:</span>
              <span className="text-sm text-gray-600 ml-2">
                {balanceData?.bank || "Not available"}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 mt-4">
          <p className="text-sm text-gray-600">
            You can use this account number to for any other business
            transactions.
          </p>
        </div>
      </div>

      {/* Wallet Balance Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-primary mb-2">
              Wallet Balance
            </h3>
            <p className="text-3xl font-bold text-gray-600">
              {formatCurrency(
                parseFloat(balance?.wallet_balance || "0"),
                "NGN"
              )}
            </p>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm font-semibold text-primary mb-2">
              Available Balance
            </h3>
            <p className="text-3xl font-bold text-gray-600">
              {formatCurrency(
                parseFloat(balance?.wallet_balance || "0"),
                "NGN"
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
