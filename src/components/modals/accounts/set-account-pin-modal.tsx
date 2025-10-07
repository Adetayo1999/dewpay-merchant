import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import {
  useSetAccountPinMutation,
  SetAccountPinRequest,
  ReservedAccount,
} from "../../../store/api/merchantApi";
import {
  showApiSuccessToast,
  showApiErrorToast,
} from "@components/toast/custom-toast";

interface SetAccountPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: ReservedAccount | null;
  onSuccess: () => void;
}

interface SetPinForm {
  new_pin: string;
  confirm_pin: string;
}

export const SetAccountPinModal = ({
  isOpen,
  onClose,
  account,
  onSuccess,
}: SetAccountPinModalProps) => {
  const [isSettingPin, setIsSettingPin] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<SetPinForm>({
    defaultValues: {
      new_pin: "",
      confirm_pin: "",
    },
  });

  const [setAccountPin] = useSetAccountPinMutation();

  const watchNewPin = watch("new_pin");

  const onSubmit = useCallback(
    async (data: SetPinForm) => {
      if (!account) return;

      setIsSettingPin(true);
      try {
        const merchant_id = localStorage.getItem("merchantId");
        if (!merchant_id) throw new Error("Merchant ID not found");

        const payload: SetAccountPinRequest = {
          merchant_id,
          account_id: account.account_id,
          new_pin: data.new_pin,
        };

        await setAccountPin(payload).unwrap();
        showApiSuccessToast("Account PIN set successfully!");
        onSuccess();
        handleClose();
      } catch (error) {
        console.error("Failed to set account PIN:", error);
        showApiErrorToast(error);
      } finally {
        setIsSettingPin(false);
      }
    },
    [account, setAccountPin, onSuccess]
  );

  const handleClose = useCallback(() => {
    setIsSettingPin(false);
    reset();
    onClose();
  }, [onClose, reset]);

  if (!isOpen || !account) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Set Account PIN
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {account.account_name} - {account.account_number}
            </p>
          </div>
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
          {/* Account Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Account Details
            </h4>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Name:</span>{" "}
                {account.account_name}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Bank:</span> {account.bank_name}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Account:</span>{" "}
                {account.account_number}
              </p>
            </div>
          </div>

          {/* New PIN */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New PIN <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              maxLength={4}
              {...register("new_pin", {
                required: "PIN is required",
                pattern: {
                  value: /^\d{4}$/,
                  message: "PIN must be exactly 4 digits",
                },
              })}
              placeholder="Enter 4-digit PIN"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-center text-2xl tracking-widest"
            />
            {errors.new_pin && (
              <p className="text-red-500 text-xs mt-1">
                {errors.new_pin.message}
              </p>
            )}
          </div>

          {/* Confirm PIN */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm PIN <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              maxLength={4}
              {...register("confirm_pin", {
                required: "Please confirm your PIN",
                validate: (value) =>
                  value === watchNewPin || "PINs do not match",
              })}
              placeholder="Confirm 4-digit PIN"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-center text-2xl tracking-widest"
            />
            {errors.confirm_pin && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirm_pin.message}
              </p>
            )}
          </div>

          {/* Security Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg
                className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <div>
                <h4 className="text-sm font-medium text-yellow-800">
                  Security Notice
                </h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Keep your PIN secure and never share it with anyone. This PIN
                  will be used to authorize transactions on this account.
                </p>
              </div>
            </div>
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
              disabled={isSettingPin}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isSettingPin ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Setting PIN...
                </>
              ) : (
                "Set PIN"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
