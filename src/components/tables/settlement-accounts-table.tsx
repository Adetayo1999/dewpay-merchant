import CustomCheckbox from "@components/form-elements/checkbox";
import { TableDropDown } from "@components/table-dropdown";
import { DefaultTable } from "@components/table/default";
import { createColumnHelper } from "@tanstack/react-table";

export const SettlementAccountsTable = () => {
  const columnHelper = createColumnHelper<(typeof data)[0]>();

  const columns = [
    columnHelper.accessor(() => "default", {
      header: "Select Default",
      cell: () => (
        <div className="">
          <CustomCheckbox
            variant={true}
            checkBoxClassName="!h-[1.3rem] !w-[1.3rem]"
          />
        </div>
      ),
    }),
    columnHelper.accessor("bank", {
      header: "Bank",
      cell: (info) => <p>{info.getValue()}</p>,
    }),
    columnHelper.accessor("account_name", {
      header: "Account Name",
      cell: (info) => <p>{info.getValue()}</p>,
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <div className="inline-flex items-center gap-x-16 ">
          <button className="bg-[#50C878] text-white rounded-md px-6 py-1.5 text-xs ">
            {info.getValue()}
          </button>
          <TableDropDown
            options={[
              { title: "Update Account" },
              { title: "Deactivate Account" },
            ]}
          />
        </div>
      ),
    }),
  ];

  return (
    <div className="">
      <DefaultTable data={data} columns={columns} />
    </div>
  );
};

const data = [
  {
    bank: "GTBank",
    account_name: "CAP Suite Ltd.",
    status: "Active",
  },
  {
    bank: "GTBank",
    account_name: "CAP Suite Ltd.",
    status: "Active",
  },
  {
    bank: "GTBank",
    account_name: "CAP Suite Ltd.",
    status: "Active",
  },
  {
    bank: "GTBank",
    account_name: "CAP Suite Ltd.",
    status: "Active",
  },
  {
    bank: "GTBank",
    account_name: "CAP Suite Ltd.",
    status: "Active",
  },
];
