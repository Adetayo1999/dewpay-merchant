import { TwoFAContainer } from "./container";
import { OTPInput } from "@components/otp-input";
import { useState } from "react";
import { CustomButton } from "@components/form-elements/button";

export const AuthenticatorCodeVerification = () => {
  const [code, setCode] = useState("");

  return (
    <TwoFAContainer
      goBack={() => {}}
      containerClassName="max-w-[29.063rem]"
      hasCancelBtn
      onCancel={() => {}}
    >
      <div className="mt-6 pb-10 px-6 ">
        <div className="flex flex-col justify-center items-center text-center mb-6">
          <div className=" mb-7">
            <svg
              width="51"
              height="50"
              viewBox="0 0 51 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25.4997 0C23.5872 0 21.6809 0.25 19.833 0.739583L8.97885 3.64167C7.80914 3.95347 6.77498 4.64248 6.03671 5.60185C5.29844 6.56122 4.89731 7.73737 4.89551 8.94792V27.9375C4.89386 30.6647 5.56907 33.3496 6.86059 35.7516C8.15211 38.1536 10.0196 40.1975 12.2955 41.7L24.1643 49.5437C24.6182 49.8436 25.1509 50.0021 25.6949 49.9991C26.2389 49.9961 26.7699 49.8319 27.2205 49.5271L38.8288 41.7104C41.0689 40.1982 42.9037 38.1595 44.1724 35.7732C45.4412 33.3868 46.1051 30.7256 46.1059 28.0229V8.94792C46.104 7.73709 45.7026 6.56074 44.9639 5.60133C44.2252 4.64192 43.1906 3.95309 42.0205 3.64167L31.1663 0.739583C29.3175 0.248661 27.4126 5.22491e-05 25.4997 0ZM15.8809 11.25H35.1059C36.6184 11.25 37.8559 12.4875 37.8559 14C37.8559 15.5292 36.633 16.75 35.1059 16.75H15.8809C14.3663 16.75 13.1309 15.5146 13.1309 14C13.1309 12.4875 14.3663 11.25 15.8809 11.25ZM15.8747 19.4937H22.7476C24.2622 19.4937 25.4976 20.7333 25.4976 22.2437C25.4976 22.9724 25.2084 23.6712 24.6936 24.1868C24.1788 24.7024 23.4804 24.9926 22.7518 24.9937H15.8747C14.3622 24.9937 13.1247 23.7604 13.1247 22.2437C13.1247 20.7333 14.3622 19.4937 15.8747 19.4937ZM15.8747 27.7437C17.3893 27.7437 18.6247 28.9792 18.6247 30.4937C18.6247 32.0083 17.4038 33.2396 15.8747 33.2396C14.3622 33.2396 13.1247 32.0062 13.1247 30.4937C13.1247 28.9812 14.3622 27.7437 15.8747 27.7437Z"
                fill="#7D8592"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-[#7D8592] mb-2">
            Check your Authenticator
          </h3>
          <p className="text-sm text-[#7D8592] max-w-sm  mx-auto ">
            Enter the verification code displayed on your authenticator
          </p>
        </div>
        <div className="">
          <div className="flex justify-center items-center mb-6">
            <OTPInput otp={code} setOtp={setCode} />
          </div>
          <div className="flex justify-center flex-col gap-y-6 w-full  ">
            <CustomButton
              variant="primary"
              className="rounded-lg py-[0.844rem] text-sm font-semibold w-full"
            >
              Successful! Proceed to your Dewpay account
            </CustomButton>
            <p className="text-sm text-[#33333333] text-center">Resend (60s)</p>
          </div>
        </div>
      </div>
    </TwoFAContainer>
  );
};
