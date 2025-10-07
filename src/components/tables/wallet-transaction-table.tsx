import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/datepicker.css";
import { TablePagination } from "@components/table-pagination";
import { DefaultTable } from "@components/table/default";
import { useQueryTransactionsQuery } from "../../store/api/merchantApi";
import { TransactionType } from "../../store/api/merchantApi";
import { formatCurrency } from "@lib/number-formatter";
import { createColumnHelper } from "@tanstack/react-table";

type TabType = "all" | "debits" | "credits" | "payment_links" | "collection";

interface TransactionRow {
  id: string;
  amount: number;
  currency: string;
  reference: string;
  type: string;
  status: string;
  charges?: number;
}

interface QueryParams {
  offset: number;
  limit: number;
  from_date: string;
  to_date: string;
  type: TransactionType;
}

export const WalletTransactionTable = () => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage] = useState(1);
  const [dateRange, setDateRange] = useState({
    from: new Date("2025-09-28"),
    to: new Date("2025-10-05"),
  });

  const limit = 10;

  // Build query parameters
  const queryParams: QueryParams = {
    offset: (currentPage - 1) * limit,
    limit: limit,
    from_date: dateRange.from.toISOString(),
    to_date: dateRange.to.toISOString(),
    type: "reserved_account_collections", // Default to collection as requested
  };

  // Add type filter based on active tab
  if (activeTab !== "all") {
    const typeMapping: Record<Exclude<TabType, "all">, TransactionType> = {
      debits: "merchant_transfer_money",
      credits: "checkout_collections",
      payment_links: "payment_link_collections",
      collection: "reserved_account_collections",
    };
    queryParams.type = typeMapping[activeTab as Exclude<TabType, "all">];
  }

  const { data, isLoading } = useQueryTransactionsQuery(queryParams);

  const tabs = [
    { key: "all", label: "All" },
    { key: "debits", label: "Debits" },
    { key: "credits", label: "Credits" },
    { key: "payment_links", label: "Payment Links" },
    { key: "collection", label: "Collection" },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "failed":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "collection":
        return "text-blue-600 bg-blue-100";
      case "payout":
        return "text-purple-600 bg-purple-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  // Define table columns
  const columnHelper = createColumnHelper<TransactionRow>();
  const columns = [
    columnHelper.accessor("amount", {
      header: "Amount",
      cell: (props) => (
        <p>{formatCurrency(props.getValue(), props.row.original.currency)}</p>
      ),
    }),
    columnHelper.accessor("charges", {
      header: "Charges",
      cell: () => <p>₦0.00</p>, // Default charges as shown in image
    }),
    columnHelper.accessor("reference", {
      header: "Source",
      cell: (props) => <p>{props.getValue()}</p>,
    }),
    columnHelper.accessor("type", {
      header: "Type",
      cell: (props) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(
            props.getValue()
          )}`}
        >
          {props.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("status", {
      header: "Transaction Status",
      cell: (props) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
            props.getValue()
          )}`}
        >
          {props.getValue()}
        </span>
      ),
    }),
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-primary">
            Wallet Transaction
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

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as TabType)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-primary text-white"
                  : "bg-green-100 text-primary hover:bg-green-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Date Range and Export */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date Range:
            </label>
            <div className="flex items-center gap-2">
              <DatePicker
                selected={dateRange.from}
                onChange={(date) =>
                  setDateRange((prev) => ({ ...prev, from: date || prev.from }))
                }
                selectsStart
                startDate={dateRange.from}
                endDate={dateRange.to}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholderText="Start Date"
              />
              <span className="text-gray-500">to</span>
              <DatePicker
                selected={dateRange.to}
                onChange={(date) =>
                  setDateRange((prev) => ({ ...prev, to: date || prev.to }))
                }
                selectsEnd
                startDate={dateRange.from}
                endDate={dateRange.to}
                minDate={dateRange.from}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholderText="End Date"
              />
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
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
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
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
            data={data?.txns || []}
            columns={columns}
            loading={isLoading}
            emptyStateMessage="No wallet transaction available at the moment"
          />
          {data && data.total_record > 0 && (
            <TablePagination
              page={currentPage}
              total={data.total_record}
              limit={limit}
            />
          )}
        </div>
      </div>
    </div>
  );
};
