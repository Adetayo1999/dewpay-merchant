import React from "react";
import { toast } from "react-hot-toast";

interface CustomToastProps {
  type: "success" | "error";
  title: string;
  message: string;
}

export const CustomToast: React.FC<CustomToastProps> = ({
  type,
  title,
  message,
}) => {
  const isError = type === "error";

  return (
    <div
      className={`toast-custom flex items-start gap-4 p-4 rounded-lg shadow-lg max-w-md w-full ${
        isError ? "bg-red-50" : "bg-green-50"
      }`}
    >
      {/* Left accent bar */}
      <div
        className={`w-1 rounded-full flex-shrink-0 ${
          isError ? "bg-red-600" : "bg-green-600"
        }`}
      />

      {/* Icon */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isError ? "bg-red-600" : "bg-green-600"
        }`}
      >
        {isError ? (
          <svg
            className="w-5 h-5 text-white"
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
        ) : (
          <svg
            className="w-5 h-5 text-white"
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
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4
          className={`font-semibold text-sm mb-1 ${
            isError ? "text-red-700" : "text-green-700"
          }`}
        >
          {title}
        </h4>
        <p className="text-sm text-gray-600 leading-relaxed">{message}</p>
      </div>

      {/* Close button */}
      <button
        onClick={() => toast.dismiss()}
        className={`flex-shrink-0 p-1 rounded-full hover:bg-opacity-80 transition-colors ${
          isError
            ? "text-red-600 hover:bg-red-100"
            : "text-green-600 hover:bg-green-100"
        }`}
      >
        <svg
          className="w-4 h-4"
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
  );
};

// Toast utility functions
export const showSuccessToast = (title: string, message: string) => {
  toast.custom(<CustomToast type="success" title={title} message={message} />, {
    duration: 4000,
    position: "top-right",
    style: {
      background: "transparent",
      boxShadow: "none",
      padding: 0,
    },
  });
};

export const showErrorToast = (title: string, message: string) => {
  toast.custom(<CustomToast type="error" title={title} message={message} />, {
    duration: 5000,
    position: "top-right",
    style: {
      background: "transparent",
      boxShadow: "none",
      padding: 0,
    },
  });
};

// Convenience functions for common scenarios
export const showApiErrorToast = (error: any) => {
  const title = "Error";
  const message =
    error?.data?.message ||
    error?.message ||
    "An unexpected error occurred. Please try again.";
  showErrorToast(title, message);
};

export const showApiSuccessToast = (message: string) => {
  showSuccessToast("Success", message);
};

export const showCopySuccessToast = () => {
  showSuccessToast("Copied!", "Link has been copied to clipboard.");
};

export const showValidationErrorToast = (message: string) => {
  showErrorToast("Validation Error", message);
};

export const showNetworkErrorToast = () => {
  showErrorToast(
    "No Internet Connection",
    "(You are working offline.) Please check your Mobile Data or Wi-Fi connection."
  );
};
