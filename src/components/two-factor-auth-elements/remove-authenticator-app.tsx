import { TwoFAContainer } from "./container";
import { CustomButton } from "@components/form-elements/button";

export const RemoveAuthenticatorApp = () => {
  return (
    <TwoFAContainer
      onCancel={() => {}}
      hasCancelBtn
      goBack={() => {}}
      containerClassName="max-w-[30.813rem]"
    >
      <div className="mt-3 max-w-[25.813rem] mx-auto pb-10">
        <div className="text-center flex justify-center items-center flex-col gap-y-3  mb-8">
          <h2 className="text-xl font-semibold text-[#7D8592]">
            Remove authenticator App
          </h2>
          <div className=" flex justify-center items-center  mb-2 ">
            <svg
              width="70"
              height="70"
              viewBox="0 0 81 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M60.5006 63.3333C60.5006 65.9855 59.4471 68.529 57.5717 70.4044C55.6964 72.2798 53.1528 73.3333 50.5006 73.3333H27.1673C24.5152 73.3333 21.9716 72.2798 20.0963 70.4044C18.2209 68.529 17.1673 65.9855 17.1673 63.3333V23.3333H13.834V13.3333H28.834L32.1673 10H45.5007L48.834 13.3333H63.834V23.3333H60.5006V63.3333ZM20.5007 23.3333V63.3333C20.5007 65.1014 21.203 66.7971 22.4533 68.0474C23.7035 69.2976 25.3992 70 27.1673 70H50.5006C52.2688 70 53.9645 69.2976 55.2147 68.0474C56.4649 66.7971 57.1673 65.1014 57.1673 63.3333V23.3333H20.5007ZM60.5006 20V16.6667H47.1673L43.834 13.3333H33.834L30.5007 16.6667H17.1673V20H60.5006ZM27.1673 30H30.5007V63.3333H27.1673V30ZM47.1673 30H50.5006V63.3333H47.1673V30Z"
                fill="#15707A"
              />
            </svg>
          </div>

          <p className="text-base text-[#7D8592] font-semibold">
            This may turn 2-step verification off.
          </p>
        </div>
        <div className="flex justify-center items-center flex-col gap-y-6 ">
          <CustomButton
            variant="danger"
            className="rounded-lg py-[0.844rem] text-sm font-semibold w-full"
          >
            Remove
          </CustomButton>
        </div>
      </div>
    </TwoFAContainer>
  );
};
