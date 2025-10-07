import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  showApiSuccessToast,
  showApiErrorToast,
} from "@components/toast/custom-toast";

interface BlacklistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BlacklistForm {
  phoneNumber: string;
}

export const BlacklistModal = ({ isOpen, onClose }: BlacklistModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BlacklistForm>();

  const onSubmit = async (data: BlacklistForm) => {
    setIsLoading(true);
    try {
      // Handle form submission here
      console.log("Blacklist phone data:", data);
      // Add API call here
      setTimeout(() => {
        showApiSuccessToast("Phone number blacklisted successfully!");
        setIsLoading(false);
        reset();
        onClose();
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      console.error("Error blacklisting phone:", error);
      showApiErrorToast(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Blacklisted Phone Number
          </h3>
          <button
            onClick={onClose}
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
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <div className="absolute left-3 top-2.5 text-gray-500 text-sm">
                  +234
                </div>
                <input
                  type="tel"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Please enter a valid 10-digit phone number",
                    },
                  })}
                  placeholder="Add a Phone Number to the blacklist."
                  maxLength={10}
                  className="w-full pl-16 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
