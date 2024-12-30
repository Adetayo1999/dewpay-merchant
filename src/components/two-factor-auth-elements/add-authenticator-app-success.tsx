import { TwoFAContainer } from "./container";
import { CustomButton } from "@components/form-elements/button";

export const AddAuthenticatorAppSuccess = () => {
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
            Add authenticator App
          </h2>
          <div className=" flex justify-center items-center  mb-2 ">
            <svg
              width="45"
              height="45"
              viewBox="0 0 58 58"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.4738 40.1589H25.3582L43.8832 21.6339L40.9988 18.7495L23.9363 35.8526L16.1363 28.0526L13.252 30.937L22.4738 40.1589Z"
                fill="#15707A"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M31.9373 0.0611816C38.4373 0.467432 44.531 3.71743 48.9998 8.18618C54.281 13.8737 57.1248 20.7799 57.1248 28.9049C57.1248 35.4049 54.6873 41.4987 50.6248 46.7799C46.5623 51.6549 40.8748 55.3112 34.3748 56.5299C27.8748 57.7487 21.3748 56.9362 15.6873 53.6862C9.99978 50.4362 5.53103 45.5612 3.09353 39.4674C0.656034 33.3737 0.249784 26.4674 2.28103 20.3737C4.31228 13.8737 7.96853 8.59243 13.656 4.93618C18.9373 1.27993 25.4373 -0.345068 31.9373 0.0611816ZM33.9685 52.4674C39.2498 51.2487 44.1248 48.4049 47.781 43.9362C51.031 39.4674 53.0623 34.1862 52.656 28.4987C52.656 21.9987 50.2185 15.4987 45.7498 11.0299C41.6873 6.96743 36.8123 4.52993 31.1248 4.12368C25.8435 3.71743 20.156 4.93618 15.6873 8.18618C11.2185 11.4362 7.96853 15.9049 6.34353 21.5924C4.71853 26.8737 4.71853 32.5612 7.15603 37.8424C9.59354 43.1237 13.2498 47.1862 18.1248 50.0299C22.9998 52.8737 28.6873 53.6862 33.9685 52.4674Z"
                fill="#15707A"
              />
            </svg>
          </div>

          <p className="text-base text-[#7D8592] font-semibold">
            Authenticator app has been added
          </p>
        </div>
        <div className="flex justify-center items-center flex-col gap-y-6 ">
          <CustomButton
            variant="primary"
            className="rounded-lg py-[0.844rem] text-sm font-semibold w-full"
            disabled
          >
            View 2-step methods
          </CustomButton>
        </div>
      </div>
    </TwoFAContainer>
  );
};
