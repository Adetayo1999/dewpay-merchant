import { LockIcon } from "@assets/icons/lock-icon";
import { TwoFAContainer } from "./container";
import { AuthenticatorIcon } from "@assets/icons/authenticator-icon";
import { FaCheck } from "react-icons/fa";
import { PhoneIcon } from "@assets/icons/phone-icon";
import { EmailIcon } from "@assets/icons/email-icon";
import clsx from "clsx";

interface TwoFaOptionType {
  enabled: boolean;
  title: string;
  description: React.ReactNode;
  icon: React.ReactNode;
}

const TwoFaOptionCard: React.FC<TwoFaOptionType> = (props) => {
  return (
    <div
      className={clsx(
        "flex transition duration-300 group min-h-[5.5rem]  items-center border border-[#D1D1D1] rounded-lg  p-4 justify-between cursor-pointer hover:bg-[#F7F9FB] hover:border-primary",
        props.enabled && "border-primary  bg-[#F7F9FB]"
      )}
    >
      <div className="flex  items-center gap-x-4">
        <div
          className={clsx(
            "text-[#7D8592] group-hover:text-primary  w-[2.5rem] flex justify-center items-center",
            props.enabled && "text-primary"
          )}
        >
          {props.icon}
        </div>
        <div className="">
          <h5 className="text-sm text-[#7D8592] font-semibold">
            {props.title}
          </h5>
          <div className="text-sm text-[#7D8592] max-w-[16rem] ">
            {props.description}
          </div>
        </div>
      </div>
      <div className="">
        {props.enabled && (
          <div className="h-7 w-7 rounded-full flex justify-center items-center bg-primary text-white">
            <FaCheck />
          </div>
        )}
      </div>
    </div>
  );
};

export const TwoFaSetup = () => {
  return (
    <TwoFAContainer goBack={() => {}} containerClassName="min-h-[37.188rem]">
      <div className="px-4 pb-10">
        <div className="flex justify-center items-center flex-col mb-6">
          <div className="mb-[1.875rem]">
            <LockIcon scale={0.8} />
          </div>
          <h2 className="text-[#7D8592] text-xl font-semibold mb-2">
            2-Factor Authentication
          </h2>
          <p className="text-sm text-[#54595E99] text-center">
            For the security of your account, please turn on to setup your
            2-step verification
          </p>
        </div>
        <div className="flex flex-col gap-y-4">
          {options.map((item, idx) => (
            <TwoFaOptionCard key={idx} {...item} />
          ))}
        </div>
      </div>
    </TwoFAContainer>
  );
};

const options: TwoFaOptionType[] = [
  {
    title: "Authenticator app",
    enabled: false,
    description: (
      <p>
        Use an authenticator app such as{" "}
        <span className="underline group-hover:text-primary ">
          Google Authenticator
        </span>
        .
      </p>
    ),
    icon: <AuthenticatorIcon scale={0.8} />,
  },
  {
    title: "Phone number",
    enabled: false,
    description: <p>Use phone number for 2-step verification</p>,
    icon: <PhoneIcon scale={0.7} />,
  },
  {
    title: "Email",
    enabled: false,
    description: <p>Use Email for 2-step verification</p>,
    icon: <EmailIcon scale={0.7} />,
  },
];
