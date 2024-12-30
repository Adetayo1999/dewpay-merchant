import { CustomButton } from "@components/form-elements/button";
import { ModalInput } from "@components/form-elements/input";
import { ModalContainer } from "@components/modal";
import { useForm } from "react-hook-form";

export const EmailNotificationPreferenceModal = () => {
  const { register, handleSubmit } = useForm<{ email: string }>();

  return (
    <ModalContainer title="Email Address">
      <form
        className="px-8 flex flex-col gap-y-4 pb-6"
        onSubmit={handleSubmit(() => {})}
      >
        <ModalInput
          {...register("email", { required: true })}
          placeholder="Enter your email address for notification"
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
