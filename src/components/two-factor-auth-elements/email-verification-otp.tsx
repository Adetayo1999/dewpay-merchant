import { EmailIcon } from "@assets/icons/email-icon";
import { TwoFAContainer } from "./container";
import { OTPInput } from "@components/otp-input";
import { useState } from "react";
import { CustomButton } from "@components/form-elements/button";

export const EmailVerificationOTP: React.FC<{ email: string }> = (props) => {
  const [code, setCode] = useState("");

  return (
    <TwoFAContainer goBack={() => {}} containerClassName="">
      <div className="mt-6 pb-10">
        <div className="flex flex-col justify-center items-center text-center mb-6">
          <div className="text-[#7D8592] mb-7">
            <EmailIcon scale={1.2} />
          </div>
          <h3 className="text-2xl font-semibold text-[#7D8592] mb-2">
            Check your inbox
          </h3>
          <p className="text-sm text-[#7D8592] max-w-xs ">
            Enter the verification code sent to your email{" "}
            <span className="font-semibold">{props.email}</span>
          </p>
        </div>
        <div className="">
          <div className="flex justify-center items-center mb-6">
            <OTPInput otp={code} setOtp={setCode} />
          </div>
          <div className="flex justify-center max-w-xs mx-auto">
            <CustomButton
              variant="primary"
              className="rounded-lg py-[0.844rem] text-sm font-semibold w-full"
            >
              Submit to change email
            </CustomButton>
          </div>
        </div>
      </div>
    </TwoFAContainer>
  );
};
