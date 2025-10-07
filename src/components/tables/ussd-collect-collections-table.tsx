import { TablePagination } from "@components/table-pagination";
import { DefaultTable } from "@components/table/default";
import { formatCurrency } from "@lib/number-formatter";
import { createColumnHelper } from "@tanstack/react-table";
import clsx from "clsx";

const styles: Record<string, string> = {
  pending: "bg-[#FFA617]",
  successful: "bg-[#50C878]",
  failed: "bg-[#EF533A]",
};

export const USSDCOllectCollectionsTable = () => {
  const columnHelper = createColumnHelper<(typeof data)[0]>();

  const columns = [
    columnHelper.accessor("date", {
      header: "Date & Time",
      cell: (props) => <p>{props.getValue()}</p>,
    }),
    columnHelper.accessor("txn_ref", {
      header: "Transaction ID",
      cell: (props) => <p>{props.getValue()}</p>,
    }),
    columnHelper.accessor("code", {
      header: "Code",
      cell: (props) => <p>{props.getValue()}</p>,
    }),
    columnHelper.accessor("amount", {
      header: "Amount",
      cell: (props) => <p>{formatCurrency(props.getValue(), "NGN")}</p>,
    }),
    columnHelper.accessor("customer_name", {
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
    columnHelper.accessor("status", {
      header: "Status",
      cell: (props) => (
        <button
          className={clsx(
            "text-white text-xs px-4 py-1.5 rounded capitalize min-w-[6rem] font-semibold",
            styles[props.getValue()] || styles.pending
          )}
        >
          {props.getValue()}
        </button>
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
    date: "29/03/2024 13:24PM",
    txn_ref: "REF12983320232..",
    code: "1101",
    amount: 21100.45,
    customer_name: "Juan Alexander",
    phone: "09060780434",
    status: "successful",
  },
  {
    date: "29/03/2024 13:24PM",
    txn_ref: "REF12983320232..",
    code: "1101",
    amount: 21100.45,
    customer_name: "Juan Alexander",
    phone: "09060780434",
    status: "pending",
  },
  {
    date: "29/03/2024 13:24PM",
    txn_ref: "REF12983320232..",
    code: "1101",
    amount: 21100.45,
    customer_name: "Juan Alexander",
    phone: "09060780434",
    status: "failed",
  },
  {
    date: "29/03/2024 13:24PM",
    txn_ref: "REF12983320232..",
    code: "1101",
    amount: 21100.45,
    customer_name: "Juan Alexander",
    phone: "09060780434",
    status: "pending",
  },
  {
    date: "29/03/2024 13:24PM",
    txn_ref: "REF12983320232..",
    code: "1101",
    amount: 21100.45,
    customer_name: "Juan Alexander",
    phone: "09060780434",
    status: "successful",
  },
  {
    date: "29/03/2024 13:24PM",
    txn_ref: "REF12983320232..",
    code: "1101",
    amount: 21100.45,
    customer_name: "Juan Alexander",
    phone: "09060780434",
    status: "successful",
  },
  {
    date: "29/03/2024 13:24PM",
    txn_ref: "REF12983320232..",
    code: "1101",
    amount: 21100.45,
    customer_name: "Juan Alexander",
    phone: "09060780434",
    status: "pending",
  },
  {
    date: "29/03/2024 13:24PM",
    txn_ref: "REF12983320232..",
    code: "1101",
    amount: 21100.45,
    customer_name: "Juan Alexander",
    phone: "09060780434",
    status: "failed",
  },
  {
    date: "29/03/2024 13:24PM",
    txn_ref: "REF12983320232..",
    code: "1101",
    amount: 21100.45,
    customer_name: "Juan Alexander",
    phone: "09060780434",
    status: "pending",
  },
  {
    date: "29/03/2024 13:24PM",
    txn_ref: "REF12983320232..",
    code: "1101",
    amount: 21100.45,
    customer_name: "Juan Alexander",
    phone: "09060780434",
    status: "successful",
  },
];
