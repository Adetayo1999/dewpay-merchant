import { CustomButton } from "@components/form-elements/button";
import { AuthCustomInput } from "@components/form-elements/input";
import { paths } from "@routes/paths";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSendOtpMutation } from "../../store/api/merchantApi";
import { useAppDispatch } from "../../store/hooks";
import { addNotification } from "../../store/slices/uiSlice";
import { showApiErrorToast } from "@components/toast/custom-toast";

interface FormType {
  email: string;
  password: string;
}

export const LoginForm = () => {
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
  const password = watch("password");

  const onSubmit = async () => {
    if (!email || !password) {
      setError("root", {
        type: "manual",
        message: "Please enter both email and password",
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

      // Redirect to OTP page with form data in location state
      navigate(paths.auth.otp, {
        state: {
          flow: "login",
          email: email,
          password: password,
        },
      });
    } catch (error: unknown) {
      showApiErrorToast(error);
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

      <AuthCustomInput
        label="Password"
        placeholder="*********"
        type="password"
        {...register("password", { required: true })}
        error={errors.password}
      />

      <div className="flex gap-y-5 flex-col justify-center items-center">
        <CustomButton
          variant="auth"
          disabled={!isValid || isLoading}
          className="w-full rounded-lg text-sm md:text-base p-3 md:p-4 font-medium"
        >
          {isLoading ? "Sending OTP..." : "Continue"}
        </CustomButton>
        <div className="flex justify-center flex-wrap gap-8 items-center w-full">
          {[
            { title: "Forgot Password", path: paths.auth.forgot_password },
            { title: "Create Account", path: paths.auth.register },
            { title: "Contact Us", path: "#" },
          ].map((item, idx) => (
            <Link
              to={item.path}
              key={idx}
              className="text-xs md:text-sm text-white md:text-primary hover:underline"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </form>
  );
};
