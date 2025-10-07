import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { BANKS } from "@lib/banks";
import {
  useValidateAccountMutation,
  useProcessBulkTransferMutation,
  useValidatePinMutation,
} from "../../../store/api/merchantApi";
import {
  showApiSuccessToast,
  showApiErrorToast,
} from "@components/toast/custom-toast";

interface NewPayoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface PayoutForm {
  accountNumber: string;
  amount: number;
  bankCode: string;
}

interface PayoutEntry extends PayoutForm {
  account_name?: string;
  id: string;
}

interface FinalForm {
  narration: string;
  pin: string;
}

export const NewPayoutModal = ({
  isOpen,
  onClose,
  onSuccess,
}: NewPayoutModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [payouts, setPayouts] = useState<PayoutEntry[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPinVerified, setIsPinVerified] = useState(false);
  const [isValidatingPin, setIsValidatingPin] = useState(false);

  const [validateAccount] = useValidateAccountMutation();
  const [processBulkTransfer] = useProcessBulkTransferMutation();
  const [validatePin] = useValidatePinMutation();

  const {
    register: registerPayout,
    handleSubmit: handleSubmitPayout,
    formState: { errors: payoutErrors },
    reset: resetPayout,
  } = useForm<PayoutForm>({
    defaultValues: {
      accountNumber: "",
      amount: 100,
      bankCode: "",
    },
  });

  const {
    register: registerFinal,
    handleSubmit: handleSubmitFinal,
    formState: { errors: finalErrors },
  } = useForm<FinalForm>();

  const handleAddPayout = useCallback(
    async (data: PayoutForm) => {
      if (!data.bankCode) {
        return;
      }

      setIsValidating(true);
      try {
        const validationResult = await validateAccount({
          account_no: data.accountNumber,
          bank_code: data.bankCode,
        }).unwrap();

        const newPayout: PayoutEntry = {
          ...data,
          account_name: validationResult.account_name,
          id: Date.now().toString(),
        };

        setPayouts((prev) => [...prev, newPayout]);
        resetPayout();
        showApiSuccessToast("Account validated successfully!");
      } catch (error) {
        console.error("Account validation failed:", error);
        showApiErrorToast(error);
      } finally {
        setIsValidating(false);
      }
    },
    [validateAccount, resetPayout]
  );

  const handleRemovePayout = useCallback((id: string) => {
    setPayouts((prev) => prev.filter((payout) => payout.id !== id));
  }, []);

  const handleClearAll = useCallback(() => {
    setPayouts([]);
  }, []);

  const handleFinalSubmit = useCallback(
    async (data: FinalForm) => {
      if (payouts.length === 0) return;

      setIsProcessing(true);
      try {
        const merchant_id = localStorage.getItem("merchantId");
        if (!merchant_id) throw new Error("Merchant ID not found");

        const bulkTransfers = payouts.map((payout) => ({
          id: payout.id,
          phone_number: "",
          account_name: payout.account_name || "",
          bank_name:
            BANKS.find((bank) => bank.Code === payout.bankCode)?.Name || "",
          account_number: payout.accountNumber,
          amount: payout.amount,
          status: "pending",
          active: true,
          transaction_fee: 0,
          reference: `PAYOUT_${Date.now()}_${payout.id}`,
          narration: data.narration,
          created_at: new Date().toISOString(),
        }));

        await processBulkTransfer({
          narration: data.narration,
          pin: data.pin,
          bulkTransfers,
          merchantId: merchant_id,
        }).unwrap();

        showApiSuccessToast("Bulk transfer initiated successfully!");
        onSuccess();
      } catch (error) {
        console.error("Bulk transfer failed:", error);
        showApiErrorToast(error);
      } finally {
        setIsProcessing(false);
      }
    },
    [payouts, processBulkTransfer, onSuccess]
  );

  const handleClose = useCallback(() => {
    setCurrentStep(1);
    setPayouts([]);
    setIsValidating(false);
    setIsProcessing(false);
    setIsPinVerified(false);
    setIsValidatingPin(false);
    resetPayout();
    onClose();
  }, [resetPayout, onClose]);

  const handleValidatePin = useCallback(
    async (pin: string) => {
      setIsValidatingPin(true);
      try {
        const merchant_id = localStorage.getItem("merchantId");
        if (!merchant_id) {
          showApiErrorToast("Merchant ID not found");
          return;
        }

        await validatePin({
          merchant_id,
          pin,
        }).unwrap();

        setIsPinVerified(true);
        showApiSuccessToast("PIN verified successfully");
      } catch (error) {
        console.error("PIN validation error:", error);
        showApiErrorToast("Invalid PIN");
      } finally {
        setIsValidatingPin(false);
      }
    },
    [validatePin]
  );

  const totalAmount = payouts.reduce((sum, payout) => sum + payout.amount, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">New Payout</h3>
            <p className="text-sm text-gray-500">
              Step {currentStep} of 3:{" "}
              {currentStep === 1
                ? "Add Recipients"
                : currentStep === 2
                ? "Batch Preview"
                : "Final Submission"}
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

        {/* Progress Bar */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      currentStep > step ? "bg-primary" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {currentStep === 1 && (
            <form
              onSubmit={handleSubmitPayout(handleAddPayout)}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Number
                  </label>
                  <input
                    type="text"
                    {...registerPayout("accountNumber", {
                      required: "Account number is required",
                      pattern: {
                        value: /^[0-9]{10,11}$/,
                        message: "Please enter a valid account number",
                      },
                    })}
                    placeholder="999 999 99999"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                  {payoutErrors.accountNumber && (
                    <p className="text-red-500 text-xs mt-1">
                      {payoutErrors.accountNumber.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    {...registerPayout("amount", {
                      required: "Amount is required",
                      min: { value: 50, message: "Minimum amount is ₦50" },
                    })}
                    placeholder="₦100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                  {payoutErrors.amount && (
                    <p className="text-red-500 text-xs mt-1">
                      {payoutErrors.amount.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bank
                  </label>
                  <select
                    {...registerPayout("bankCode", {
                      required: "Bank selection is required",
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Select Bank</option>
                    {BANKS.map((bank) => (
                      <option key={bank.Id} value={bank.Code}>
                        {bank.Name}
                      </option>
                    ))}
                  </select>
                  {payoutErrors.bankCode && (
                    <p className="text-red-500 text-xs mt-1">
                      {payoutErrors.bankCode.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isValidating}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {isValidating ? (
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
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                )}
                Add to Batch
              </button>
            </form>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-medium">
                  Batch Preview ({payouts.length} recipients)
                </h4>
                {payouts.length > 1 && (
                  <button
                    onClick={handleClearAll}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {payouts.length > 0 ? (
                <div className="border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Account Name
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Bank
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Account Number
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Amount
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {payouts.map((payout) => (
                          <tr key={payout.id}>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {payout.account_name}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {
                                BANKS.find(
                                  (bank) => bank.Code === payout.bankCode
                                )?.Name
                              }
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {payout.accountNumber}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              ₦{payout.amount.toLocaleString()}
                            </td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => handleRemovePayout(payout.id)}
                                className="text-red-600 hover:text-red-700"
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
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>
                    No recipients added yet. Go back to step 1 to add
                    recipients.
                  </p>
                </div>
              )}

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Amount:</span>
                  <span className="text-lg font-bold">
                    ₦{totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <form
              onSubmit={handleSubmitFinal(handleFinalSubmit)}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Narration (Optional)
                </label>
                <textarea
                  {...registerFinal("narration", {
                    minLength: { value: 6, message: "Minimum 6 characters" },
                    maxLength: {
                      value: 1000,
                      message: "Maximum 1000 characters",
                    },
                  })}
                  placeholder="Enter transaction narration..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
                {finalErrors.narration && (
                  <p className="text-red-500 text-xs mt-1">
                    {finalErrors.narration.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transaction PIN
                </label>
                <div className="flex gap-3">
                  <input
                    type="password"
                    {...registerFinal("pin", {
                      required: "Transaction PIN is required",
                      pattern: {
                        value: /^\d{4}$/,
                        message: "PIN must be 4 digits",
                      },
                    })}
                    placeholder="••••"
                    maxLength={4}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                  {!isPinVerified ? (
                    <button
                      type="button"
                      onClick={() => {
                        const pinValue = document.querySelector(
                          'input[name="pin"]'
                        ) as HTMLInputElement;
                        if (pinValue?.value) {
                          handleValidatePin(pinValue.value);
                        }
                      }}
                      disabled={isValidatingPin}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                    >
                      {isValidatingPin ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        "Verify"
                      )}
                    </button>
                  ) : (
                    <div className="flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                      <svg
                        className="h-4 w-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Verified
                    </div>
                  )}
                </div>
                {finalErrors.pin && (
                  <p className="text-red-500 text-xs mt-1">
                    {finalErrors.pin.message}
                  </p>
                )}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Amount to Transfer:</span>
                  <span className="text-lg font-bold">
                    ₦{totalAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-600">
                    Number of Recipients:
                  </span>
                  <span className="text-sm font-medium">{payouts.length}</span>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-gray-200">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="flex gap-3">
            <button
              onClick={handleClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            {currentStep < 3 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={payouts.length === 0}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmitFinal(handleFinalSubmit)}
                disabled={
                  isProcessing || payouts.length === 0 || !isPinVerified
                }
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Processing...
                  </div>
                ) : (
                  "Process Payout"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
