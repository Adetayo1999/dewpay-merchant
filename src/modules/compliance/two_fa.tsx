import { ArrowRightIcon } from "@assets/icons/arrow-right-icon";
import { ComplianceContainer } from "@components/containers/compliance-container";
import { CustomToggle } from "@components/custom-toggle";

export default function TwoFaPage() {
  return (
    <ComplianceContainer>
      <div className="pb-4 border-b border-[#2022240D] mb-[1.125rem]">
        <h3 className="text-lg text-[#7D8592] font-semibold mb-4">
          Account Security
        </h3>
        <div className="flex flex-col gap-y-3">
          <div className="flex justify-between items-center py-2 ">
            <p className="text-sm text-[#7D8592]">2-step verification</p>
            <CustomToggle />
          </div>
          <div className="flex justify-between items-center py-2">
            <p className="text-sm text-[#7D8592]">Change password</p>
            <button>
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </div>
      <div className="">
        <h3 className="text-lg text-[#7D8592] font-semibold mb-4">Support</h3>
        <div className="flex flex-col gap-y-5">
          <div className="">
            <button className="flex justify-between items-end w-full">
              <span className="flex items-start flex-col">
                <span className="text-sm text-[#7D8592]">
                  Log out of all devices
                </span>
                <span className="text-xs text-[#20222466]">
                  Add an additional layer of security to your account during
                  sign in.
                </span>
              </span>
              <span>
                {" "}
                <ArrowRightIcon />{" "}
              </span>
            </button>
          </div>
          <div className="">
            <button className="flex justify-between items-end w-full">
              <span className="flex items-start flex-col">
                <span className="text-sm text-[#FF4747]">
                  Delete My Account
                </span>
                <span className="text-xs text-[#20222466]">
                  Permanently delete the account and remove access from all
                  devices.
                </span>
              </span>
              <span>
                {" "}
                <ArrowRightIcon />{" "}
              </span>
            </button>
          </div>
        </div>
      </div>
    </ComplianceContainer>
  );
}
