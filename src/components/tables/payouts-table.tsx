import { useState, useMemo } from "react";
import { TablePagination } from "@components/table-pagination";
import { DefaultTable } from "@components/table/default";
import { createColumnHelper } from "@tanstack/react-table";
import { PayoutBatch } from "../../store/api/merchantApi";
import { format } from "date-fns";

interface PayoutsTableProps {
  data: PayoutBatch[];
  isLoading: boolean;
  searchFilter: string;
  onSearchChange: (value: string) => void;
  onNewPayout: () => void;
}

interface PayoutRow {
  id: string;
  amount: number;
  batch_code: string;
  account_name: string;
  bank_name: string;
  account_number: string;
  reference: string;
  status: string;
  created_at: string;
}

export const PayoutsTable = ({
  data,
  isLoading,
  searchFilter,
  onSearchChange,
  onNewPayout,
}: PayoutsTableProps) => {
  const [currentPage] = useState(1);
  const limit = 10;

  // Filter and search data
  const filteredData = useMemo(() => {
    if (!searchFilter) return data;

    const searchLower = searchFilter.toLowerCase();
    return data.filter(
      (item) =>
        item.account_name?.toLowerCase().includes(searchLower) ||
        item.bank_name?.toLowerCase().includes(searchLower) ||
        item.reference?.toLowerCase().includes(searchLower) ||
        item.batch_code?.toLowerCase().includes(searchLower)
    );
  }, [data, searchFilter]);

  // Transform data for table
  const tableData: PayoutRow[] = useMemo(() => {
    return filteredData.map((batch) => ({
      id: batch.id,
      amount: batch.amount,
      batch_code: batch.batch_code,
      account_name: batch.account_name,
      bank_name: batch.bank_name,
      account_number: batch.account_number,
      reference: batch.reference,
      status: batch.status,
      created_at: batch.created_at,
    }));
  }, [filteredData]);

  // Define table columns
  const columnHelper = createColumnHelper<PayoutRow>();
  const columns = [
    columnHelper.accessor("amount", {
      header: "Amount",
      cell: (props) => (
        <p className="text-sm text-gray-900 font-medium">
          ₦{props.getValue().toLocaleString()}
        </p>
      ),
    }),
    columnHelper.accessor("batch_code", {
      header: "ID",
      cell: (props) => (
        <div className="max-w-[100px] truncate" title={props.getValue()}>
          <p className="text-sm text-gray-600">{props.getValue()}</p>
        </div>
      ),
    }),
    columnHelper.accessor("account_name", {
      header: "Name",
      cell: (props) => (
        <p className="text-sm text-gray-900">{props.getValue()}</p>
      ),
    }),
    columnHelper.accessor((row) => `${row.bank_name} ${row.account_number}`, {
      id: "account",
      header: "Account",
      cell: (props) => (
        <div className="flex flex-col">
          <span className="text-sm text-gray-900">
            {props.row.original.bank_name}
          </span>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {props.row.original.account_number}
          </span>
        </div>
      ),
    }),
    columnHelper.accessor("reference", {
      header: "Reference",
      cell: (props) => (
        <p className="text-sm text-gray-600">{props.getValue()}</p>
      ),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (props) => {
        const status = props.getValue();
        const getStatusColor = (status: string) => {
          switch (status.toLowerCase()) {
            case "completed":
              return "text-green-600 bg-green-100";
            case "processing":
              return "text-blue-600 bg-blue-100";
            case "pending":
              return "text-yellow-600 bg-yellow-100";
            case "failed":
              return "text-red-600 bg-red-100";
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
    columnHelper.accessor("created_at", {
      header: "Date",
      cell: (props) => (
        <p className="text-sm text-gray-600">
          {format(new Date(props.getValue()), "EEE, MMM dd yyyy")}
        </p>
      ),
    }),
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-primary">Payouts</h2>
          <div className="flex gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search payouts..."
                value={searchFilter}
                onChange={(e) => onSearchChange(e.target.value)}
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
            <button
              onClick={onNewPayout}
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
              New Payout
            </button>
          </div>
        </div>

        {/* Export Button */}
        <div className="flex justify-end">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
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
            Export to Excel
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="p-6">
        <div className="flex flex-col gap-y-4">
          <DefaultTable
            data={tableData}
            columns={columns}
            loading={isLoading}
            emptyStateMessage="No payout batches found"
          />
          {tableData.length > 0 && (
            <TablePagination
              page={currentPage}
              total={tableData.length}
              limit={limit}
            />
          )}
        </div>
      </div>
    </div>
  );
};
