import { LogoIcon } from "@assets/icons/logo";
import { RegisterForm } from "@components/forms/register-form";

export default function Register() {
  return (
    <div className="bg-white border border-[#DEE2E6] rounded-lg p-[3.125rem] flex-grow w-[40rem]">
      <div className="flex justify-center items-center flex-col mb-[2.563rem]">
        <div className="mb-3">
          <LogoIcon scale={0.8} />
        </div>
        <h1 className="text-primary font-bold text-[1.375rem] w-[12.875rem] text-center leading-[1.664rem]">
          Create Your Dewpay Account
        </h1>
      </div>
      <RegisterForm />
    </div>
  );
}
