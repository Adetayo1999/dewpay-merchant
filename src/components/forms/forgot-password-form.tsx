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
}

export const ForgotPasswordForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [sendOtp, { isLoading }] = useSendOtpMutation();

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    setError,
    watch,
  } = useForm<FormType>();

  const email = watch("email");

  const onSubmit = async () => {
    if (!email) {
      setError("email", {
        type: "manual",
        message: "Please enter your email address",
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

      // Redirect to reset password page with email in state
      navigate(paths.auth.reset_password, {
        state: {
          email: email,
        },
      });
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
      <AuthCustomInput
        label="Email Address"
        placeholder="youremail@gmail.com"
        {...register("email", { required: true })}
        error={errors.email}
      />

      <div className="flex gap-y-5 flex-col justify-center items-center">
        <CustomButton
          variant="auth"
          disabled={!isValid || isLoading}
          className="w-full rounded-lg text-sm md:text-base p-3 md:p-4 font-medium"
        >
          {isLoading ? "Sending OTP..." : "Continue"}
        </CustomButton>
        <div className="flex justify-center gap-x-8 items-center w-full">
          {[{ title: "Contact Us", path: paths.auth.reset_password }].map(
            (item, idx) => (
              <Link
                to={item.path}
                key={idx}
                className="text-xs md:text-sm text-white md:text-primary hover:underline"
              >
                {item.title}
              </Link>
            )
          )}
        </div>
      </div>
    </form>
  );
};
