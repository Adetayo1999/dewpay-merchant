import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { BANKS } from "@lib/banks";
import {
  useCreatePaymentLinkMutation,
  PaymentLinkRequest,
} from "../../../store/api/merchantApi";
import {
  showApiSuccessToast,
  showApiErrorToast,
  showValidationErrorToast,
} from "@components/toast/custom-toast";
import {
  uploadToCloudinary,
  generatePublicId,
  convertFileToBase64,
  validateImageFile,
} from "@lib/cloudinary-upload";

interface NewPaymentLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface PaymentLinkForm {
  pay_type: "fixed" | "flexible";
  url_name: string;
  description: string;
  amount: number;
  bank_code: string;
  account_number: string;
  collect_emails_phone: boolean;
  redirect_url: string;
  webhook_url: string;
  notification_email: string;
  success_message: string;
}

interface ImageData {
  base64: string | null;
  src: string | null;
  cloudinaryUrl: string | null;
  publicId: string | null;
  valid: boolean;
  uploading: boolean;
}

export const NewPaymentLinkModal = ({
  isOpen,
  onClose,
  onSuccess,
}: NewPaymentLinkModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const [images, setImages] = useState<{
    logo: ImageData;
    banner: ImageData;
  }>({
    logo: {
      base64: null,
      src: null,
      cloudinaryUrl: null,
      publicId: null,
      valid: false,
      uploading: false,
    },
    banner: {
      base64: null,
      src: null,
      cloudinaryUrl: null,
      publicId: null,
      valid: false,
      uploading: false,
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<PaymentLinkForm>({
    defaultValues: {
      pay_type: "fixed",
      url_name: "",
      description: "",
      amount: 100,
      bank_code: "",
      account_number: "",
      collect_emails_phone: true,
      redirect_url: "",
      webhook_url: "",
      notification_email: "",
      success_message: "Thank you",
    },
  });

  const [createPaymentLink] = useCreatePaymentLinkMutation();

  const watchPayType = watch("pay_type");

  const handleImageUpload = useCallback(
    async (type: "logo" | "banner", file: File) => {
      // Validate file
      const validation = validateImageFile(file);
      if (!validation.valid) {
        showValidationErrorToast(validation.message || "Invalid file");
        return;
      }

      const merchant_id = localStorage.getItem("merchantId");
      if (!merchant_id) {
        showValidationErrorToast("Merchant ID not found");
        return;
      }

      // Set uploading state
      setImages((prev) => ({
        ...prev,
        [type]: {
          ...prev[type],
          uploading: true,
          src: URL.createObjectURL(file),
        },
      }));

      try {
        // Convert to base64
        const base64 = await convertFileToBase64(file);

        // Generate public ID
        const publicId = generatePublicId(merchant_id, type);

        // Upload to Cloudinary
        const uploadResult = await uploadToCloudinary({
          file: base64,
          merchant_id,
          public_id: publicId,
          tags: [`payment-link`, type],
          upload_preset: "fuspay-paymentlink",
        });

        // Update state with Cloudinary URL
        setImages((prev) => ({
          ...prev,
          [type]: {
            base64: base64,
            src: URL.createObjectURL(file),
            cloudinaryUrl: uploadResult.secure_url,
            publicId: uploadResult.public_id,
            valid: true,
            uploading: false,
          },
        }));

        showApiSuccessToast(
          `${
            type.charAt(0).toUpperCase() + type.slice(1)
          } uploaded successfully!`
        );
      } catch (error) {
        console.error(`${type} upload error:`, error);
        // Reset state on error
        setImages((prev) => ({
          ...prev,
          [type]: {
            ...prev[type],
            uploading: false,
            src: null,
          },
        }));
      }
    },
    []
  );

  // Generate payment ID in the format: PYL-{merchant_id}-{timestamp}
  const generatePaymentId = useCallback((merchantId: string) => {
    return `PYL-${merchantId}-${Date.now()}`;
  }, []);

  const handleClose = useCallback(() => {
    setCurrentStep(1);
    setIsCreating(false);
    setImages({
      logo: {
        base64: null,
        src: null,
        cloudinaryUrl: null,
        publicId: null,
        valid: false,
        uploading: false,
      },
      banner: {
        base64: null,
        src: null,
        cloudinaryUrl: null,
        publicId: null,
        valid: false,
        uploading: false,
      },
    });
    reset();
    onClose();
  }, [onClose, reset]);

  const handleStepSubmit = useCallback(
    async (data: PaymentLinkForm) => {
      if (currentStep === 1) {
        setCurrentStep(2);
        return;
      }

      if (currentStep === 2) {
        setIsCreating(true);
        try {
          const merchant_id = localStorage.getItem("merchantId");
          if (!merchant_id) throw new Error("Merchant ID not found");

          const payment_id = generatePaymentId(merchant_id);

          const payload: PaymentLinkRequest = {
            merchant_id,
            payment_id,
            pay_type: data.pay_type,
            url_name: data.url_name,
            description: data.description,
            amount: data.amount,
            bank_code: data.bank_code,
            account_number: data.account_number,
            collect_emails_phone: data.collect_emails_phone,
            redirect_url: data.redirect_url
              ? `https://${data.redirect_url}`
              : "",
            webhook_url: data.webhook_url ? `https://${data.webhook_url}` : "",
            notification_email: data.notification_email || "",
            success_message: data.success_message,
            logo_url: images.logo.cloudinaryUrl || "",
            banner_url: images.banner.cloudinaryUrl || "",
            status: true, // Default to active
          };

          await createPaymentLink(payload).unwrap();
          showApiSuccessToast("Payment link created successfully!");
          onSuccess();
          handleClose();
        } catch (error) {
          console.error("Failed to create payment link:", error);
          showApiErrorToast(error);
        } finally {
          setIsCreating(false);
        }
      }
    },
    [
      currentStep,
      createPaymentLink,
      onSuccess,
      images,
      generatePaymentId,
      handleClose,
    ]
  );

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            {currentStep > 1 && (
              <button
                onClick={handleBack}
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                New Payment Link
              </h3>
              <p className="text-sm text-gray-500">
                Step {currentStep} of 2:{" "}
                {currentStep === 1 ? "Payment Type" : "Configuration"}
              </p>
            </div>
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

        {/* Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit(handleStepSubmit)} className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                <h4 className="text-lg font-medium text-gray-900">
                  Choose Payment Link Type
                </h4>

                {/* Fixed Amount Option */}
                <label className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <input
                    type="radio"
                    value="fixed"
                    {...register("pay_type")}
                    className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      Fixed-amount Payment Link
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Create a simple link for your customers to pay you a fixed
                      amount. E.g NGN 500
                    </div>
                  </div>
                </label>

                {/* Flexible Amount Option */}
                <label className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <input
                    type="radio"
                    value="flexible"
                    {...register("pay_type")}
                    className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      Flexible-amount Payment Link
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Create a link where customers can pay any amount they
                      choose, with a default amount you set
                    </div>
                  </div>
                </label>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-medium text-gray-900">
                    Payment Link Configuration
                  </h4>
                  <span className="px-3 py-1 bg-primary text-white text-sm font-medium rounded-full">
                    {watchPayType === "fixed"
                      ? "Fixed Amount"
                      : "Flexible Amount"}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Link Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Link Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("url_name", {
                        required: "URL name is required",
                        minLength: {
                          value: 3,
                          message: "Minimum 3 characters",
                        },
                        maxLength: {
                          value: 30,
                          message: "Maximum 30 characters",
                        },
                      })}
                      placeholder="Name your payment link"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                    {errors.url_name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.url_name.message}
                      </p>
                    )}
                  </div>

                  {/* Amount (required for both fixed and flexible) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      {...register("amount", {
                        required: "Amount is required",
                        min: {
                          value: 100,
                          message: "Minimum amount is ₦100",
                        },
                      })}
                      placeholder={
                        watchPayType === "fixed"
                          ? "Fixed amount (e.g., NGN 500)"
                          : "Default amount (customers can modify)"
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                    {watchPayType === "flexible" && (
                      <p className="text-xs text-gray-500 mt-1">
                        This will be the default amount. Customers can change it
                        when making payments.
                      </p>
                    )}
                    {errors.amount && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.amount.message}
                      </p>
                    )}
                  </div>

                  {/* Bank Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bank <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register("bank_code", {
                        required: "Bank is required",
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
                    {errors.bank_code && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.bank_code.message}
                      </p>
                    )}
                  </div>

                  {/* Account Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Account Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("account_number", {
                        required: "Account number is required",
                        minLength: { value: 10, message: "Minimum 10 digits" },
                        maxLength: { value: 11, message: "Maximum 11 digits" },
                        pattern: {
                          value: /^\d+$/,
                          message: "Only numbers allowed",
                        },
                      })}
                      placeholder="Enter a valid account number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                    {errors.account_number && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.account_number.message}
                      </p>
                    )}
                  </div>

                  {/* Custom URL */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name your Link Url <span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <div className="px-3 py-2 bg-gray-700 text-white text-sm rounded-l-lg flex items-center">
                        https://fuspay.com.ng/
                      </div>
                      <input
                        type="text"
                        {...register("url_name", {
                          required: "URL name is required",
                          minLength: {
                            value: 3,
                            message: "Minimum 3 characters",
                          },
                          maxLength: {
                            value: 100,
                            message: "Maximum 100 characters",
                          },
                          pattern: {
                            value: /^[a-zA-Z0-9-_]+$/,
                            message:
                              "Only letters, numbers, hyphens and underscores allowed",
                          },
                        })}
                        placeholder="your-custom-url"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                    {errors.url_name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.url_name.message}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      {...register("description", {
                        minLength: {
                          value: 6,
                          message: "Minimum 6 characters",
                        },
                        maxLength: {
                          value: 1000,
                          message: "Maximum 1000 characters",
                        },
                      })}
                      placeholder="Description or any instruction you want your customers to see"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                    {errors.description && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  {/* Logo Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Link Logo
                    </label>
                    <div className="text-xs text-gray-500 mb-2">
                      Add a Logo to your payment link. We recommend a 200 x 200
                      pixel JPG/PNG not more than 1MB in Size.
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <input
                        type="file"
                        accept="image/jpeg,image/png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload("logo", file);
                        }}
                        className="hidden"
                        id="logo-upload"
                      />
                      <label htmlFor="logo-upload" className="cursor-pointer">
                        {images.logo.uploading ? (
                          <div className="flex flex-col items-center justify-center h-20 w-20 border-2 border-dashed border-primary rounded">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mb-2"></div>
                            <span className="text-xs text-primary">
                              Uploading...
                            </span>
                          </div>
                        ) : images.logo.src ? (
                          <div className="relative">
                            <img
                              src={images.logo.src}
                              alt="Logo preview"
                              className="mx-auto h-20 w-20 object-cover rounded"
                            />
                            {images.logo.valid && (
                              <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1">
                                <svg
                                  className="h-3 w-3"
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
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <svg
                              className="h-8 w-8 text-gray-400 mb-2"
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
                            <span className="text-sm text-gray-600">
                              Choose File
                            </span>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Banner Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Link Banner
                    </label>
                    <div className="text-xs text-gray-500 mb-2">
                      Add Banner to your payment link. We recommend a 1024 x 200
                      pixel JPG/PNG not more than 1MB in Size.
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <input
                        type="file"
                        accept="image/jpeg,image/png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload("banner", file);
                        }}
                        className="hidden"
                        id="banner-upload"
                      />
                      <label htmlFor="banner-upload" className="cursor-pointer">
                        {images.banner.uploading ? (
                          <div className="flex flex-col items-center justify-center h-20 w-full border-2 border-dashed border-primary rounded">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mb-2"></div>
                            <span className="text-xs text-primary">
                              Uploading...
                            </span>
                          </div>
                        ) : images.banner.src ? (
                          <div className="relative">
                            <img
                              src={images.banner.src}
                              alt="Banner preview"
                              className="mx-auto h-20 w-full object-cover rounded"
                            />
                            {images.banner.valid && (
                              <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                                <svg
                                  className="h-3 w-3"
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
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <svg
                              className="h-8 w-8 text-gray-400 mb-2"
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
                            <span className="text-sm text-gray-600">
                              Choose File
                            </span>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Collect Email & Phone */}
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        {...register("collect_emails_phone")}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Collect Email & Phone Number on this link (Optional)
                      </span>
                    </label>
                  </div>

                  {/* Redirect URL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Redirect After Payment (Optional)
                    </label>
                    <div className="flex">
                      <div className="px-3 py-2 bg-gray-700 text-white text-sm rounded-l-lg flex items-center">
                        https://
                      </div>
                      <input
                        type="text"
                        {...register("redirect_url", {
                          pattern: {
                            value:
                              /^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.?[a-zA-Z]{2,}$/,
                            message: "Enter a valid domain (e.g., example.com)",
                          },
                        })}
                        placeholder="your-redirect.url"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                    {errors.redirect_url && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.redirect_url.message}
                      </p>
                    )}
                  </div>

                  {/* Webhook URL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Webhook (Optional)
                    </label>
                    <div className="flex">
                      <div className="px-3 py-2 bg-gray-700 text-white text-sm rounded-l-lg flex items-center">
                        https://
                      </div>
                      <input
                        type="text"
                        {...register("webhook_url", {
                          pattern: {
                            value: /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/,
                            message: "Enter a valid domain (e.g., example.com)",
                          },
                        })}
                        placeholder="your-webhook.url"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                    {errors.webhook_url && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.webhook_url.message}
                      </p>
                    )}
                  </div>

                  {/* Notification Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Send Payment Notifications To? (Optional)
                    </label>
                    <p className="text-xs text-gray-500 mb-2">
                      Provide an email to receive notification when payment is
                      made.
                    </p>
                    <input
                      type="email"
                      {...register("notification_email", {
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Must be a valid email",
                        },
                      })}
                      placeholder="notification@example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                    {errors.notification_email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.notification_email.message}
                      </p>
                    )}
                  </div>

                  {/* Success Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Success Message (Optional)
                    </label>
                    <input
                      type="text"
                      {...register("success_message")}
                      placeholder="Thank you"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Footer Buttons */}
            <div className="flex justify-between pt-6 border-t border-gray-200">
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
                ) : currentStep === 1 ? (
                  "Continue"
                ) : (
                  "Create"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
