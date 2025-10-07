import { UserPermissionsModal } from "@components/modals/settings/user-permissions-modal";
import { TableDropDown } from "@components/table-dropdown";
import { TablePagination } from "@components/table-pagination";
import { DefaultTable } from "@components/table/default";
import { createColumnHelper } from "@tanstack/react-table";
import { useModal } from "context/modal";

export const TeamsTable = () => {
  const columnHelper = createColumnHelper<(typeof data)[0]>();
  const { setModalContent } = useModal();

  const columns = [
    columnHelper.accessor("date", {
      header: "Created Date",
      cell: (props) => <p>{props.getValue()}</p>,
    }),
    columnHelper.accessor("firstname", {
      header: "First Name",
      cell: (props) => <p>{props.getValue()}</p>,
    }),
    columnHelper.accessor("lastname", {
      header: "Last Name",
      cell: (props) => <p>{props.getValue()}</p>,
    }),
    columnHelper.accessor("email", {
      header: "Email Address",
      cell: (props) => <p>{props.getValue()}</p>,
    }),

    columnHelper.accessor("password", {
      header: "Password",
      cell: (props) => (
        <p>{new Array(props.getValue().length).fill("*").join("")}</p>
      ),
    }),

    columnHelper.accessor(() => "action", {
      header: "",
      id: "action",
      cell: () => (
        <div className="flex items-center gap-x-20">
          <TableDropDown
            options={[
              {
                title: "Update User",
                onClick: () => setModalContent(<UserPermissionsModal />),
              },
              { title: "Deactivate User" },
            ]}
          />
        </div>
      ),
    }),
  ];

  return (
    <div className="flex flex-col gap-y-4">
      <DefaultTable
        data={data}
        columns={columns}
        className="min-h-[30rem] md:min-h-[45rem]"
      />
      {data.length > 0 && <TablePagination page={1} total={100} />}
    </div>
  );
};

const data = [
  {
    date: "29/03/2024",
    firstname: "Juan",
    lastname: "Alexander",
    email: "Juanalexander@gmail.com",
    password: "dhfhfhfhfhffhfhfhhheheeheheh",
  },
  {
    date: "29/03/2024",
    firstname: "Juan",
    lastname: "Alexander",
    email: "Juanalexander@gmail.com",
    password: "dhfhfhfhfhffhfhfhhheheeheheh",
  },
  {
    date: "29/03/2024",
    firstname: "Juan",
    lastname: "Alexander",
    email: "Juanalexander@gmail.com",
    password: "dhfhfhfhfhffhfhfhhheheeheheh",
  },
  {
    date: "29/03/2024",
    firstname: "Juan",
    lastname: "Alexander",
    email: "Juanalexander@gmail.com",
    password: "dhfhfhfhfhffhfhfhhheheeheheh",
  },
];
