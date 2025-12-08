import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import {
  useGetPaymentLinkQuery,
  useUpdatePaymentLinkMutation,
  PaymentLinkRequest,
} from "../../../store/api/merchantApi";
import { format } from "date-fns";
import {
  showApiSuccessToast,
  showApiErrorToast,
  showCopySuccessToast,
} from "@components/toast/custom-toast";

interface ViewPaymentLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentId: string | null;
  onEdit: (paymentId: string) => void;
}

interface PaymentLinkForm {
  url_name: string;
  description: string;
  amount: number;
  status: string; // Changed from boolean to string to match API response
  redirect_url: string;
  webhook_url: string;
  notification_email: string;
  success_message: string;
}

export const ViewPaymentLinkModal = ({
  isOpen,
  onClose,
  paymentId,
  onEdit,
}: ViewPaymentLinkModalProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentPaymentId, setCurrentPaymentId] = useState<string | null>(null);

  const {
    data: paymentLink,
    isLoading,
    isFetching,
    error,
  } = useGetPaymentLinkQuery(
    { payment_id: paymentId! },
    { skip: !paymentId || !isOpen }
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PaymentLinkForm>({
    defaultValues: {
      url_name: "",
      description: "",
      amount: 0,
      status: "active",
      redirect_url: "",
      webhook_url: "",
      notification_email: "",
      success_message: "",
    },
  });

  const [updatePaymentLink] = useUpdatePaymentLinkMutation();

  // Track paymentId changes and reset state
  React.useEffect(() => {
    if (paymentId && paymentId !== currentPaymentId) {
      setCurrentPaymentId(paymentId);
      setIsEditing(false);
      setIsUpdating(false);
      // Reset form to default values when paymentId changes
      reset({
        url_name: "",
        description: "",
        amount: 0,
        status: "active",
        redirect_url: "",
        webhook_url: "",
        notification_email: "",
        success_message: "",
      });
    }
  }, [paymentId, currentPaymentId, reset]);

  // Reset form when payment link data changes and matches current paymentId
  React.useEffect(() => {
    if (paymentLink && paymentLink.payment_id === currentPaymentId) {
      reset({
        url_name: paymentLink.url_name,
        description: paymentLink.description,
        amount: paymentLink.amount,
        status: paymentLink.status,
        redirect_url: paymentLink.redirect_url,
        webhook_url: paymentLink.webhook_url,
        notification_email: paymentLink.notification_email,
        success_message: paymentLink.success_message,
      });
    }
  }, [paymentLink, currentPaymentId, reset]);

  const handleUpdate = useCallback(
    async (data: PaymentLinkForm) => {
      if (!paymentId) return;

      setIsUpdating(true);
      try {
        const merchant_id = localStorage.getItem("merchantId");
        if (!merchant_id) throw new Error("Merchant ID not found");

        const payload: PaymentLinkRequest = {
          payment_id: paymentId,
          merchant_id,
          url_name: data.url_name,
          description: data.description,
          amount: data.amount,
          status: data.status,
          redirect_url: data.redirect_url,
          webhook_url: data.webhook_url,
          notification_email: data.notification_email,
          success_message: data.success_message,
        };

        await updatePaymentLink(payload).unwrap();
        showApiSuccessToast("Payment link updated successfully!");
        setIsEditing(false);
      } catch (error) {
        console.error("Failed to update payment link:", error);
        showApiErrorToast(error);
      } finally {
        setIsUpdating(false);
      }
    },
    [paymentId, updatePaymentLink]
  );

  const handleCopyLink = useCallback(() => {
    if (paymentLink?.payment_link) {
      navigator.clipboard.writeText(paymentLink.payment_link);
      showCopySuccessToast();
    }
  }, [paymentLink?.payment_link]);

  const handleClose = useCallback(() => {
    setIsEditing(false);
    setIsUpdating(false);
    setCurrentPaymentId(null);
    onClose();
  }, [onClose]);

  if (!isOpen || !paymentId) return null;

  // Show loading if:
  // 1. Initial load (isLoading)
  // 2. Refetching and paymentId changed (isFetching and data doesn't match current paymentId)
  // 3. No data yet or data doesn't match current paymentId
  const isDataLoading =
    isLoading ||
    (isFetching && paymentLink?.payment_id !== currentPaymentId) ||
    !paymentLink ||
    paymentLink.payment_id !== currentPaymentId;

  if (isDataLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-center mt-4 text-gray-600">
            Loading payment link...
          </p>
        </div>
      </div>
    );
  }

  if (error || !paymentLink) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error</h3>
            <p className="text-gray-600 mb-6">
              Failed to load payment link. Please try again.
            </p>
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Payment Link Details
            </h3>
            <p className="text-sm text-gray-500">
              Created on{" "}
              {format(
                new Date(paymentLink.created_at),
                "MMM dd, yyyy 'at' HH:mm"
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(paymentId)}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit
            </button>
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
        </div>

        {/* Content */}
        <div className="p-6">
          {isEditing ? (
            <form onSubmit={handleSubmit(handleUpdate)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Link Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Link Name
                  </label>
                  <input
                    type="text"
                    {...register("url_name", {
                      required: "Link name is required",
                      minLength: { value: 3, message: "Minimum 3 characters" },
                      maxLength: {
                        value: 30,
                        message: "Maximum 30 characters",
                      },
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                  {errors.url_name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.url_name.message}
                    </p>
                  )}
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    {...register("amount", {
                      required: "Amount is required",
                      min: { value: 0, message: "Minimum amount is ₦0" },
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                  {errors.amount && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.amount.message}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    {...register("description")}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      {...register("status")}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Active Status
                    </span>
                  </label>
                </div>

                {/* Redirect URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Redirect URL
                  </label>
                  <input
                    type="url"
                    {...register("redirect_url")}
                    placeholder="https://example.com/success"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                {/* Webhook URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Webhook URL
                  </label>
                  <input
                    type="url"
                    {...register("webhook_url")}
                    placeholder="https://example.com/webhook"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                {/* Notification Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notification Email
                  </label>
                  <input
                    type="email"
                    {...register("notification_email")}
                    placeholder="notification@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                {/* Success Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Success Message
                  </label>
                  <input
                    type="text"
                    {...register("success_message")}
                    placeholder="Thank you for your payment!"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isUpdating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Updating...
                    </>
                  ) : (
                    "Update Link"
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Link Preview */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium text-gray-900">
                    Link Preview
                  </h4>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        paymentLink.status
                          ? "text-green-600 bg-green-100"
                          : "text-red-600 bg-red-100"
                      }`}
                    >
                      {paymentLink.status ? "Active" : "Inactive"}
                    </span>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        paymentLink.pay_type === "fixed"
                          ? "text-blue-600 bg-blue-100"
                          : "text-purple-600 bg-purple-100"
                      }`}
                    >
                      {paymentLink.pay_type === "fixed"
                        ? "Fixed Amount"
                        : "Flexible Amount"}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Link Name
                    </label>
                    <p className="text-gray-900">{paymentLink.url_name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Link
                    </label>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-600 font-mono bg-white px-3 py-2 rounded border flex-1">
                        {paymentLink.payment_link}
                      </p>
                      <button
                        onClick={handleCopyLink}
                        className="px-3 py-2 bg-primary text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
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
                        Copy
                      </button>
                    </div>
                  </div>
                  {paymentLink.description && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <p className="text-gray-900">{paymentLink.description}</p>
                    </div>
                  )}
                  {paymentLink.amount > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Amount
                      </label>
                      <p className="text-gray-900 font-medium">
                        ₦{paymentLink.amount.toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Link Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL Name
                  </label>
                  <p className="text-gray-900">{paymentLink.url_name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Code
                  </label>
                  <p className="text-gray-900 font-mono">
                    {paymentLink.payment_code ?? "N/A"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Transactions
                  </label>
                  <p className="text-gray-900 font-medium">
                    {paymentLink.counter ?? "N/A"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Created
                  </label>
                  <p className="text-gray-900">
                    {format(
                      new Date(paymentLink.created_at),
                      "MMM dd, yyyy 'at' HH:mm"
                    )}
                  </p>
                </div>
                {paymentLink.redirect_url && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Redirect URL
                    </label>
                    <p className="text-gray-900 text-sm break-all">
                      {paymentLink.redirect_url}
                    </p>
                  </div>
                )}
                {paymentLink.webhook_url && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Webhook URL
                    </label>
                    <p className="text-gray-900 text-sm break-all">
                      {paymentLink.webhook_url}
                    </p>
                  </div>
                )}
                {paymentLink.notification_email && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notification Email
                    </label>
                    <p className="text-gray-900">
                      {paymentLink.notification_email}
                    </p>
                  </div>
                )}
                {paymentLink.success_message && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Success Message
                    </label>
                    <p className="text-gray-900">
                      {paymentLink.success_message}
                    </p>
                  </div>
                )}
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                <button
                  onClick={handleClose}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Edit Link
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
