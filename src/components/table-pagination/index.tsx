import { ArrowRightIcon } from "@assets/icons/arrow-right-icon";

export const TablePagination: React.FC<{
  page: number;
  limit?: number;
  total: number;
}> = ({ page, total, limit = 10 }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="">
        <p className="text-sm text-[#7D8592]">
          Showing {page == 1 ? 1 : page * limit}-
          {page === 1 ? limit : page * limit + limit} of {total}
        </p>
      </div>
      <div className="flex items-center">
        <button className="rotate-180 text-[#202224] hover:text-primary bg-[#FAFBFD] rounded-tr-lg rounded-br-lg px-3 py-1.5 flex items-center justify-center border-[#D5D5D5] border">
          <ArrowRightIcon scale={0.8} />
        </button>
        <button className="bg-[#FAFBFD] text-[#202224] hover:text-primary rounded-tr-lg rounded-br-lg px-3 py-1.5 flex items-center justify-center border-[#D5D5D5] border border-l-transparent">
          <ArrowRightIcon scale={0.8} />
        </button>
      </div>
    </div>
  );
};
