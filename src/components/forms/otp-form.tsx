import { CustomButton } from "@components/form-elements/button";
import { AuthCustomInput } from "@components/form-elements/input";
import { paths } from "@routes/paths";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
} from "../../store/api/merchantApi";
import { useAppDispatch } from "../../store/hooks";
import { setCredentials } from "../../store/slices/authSlice";
import { decodeJWT, extractUserFromJWT } from "../../lib/jwt";
import {
  showApiErrorToast,
  showApiSuccessToast,
  showValidationErrorToast,
} from "@components/toast/custom-toast";

interface FormType {
  otp_code: string;
}

export const OTPForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Get auth flow type and data from URL params
  const flow = searchParams.get("flow") as
    | "login"
    | "register"
    | "forgot-password";
  const email = searchParams.get("email");
  const password = searchParams.get("password");
  const first_name = searchParams.get("first_name");
  const last_name = searchParams.get("last_name");
  const bvn = searchParams.get("bvn");
  const new_password = searchParams.get("new_password");

  // RTK Query hooks
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [registerMutation, { isLoading: isRegisterLoading }] =
    useRegisterMutation();
  const [forgotPassword, { isLoading: isForgotPasswordLoading }] =
    useForgotPasswordMutation();

  const {
    handleSubmit,
    register: registerField,
    formState: { errors, isValid },
    setError,
  } = useForm<FormType>();

  const isLoading =
    isLoginLoading || isRegisterLoading || isForgotPasswordLoading;

  const onSubmit = async (data: FormType) => {
    if (!email) {
      showValidationErrorToast("Email is required");
      return;
    }

    try {
      switch (flow) {
        case "login": {
          if (!password) {
            showValidationErrorToast("Password is required");
            return;
          }

          const loginResult = await login({
            email,
            password,
            otp_code: data.otp_code,
          }).unwrap();

          // Decode JWT to extract user data
          const decodedPayload = decodeJWT(loginResult.token);
          if (!decodedPayload) {
            throw new Error("Failed to decode authentication token");
          }

          const user = extractUserFromJWT(decodedPayload);

          dispatch(
            setCredentials({
              user,
              token: loginResult.token,
            })
          );

          showApiSuccessToast("Login successful! Welcome back.");

          navigate(paths.dashboard.index);
          break;
        }

        case "register": {
          if (!password || !first_name || !last_name || !bvn) {
            showValidationErrorToast("All registration fields are required");
            return;
          }

          await registerMutation({
            email,
            password,
            first_name,
            last_name,
            bvn,
            otp_code: data.otp_code,
          }).unwrap();

          showApiSuccessToast(
            "Registration successful! Please login to continue."
          );

          navigate(paths.auth.login);
          break;
        }

        case "forgot-password": {
          if (!new_password) {
            showValidationErrorToast("New password is required");
            return;
          }

          await forgotPassword({
            email,
            new_password,
            otp_code: data.otp_code,
          }).unwrap();

          showApiSuccessToast(
            "Password reset successful! You can now login with your new password."
          );

          navigate(paths.auth.login);
          break;
        }

        default:
          showValidationErrorToast("Invalid authentication flow");
          navigate(paths.auth.login);
      }
    } catch (error: unknown) {
      const errorData = error as {
        data?: { message?: string; field?: string };
      };
      const errorMessage =
        errorData?.data?.message || "Authentication failed. Please try again.";

      if (errorData?.data?.field) {
        setError(errorData.data.field as keyof FormType, {
          type: "server",
          message: errorMessage,
        });
      } else {
        setError("root", {
          type: "server",
          message: errorMessage,
        });
      }

      showApiErrorToast(error);
    }
  };

  const getFlowTitle = () => {
    switch (flow) {
      case "login":
        return "Complete Login";
      case "register":
        return "Complete Registration";
      case "forgot-password":
        return "Reset Password";
      default:
        return "Verify OTP";
    }
  };

  const getFlowDescription = () => {
    switch (flow) {
      case "login":
        return "Enter the OTP code to complete your login";
      case "register":
        return "Enter the OTP code to complete your registration";
      case "forgot-password":
        return "Enter the OTP code to reset your password";
      default:
        return "Enter the verification code sent to your email";
    }
  };

  return (
    <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="text-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          {getFlowTitle()}
        </h2>
        <p className="text-sm text-gray-600">{getFlowDescription()}</p>
        {email && (
          <p className="text-xs text-gray-500 mt-1">Code sent to: {email}</p>
        )}
      </div>

      <AuthCustomInput
        label="OTP Code"
        placeholder="Enter 6-digit OTP"
        {...registerField("otp_code", {
          required: true,
          minLength: 6,
          maxLength: 6,
          pattern: {
            value: /^\d{6}$/,
            message: "OTP must be exactly 6 digits",
          },
        })}
        error={errors.otp_code}
      />

      <div className="flex gap-y-5 flex-col justify-center items-center">
        <CustomButton
          variant="auth"
          disabled={!isValid || isLoading}
          className="w-full rounded-lg text-sm md:text-base p-3 md:p-4 font-medium"
        >
          {isLoading ? "Verifying..." : getFlowTitle()}
        </CustomButton>

        <div className="flex justify-center flex-wrap gap-8 items-center w-full">
          <Link
            to={paths.auth.login}
            className="text-xs md:text-sm text-white md:text-primary hover:underline"
          >
            Back to Login
          </Link>
          <Link
            to={paths.auth.register}
            className="text-xs md:text-sm text-white md:text-primary hover:underline"
          >
            Create Account
          </Link>
        </div>
      </div>
    </form>
  );
};
