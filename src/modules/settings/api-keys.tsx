import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import {
  showApiSuccessToast,
  showApiErrorToast,
  showCopySuccessToast,
} from "@components/toast/custom-toast";

interface ApiKeysForm {
  api_key: string;
  webhook_url: string;
}

export default function ApiKeys() {
  const [isGeneratingApiKey, setIsGeneratingApiKey] = useState(false);
  const [isUpdatingWebhook, setIsUpdatingWebhook] = useState(false);
  const [apiKey, setApiKey] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ApiKeysForm>({
    defaultValues: {
      api_key: "",
      webhook_url: "",
    },
  });

  const watchWebhook = watch("webhook_url");

  const generateApiKey = useCallback(async () => {
    setIsGeneratingApiKey(true);
    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const newApiKey = "ak_live_" + Math.random().toString(36).substr(2, 32);
      setApiKey(newApiKey);
      showApiSuccessToast("API key generated successfully!");
    } catch (error) {
      console.error("Error generating API key:", error);
      showApiErrorToast(error);
    } finally {
      setIsGeneratingApiKey(false);
    }
  }, []);

  const copyApiKey = useCallback(() => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      showCopySuccessToast();
    }
  }, [apiKey]);

  const onSubmit = useCallback(async (_data: ApiKeysForm) => {
    setIsUpdatingWebhook(true);
    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));

      showApiSuccessToast("Webhook URL updated successfully!");
    } catch (error) {
      console.error("Error updating webhook:", error);
      showApiErrorToast(error);
    } finally {
      setIsUpdatingWebhook(false);
    }
  }, []);

  const handleDownloadSDK = useCallback(() => {
    // Simulate SDK download
    showApiSuccessToast("SDK download started!");
  }, []);

  const handleApiDocumentation = useCallback(() => {
    // Open API documentation in new tab
    window.open("https://docs.dewpay.net", "_blank");
  }, []);

  return (
    <div className="flex flex-col gap-y-8">
      {/* API Keys Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">API Keys</h2>

        <div className="space-y-6">
          {/* API Key Display */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">API Key</h3>

            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  value={apiKey}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 font-mono text-sm"
                  placeholder="You have no API key yet"
                />
              </div>

              <div className="flex gap-2">
                {apiKey && (
                  <button
                    onClick={copyApiKey}
                    className="flex items-center justify-center w-10 h-10 bg-primary text-white rounded-lg hover:bg-green-700 transition-colors"
                    title="Copy API key"
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
                )}

                <button
                  onClick={generateApiKey}
                  disabled={isGeneratingApiKey}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isGeneratingApiKey ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Generating...
                    </>
                  ) : (
                    "Generate"
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Download SDK Button */}
          <div>
            <button
              onClick={handleDownloadSDK}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download SDK
            </button>
          </div>
        </div>
      </div>

      {/* Webhook Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Webhook</h2>

        <div className="space-y-6">
          {/* Webhook URL Input */}
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Enter your webhook here for API integration.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-1">
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-primary text-white text-sm font-medium">
                      https://
                    </span>
                    <input
                      type="text"
                      {...register("webhook_url", {
                        pattern: {
                          value:
                            /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}(\/.*)?$/,
                          message: "Please enter a valid domain",
                        },
                      })}
                      placeholder="your-webhook"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  {errors.webhook_url && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.webhook_url.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isUpdatingWebhook || !watchWebhook}
                  className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isUpdatingWebhook ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Saving...
                    </>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* API Documentation Button */}
          <div>
            <button
              onClick={handleApiDocumentation}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              API Documentation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
