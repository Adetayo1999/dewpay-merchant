import { TwoFAContainer } from "./container";
import { OTPInput } from "@components/otp-input";
import { useState } from "react";
import { CustomButton } from "@components/form-elements/button";

export const SetupTwoFaPhone: React.FC<{ phone: string }> = (props) => {
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
              width="80"
              height="54"
              viewBox="0 0 87 61"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M41.4101 46.1533H45.1399M76.5374 17.2611C83.3171 24.9819 83.3171 37.5 76.5374 45.2165M69.2784 22.3415C72.6683 27.2564 72.6683 35.2212 69.2784 40.1361M56.329 7.00436H30.2297C29.2413 7.00436 28.2933 7.39671 27.5939 8.09522C26.8946 8.79374 26.5012 9.74129 26.5 10.7297V51.7479C26.5 53.8044 28.1688 55.4732 30.2254 55.4732H56.3246C57.3131 55.4732 58.2611 55.0809 58.9604 54.3823C59.6597 53.6838 60.0532 52.7363 60.0544 51.7479V10.7297C60.0544 9.74129 59.662 8.79328 58.9635 8.09395C58.265 7.39461 57.3174 7.00551 56.329 7.00436Z"
                stroke="#7D8592"
                strokeWidth="4.35714"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M44.7119 46.1533H40.9822M9.58464 17.2611C2.80493 24.982 2.80493 37.5 9.58464 45.2165M16.8436 22.3415C13.4538 27.2564 13.4538 35.2213 16.8436 40.1361M29.7931 7.00439H55.8924C56.8808 7.00439 57.8288 7.39675 58.5281 8.09526C59.2275 8.79378 59.6209 9.74133 59.6221 10.7298V51.7479C59.6221 53.8045 57.9533 55.4733 55.8967 55.4733H29.7974C28.809 55.4733 27.861 55.0809 27.1617 54.3824C26.4623 53.6839 26.0689 52.7363 26.0677 51.7479V10.7298C26.0677 9.74132 26.4601 8.79332 27.1586 8.09398C27.8571 7.39465 28.8046 7.00555 29.7931 7.00439Z"
                stroke="#7D8592"
                strokeWidth="4.35714"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-[#7D8592] mb-2">
            Check your text messages
          </h3>
          <p className="text-sm text-[#7D8592] max-w-xs  mx-auto ">
            Enter the verification code sent to{" "}
            <span className="font-semibold">{props.phone}</span>
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
              Setup your 2-Factor Authentication
            </CustomButton>
            <p className="text-sm text-[#33333333] text-center">Resend (60s)</p>
          </div>
        </div>
      </div>
    </TwoFAContainer>
  );
};
