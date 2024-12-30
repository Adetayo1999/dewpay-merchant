import { ApprovedIcon } from "@assets/icons/approved-icon";
import { PendingIcon } from "@assets/icons/pending-icon";
import { RejectedIcon } from "@assets/icons/rejected-icon";
import CustomCheckbox from "@components/form-elements/checkbox";
import clsx from "clsx";

type ChecklistStatusType = "pending" | "approved" | "rejected";

interface ChecklistType {
  title: string;
  status: ChecklistStatusType;
}

export const MerchantComplianceChecklist = () => {
  return (
    <div className="">
      <table className="w-full border-separate border-spacing-y-4">
        <thead>
          <tr>
            <th className="pb-[0.6rem] px-4 text-left"></th>
            <th className=" pb-[0.6rem] text-sm px-4 text-left font-semibold text-[#7D8592]">
              Merchant Compliance
            </th>
            <th className=" pb-[0.6rem] text-sm px-4 text-left font-semibold text-[#7D8592]">
              Approval Status
            </th>
          </tr>
        </thead>
        <tbody className="w-full">
          {data.map((item, index) => (
            <tr key={index} className="">
              <td className="py-[1rem]  first:rounded-bl-lg first:rounded-tl-lg border-[#D1D1D1] first:border-l last:pr-9 last:rounded-tr-lg last:rounded-br-lg last:border-r pl-8 border-y border-opacity-60">
                <CustomCheckbox state={true} />
              </td>
              <td className=" py-[1rem] w-full  first:rounded-bl-lg first:rounded-tl-lg border-[#D1D1D1] first:border-l last:pr-9 last:rounded-tr-lg last:rounded-br-lg last:border-r pl-4  text-sm text-[#7D8592]   border-y border-opacity-60">
                {item.title}
              </td>
              <td className="min-w-[15rem] py-[1rem]  first:rounded-bl-lg first:rounded-tl-lg border-[#D1D1D1] first:border-l last:pr-9 last:rounded-tr-lg last:rounded-br-lg last:border-r pl-4   border-y border-opacity-60">
                <button
                  className={clsx(
                    "text-sm flex items-center gap-x-3 capitalize",
                    statusStyles[item.status]
                  )}
                >
                  <span>
                    {item.status === "pending" && <PendingIcon />}
                    {item.status === "approved" && <ApprovedIcon />}
                    {item.status === "rejected" && <RejectedIcon />}
                  </span>
                  <span>{item.status}</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const data: Array<ChecklistType> = [
  { title: "Business Registration Certificate", status: "pending" },
  { title: "Articles of Incorporation", status: "approved" },
  { title: "TIN Certificate", status: "approved" },
  { title: "Valid Proof of Address (Utility Bill)", status: "rejected" },
  { title: "Valid Proof of Identity", status: "rejected" },
  { title: "Anti-Money Laundering Policy", status: "rejected" },
];

const statusStyles: Record<ChecklistStatusType, string> = {
  pending: "text-[#FFA617]",
  approved: "text-[#40997E]",
  rejected: "text-[#EF533A]",
};
