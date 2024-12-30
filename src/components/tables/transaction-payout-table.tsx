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

export const TransactionPayoutTable = () => {
  const columnHelper = createColumnHelper<(typeof data)[0]>();

  const columns = [
    columnHelper.accessor("date", {
      header: "Date & Time",
      cell: (props) => <p>{props.getValue()}</p>,
    }),
    columnHelper.accessor("settlement_id", {
      header: "Settlement ID",
      cell: (props) => <p>{props.getValue()}</p>,
    }),
    columnHelper.accessor("destination_bank", {
      header: "Destination Bank Account",
      cell: (props) => <p>{props.getValue()}</p>,
    }),
    columnHelper.accessor("amount", {
      header: "Amount",
      cell: (props) => <p>{formatCurrency(props.getValue(), "NGN")}</p>,
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
      <TablePagination page={1} total={100} />
    </div>
  );
};

const data = [
  {
    date: "29/03/2024 13:24PM",
    settlement_id: "REF12983320232..",
    amount: 21100.45,
    status: "successful",
    destination_bank: "Zenith Bank (Default)",
  },
  {
    date: "29/03/2024 13:24PM",
    settlement_id: "REF12983320232..",
    amount: 21100.45,
    status: "pending",
    destination_bank: "GTBank (Alternative)",
  },
  {
    date: "29/03/2024 13:24PM",
    settlement_id: "REF12983320232..",
    amount: 21100.45,
    status: "failed",
    destination_bank: "GTBank (Alternative)",
  },
  {
    date: "29/03/2024 13:24PM",
    settlement_id: "REF12983320232..",
    amount: 21100.45,
    status: "successful",
    destination_bank: "Zenith Bank (Default)",
  },
  {
    date: "29/03/2024 13:24PM",
    settlement_id: "REF12983320232..",
    amount: 21100.45,
    status: "pending",
    destination_bank: "GTBank (Alternative)",
  },
  {
    date: "29/03/2024 13:24PM",
    settlement_id: "REF12983320232..",
    amount: 21100.45,
    status: "failed",
    destination_bank: "GTBank (Alternative)",
  },
  {
    date: "29/03/2024 13:24PM",
    settlement_id: "REF12983320232..",
    amount: 21100.45,
    status: "successful",
    destination_bank: "Zenith Bank (Default)",
  },
  {
    date: "29/03/2024 13:24PM",
    settlement_id: "REF12983320232..",
    amount: 21100.45,
    status: "pending",
    destination_bank: "GTBank (Alternative)",
  },
  {
    date: "29/03/2024 13:24PM",
    settlement_id: "REF12983320232..",
    amount: 21100.45,
    status: "failed",
    destination_bank: "GTBank (Alternative)",
  },
  {
    date: "29/03/2024 13:24PM",
    settlement_id: "REF12983320232..",
    amount: 21100.45,
    status: "successful",
    destination_bank: "Zenith Bank (Default)",
  },
  {
    date: "29/03/2024 13:24PM",
    settlement_id: "REF12983320232..",
    amount: 21100.45,
    status: "pending",
    destination_bank: "GTBank (Alternative)",
  },
  {
    date: "29/03/2024 13:24PM",
    settlement_id: "REF12983320232..",
    amount: 21100.45,
    status: "failed",
    destination_bank: "GTBank (Alternative)",
  },
];
