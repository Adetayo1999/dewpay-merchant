import { useState, useMemo, useCallback } from "react";
import { TablePagination } from "@components/table-pagination";
import { DefaultTable } from "@components/table/default";
import { createColumnHelper } from "@tanstack/react-table";
import { useGetAccountStatementsQuery } from "../../store/api/merchantApi";
import { format } from "date-fns";
import {
  showApiSuccessToast,
  showApiErrorToast,
} from "@components/toast/custom-toast";

interface StatementsTableProps {
  searchFilter: string;
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
}

interface StatementRow {
  id: string;
  amount: number;
  memo: string;
  type: string;
  txn_reference: string;
  created_at: string;
  status: string;
}

export const StatementsTable = ({
  searchFilter,
  dateRange,
}: StatementsTableProps) => {
  const [currentPage] = useState(1);
  const [isExporting, setIsExporting] = useState(false);
  const limit = 10;

  // Get user's account number - in a real app, this would come from user context
  const userAccountNumber =
    localStorage.getItem("userAccountNumber") || "1234567890";

  const { data, isLoading } = useGetAccountStatementsQuery({
    account_no: userAccountNumber,
  });

  // Format amount with currency and color coding
  const formatAmount = useCallback((amount: number) => {
    const formatted = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.abs(amount));

    return formatted;
  }, []);

  const getAmountColorClass = useCallback((amount: number) => {
    return amount < 0 ? "text-red-600" : "text-green-600";
  }, []);

  // Filter and search data
  const filteredData = useMemo(() => {
    if (!data?.statement) return [];

    let filtered = data.statement;

    // Apply search filter
    if (searchFilter) {
      const searchLower = searchFilter.toLowerCase();
      filtered = filtered.filter(
        (statement) =>
          statement.memo?.toLowerCase().includes(searchLower) ||
          statement.type?.toLowerCase().includes(searchLower) ||
          statement.status?.toLowerCase().includes(searchLower) ||
          statement.txn_reference?.toLowerCase().includes(searchLower)
      );
    }

    // Apply date range filter
    if (dateRange.start && dateRange.end) {
      filtered = filtered.filter((statement) => {
        const statementDate = new Date(statement.created_at);
        return (
          statementDate >= dateRange.start! && statementDate <= dateRange.end!
        );
      });
    }

    return filtered;
  }, [data?.statement, searchFilter, dateRange]);

  // Transform data for table
  const tableData: StatementRow[] = useMemo(() => {
    return filteredData.map((statement) => ({
      id: statement.id,
      amount: statement.amount,
      memo: statement.memo,
      type: statement.type,
      txn_reference: statement.txn_reference,
      created_at: statement.created_at,
      status: statement.status,
    }));
  }, [filteredData]);

  // Export to Excel function
  const handleExport = useCallback(async () => {
    if (filteredData.length === 0) {
      showApiErrorToast("No data to export");
      return;
    }

    setIsExporting(true);
    try {
      const exportData = filteredData.map((statement) => ({
        Amount:
          statement.amount > 0
            ? `₦${statement.amount.toLocaleString()}`
            : `-₦${Math.abs(statement.amount).toLocaleString()}`,
        Narration: statement.memo,
        Type: statement.amount > 0 ? "Credit" : "Debit",
        Reference: statement.txn_reference,
        Date: format(new Date(statement.created_at), "MMM dd, yyyy"),
        Time: format(new Date(statement.created_at), "HH:mm"),
      }));

      const XLSX = await import("xlsx");
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Statements");
      XLSX.writeFile(workbook, "Statement-Export.xlsx");

      showApiSuccessToast("Export completed successfully");
    } catch (error) {
      console.error("Export error:", error);
      showApiErrorToast("Failed to export data");
    } finally {
      setIsExporting(false);
    }
  }, [filteredData]);

  // Get type badge styling
  const getTypeBadgeStyle = (type: string) => {
    switch (type.toLowerCase()) {
      case "credit":
        return "text-green-600 bg-green-100";
      case "debit":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  // Define table columns
  const columnHelper = createColumnHelper<StatementRow>();
  const columns = [
    columnHelper.accessor("amount", {
      header: "Amount",
      cell: (props) => (
        <p
          className={`text-sm font-medium ${getAmountColorClass(
            props.getValue()
          )}`}
        >
          {formatAmount(props.getValue())}
        </p>
      ),
    }),
    columnHelper.accessor("memo", {
      header: "Narration",
      cell: (props) => (
        <p
          className="text-sm text-gray-900 max-w-[200px] truncate"
          title={props.getValue()}
        >
          {props.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("type", {
      header: "Type",
      cell: (props) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadgeStyle(
            props.getValue()
          )}`}
        >
          {props.getValue().charAt(0).toUpperCase() + props.getValue().slice(1)}
        </span>
      ),
    }),
    columnHelper.accessor("txn_reference", {
      header: "Reference",
      cell: (props) => (
        <p
          className="text-sm text-gray-600 font-mono truncate max-w-[120px]"
          title={props.getValue()}
        >
          {props.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("created_at", {
      header: "Date",
      cell: (props) => (
        <div className="flex flex-col">
          <p className="text-sm text-gray-900">
            {format(new Date(props.getValue()), "MMM dd, yyyy")}
          </p>
          <p className="text-xs text-gray-500">
            {format(new Date(props.getValue()), "HH:mm")}
          </p>
        </div>
      ),
    }),
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl font-bold text-primary">
            Transaction History
          </h2>
          <div className="flex gap-4">
            <button
              onClick={handleExport}
              disabled={isExporting || filteredData.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
            >
              {isExporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Exporting...
                </>
              ) : (
                <>
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
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="p-6">
        <div className="flex flex-col gap-y-4">
          <DefaultTable
            data={tableData}
            columns={columns}
            loading={isLoading}
            emptyStateMessage="No statements available for the selected date range"
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
