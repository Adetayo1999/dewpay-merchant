import { useState, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  showApiSuccessToast,
  showApiErrorToast,
  showCopySuccessToast,
} from "@components/toast/custom-toast";
import { DefaultTable } from "@components/table/default";
import { TablePagination } from "@components/table-pagination";
import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  useGetPhoneBindingsQuery,
  useCreatePhoneBindingMutation,
  useChangeBindingStatusMutation,
  useGetBlacklistQuery,
  useAddToBlacklistMutation,
  useRemoveFromBlacklistMutation,
  useValidatePinMutation,
  type PhoneBinding,
} from "../../store/api/merchantApi";

interface NewBindingForm {
  name: string;
  phoneNumber: string;
  amount: number;
  narration: string;
  pin: string;
}

interface NewBinding {
  name: string;
  phoneNumber: string;
  amount: number;
  narration: string;
  reference: string;
  active: boolean;
}

export default function CashbindingPage() {
  const [currentPage] = useState(1);
  const [searchFilter, setSearchFilter] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [showBlacklistModal, setShowBlacklistModal] = useState(false);
  const [newBindings, setNewBindings] = useState<NewBinding[]>([]);
  const [isVerified, setIsVerified] = useState(false);
  const [isBinding, setIsBinding] = useState(false);

  const limit = 10;

  // API hooks
  const {
    data: bindings = [],
    isLoading: bindingsLoading,
    refetch: refetchBindings,
  } = useGetPhoneBindingsQuery();

  const [changeBindingStatus] = useChangeBindingStatusMutation();

  const filteredBindings = useMemo(() => {
    if (!searchFilter) return bindings;

    const searchTerm = searchFilter.toLowerCase();
    return bindings.filter(
      (binding) =>
        binding.phone_number.toLowerCase().includes(searchTerm) ||
        binding.account_name.toLowerCase().includes(searchTerm) ||
        binding.reference.toLowerCase().includes(searchTerm) ||
        binding.ussd_code.toLowerCase().includes(searchTerm)
    );
  }, [bindings, searchFilter]);

  const getStatusColor = (status: string, active: boolean) => {
    if (!active) return "text-gray-600 bg-gray-100";
    return status === "Active"
      ? "text-green-600 bg-green-100"
      : "text-red-600 bg-red-100";
  };

  const columnHelper = createColumnHelper<PhoneBinding>();
  const columns = [
    columnHelper.accessor("phone_number", {
      header: "Phone Number",
      cell: (props) => (
        <a
          href={`tel:${props.getValue()}`}
          className="text-primary hover:text-green-700 font-medium"
        >
          {props.getValue()}
        </a>
      ),
    }),
    columnHelper.accessor("amount", {
      header: "Amount",
      cell: (props) => (
        <p className="text-sm text-gray-900 font-medium">
          ₦{props.getValue().toLocaleString()}
        </p>
      ),
    }),
    columnHelper.accessor("transaction_fee", {
      header: "Charges",
      cell: (props) => (
        <p className="text-sm text-red-600 font-medium">
          ₦{props.getValue().toLocaleString()}
        </p>
      ),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (props) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
            props.getValue(),
            props.row.original.active
          )}`}
        >
          {props.row.original.active ? "Active" : "Inactive"}
        </span>
      ),
    }),
    columnHelper.accessor("ussd_code", {
      header: "USSD",
      cell: (props) => (
        <a
          href={`tel:${props.getValue()}`}
          className="text-primary hover:text-green-700 font-mono text-sm"
        >
          {props.getValue()}
        </a>
      ),
    }),
    columnHelper.accessor("account_name", {
      header: "Name",
      cell: (props) => (
        <p
          className="text-sm text-gray-900 max-w-[120px] truncate"
          title={props.getValue()}
        >
          {props.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("reference", {
      header: "Reference",
      cell: (props) => (
        <p
          className="text-sm text-gray-600 font-mono truncate max-w-[120px]"
          title={props.getValue()}
        >
          {props.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("created_at", {
      header: "Date",
      cell: (props) => (
        <div className="flex flex-col">
          <p className="text-sm text-gray-900">
            {format(new Date(props.getValue()), "MMM dd, yyyy")}
          </p>
          <p className="text-xs text-gray-500">
            {format(new Date(props.getValue()), "HH:mm")}
          </p>
        </div>
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (props) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              navigator.clipboard.writeText(props.row.original.ussd_code);
              showCopySuccessToast();
            }}
            className="text-blue-600 hover:text-blue-800 p-1"
            title="Copy USSD"
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
          <button
            onClick={async () => {
              try {
                await changeBindingStatus({
                  active: !props.row.original.active,
                  reference: props.row.original.reference,
                }).unwrap();
                showApiSuccessToast(
                  `USSD status changed to ${
                    !props.row.original.active ? "active" : "inactive"
                  }`
                );
                refetchBindings();
              } catch (error) {
                console.error("Error changing status:", error);
                showApiErrorToast("Failed to change USSD status");
              }
            }}
            className={`p-1 ${
              props.row.original.active
                ? "text-red-600 hover:text-red-800"
                : "text-green-600 hover:text-green-800"
            }`}
            title={props.row.original.active ? "Deactivate" : "Activate"}
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
                d={
                  props.row.original.active
                    ? "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636"
                    : "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                }
              />
            </svg>
          </button>
        </div>
      ),
    }),
  ];

  const handleExport = useCallback(async () => {
    setIsExporting(true);
    try {
      const exportData = filteredBindings.map((binding) => ({
        "Phone Number": binding.phone_number,
        Amount: binding.amount,
        Charges: binding.transaction_fee,
        Status: binding.active ? "Active" : "Inactive",
        USSD: binding.ussd_code,
        Name: binding.account_name,
        Reference: binding.reference,
        Date: new Date(binding.created_at).toLocaleDateString(),
      }));

      // Create a simple Excel export without type constraints
      const XLSX = await import("xlsx");
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Cashbinding");
      XLSX.writeFile(workbook, "Cashbinding-Export.xlsx");

      showApiSuccessToast("Export completed successfully");
    } catch (error) {
      console.error("Export error:", error);
      showApiErrorToast("Failed to export data");
    } finally {
      setIsExporting(false);
    }
  }, [filteredBindings]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-primary">Cashbinding</h1>
            <p className="text-gray-600 mt-1">
              Manage phone number withdrawal bindings and blacklist
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowNewModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-700 transition-colors"
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              New
            </button>
            <button
              onClick={() => setShowBlacklistModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636"
                />
              </svg>
              Blacklist
            </button>
          </div>
        </div>

        {/* Search and Export */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search phone numbers, names, references..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
          >
            {isExporting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Exporting...
              </>
            ) : (
              <>
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Export to Excel
              </>
            )}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6">
          <DefaultTable
            data={filteredBindings}
            columns={columns}
            loading={bindingsLoading}
            emptyStateMessage="No phone bindings found. Create your first binding to get started."
          />
          {filteredBindings.length > 0 && (
            <TablePagination
              page={currentPage}
              total={filteredBindings.length}
              limit={limit}
            />
          )}
        </div>
      </div>

      {/* New Binding Modal */}
      {showNewModal && (
        <NewBindingModal
          isOpen={showNewModal}
          onClose={() => setShowNewModal(false)}
          newBindings={newBindings}
          setNewBindings={setNewBindings}
          isVerified={isVerified}
          setIsVerified={setIsVerified}
          isBinding={isBinding}
          setIsBinding={setIsBinding}
        />
      )}

      {/* Blacklist Modal */}
      {showBlacklistModal && (
        <BlacklistModal
          isOpen={showBlacklistModal}
          onClose={() => setShowBlacklistModal(false)}
        />
      )}
    </div>
  );
}

// New Binding Modal Component
interface NewBindingModalProps {
  isOpen: boolean;
  onClose: () => void;
  newBindings: NewBinding[];
  setNewBindings: (bindings: NewBinding[]) => void;
  isVerified: boolean;
  setIsVerified: (verified: boolean) => void;
  isBinding: boolean;
  setIsBinding: (binding: boolean) => void;
}

const NewBindingModal = ({
  isOpen,
  onClose,
  newBindings,
  setNewBindings,
  isVerified,
  setIsVerified,
  isBinding,
  setIsBinding,
}: NewBindingModalProps) => {
  const [createPhoneBinding] = useCreatePhoneBindingMutation();
  const [validatePin] = useValidatePinMutation();

  const trimCountryCode = useCallback((phoneNumber: string) => {
    return phoneNumber.replace(/^(\+234|\+234\s)/, "").replace(/\s/g, "");
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<NewBindingForm>({
    defaultValues: {
      name: "",
      phoneNumber: "",
      amount: 100,
      narration: "",
      pin: "",
    },
  });

  const formatPhoneNumber = (phoneNumber: string) => {
    const cleaned = phoneNumber.replace(/\D/g, "");
    if (cleaned.length === 11 && cleaned.startsWith("0")) {
      return `+234 ${cleaned.slice(1, 4)} ${cleaned.slice(
        4,
        7
      )} ${cleaned.slice(7)}`;
    }
    return phoneNumber;
  };

  const generateReference = (merchantId: string) => {
    return `PHW-${merchantId}-${Date.now()}`;
  };

  const addNewBinding = (data: NewBindingForm) => {
    if (!data.name || !data.phoneNumber || data.amount < 50) return;

    const merchant_id = localStorage.getItem("merchantId") || "12345";
    const newBinding = {
      ...data,
      reference: generateReference(merchant_id),
      phoneNumber: formatPhoneNumber(data.phoneNumber),
      active: false,
    };

    setNewBindings([...newBindings, newBinding]);
    reset();
  };

  const removeNewBinding = (index: number) => {
    setNewBindings(newBindings.filter((_, i) => i !== index));
  };

  const handleValidatePin = async (pin: string) => {
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

      setIsVerified(true);
      showApiSuccessToast("PIN verified successfully");
    } catch (error) {
      console.error("PIN validation error:", error);
      showApiErrorToast("Invalid PIN");
    }
  };

  const createBindings = async () => {
    setIsBinding(true);
    try {
      const merchant_id = localStorage.getItem("merchantId");
      if (!merchant_id) throw new Error("Merchant ID not found");

      const bindingPromises = newBindings.map((binding) =>
        createPhoneBinding({
          phoneNumber: trimCountryCode(binding.phoneNumber),
          name: binding.name,
          amount: binding.amount,
          narration: binding.narration
            ? `PWH/${binding.narration}`
            : `PWH/${merchant_id}`,
          reference: binding.reference,
          active: true,
        }).unwrap()
      );

      const responses = await Promise.all(bindingPromises);

      const maxLength = 5;
      const message = `Added ${responses
        .map(
          ({ ussd_code, phone_number }) => `${ussd_code} for ${phone_number}`
        )
        .join(", ")} ${
        responses.length > maxLength ? `, +${responses.length - maxLength}` : ""
      }`;

      showApiSuccessToast(message);
      setNewBindings([]);
      setIsVerified(false);
      onClose();
    } catch (error) {
      console.error("Error creating bindings:", error);
      showApiErrorToast("Failed to create bindings");
    } finally {
      setIsBinding(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Bind New Phone Numbers
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

        {/* Content */}
        <div className="p-6">
          {/* New bindings table */}
          {newBindings.length > 0 && (
            <div className="mb-6">
              <h4 className="text-md font-medium text-gray-900 mb-4">
                New Bindings to Create
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 p-3 text-left text-sm font-medium">
                        Phone
                      </th>
                      <th className="border border-gray-200 p-3 text-left text-sm font-medium">
                        Name
                      </th>
                      <th className="border border-gray-200 p-3 text-left text-sm font-medium">
                        Amount
                      </th>
                      <th className="border border-gray-200 p-3 text-left text-sm font-medium">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {newBindings.map((bind, index) => (
                      <tr key={index}>
                        <td className="border border-gray-200 p-3">
                          <a
                            href={`tel:${bind.phoneNumber}`}
                            className="text-primary hover:text-green-700"
                          >
                            {bind.phoneNumber}
                          </a>
                        </td>
                        <td className="border border-gray-200 p-3">
                          {bind.name}
                        </td>
                        <td className="border border-gray-200 p-3">
                          ₦{bind.amount.toLocaleString()}
                        </td>
                        <td className="border border-gray-200 p-3">
                          {newBindings.length > 1 && (
                            <button
                              onClick={() => removeNewBinding(index)}
                              className="text-red-600 hover:text-red-800 p-1"
                            >
                              ✕
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(addNewBinding)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("name", {
                    required: "Name is required",
                    minLength: { value: 2, message: "Minimum 2 characters" },
                    maxLength: { value: 50, message: "Maximum 50 characters" },
                    pattern: {
                      value: /^[\s\w'-]+$/,
                      message:
                        "Only letters, numbers, spaces, hyphens and apostrophes allowed",
                    },
                  })}
                  placeholder="Enter full name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                    validate: (value) => {
                      const cleaned = value.replace(/\D/g, "");
                      if (cleaned.length < 10)
                        return "Phone number must be at least 10 digits";
                      if (cleaned.length > 15)
                        return "Phone number must not exceed 15 digits";
                      return true;
                    },
                  })}
                  placeholder="+234 XXX XXX XXXX"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount (NGN) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  {...register("amount", {
                    required: "Amount is required",
                    min: { value: 50, message: "Minimum amount is ₦50" },
                    max: {
                      value: 1000000,
                      message: "Maximum amount is ₦1,000,000",
                    },
                  })}
                  min="50"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
                {errors.amount && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.amount.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Narration
                </label>
                <input
                  type="text"
                  {...register("narration", {
                    maxLength: {
                      value: 100,
                      message: "Maximum 100 characters",
                    },
                  })}
                  placeholder="Optional description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
                {errors.narration && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.narration.message}
                  </p>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={
                    !watch("name") ||
                    !watch("phoneNumber") ||
                    (watch("amount") || 0) < 50
                  }
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  Add
                </button>
                {newBindings.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setNewBindings([])}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="flex space-x-3">
                {isVerified ? (
                  <button
                    type="button"
                    onClick={createBindings}
                    disabled={newBindings.length === 0 || isBinding}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center gap-2"
                  >
                    {isBinding ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Binding...
                      </>
                    ) : (
                      "Create Bindings"
                    )}
                  </button>
                ) : (
                  <div className="flex items-center space-x-3">
                    <input
                      type="password"
                      {...register("pin", {
                        required: "PIN is required",
                        pattern: {
                          value: /^\d{4}$/,
                          message: "PIN must be 4 digits",
                        },
                      })}
                      placeholder="PIN"
                      maxLength={4}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => handleValidatePin(watch("pin"))}
                      disabled={watch("pin")?.length !== 4 || isBinding}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                    >
                      Verify PIN
                    </button>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Blacklist Modal Component
interface BlacklistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BlacklistModal = ({ isOpen, onClose }: BlacklistModalProps) => {
  const [blacklistPhone, setBlacklistPhone] = useState("");

  const {
    data: blacklistedNumbers = [],
    isLoading: blacklistLoading,
    refetch: refetchBlacklist,
  } = useGetBlacklistQuery();

  const [addToBlacklistMutation] = useAddToBlacklistMutation();
  const [removeFromBlacklistMutation] = useRemoveFromBlacklistMutation();

  const handleAddToBlacklist = async () => {
    if (!blacklistPhone) return;

    try {
      await addToBlacklistMutation({
        phoneNumber: blacklistPhone,
      }).unwrap();

      showApiSuccessToast("Phone number added to blacklist");
      setBlacklistPhone("");
      refetchBlacklist();
    } catch (error) {
      console.error("Error adding to blacklist:", error);
      showApiErrorToast("Failed to add phone number to blacklist");
    }
  };

  const handleRemoveFromBlacklist = async (phone: string) => {
    try {
      await removeFromBlacklistMutation({
        phoneNumber: phone,
      }).unwrap();

      showApiSuccessToast("Phone number removed from blacklist");
      refetchBlacklist();
    } catch (error) {
      console.error("Error removing from blacklist:", error);
      showApiErrorToast("Failed to remove phone number from blacklist");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Manage Blacklist
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

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Add to Blacklist */}
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-4">
              Add Phone Number to Blacklist
            </h4>
            <div className="flex gap-3">
              <input
                type="tel"
                value={blacklistPhone}
                onChange={(e) => setBlacklistPhone(e.target.value)}
                placeholder="+234 XXX XXX XXXX"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <button
                onClick={handleAddToBlacklist}
                disabled={!blacklistPhone}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                Add to Blacklist
              </button>
            </div>
          </div>

          {/* Blacklisted Numbers */}
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-4">
              Blacklisted Numbers ({blacklistedNumbers.length})
            </h4>
            {blacklistLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
                <p className="text-gray-500 mt-2">Loading blacklist...</p>
              </div>
            ) : blacklistedNumbers.length > 0 ? (
              <div className="space-y-2">
                {blacklistedNumbers.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <svg
                        className="h-5 w-5 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636"
                        />
                      </svg>
                      <a
                        href={`tel:${item.phoneNumber}`}
                        className="text-red-600 hover:text-red-700 font-medium"
                      >
                        {item.phoneNumber}
                      </a>
                    </div>
                    <button
                      onClick={() =>
                        handleRemoveFromBlacklist(item.phoneNumber)
                      }
                      className="text-red-600 hover:text-red-800 p-1"
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
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No blacklisted phone numbers
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
