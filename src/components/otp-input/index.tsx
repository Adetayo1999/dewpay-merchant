import OtpInput from "react-otp-input";

export const OTPInput: React.FC<{
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
}> = (props) => {
  return (
    <OtpInput
      value={props.otp}
      onChange={props.setOtp}
      numInputs={6}
      renderInput={(props) => <input {...props} placeholder="0" />}
      inputStyle="border border-[#D1D1D1] bg-white rounded-lg !h-[2.75rem] !w-[2.75rem] focus:ring-2 focus:ring-primary focus:ring-opacity-40 outline-none transition-all duration-200 placeholder:text-[#ACACAC] text-sm"
      containerStyle="gap-x-4"
    />
  );
};
