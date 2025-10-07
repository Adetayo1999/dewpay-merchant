import { CustomButton } from "@components/form-elements/button";
import { AuthCustomInput } from "@components/form-elements/input";
import { paths } from "@routes/paths";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSendOtpMutation } from "../../store/api/merchantApi";
import { useAppDispatch } from "../../store/hooks";
import { addNotification } from "../../store/slices/uiSlice";

interface FormType {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  bvn: string;
}

export const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [sendOtp, { isLoading }] = useSendOtpMutation();

  const {
    handleSubmit,
    register: registerField,
    formState: { errors, isValid },
    setError,
    watch,
  } = useForm<FormType>();

  const email = watch("email");
  const password = watch("password");
  const first_name = watch("first_name");
  const last_name = watch("last_name");
  const bvn = watch("bvn");

  const onSubmit = async () => {
    if (!email || !password || !first_name || !last_name || !bvn) {
      setError("root", {
        type: "manual",
        message: "Please fill in all required fields",
      });
      return;
    }

    try {
      await sendOtp({ email }).unwrap();

      dispatch(
        addNotification({
          type: "success",
          message: "OTP sent successfully! Check your email.",
          duration: 5000,
        })
      );

      // Redirect to OTP page with form data
      const params = new URLSearchParams({
        flow: "register",
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name,
        bvn: bvn,
      });

      navigate(`${paths.auth.otp}?${params.toString()}`);
    } catch (error: unknown) {
      const errorData = error as { data?: { message?: string } };
      const errorMessage =
        errorData?.data?.message || "Failed to send OTP. Please try again.";

      dispatch(
        addNotification({
          type: "error",
          message: errorMessage,
          duration: 5000,
        })
      );
    }
  };

  return (
    <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-4">
        <AuthCustomInput
          label="First Name"
          placeholder="Enter your first name"
          {...registerField("first_name", { required: true })}
          error={errors.first_name}
        />
        <AuthCustomInput
          label="Last Name"
          placeholder="Enter your last name"
          {...registerField("last_name", { required: true })}
          error={errors.last_name}
        />
      </div>
      <AuthCustomInput
        label="Email Address"
        placeholder="youremail@gmail.com"
        {...registerField("email", { required: true })}
        error={errors.email}
      />
      <AuthCustomInput
        label="BVN"
        placeholder="Enter your 11-digit BVN"
        {...registerField("bvn", {
          required: true,
          minLength: 11,
          maxLength: 11,
        })}
        error={errors.bvn}
      />
      <AuthCustomInput
        label="Create Password"
        placeholder="*********"
        type="password"
        {...registerField("password", { required: true })}
        error={errors.password}
      />

      <div className="flex gap-y-5 flex-col justify-center items-center mt-5">
        <CustomButton
          variant="auth"
          disabled={!isValid || isLoading}
          className="w-full rounded-lg text-sm md:text-base p-3 md:p-4 font-medium"
        >
          {isLoading ? "Sending OTP..." : "Continue"}
        </CustomButton>
        <div className="">
          <Link
            to={paths.auth.login}
            className="text-xs md:text-sm text-white md:text-primary hover:underline font-medium"
          >
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
};
