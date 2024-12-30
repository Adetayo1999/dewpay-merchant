import { CustomButton } from "@components/form-elements/button";
import { AuthCustomInput } from "@components/form-elements/input";
import { renderInputLabel } from "@components/form-elements/label";
import { CustomSelect } from "@components/form-elements/select";
import { paths } from "@routes/paths";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import countries from "@lib/countries.json";

interface FormType {
  name: string;
  email: string;
  password: string;
  phone: string;
  code: string;
}

export const RegisterForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<FormType>();

  return (
    <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(() => {})}>
      <AuthCustomInput
        label="Business Name"
        placeholder="Enter your business name"
        {...register("name", { required: true })}
        error={errors.name}
      />
      <AuthCustomInput
        label="Email Address"
        placeholder="youremail@gmail.com"
        {...register("email", { required: true })}
        error={errors.email}
      />
      <div className="flex flex-col gap-y-2">
        {renderInputLabel("Mobile Number")}
        <div className="flex gap-x-4">
          <div className="flex-[0.55]">
            <CustomSelect
              options={countries.map((item) => ({
                label: `${item.flag} ${item.code}`,
                value: item.code,
              }))}
              {...register("code", { required: true })}
            />
          </div>
          <div className="flex-grow">
            <AuthCustomInput
              placeholder="345 567-23-56"
              {...register("phone", { required: true })}
              error={errors.phone}
            />
          </div>
        </div>
      </div>
      <AuthCustomInput
        label="Create Password"
        placeholder="*********"
        type="password"
        {...register("password", { required: true })}
        error={errors.password}
      />
      <div className="flex  gap-y-5 flex-col justify-center items-center mt-5">
        <CustomButton
          variant="primary"
          disabled={!isValid}
          className="w-full rounded-lg p-4 font-medium"
        >
          Create Account
        </CustomButton>
        <div className="">
          <Link
            to={paths.auth.login}
            className="text-sm text-primary  hover:underline font-medium"
          >
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
};
