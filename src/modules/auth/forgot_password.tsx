import { WhiteLogo } from "@assets/icons";
import { LogoIcon } from "@assets/icons/logo";
import { ForgotPasswordForm } from "@components/forms/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <div className="flex-grow flex justify-center items-center ">
      <div className="md:bg-white md:border border-[#DEE2E6] rounded-lg md:p-[3.125rem]  md:w-[40rem] w-full">
        <div className="flex justify-center items-center flex-col mb-[2.563rem]">
          <div className="mb-5">
            <div className="hidden md:block">
              <LogoIcon scale={0.8} />
            </div>
            <div className="block md:hidden">
              <WhiteLogo />
            </div>
          </div>
          <div className="flex justify-center items-center flex-col">
            <h1 className="text-white md:text-primary font-bold text-[1.375rem] text-center leading-[1.664rem]">
              Forgot Password
            </h1>
            <p className="text-white text-sm md:text-[#7D8592]">
              Please enter your email address to reset your password
            </p>
          </div>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
