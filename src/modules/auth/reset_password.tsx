import { LogoIcon } from "@assets/icons/logo";
import { ResetPasswordForm } from "@components/forms/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <div className="flex-grow flex justify-center items-center">
      <div className="bg-white border border-[#DEE2E6] rounded-lg p-[3.125rem]  w-[40rem]">
        <div className="flex justify-center items-center flex-col mb-[2.563rem]">
          <div className="mb-5">
            <LogoIcon scale={0.8} />
          </div>
          <div className="flex justify-center items-center flex-col">
            <h1 className="text-primary font-bold text-[1.375rem] text-center leading-[1.664rem]">
              Reset Password
            </h1>
            <p className="text-sm text-[#7D8592]">Enter your new password</p>
          </div>
        </div>
        <ResetPasswordForm />
      </div>
    </div>
  );
}
