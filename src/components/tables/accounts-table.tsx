import { useState, useMemo, useCallback } from "react";
import { TablePagination } from "@components/table-pagination";
import { DefaultTable } from "@components/table/default";
import { createColumnHelper } from "@tanstack/react-table";
import {
  ReservedAccount,
  useGetReservedAccountsQuery,
} from "../../store/api/merchantApi";
import { format } from "date-fns";
import { showCopySuccessToast } from "@components/toast/custom-toast";

interface AccountsTableProps {
  onViewAccount: (accountNumber: string) => void;
  onSetPin: (account: ReservedAccount) => void;
}

interface AccountRow {
  id: string;
  account_name: string;
  account_number: string;
  bank_name: string;
  email: string;
  balance: number;
  reference: string;
  created_at: string;
  isUserAccount?: boolean;
}

export const AccountsTable = ({
  onViewAccount,
  onSetPin,
}: AccountsTableProps) => {
  const [searchFilter, setSearchFilter] = useState("");
  const [currentPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useGetReservedAccountsQuery();

  // Check if account belongs to current user
  const isUserAccount = useCallback(
    (account: ReservedAccount, userAccountNumber: string | null) => {
      return account.account_number === userAccountNumber;
    },
    []
  );

  // Get user's account number from localStorage or context
  const userAccountNumber = localStorage.getItem("userAccountNumber");

  // Filter and search data
  const filteredData = useMemo(() => {
    if (!data?.accounts) return [];
    if (!searchFilter) return data.accounts;

    const searchLower = searchFilter.toLowerCase();
    return data.accounts.filter(
      (item) =>
        item.account_name?.toLowerCase().includes(searchLower) ||
        item.account_number?.toLowerCase().includes(searchLower) ||
        item.bank_name?.toLowerCase().includes(searchLower) ||
        item.email?.toLowerCase().includes(searchLower) ||
        item.reference?.toLowerCase().includes(searchLower)
    );
  }, [data?.accounts, searchFilter]);

  // Transform data for table
  const tableData: AccountRow[] = useMemo(() => {
    return filteredData.map((account) => ({
      id: account.account_id,
      account_name: account.account_name,
      account_number: account.account_number,
      bank_name: account.bank_name,
      email: account.email,
      balance: account.balance,
      reference: account.reference,
      created_at: account.created_at,
      isUserAccount: isUserAccount(account, userAccountNumber),
    }));
  }, [filteredData, isUserAccount, userAccountNumber]);

  const handleCopyAccountNumber = (accountNumber: string) => {
    navigator.clipboard.writeText(accountNumber);
    showCopySuccessToast();
  };

  const handleCopyReference = (reference: string) => {
    navigator.clipboard.writeText(reference);
    showCopySuccessToast();
  };

  // Define table columns
  const columnHelper = createColumnHelper<AccountRow>();
  const columns = [
    columnHelper.accessor("account_name", {
      header: "Account Name",
      cell: (props) => (
        <div className="flex items-center gap-2">
          <div>
            <p className="text-sm text-gray-900 font-medium">
              {props.getValue()}
            </p>
            <p className="text-xs text-gray-500">
              {props.row.original.account_number}
            </p>
          </div>
          {props.row.original.isUserAccount && (
            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-primary text-white">
              YOU
            </span>
          )}
        </div>
      ),
    }),
    columnHelper.accessor("bank_name", {
      header: "Bank",
      cell: (props) => (
        <div>
          <p className="text-sm text-gray-900">{props.getValue()}</p>
          <p className="text-xs text-gray-500">
            {props.row.original.account_number}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (props) => (
        <a
          href={`mailto:${props.getValue()}`}
          className="text-primary hover:text-green-700 underline text-sm"
        >
          {props.getValue()}
        </a>
      ),
    }),
    columnHelper.accessor("balance", {
      header: "Balance",
      cell: (props) => (
        <p className="text-sm text-gray-900 font-medium">
          ₦{props.getValue().toLocaleString()}
        </p>
      ),
    }),
    columnHelper.accessor("reference", {
      header: "Reference",
      cell: (props) => (
        <div className="flex items-center gap-2">
          <p
            className="text-sm text-gray-600 font-mono truncate max-w-[120px]"
            title={props.getValue()}
          >
            {props.getValue()}
          </p>
          <button
            onClick={() => handleCopyReference(props.getValue())}
            className="text-gray-400 hover:text-gray-600 p-1"
            title="Copy Reference"
          >
            <svg
              className="h-3 w-3"
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
          </button>
        </div>
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
            onClick={() => onViewAccount(props.row.original.account_number)}
            className="text-primary hover:text-green-700 p-1"
            title="View Details"
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
            onClick={() =>
              handleCopyAccountNumber(props.row.original.account_number)
            }
            className="text-blue-600 hover:text-blue-800 p-1"
            title="Copy Account Number"
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
          </button>
          <button
            onClick={() =>
              onSetPin({
                bank_code: "",
                bank_name: props.row.original.bank_name,
                account_name: props.row.original.account_name,
                account_number: props.row.original.account_number,
                balance: props.row.original.balance,
                reference: props.row.original.reference,
                account_id: props.row.original.id,
                phone: "",
                email: props.row.original.email,
                created_at: props.row.original.created_at,
              })
            }
            className="text-gray-600 hover:text-gray-800 p-1"
            title="Set PIN"
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
          </button>
        </div>
      ),
    }),
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-primary">Reserved Account</h2>
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
        </div>
      </div>

      {/* Table */}
      <div className="p-6">
        <div className="flex flex-col gap-y-4">
          <DefaultTable
            data={tableData}
            columns={columns}
            loading={isLoading}
            emptyStateMessage="No wallet account available at the moment"
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
