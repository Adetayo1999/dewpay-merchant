import { OTPInput } from "@components/otp-input";
import { TwoFAContainer } from "./container";
import { useState } from "react";
import { CustomButton } from "@components/form-elements/button";
import { Link } from "react-router-dom";

export const TwoStepVerificationKey = () => {
  const [otp, setOTP] = useState("");

  return (
    <TwoFAContainer
      onCancel={() => {}}
      hasCancelBtn
      goBack={() => {}}
      containerClassName="max-w-[30.813rem]"
    >
      <div className="mt-3 max-w-[25.813rem] mx-auto pb-10">
        <div className="text-center flex justify-center items-center flex-col  mb-6">
          <h2 className="text-xl font-semibold text-[#7D8592] mb-2">
            Add authenticator App
          </h2>
          <p className="text-sm text-[#7D8592] mb-6">
            Enter the following key in authenticator app
          </p>
          <div className="bg-[#E5ECF680] rounded-2xl text-[#202224] text-2xl p-[1.125rem] flex justify-center items-center mb-6 w-full">
            FHBSHS8739BDDDKC
          </div>
          <p className="text-sm text-[#7D8592]">
            Enter the one-time code from authenticator to complete setup.
          </p>
        </div>
        <div className="flex justify-center items-center flex-col gap-y-6 ">
          <div className="">
            <OTPInput otp={otp} setOtp={setOTP} />
          </div>
          <CustomButton
            variant="primary"
            className="rounded-lg py-[0.844rem] text-sm font-semibold w-full"
          >
            Verify your code
          </CustomButton>
          <Link to="#" className="text-sm text-[#20222466]">
            Can’t scan code?
          </Link>
          <Link to="#" className="text-xs text-primary capitalize">
            Download authenticator app
          </Link>
        </div>
      </div>
    </TwoFAContainer>
  );
};
