import { useState } from "react";
import { TablePagination } from "@components/table-pagination";
import { DefaultTable } from "@components/table/default";
import { createColumnHelper } from "@tanstack/react-table";
import { CustomerListResponse, Customer } from "../../store/api/merchantApi";

interface CustomersTableProps {
  data?: CustomerListResponse;
  isLoading: boolean;
  currentPage: number;
  onPageChange: (page: number) => void;
  limit: number;
}

export const CustomersTable = ({
  data,
  isLoading,
  currentPage,
  limit,
}: CustomersTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Define table columns
  const columnHelper = createColumnHelper<Customer>();
  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (props) => (
        <p className="text-sm text-gray-900 font-medium">{props.getValue()}</p>
      ),
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (props) => (
        <p className="text-sm text-gray-600">{props.getValue()}</p>
      ),
    }),
    columnHelper.accessor("phone", {
      header: "Phone",
      cell: (props) => (
        <p className="text-sm text-gray-600">{props.getValue()}</p>
      ),
    }),
    columnHelper.accessor("customer_status", {
      header: "Customer Status",
      cell: (props) => {
        const status = props.getValue() || "inactive";
        const getStatusColor = (status: string) => {
          switch (status.toLowerCase()) {
            case "active":
              return "text-green-600 bg-green-100";
            case "inactive":
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
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-primary">Customers</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Customer"
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
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="p-6">
        <div className="flex flex-col gap-y-4">
          {isLoading ? (
            <div className="min-h-[20rem] flex flex-col gap-y-2 justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="animate-pulse mt-2 text-sm text-gray-800">
                Loading...
              </p>
            </div>
          ) : data?.customers && data.customers.length > 0 ? (
            <>
              <DefaultTable
                data={data.customers}
                columns={columns}
                loading={false}
                emptyStateMessage=""
              />
              {data.total > 0 && (
                <TablePagination
                  page={currentPage}
                  total={data.total}
                  limit={limit}
                />
              )}
            </>
          ) : (
            /* Custom Empty State */
            <div className="text-center min-h-[20rem] flex justify-center items-center">
              <div className="flex flex-col items-center justify-center py-12">
                <div className="mb-6">
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-400"
                  >
                    <path
                      d="M24 8H40L44 12H56C58.2 12 60 13.8 60 16V52C60 54.2 58.2 56 56 56H8C5.8 56 4 54.2 4 52V16C4 13.8 5.8 12 8 12H20L24 8Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M24 24V48"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M32 24V48"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M40 24V48"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-lg font-bold text-gray-800 mb-2">
                  No customer found
                </p>
                <p className="text-sm text-gray-600">
                  Please you don't have any customer that has used any of your
                  payment links yet,{" "}
                  <button className="text-primary hover:text-green-700 font-semibold underline decoration-2 underline-offset-2">
                    Generate Payment Link
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
