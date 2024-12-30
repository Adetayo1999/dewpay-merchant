import { WhiteLogo } from "@assets/icons";
import { LogoIcon } from "@assets/icons/logo";
import { RegisterForm } from "@components/forms/register-form";

export default function Register() {
  return (
    <div className="md:bg-white md:border border-[#DEE2E6] md:rounded-lg md:p-[3.125rem] flex-grow md:w-[40rem]">
      <div className="flex justify-center items-center flex-col mb-[2.563rem]">
        <div className="mb-3">
          <div className="hidden md:block">
            <LogoIcon scale={0.8} />
          </div>
          <div className="block md:hidden">
            <WhiteLogo />
          </div>
        </div>
        <h1 className="text-white md:text-primary font-bold text-[1.375rem] w-[12.875rem] text-center leading-[1.664rem]">
          Create Your Dewpay Account
        </h1>
      </div>
      <RegisterForm />
    </div>
  );
}
