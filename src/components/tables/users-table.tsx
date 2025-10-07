import { TableDropDown } from "@components/table-dropdown";
import { TablePagination } from "@components/table-pagination";
import { DefaultTable } from "@components/table/default";
import { formatCurrency } from "@lib/number-formatter";
import { paths } from "@routes/paths";
import { createColumnHelper } from "@tanstack/react-table";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

const styles: Record<string, string> = {
  active: "text-[#05A856]",
  inactive: "text-[#FF1F25]",
};

export const UsersTable = () => {
  const columnHelper = createColumnHelper<(typeof data)[0]>();
  const navigate = useNavigate();

  const columns = [
    columnHelper.accessor("id", {
      header: "User ID",
      cell: (props) => <p>{props.getValue()}</p>,
    }),
    columnHelper.accessor("name", {
      header: "Customer Name",
      cell: (props) => <p>{props.getValue()}</p>,
    }),
    columnHelper.accessor("phone", {
      header: "Customer No.",
      cell: (props) => (
        <p>
          {props.getValue().slice(0, 3) +
            "*****" +
            props
              .getValue()
              .slice(props.getValue().length - 3, props.getValue().length)}
        </p>
      ),
    }),
    columnHelper.accessor("transaction", {
      header: "Transaction",
      cell: (props) => <p>{formatCurrency(props.getValue())}</p>,
    }),
    columnHelper.accessor("amount", {
      header: "Amount Spent",
      cell: (props) => <p>{formatCurrency(props.getValue(), "NGN")}</p>,
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (props) => (
        <div className="flex items-center gap-x-20">
          <button
            className={clsx(
              "text-sm font-medium capitalize",
              styles[props.getValue()] || styles.inactive
            )}
          >
            {props.getValue()}
          </button>
          <TableDropDown
            options={[
              {
                title: "View All Transactions",
                onClick: () =>
                  navigate(
                    paths.users.transaction_history.replace(
                      ":id",
                      props.row.original.id.toString()
                    )
                  ),
              },
              { title: "Delete User" },
            ]}
          />
        </div>
      ),
    }),
  ];

  return (
    <div className="flex flex-col gap-y-4">
      <DefaultTable data={data} columns={columns} />
      {data.length > 0 && <TablePagination page={1} total={100} />}
    </div>
  );
};

const data = [
  {
    id: 6729,
    name: "Juan Alexander",
    phone: "09060788432",
    transaction: 29,
    amount: 21100000.43,
    status: "active",
  },
  {
    id: 6729,
    name: "Juan Alexander",
    phone: "09060788432",
    transaction: 29,
    amount: 21100000.43,
    status: "inactive",
  },
  {
    id: 6729,
    name: "Juan Alexander",
    phone: "09060788432",
    transaction: 29900,
    amount: 21100000.43,
    status: "active",
  },
  {
    id: 6729,
    name: "Juan Alexander",
    phone: "09060788432",
    transaction: 29,
    amount: 21100000.43,
    status: "active",
  },
  {
    id: 6729,
    name: "Juan Alexander",
    phone: "09060788432",
    transaction: 29,
    amount: 21100000.43,
    status: "inactive",
  },
  {
    id: 6729,
    name: "Juan Alexander",
    phone: "09060788432",
    transaction: 29,
    amount: 21100000.43,
    status: "active",
  },
  {
    id: 6729,
    name: "Juan Alexander",
    phone: "09060788432",
    transaction: 29,
    amount: 21100000.43,
    status: "inactive",
  },
  {
    id: 6729,
    name: "Juan Alexander",
    phone: "09060788432",
    transaction: 29,
    amount: 21100000.43,
    status: "active",
  },
  {
    id: 6729,
    name: "Juan Alexander",
    phone: "09060788432",
    transaction: 29,
    amount: 21100000.43,
    status: "active",
  },
  {
    id: 6729,
    name: "Juan Alexander",
    phone: "09060788432",
    transaction: 29,
    amount: 21100000.43,
    status: "inactive",
  },
];
