import { CustomButton } from "@components/form-elements/button";
import { ModalInput } from "@components/form-elements/input";
import { ModalContainer } from "@components/modal";
import { useForm } from "react-hook-form";

export const CreateNewUserModal = () => {
  const { register, handleSubmit } = useForm<{
    firstname: string;
    lastname: string;
    password: string;
    email: string;
  }>();

  return (
    <ModalContainer title="New User">
      <form
        className="px-8 flex flex-col gap-y-4 pb-6"
        onSubmit={handleSubmit(() => {})}
      >
        <ModalInput
          {...register("firstname", { required: true })}
          placeholder="First Name"
        />
        <ModalInput
          {...register("lastname", { required: true })}
          placeholder="Last Name"
        />
        <ModalInput
          {...register("email", { required: true })}
          placeholder="Email Address"
        />
        <ModalInput
          {...register("password", { required: true })}
          placeholder="Password"
        />
        <CustomButton
          variant="primary"
          className="rounded-lg py-[0.844rem] text-sm font-semibold"
        >
          Submit
        </CustomButton>
      </form>
    </ModalContainer>
  );
};
