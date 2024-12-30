/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoonLoader } from "react-spinners";
import clsx from "clsx";

interface CustomTableProps<T> {
  className?: string;
  columns: any;
  data: T[];
  loading?: boolean;
}

export const DefaultTable = <T,>({
  columns,
  data,
  className,
  loading,
}: CustomTableProps<T>) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading && !data.length) {
    return (
      <div className="min-h-[20rem] flex flex-col gap-y-2 justify-center items-center ">
        <MoonLoader color="#442CA3" size={30} />
        <p className="animate-pulse mt-2 text-sm text-gray-800">Loading...</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {loading && data.length !== 0 && (
        <div className="flex gap-x-3 items-center justify-end">
          <MoonLoader color="#0F3DB4" size={15} />
          <p className="animate-pulse mt-2 text-sm text-gray-800">
            Refreshing...
          </p>
        </div>
      )}
      <div
        className={`overflow-x-auto rounded-lg border border-[#CFEAEC]  ${className}`}
      >
        <table
          className={clsx(
            "w-full  border-separated border-spacing-y-3 text-center"
          )}
        >
          <thead className="text-left">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-[#F7FAFF]">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="pr-[2rem] border-b border-[#E7F8FA]  py-5 first:pl-5 capitalize whitespace-nowrap text-[#7D8592] text-sm font-normal"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="cursor-pointer border-b last:border-none border-[#E7F8FA]"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="py-5 first:pl-5   last:pr-9 last:rounded-tr-[0.625rem]  px-1    text-left whitespace-nowrap    pr-[2rem] text-sm text-[#606060] "
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!loading && data.length === 0 && (
        <div className="text-center min-h-[10rem]  flex justify-center items-center ">
          <p className="text-[#8D8F9A] flex flex-col items-center">
            <span>No Data</span>
          </p>
        </div>
      )}
    </div>
  );
};
