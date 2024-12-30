import { TablePagination } from "@components/table-pagination";
import { DefaultTable } from "@components/table/default";
import { formatCurrency } from "@lib/number-formatter";
import { createColumnHelper } from "@tanstack/react-table";

export const UserInformationTable = () => {
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
    columnHelper.accessor("payment_method", {
      header: "Payment Type",
      cell: (props) => <p>{props.getValue()}</p>,
    }),
    columnHelper.accessor("amount", {
      header: "Amount Spent",
      cell: (props) => <p>{formatCurrency(props.getValue(), "NGN")}</p>,
    }),
  ];

  return (
    <div className="flex flex-col gap-y-4">
      <DefaultTable data={data} columns={columns} />
      <TablePagination page={4} total={100} />
    </div>
  );
};

const data = [
  {
    date: "29/03/2024 13:24PM",
    txn_ref: "REF12983320232..",
    payment_method: "USSD",
    amount: 21100.45,
    customer_name: "Juan Alexander",
    phone: "09060780434",
    status: "successful",
  },
  {
    date: "29/03/2024 13:24PM",
    txn_ref: "REF12983320232..",
    payment_method: "USSD",
    amount: 21100.45,
    customer_name: "Juan Alexander",
    phone: "09060780434",
    status: "pending",
  },
  {
    date: "29/03/2024 13:24PM",
    txn_ref: "REF12983320232..",
    payment_method: "USSD",
    amount: 21100.45,
    customer_name: "Juan Alexander",
    phone: "09060780434",
    status: "failed",
  },
  {
    date: "29/03/2024 13:24PM",
    txn_ref: "REF12983320232..",
    payment_method: "USSD",
    amount: 21100.45,
    customer_name: "Juan Alexander",
    phone: "09060780434",
    status: "pending",
  },
  {
    date: "29/03/2024 13:24PM",
    txn_ref: "REF12983320232..",
    payment_method: "USSD",
    amount: 21100.45,
    customer_name: "Juan Alexander",
    phone: "09060780434",
    status: "successful",
  },
  {
    date: "29/03/2024 13:24PM",
    txn_ref: "REF12983320232..",
    payment_method: "USSD",
    amount: 21100.45,
    customer_name: "Juan Alexander",
    phone: "09060780434",
    status: "successful",
  },
  {
    date: "29/03/2024 13:24PM",
    txn_ref: "REF12983320232..",
    payment_method: "USSD",
    amount: 21100.45,
    customer_name: "Juan Alexander",
    phone: "09060780434",
    status: "pending",
  },
  {
    date: "29/03/2024 13:24PM",
    txn_ref: "REF12983320232..",
    payment_method: "USSD",
    amount: 21100.45,
    customer_name: "Juan Alexander",
    phone: "09060780434",
    status: "failed",
  },
  {
    date: "29/03/2024 13:24PM",
    txn_ref: "REF12983320232..",
    payment_method: "USSD",
    amount: 21100.45,
    customer_name: "Juan Alexander",
    phone: "09060780434",
    status: "pending",
  },
  {
    date: "29/03/2024 13:24PM",
    txn_ref: "REF12983320232..",
    payment_method: "USSD",
    amount: 21100.45,
    customer_name: "Juan Alexander",
    phone: "09060780434",
    status: "successful",
  },
];
