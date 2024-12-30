import { CustomButton } from "@components/form-elements/button";
import { ModalInput } from "@components/form-elements/input";
import { ModalContainer } from "@components/modal";
import { useForm } from "react-hook-form";

export const PhoneNotificationPreferenceModal = () => {
  const { register, handleSubmit } = useForm<{ phone: string }>();

  return (
    <ModalContainer title="Phone Number">
      <form
        className="px-8 flex flex-col gap-y-4 pb-6"
        onSubmit={handleSubmit(() => {})}
      >
        <ModalInput
          {...register("phone", { required: true })}
          placeholder="Enter your phone number for notification"
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
