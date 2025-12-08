import { useState, useMemo, useCallback } from "react";
import { TablePagination } from "@components/table-pagination";
import { DefaultTable } from "@components/table/default";
import { createColumnHelper } from "@tanstack/react-table";
import { useGetPaymentLinksQuery } from "../../store/api/merchantApi";
import { format } from "date-fns";
import {
  // showCopySuccessToast,
  showApiSuccessToast,
  showApiErrorToast,
} from "@components/toast/custom-toast";

interface PaymentLinksTableProps {
  onNewLink: () => void;
  onViewLink: (paymentId: string) => void;
  onEditLink: (paymentId: string) => void;
}

interface PaymentLinkRow {
  id: string;
  url_name: string;
  payment_link: string;
  pay_type: "fixed" | "flexible";
  amount: number;
  created_at: string;
}

export const PaymentLinksTable = ({
  onNewLink,
  onViewLink,
  onEditLink,
}: PaymentLinksTableProps) => {
  const [searchFilter, setSearchFilter] = useState("");
  const [currentPage] = useState(1);
  const [isExporting, setIsExporting] = useState(false);
  const limit = 10;

  const { data, isLoading } = useGetPaymentLinksQuery();

  // Filter and search data
  const filteredData = useMemo(() => {
    if (!data?.data) return [];
    if (!searchFilter) return data.data;

    const searchLower = searchFilter.toLowerCase();
    return data.data.filter(
      (item) =>
        item.url_name?.toLowerCase().includes(searchLower) ||
        item.payment_link?.toLowerCase().includes(searchLower) ||
        item.url_name?.toLowerCase().includes(searchLower)
    );
  }, [data?.data, searchFilter]);

  // Transform data for table
  const tableData: PaymentLinkRow[] = useMemo(() => {
    return filteredData.map((link) => ({
      id: link.payment_id,
      url_name: link.url_name,
      payment_link: link.payment_link,
      pay_type: link.pay_type,
      amount: link.amount,
      created_at: link.created_at,
    }));
  }, [filteredData]);

  // Export to Excel function
  const handleExport = useCallback(async () => {
    setIsExporting(true);
    try {
      const exportData = tableData.map((link) => ({
        "Link Name": link.url_name,
        "Payment Link": link.payment_link,
        Type: link.pay_type.charAt(0).toUpperCase() + link.pay_type.slice(1),
        Amount: `₦${link.amount.toLocaleString()}`,
        "Created Date": format(new Date(link.created_at), "MMM dd, yyyy"),
        "Created Time": format(new Date(link.created_at), "HH:mm"),
      }));

      const XLSX = await import("xlsx");
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Payment Links");
      XLSX.writeFile(workbook, "Payment-Links-Export.xlsx");

      showApiSuccessToast("Export completed successfully");
    } catch (error) {
      console.error("Export error:", error);
      showApiErrorToast("Failed to export data");
    } finally {
      setIsExporting(false);
    }
  }, [tableData]);

  const getTypeColor = (type: string) => {
    return type === "fixed"
      ? "text-blue-600 bg-blue-100"
      : "text-purple-600 bg-purple-100";
  };

  // Define table columns
  const columnHelper = createColumnHelper<PaymentLinkRow>();
  const columns = [
    columnHelper.accessor("url_name", {
      header: "Link Name",
      cell: (props) => (
        <div className="max-w-[200px]">
          <p
            className="text-sm text-primary hover:text-green-700 cursor-pointer font-medium truncate uppercase"
            onClick={() => onViewLink(props.row.original.id)}
            title={props.getValue()}
          >
            {props.getValue()}
          </p>
          <p className="text-xs text-gray-500 truncate">
            {props.row.original.payment_link}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor("pay_type", {
      header: "Link Type",
      cell: (props) => (
        <span
          className={`inline-flex px-3 py-2 text-sm font-semibold rounded-md ${getTypeColor(
            props.getValue()
          )}`}
        >
          {props.getValue().charAt(0).toUpperCase() + props.getValue().slice(1)}
        </span>
      ),
    }),
    columnHelper.accessor("amount", {
      header: "Amount",
      cell: (props) => (
        <p className="text-sm text-gray-900 font-medium">
          ₦{props.getValue().toLocaleString()}
        </p>
      ),
    }),
    columnHelper.accessor("created_at", {
      header: "Date/Time",
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
    columnHelper.display({
      id: "actions",
      header: "Action",
      cell: (props) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewLink(props.row.original.id)}
            className="text-primary hover:text-green-700 p-1"
            title="View"
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
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>
          <button
            onClick={() => onEditLink(props.row.original.id)}
            className="text-gray-600 hover:text-gray-800 p-1"
            title="Edit"
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          {/* <button
            onClick={() => {
              navigator.clipboard.writeText(props.row.original.payment_link);
              showCopySuccessToast();
            }}
            className="text-blue-600 hover:text-blue-800 p-1"
            title="Copy Link"
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
          </button> */}
        </div>
      ),
    }),
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-primary">Payment Links</h2>
          <div className="flex gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
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
              onClick={handleExport}
              disabled={isExporting || tableData.length === 0}
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
                  Export to Excel
                </>
              )}
            </button>
            <button
              onClick={onNewLink}
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
              New Link
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
            emptyStateMessage={
              <>
                <p className="text-lg font-bold text-gray-800 mb-2">
                  No payment links are generated yet.
                </p>
                <p className="text-base text-gray-600 mb-4">
                  Generate a new payment link for your customers.
                </p>
                <button
                  onClick={onNewLink}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-green-700 transition-colors mx-auto"
                >
                  <svg
                    className="h-5 w-5"
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
                  New Link
                </button>
              </>
            }
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
