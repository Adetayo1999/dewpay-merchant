import { CustomButton } from "@components/form-elements/button";
import { AuthCustomInput } from "@components/form-elements/input";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { paths } from "@routes/paths";
import { showValidationErrorToast } from "@components/toast/custom-toast";

interface FormType {
  password: string;
  reenter_password: string;
}

interface ResetPasswordLocationState {
  email: string;
}

export const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    watch,
  } = useForm<FormType>();

  const password = watch("password");
  const reenterPassword = watch("reenter_password");

  // Get email from location state
  const state = location.state as ResetPasswordLocationState | null;

  // Redirect to forgot password if no email in state
  if (!state?.email) {
    navigate(paths.auth.forgot_password);
    return null;
  }

  const onSubmit = () => {
    if (password !== reenterPassword) {
      showValidationErrorToast("Passwords do not match");
      return;
    }

    // Navigate to OTP page with email and new password in state
    navigate(paths.auth.otp, {
      state: {
        flow: "forgot-password",
        email: state.email,
        new_password: password,
      },
    });
  };

  return (
    <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
      <AuthCustomInput
        label="New Password"
        placeholder="*********"
        type="password"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
          },
        })}
        error={errors.password}
      />
      <AuthCustomInput
        label="Re-Enter New Password"
        placeholder="*********"
        type="password"
        {...register("reenter_password", {
          required: "Please confirm your password",
          validate: (value) => value === password || "Passwords do not match",
        })}
        error={errors.reenter_password}
      />
      <div className="flex  gap-y-5 flex-col justify-center items-center">
        <CustomButton
          variant="auth"
          disabled={!isValid}
          className="w-full rounded-lg text-sm md:text-base  p-3 md:p-4  font-medium "
        >
          Continue
        </CustomButton>
        <div className="flex justify-center gap-x-8 items-center w-full">
          <Link
            to={paths.auth.forgot_password}
            className="text-xs md:text-sm text-white md:text-primary  hover:underline "
          >
            Back
          </Link>
          <Link
            to={paths.auth.login}
            className="text-xs md:text-sm text-white md:text-primary  hover:underline "
          >
            Login
          </Link>
        </div>
      </div>
    </form>
  );
};
