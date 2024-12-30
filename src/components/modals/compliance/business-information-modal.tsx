import { CustomButton } from "@components/form-elements/button";
import { ModalInput } from "@components/form-elements/input";
import { useForm, FieldValues, Path } from "react-hook-form";
import { ModalContainer } from "@components/modal";
import { ModalTextarea } from "@components/form-elements/textarea";

// Define field types
type FieldType = "text" | "textarea";

export interface Field {
  placeholder?: string;
  name: string;
  label?: string;
  type: FieldType;
  options?: { value: string; label: string }[]; // For select fields
  validation?: Record<string, unknown>; // Validation rules
}

export interface DynamicFormProps<T extends FieldValues> {
  fields: Field[];
  onSubmit: (data: T) => void;
  title: string;
}

export const BusinessInformationModal = <T extends FieldValues>({
  fields,
  onSubmit,
  title,
}: DynamicFormProps<T>) => {
  const { register, handleSubmit } = useForm<T>();

  const renderFormElements = (field: Field) => {
    switch (field.type) {
      case "textarea":
        return (
          <ModalTextarea
            {...register(field.name as Path<T>, field.validation)}
            rows={5}
            placeholder={field.placeholder}
            key={field.name}
            hasError={false}
          />
        );

      default:
        return (
          <ModalInput
            {...register(field.name as Path<T>, field.validation)}
            placeholder={field.placeholder}
            key={field.name}
            hasError={false}
          />
        );
    }
  };

  return (
    <ModalContainer title={title}>
      <form
        className="px-8 flex flex-col gap-y-4 pb-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {fields.map((item) => renderFormElements(item))}
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
