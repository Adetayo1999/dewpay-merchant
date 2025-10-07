/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoonLoader } from "react-spinners";
import clsx from "clsx";
import { ReactNode } from "react";

interface CustomTableProps<T> {
  className?: string;
  columns: any;
  data: T[];
  loading?: boolean;
  emptyStateMessage?: string | ReactNode;
}

export const DefaultTable = <T,>({
  columns,
  data,
  className,
  loading,
  emptyStateMessage = "No Data",
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
                    className="pr-[2rem] border-b border-[#E7F8FA]  py-5 first:pl-5 capitalize whitespace-nowrap text-[#7D8592] text-xs md:text-sm font-normal"
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
                    className="py-5 first:pl-5   last:pr-9 last:rounded-tr-[0.625rem]  px-1    text-left whitespace-nowrap    pr-[2rem] text-xs md:text-sm text-[#606060] "
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
        <div className="text-center min-h-[10rem] flex justify-center items-center">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="mb-4">
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
            {typeof emptyStateMessage === "string" ? (
              <p className="text-lg font-bold text-primary">
                {emptyStateMessage}
              </p>
            ) : (
              emptyStateMessage
            )}
          </div>
        </div>
      )}
    </div>
  );
};
