import { useState } from "react";
import { TablePagination } from "@components/table-pagination";
import { DefaultTable } from "@components/table/default";
import { createColumnHelper } from "@tanstack/react-table";
import { BindPhoneModal } from "@components/modals/cashbinding/bind-phone-modal";
import { BlacklistModal } from "@components/modals/cashbinding/blacklist-modal";

interface PhoneWithdrawalRow {
  phoneNumber: string;
  amount: number;
  charges: number;
  status: "active" | "inactive" | "pending";
  ussd: string;
}

export const PhoneWithdrawalTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<"new" | "bulk" | "blacklist">(
    "new"
  );
  const [isBindModalOpen, setIsBindModalOpen] = useState(false);
  const [isBlacklistModalOpen, setIsBlacklistModalOpen] = useState(false);
  const limit = 10;

  // Mock data - replace with actual API call
  const data: PhoneWithdrawalRow[] = [];

  // Define table columns
  const columnHelper = createColumnHelper<PhoneWithdrawalRow>();
  const columns = [
    columnHelper.accessor("phoneNumber", {
      header: "Phone Number",
      cell: (props) => (
        <p className="text-sm text-gray-900">{props.getValue()}</p>
      ),
    }),
    columnHelper.accessor("amount", {
      header: "Amount",
      cell: (props) => (
        <p className="text-sm text-gray-900">
          ₦{props.getValue().toLocaleString()}
        </p>
      ),
    }),
    columnHelper.accessor("charges", {
      header: "Charges",
      cell: (props) => (
        <p className="text-sm text-gray-900">
          ₦{props.getValue().toLocaleString()}
        </p>
      ),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (props) => {
        const status = props.getValue();
        const getStatusColor = (status: string) => {
          switch (status.toLowerCase()) {
            case "active":
              return "text-green-600 bg-green-100";
            case "inactive":
              return "text-red-600 bg-red-100";
            case "pending":
              return "text-yellow-600 bg-yellow-100";
            default:
              return "text-gray-600 bg-gray-100";
          }
        };
        return (
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
              status
            )}`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        );
      },
    }),
    columnHelper.accessor("ussd", {
      header: "USSD",
      cell: (props) => (
        <p className="text-sm text-gray-900">{props.getValue()}</p>
      ),
    }),
  ];

  const handleNewClick = () => {
    setActiveTab("new");
    setIsBindModalOpen(true);
  };

  const handleBlacklistClick = () => {
    setActiveTab("blacklist");
    setIsBlacklistModalOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-primary">
              Phone Withdrawal
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex gap-3">
              <button
                onClick={handleNewClick}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === "new"
                    ? "bg-primary text-white"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
              >
                + New
              </button>
              <button
                onClick={() => setActiveTab("bulk")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  activeTab === "bulk"
                    ? "bg-primary text-white"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Bulk
              </button>
              <button
                onClick={handleBlacklistClick}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  activeTab === "blacklist"
                    ? "bg-primary text-white"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
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
                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"
                  />
                </svg>
                Blacklist
              </button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-700 transition-colors">
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="p-6">
          <div className="flex flex-col gap-y-4">
            <DefaultTable
              data={data}
              columns={columns}
              loading={false}
              emptyStateMessage="No phone withdrawal records found"
            />
            {data.length > 0 && (
              <TablePagination
                page={currentPage}
                total={data.length}
                limit={limit}
              />
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <BindPhoneModal
        isOpen={isBindModalOpen}
        onClose={() => setIsBindModalOpen(false)}
      />
      <BlacklistModal
        isOpen={isBlacklistModalOpen}
        onClose={() => setIsBlacklistModalOpen(false)}
      />
    </>
  );
};
