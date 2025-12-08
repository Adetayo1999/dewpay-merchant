import { useAppSelector } from "../../store/hooks";
import { useGetProfileQuery } from "../../store/api/merchantApi";
import { format } from "date-fns";

export default function ProfilePage() {
  const { user } = useAppSelector((state) => state.auth);
  const merchantId =
    user?.merchant_id || localStorage.getItem("merchantId") || "";

  const {
    data: profile,
    isLoading,
    error,
  } = useGetProfileQuery({ merchant_id: merchantId }, { skip: !merchantId });

  const displayData = profile || user;

  const formatValue = (value: string | null | undefined) => {
    return value || "Not Available";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="text-center py-8">
          <p className="text-red-600">Failed to load profile information</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h1 className="text-2xl font-bold text-primary mb-6">
          Profile Information
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">
              Personal Information
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Email
              </label>
              <p className="text-sm text-gray-900 font-medium">
                {formatValue(displayData?.email)}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                First Name
              </label>
              <p className="text-sm text-gray-900 font-medium">
                {formatValue(displayData?.first_name)}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Last Name
              </label>
              <p className="text-sm text-gray-900 font-medium">
                {formatValue(displayData?.last_name)}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Full Name
              </label>
              <p className="text-sm text-gray-900 font-medium">
                {formatValue(displayData?.full_name)}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Phone Number
              </label>
              <p className="text-sm text-gray-900 font-medium">
                {formatValue(displayData?.phone)}
              </p>
            </div>
          </div>

          {/* Merchant Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">
              Merchant Information
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Merchant ID
              </label>
              <p className="text-sm text-gray-900 font-medium font-mono">
                {formatValue(displayData?.merchant_id)}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Reference
              </label>
              <p className="text-sm text-gray-900 font-medium font-mono">
                {formatValue(displayData?.reference)}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Status
              </label>
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  displayData?.status === "live"
                    ? "text-green-600 bg-green-100"
                    : "text-gray-600 bg-gray-100"
                }`}
              >
                {formatValue(displayData?.status)}
              </span>
            </div>
          </div>

          {/* Account Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">
              Account Information
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Wallet Number
              </label>
              <p className="text-sm text-gray-900 font-medium font-mono">
                {formatValue(displayData?.wallet_no)}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Account Number
              </label>
              <p className="text-sm text-gray-900 font-medium font-mono">
                {formatValue(displayData?.account_no)}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Account Name
              </label>
              <p className="text-sm text-gray-900 font-medium">
                {formatValue(displayData?.account_name)}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Bank
              </label>
              <p className="text-sm text-gray-900 font-medium">
                {formatValue(displayData?.bank)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
