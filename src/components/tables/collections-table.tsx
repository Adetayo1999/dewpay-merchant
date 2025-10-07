import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/datepicker.css";
import { TablePagination } from "@components/table-pagination";
import { DefaultTable } from "@components/table/default";
import { useLazyQueryTransactionsQuery } from "../../store/api/merchantApi";
import {
  TransactionType,
  TransactionQueryResponse,
} from "../../store/api/merchantApi";
import { formatCurrency } from "@lib/number-formatter";
import { createColumnHelper } from "@tanstack/react-table";

interface CollectionRow {
  id: string;
  amount: number;
  currency: string;
  type: string;
  reference: string;
  source: string;
}

interface HarmonizedData {
  data: CollectionRow[];
  totalRecords: number;
  isLoading: boolean;
  error: string | null;
}

export const CollectionsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage] = useState(1);
  const [dateRange, setDateRange] = useState({
    from: new Date("2025-09-28"),
    to: new Date("2025-10-05"),
  });
  const [harmonizedData, setHarmonizedData] = useState<HarmonizedData>({
    data: [],
    totalRecords: 0,
    isLoading: false,
    error: null,
  });

  const limit = 10;

  // Lazy query hook
  const [triggerQuery] = useLazyQueryTransactionsQuery();

  // Fetch and harmonize data using useEffect
  useEffect(() => {
    const fetchAndHarmonizeData = async () => {
      setHarmonizedData((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const queryParams = {
          offset: (currentPage - 1) * limit,
          limit: limit,
          from_date: dateRange.from.toISOString(),
          to_date: dateRange.to.toISOString(),
        };

        // Collection types to fetch
        const collectionTypes: TransactionType[] = [
          "checkout_collections",
          "payment_link_collections",
          "reserved_account_collections",
        ];

        // Type mapping for display names
        const typeMapping: Record<TransactionType, string> = {
          checkout_collections: "Checkout",
          payment_link_collections: "Payment Link",
          reserved_account_collections: "Reserved Account",
          merchant_transfer_money: "Merchant Transfer", // Add all types for completeness
        };

        // Trigger all queries in parallel
        const queryPromises = collectionTypes.map((type) =>
          triggerQuery({ ...queryParams, type })
        );

        // Wait for all queries to complete
        const results = await Promise.all(queryPromises);

        // Harmonize data from all three sources
        const harmonizedDataArray: CollectionRow[] = [];
        let totalRecords = 0;

        results.forEach((result, index) => {
          const type = collectionTypes[index];
          const data = result.data as TransactionQueryResponse;

          if (data?.txns) {
            totalRecords += data.total_record || 0;

            data.txns.forEach((txn) => {
              harmonizedDataArray.push({
                id: txn.id,
                amount: txn.amount,
                currency: txn.currency,
                type: typeMapping[type],
                reference: txn.reference,
                source: type,
              });
            });
          }
        });

        setHarmonizedData({
          data: harmonizedDataArray,
          totalRecords,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setHarmonizedData({
          data: [],
          totalRecords: 0,
          isLoading: false,
          error:
            error instanceof Error ? error.message : "Failed to fetch data",
        });
      }
    };

    fetchAndHarmonizeData();
  }, [currentPage, dateRange.from, dateRange.to, triggerQuery]);

  // Define table columns
  const columnHelper = createColumnHelper<CollectionRow>();
  const columns = [
    columnHelper.accessor("amount", {
      header: "Amount",
      cell: (props) => (
        <p>{formatCurrency(props.getValue(), props.row.original.currency)}</p>
      ),
    }),
    columnHelper.accessor("type", {
      header: "Type",
      cell: (props) => (
        <span className="text-sm font-medium text-gray-900">
          {props.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("reference", {
      header: "Reference",
      cell: (props) => (
        <p className="text-sm text-gray-600">{props.getValue()}</p>
      ),
    }),
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-primary">Settlements</h2>
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
            data={harmonizedData.data}
            columns={columns}
            loading={harmonizedData.isLoading}
            emptyStateMessage="No settlements available at the moment"
          />
          {harmonizedData.data.length > 0 &&
            harmonizedData.totalRecords > 0 && (
              <TablePagination
                page={currentPage}
                total={harmonizedData.totalRecords}
                limit={limit}
              />
            )}
        </div>
      </div>
    </div>
  );
};
