import { CustomButton } from "@components/form-elements/button";
import { AuthCustomInput } from "@components/form-elements/input";
import { paths } from "@routes/paths";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

interface FormType {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<FormType>();

  const navigate = useNavigate();

  return (
    <form
      className="flex flex-col gap-y-4 "
      onSubmit={handleSubmit(() => navigate(paths.dashboard.index))}
    >
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
      <div className="flex  mt-5 md:mt-0 gap-y-5 flex-col justify-center items-center">
        <CustomButton
          variant="auth"
          disabled={!isValid}
          className="w-full rounded-lg text-sm md:text-base  p-3 md:p-4  font-medium "
        >
          Sign In
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
              className="text-xs md:text-sm text-white md:text-primary  hover:underline "
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </form>
  );
};
