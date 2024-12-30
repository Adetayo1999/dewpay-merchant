import CustomCheckbox from "@components/form-elements/checkbox";
import { ModalContainer } from "@components/modal";
import { useModal } from "context/modal";
import { LiaTimesSolid } from "react-icons/lia";

export const UserPermissionsModal = () => {
  const { setModalContent } = useModal();

  return (
    <ModalContainer className="rounded-xl pb-[4rem]  mx-auto" hasCancel={false}>
      <div className="flex justify-between items-center p-5  mb-8">
        <h6 className="text-sm font-medium text-[#7E92A2]">User Permissions</h6>
        <button
          className="bg-[#7E92A2] rounded-full text-white h-[1.6rem] w-[1.6rem] flex justify-center items-center"
          onClick={() => setModalContent(null)}
        >
          <LiaTimesSolid />
        </button>
      </div>

      <div className="  md:px-5">
        <div className="bg-[#F5F6FA] py-4 rounded-lg items-center flex justify-between mb-7">
          <div className="flex-[0.4]" />
          <div className="flex-[0.25] flex-shrink-0">
            <p className="font-medium text-xs md:text-sm text-[#8A92A6]">
              Read
            </p>
          </div>
          <div className="flex-[0.25] flex-shrink-0">
            <p className="font-medium text-[#8A92A6] text-xs md:text-sm">
              Write
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-y-5">
          {[
            "Dashboard",
            "Transaction",
            "Users",
            "USSD Collection",
            "Services",
            "Wallet",
            "Settiings",
          ].map((item, idx) => (
            <div className="flex justify-between items-center" key={idx}>
              <div className="flex-[0.4] ">
                <p className="text-[#232D42] text-xs md:text-sm w-[70%] mx-auto">
                  {item}
                </p>
              </div>
              <div className="flex-[0.25] flex-shrink-0">
                <CustomCheckbox hasLabel={false} state />
              </div>
              <div className="flex-[0.25] flex-shrink-0">
                <CustomCheckbox hasLabel={false} state />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center border-t border-[#EAEEF4] pt-[2.313rem] mt-[3.5rem]">
        <button className="bg-[#15707A] text-sm rounded-xl min-w-[18rem] text-white  font-semibold py-4">
          Submit Permission
        </button>
      </div>
    </ModalContainer>
  );
};
