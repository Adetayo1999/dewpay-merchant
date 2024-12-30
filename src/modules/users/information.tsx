import { ArrowRightIcon } from "@assets/icons/arrow-right-icon";
import { UserInformationTable } from "@components/tables/user-information-table";
import { UserInformationCard } from "@components/user-information-card";
import { paths } from "@routes/paths";
import { Link } from "react-router-dom";

export default function UsersInformation() {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="">
        <Link
          to={paths.users.index}
          className="inline-flex items-center gap-x-2 px-4 py-1 hover:bg-primary hover:bg-opacity-5 rounded"
        >
          <span className="rotate-180">
            <ArrowRightIcon scale={0.8} />
          </span>
          <span className="text-sm text-[#606060] font-bold">Back</span>
        </Link>
      </div>
      <UserInformationCard />
      <UserInformationTable />
    </div>
  );
}
