import { CustomButton } from "@components/form-elements/button";
import { AuthCustomInput } from "@components/form-elements/input";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

interface FormType {
  password: string;
  reenter_password: string;
}

export const ResetPasswordForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<FormType>();

  return (
    <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(() => {})}>
      <AuthCustomInput
        label="New Password"
        placeholder="*********"
        type="password"
        {...register("password", { required: true })}
        error={errors.password}
      />
      <AuthCustomInput
        label="Re-Enter New Password"
        placeholder="*********"
        type="password"
        {...register("reenter_password", { required: true })}
        error={errors.reenter_password}
      />
      <div className="flex  gap-y-5 flex-col justify-center items-center">
        <CustomButton
          variant="primary"
          disabled={!isValid}
          className="w-full rounded-lg p-4  font-medium"
        >
          Proceed To Login
        </CustomButton>
        <div className="flex justify-center gap-x-8 items-center w-full">
          {[{ title: "Contact Us", path: "#" }].map((item, idx) => (
            <Link
              to={item.path}
              key={idx}
              className="text-sm text-primary  hover:underline "
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </form>
  );
};
