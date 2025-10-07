import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import {
  showApiSuccessToast,
  showApiErrorToast,
  showCopySuccessToast,
} from "@components/toast/custom-toast";
import {
  useGenerateSecretKeyMutation,
  useSetPinMutation,
} from "../../store/api/merchantApi";

interface SecurityForm {
  secret_key: string;
  pin: string;
}

export default function Security() {
  const [showPin, setShowPin] = useState(false);
  const [secretKey, setSecretKey] = useState(
    "eyJhbGciOiJlUzI1NilsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibWVyY2h..."
  );

  const [generateSecretKey, { isLoading: isGeneratingKey }] =
    useGenerateSecretKeyMutation();
  const [setPin, { isLoading: isUpdatingPin }] = useSetPinMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<SecurityForm>({
    defaultValues: {
      secret_key: "",
      pin: "",
    },
  });

  const watchPin = watch("pin");

  const handleGenerateSecretKey = useCallback(async () => {
    try {
      const result = await generateSecretKey().unwrap();
      setSecretKey(result.secret_key);
      showApiSuccessToast("Secret key generated successfully!");
    } catch (error) {
      console.error("Error generating secret key:", error);
      showApiErrorToast(error);
    }
  }, [generateSecretKey]);

  const copySecretKey = useCallback(() => {
    navigator.clipboard.writeText(secretKey);
    showCopySuccessToast();
  }, [secretKey]);

  const onSubmit = useCallback(
    async (data: SecurityForm) => {
      if (!data.pin || data.pin.length !== 4) {
        showApiErrorToast("PIN must be exactly 4 digits");
        return;
      }

      try {
        await setPin({ pin: data.pin }).unwrap();
        showApiSuccessToast("Transaction PIN updated successfully!");
        reset({ pin: "" });
      } catch (error) {
        console.error("Error updating PIN:", error);
        showApiErrorToast(error);
      }
    },
    [setPin, reset]
  );

  return (
    <div className="flex flex-col gap-y-8">
      {/* Security Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Security Settings
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* New Secret Key */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              New Secret Key
            </h3>

            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  value={secretKey}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 font-mono text-sm"
                  placeholder="You have no secret key yet"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleGenerateSecretKey}
                  disabled={isGeneratingKey}
                  className="flex items-center justify-center w-10 h-10 bg-primary text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  title="Generate new key"
                >
                  {isGeneratingKey ? (
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
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  )}
                </button>

                <button
                  onClick={copySecretKey}
                  className="flex items-center justify-center w-10 h-10 bg-primary text-white rounded-lg hover:bg-green-700 transition-colors"
                  title="Copy secret key"
                >
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
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Transaction PIN */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              Transaction PIN
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <input
                    type={showPin ? "text" : "password"}
                    {...register("pin", {
                      required: "PIN is required",
                      pattern: {
                        value: /^\d{4}$/,
                        message: "PIN must be exactly 4 digits",
                      },
                    })}
                    placeholder="Enter your transaction PIN"
                    maxLength={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-center text-lg tracking-widest"
                  />
                  {errors.pin && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.pin.message}
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="flex items-center justify-center w-10 h-10 bg-primary text-white rounded-lg hover:bg-green-700 transition-colors"
                    title={showPin ? "Hide PIN" : "Show PIN"}
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {showPin ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      )}
                    </svg>
                  </button>

                  <button
                    type="submit"
                    disabled={
                      isUpdatingPin || !watchPin || watchPin.length !== 4
                    }
                    className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {isUpdatingPin ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Saving...
                      </>
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
