import { TwoFAContainer } from "./container";
import { CustomButton } from "@components/form-elements/button";

export const TwoStepVerificationBackup = () => {
  return (
    <TwoFAContainer
      onCancel={() => {}}
      hasCancelBtn
      goBack={() => {}}
      containerClassName="max-w-[30.813rem]"
    >
      <div className="mt-3 max-w-[25.813rem] mx-auto pb-10">
        <div className="text-center flex justify-center items-center flex-col gap-y-3  mb-6">
          <h2 className="text-xl font-semibold text-[#7D8592]">
            Add authenticator App
          </h2>
          <p className="text-sm text-[#7D8592] font-bold">
            Save your backup codes
          </p>
          <p className="text-sm text-[#7D8592] ">
            You can only see this once, so be sure to keep them to avoid getting
            locked out of your account.
          </p>
          <div className="bg-[#E5ECF680] rounded-2xl text-[#7D8592] text-2xl p-[1.125rem] flex justify-center items-center  w-full">
            KTC9-TWPW <br /> 2JV2-BMDQ <br /> 1D8N-NJH5 <br /> P76V-KWFH <br />
            E5ZF-J7VS <br /> VMR6-8RJA
          </div>
        </div>
        <div className="flex justify-center items-center flex-col gap-y-6 ">
          <CustomButton
            variant="primary"
            className="rounded-lg py-[0.844rem] text-sm font-semibold w-full"
          >
            Verify your code
          </CustomButton>
          <CustomButton
            variant="primary"
            className="rounded-lg py-[0.844rem] text-sm font-semibold w-full"
            disabled
          >
            I have downloaded this file
          </CustomButton>
        </div>
      </div>
    </TwoFAContainer>
  );
};
