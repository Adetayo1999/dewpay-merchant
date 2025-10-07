import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import {
  useCreateReservedAccountMutation,
  CreateAccountRequest,
} from "../../../store/api/merchantApi";
import {
  showApiSuccessToast,
  showApiErrorToast,
} from "@components/toast/custom-toast";

interface CreateAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface CreateAccountForm {
  account_name: string;
  email: string;
  phone: string;
}

export const CreateAccountModal = ({
  isOpen,
  onClose,
  onSuccess,
}: CreateAccountModalProps) => {
  const [isCreating, setIsCreating] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateAccountForm>({
    defaultValues: {
      account_name: "",
      email: "",
      phone: "",
    },
  });

  const [createReservedAccount] = useCreateReservedAccountMutation();

  const generateReference = useCallback((merchantId: string) => {
    return `FUSACCT-${merchantId}-${Date.now()}`;
  }, []);

  const formatPhoneNumber = useCallback((phone: string) => {
    // Remove all non-digits
    const cleaned = phone.replace(/\D/g, "");

    // Format as +(234) XXX XXX XXXX
    if (cleaned.length >= 10) {
      const formatted = `+(234) ${cleaned
        .slice(-10)
        .replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3")}`;
      return formatted;
    }

    return phone;
  }, []);

  const validatePhoneNumber = useCallback((phone: string) => {
    // Remove all non-digits for validation
    const cleaned = phone.replace(/\D/g, "");

    if (cleaned.length < 10) {
      return "Phone number must be at least 10 digits";
    }

    if (cleaned.length > 15) {
      return "Phone number must not exceed 15 digits";
    }

    // // Check different Nigerian phone number formats
    // let isValid = false;

    // // Format: 234XXXXXXXXX (13 digits, starts with 234)
    // if (cleaned.length === 13 && cleaned.startsWith("234")) {
    //   const numberPart = cleaned.substring(3); // Remove 234 prefix
    //   isValid = /^[789]\d{8}$/.test(numberPart);
    // }
    // // Format: 0XXXXXXXXX (11 digits, starts with 0)
    // else if (cleaned.length === 11 && cleaned.startsWith("0")) {
    //   const numberPart = cleaned.substring(1); // Remove 0 prefix
    //   isValid = /^[789]\d{8}$/.test(numberPart);
    // }
    // // Format: XXXXXXXXX (10 digits)
    // else if (cleaned.length === 10) {
    //   isValid = /^[789]\d{8}$/.test(cleaned);
    // }

    // if (!isValid) {
    //   return "Please enter a valid Nigerian phone number";
    // }

    return true;
  }, []);

  const onSubmit = useCallback(
    async (data: CreateAccountForm) => {
      setIsCreating(true);
      try {
        const merchant_id = localStorage.getItem("merchantId");
        if (!merchant_id) throw new Error("Merchant ID not found");

        // Format phone number
        const formattedPhone = formatPhoneNumber(data.phone);

        // Generate reference
        const reference = generateReference(merchant_id);

        const payload: CreateAccountRequest = {
          reference,
          phone: formattedPhone,
          account_name: data.account_name,
          email: data.email,
        };

        await createReservedAccount(payload).unwrap();
        showApiSuccessToast("Account created successfully!");
        onSuccess();
        handleClose();
      } catch (error) {
        console.error("Failed to create account:", error);
        showApiErrorToast(error);
      } finally {
        setIsCreating(false);
      }
    },
    [createReservedAccount, onSuccess, formatPhoneNumber, generateReference]
  );

  const handleClose = useCallback(() => {
    setIsCreating(false);
    reset();
    onClose();
  }, [onClose, reset]);

  const handlePhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const formatted = formatPhoneNumber(value);
      e.target.value = formatted;
    },
    [formatPhoneNumber]
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Create Reserved Account
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Account Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("account_name", {
                required: "Account name is required",
                minLength: { value: 3, message: "Minimum 3 characters" },
                maxLength: { value: 30, message: "Maximum 30 characters" },
                pattern: {
                  value: /^[\s\w'-]+$/,
                  message:
                    "Only letters, numbers, spaces, hyphens and apostrophes allowed",
                },
              })}
              placeholder="Please enter the full name for this account."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
            {errors.account_name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.account_name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Must be a valid email address",
                },
              })}
              placeholder="Please enter a valid email to bind to this account."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              {...register("phone", {
                required: "Phone number is required",
                validate: validatePhoneNumber,
              })}
              placeholder="Phone Number"
              onChange={handlePhoneChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreating}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isCreating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Creating...
                </>
              ) : (
                "Create"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
