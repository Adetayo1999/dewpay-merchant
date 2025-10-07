import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

// Types for API responses
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  status: "active" | "inactive";
  createdAt: string;
  merchant_id: string;
  wallet_no: string | null;
  account_no: string | null;
  account_name: string | null;
  reference: string;
  bank: string | null;
  onedisk_id: string | null;
  full_name: string | null;
  onedisk_access_token: string | null;
  phone: string | null;
  iat: number;
}

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed";
  type: "collection" | "payout";
  reference: string;
  createdAt: string;
  updatedAt: string;
}

// Transaction Query Types
export type TransactionType =
  | "checkout_collections"
  | "merchant_transfer_money"
  | "payment_link_collections"
  | "reserved_account_collections";

export interface TransactionQueryRequest {
  offset?: number;
  limit?: number;
  from_date?: string;
  to_date?: string;
  type?: TransactionType;
}

export interface TransactionQueryResponse {
  message: string;
  success: boolean;
  error: boolean;
  code: string;
  total_record: number;
  txns: Transaction[];
}

export interface DashboardMetrics {
  totalRevenue: number;
  totalTransactions: number;
  pendingTransactions: number;
  completedTransactions: number;
  monthlyGrowth: number;
}

export interface ComplianceData {
  businessName: string;
  businessType: string;
  registrationNumber: string;
  taxId: string;
  address: string;
  documents: Array<{
    id: string;
    name: string;
    status: "pending" | "approved" | "rejected";
    uploadedAt: string;
  }>;
}

// Wallet & Account interfaces
export interface MerchantBalance {
  message: string;
  success: boolean;
  error: boolean;
  code: string;
  merchant_id: string;
  account_no: string | null;
  account_name: string | null;
  bank: string | null;
  balance: {
    wallet_balance: string;
    total_revenue: string;
    total_txn: number;
    pending_settllement: string;
    incoming_settllement: string;
    outgoing_settllement: string;
    customers: number;
    new_customers: number;
  };
}

export interface ReservedAccount {
  account_number: string;
  account_name: string;
  bank_name: string;
  merchant_id: string;
  status: "active" | "inactive";
  created_at: string;
}

export interface CreateAccountRequest {
  email: string;
  reference: string;
  phone: string;
  account_name: string;
}

export interface DynamicAccount {
  account_number: string;
  account_name: string;
  bank_name: string;
  reference: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  created_at: string;
}

export interface CreateDynamicAccountRequest {
  merchant_id: string;
  name: string;
  reference: string;
  amount: string;
  email: string;
  bank_code: string;
}

export interface VerifyCollectionRequest {
  merchant_id: string;
  reference: string;
}

export interface AccountStatement {
  transactions: Array<{
    id: string;
    type: "credit" | "debit";
    amount: number;
    narration: string;
    reference: string;
    date: string;
  }>;
  total_credit: number;
  total_debit: number;
  balance: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  account_number?: string;
  created_at: string;
  customer_status?: "active" | "inactive";
}

export interface CustomerListRequest {
  offset: string;
  limit: string;
}

export interface CustomerListResponse {
  message: string;
  success: string;
  error: boolean;
  code: string;
  total: number;
  customers: Customer[];
}

// Payout Management Types
export interface Payout {
  id: string;
  phone_number: string;
  account_name: string;
  bank_name: string;
  account_number: string;
  amount: number;
  status: string;
  active: boolean;
  transaction_fee: number;
  reference: string;
  narration: string;
  created_at: string;
}

export interface PayoutBatch {
  id: string;
  amount: number;
  status: string; // 'pending', 'processing', 'completed', 'failed'
  transaction_fee: number;
  reference: string;
  narration: string;
  payouts: Payout[];
  created_at: string;
  batch_code: string;
  account_name: string;
  bank_name: string;
  account_number: string;
}

export interface PayoutsResponse {
  bulk_transfers: PayoutBatch[];
}

export interface ValidateAccountRequest {
  account_no: string;
  bank_code: string;
}

export interface ValidateAccountResponse {
  account_name: string;
}

export interface BulkTransferRequest {
  narration: string;
  pin: string;
  bulkTransfers: Payout[];
  merchantId: string;
}

// Payment Links Types
export interface PaymentLink {
  payment_link: string;
  pay_type: "fixed" | "flexible";
  url_name: string;
  banner_url: string;
  logo_url: string;
  description: string;
  status: string; // Changed from boolean to string to match API response
  amount: number;
  webhook_url: string;
  redirect_url: string;
  notification_email: string;
  success_message: string;
  payment_code: string;
  payment_id: string;
  merchant_id: string;
  memo: string;
  message: string;
  counter: number;
  created_at: string;
  bank_code?: string;
  account_number?: string;
}

export interface PaymentLinkListResponse {
  data: PaymentLink[];
}

export interface PaymentLinkRequest {
  payment_id?: string;
  merchant_id?: string;
  payment_link?: string;
  pay_type?: "fixed" | "flexible";
  url_name?: string;
  banner_url?: string;
  logo_url?: string;
  description?: string;
  status?: string;
  amount?: number;
  collect_emails_phone?: boolean;
  webhook_url?: string;
  redirect_url?: string;
  notification_email?: string;
  success_message?: string;
  payment_code?: string;
  memo?: string;
  message?: string;
  bank_code?: string;
  account_number?: string;
}

export interface Checkout {
  reference: string;
  first_name: string;
  last_name: string;
  customer_phone: string;
  customer_email: string;
  amount: number;
  custom_name: string;
  custom_logo: string;
  merchant_id: string;
  payment_id: string;
  callback_url: string;
  webhook_url: string;
  checkout_type: string;
}

export interface CheckoutResponse {
  url: string;
}

// Reserved Accounts Types
export interface ReservedAccount {
  bank_code: string;
  bank_name: string;
  account_name: string;
  account_number: string;
  balance: number;
  reference: string;
  account_id: string;
  phone: string;
  email: string;
  full_name?: string;
  created_at: string;
}

export interface ReservedAccountsResponse {
  accounts: ReservedAccount[];
}

export interface CreateAccountRequest {
  reference: string;
  phone: string;
  account_name: string;
  email: string;
}

export interface GetAccountRequest {
  account_no: string;
  merchant_id: string;
}

export interface SetAccountPinRequest {
  merchant_id: string;
  account_id: string;
  new_pin: string;
}

// Statements Types
export interface Statement {
  id: string;
  name: string;
  status: string;
  type: string; // 'credit' | 'debit'
  date: string;
  amount: number;
  memo: string;
  txn_reference: string;
  created_at: string;
}

export interface StatementsResponse {
  statement: Statement[];
}

export interface StatementRequest {
  account_no: string;
}

// Security Settings Types
export interface SecuritySettings {
  secret_key: string;
  pin: string;
}

export interface GenerateSecretKeyResponse {
  code: string;
  success: string;
  secret_key: string;
  message: string;
}

export interface SetPinRequest {
  pin: string;
}

export interface SetPinResponse {
  message: string;
  success: boolean;
}

// Mode Change Types
export interface ModeChangeRequest {
  mode: "live" | "demo";
}

export interface ModeChangeResponse {
  success: boolean;
  message: string;
}

// Logout Types
export interface LogoutResponse {
  success: boolean;
  message: string;
}

// Cashbinding/Phone Withdrawal Types
export interface PhoneBinding {
  id: string;
  phone_number: string;
  account_name: string;
  bank_name: string;
  account_number: string;
  ussd: string;
  ussd_code: string;
  mandate_code: number;
  amount: number;
  status: string;
  active: boolean;
  transaction_fee: number;
  reference: string;
  narration: string;
  created_at: string;
}

export interface CreateBindingRequest {
  phoneNumber: string;
  name: string;
  amount: number;
  narration: string;
  reference: string;
  active: boolean;
}

export interface ChangeBindingStatusRequest {
  active: boolean;
  reference: string;
}

export interface BlacklistItem {
  phoneNumber: string;
  narration: string;
}

export interface AddToBlacklistRequest {
  phoneNumber: string;
}

export interface ValidatePinRequest {
  merchant_id: string;
  pin: string;
}

export interface ValidatePinResponse {
  success: boolean;
  message: string;
}

// Base query for auth endpoints (no /v1 prefix)
const authBaseQueryRaw = fetchBaseQuery({
  baseUrl:
    import.meta.env.VITE_API_BASE_URL?.replace("/v1", "") ||
    "https://api.dewpay.net",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Wrap auth base query with error handling
const authBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await authBaseQueryRaw(args, api, extraOptions);

  // Check for inactive merchant secret error
  if (result.error) {
    const errorData = result.error.data as {
      message?: string;
      success?: boolean;
      error?: boolean;
      code?: string;
    };

    // Check if it's the specific "Merchant secret is not active" error
    if (
      result.error.status === 400 &&
      errorData?.message === "Merchant secret is not active" &&
      errorData?.code === "01"
    ) {
      // Clear all auth data
      localStorage.removeItem("authToken");
      localStorage.removeItem("merchantId");
      localStorage.removeItem("user");

      // Import toast dynamically to avoid circular dependencies
      import("@components/toast/custom-toast").then(({ showApiErrorToast }) => {
        showApiErrorToast("Your session has expired. Please log in again.");
      });

      // Redirect to login page
      window.location.href = "/auth/login";
    }
  }

  return result;
};

// Custom base query that automatically adds merchant_id to POST request bodies
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL || "https://api.dewpay.net/v1",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithMerchantId: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const merchant_id = localStorage.getItem("merchantId");

  // If it's a POST request with a body, automatically add merchant_id
  if (
    typeof args === "object" &&
    args.method === "POST" &&
    args.body &&
    merchant_id
  ) {
    // If body is already an object, merge merchant_id into it
    if (typeof args.body === "object" && !Array.isArray(args.body)) {
      args.body = { ...args.body, merchant_id };
    }
    // If body is FormData or other types, we might need different handling
    // For now, we'll assume most POST requests use JSON bodies
  }

  const result = await baseQuery(args, api, extraOptions);

  // Check for inactive merchant secret error
  if (result.error) {
    const errorData = result.error.data as {
      message?: string;
      success?: boolean;
      error?: boolean;
      code?: string;
    };

    // Check if it's the specific "Merchant secret is not active" error
    if (
      result.error.status === 400 &&
      errorData?.message === "Merchant secret is not active" &&
      errorData?.code === "01"
    ) {
      // Clear all auth data
      localStorage.removeItem("authToken");
      localStorage.removeItem("merchantId");
      localStorage.removeItem("user");

      // Import toast dynamically to avoid circular dependencies
      import("@components/toast/custom-toast").then(({ showApiErrorToast }) => {
        showApiErrorToast("Your session has expired. Please log in again.");
      });

      // Redirect to login page
      window.location.href = "/auth/login";
    }
  }

  return result;
};

// Base API configuration
// Auth API slice (no /v1 prefix)
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: authBaseQuery,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    // Auth endpoints (no /v1 prefix)
    login: builder.mutation<
      {
        message: string;
        success: boolean;
        error: boolean;
        code: string;
        token: string;
      },
      { email: string; password: string; otp_code?: string }
    >({
      query: (credentials) => ({
        url: "/login/account",
        method: "POST",
        body: credentials,
      }),
    }),

    register: builder.mutation<
      { message: string; success: boolean; error: boolean; code: string },
      {
        email: string;
        password: string;
        first_name: string;
        last_name: string;
        bvn: string;
        otp_code?: string;
      }
    >({
      query: (userData) => ({
        url: "/register/account",
        method: "POST",
        body: userData,
      }),
    }),

    sendOtp: builder.mutation<{ message: string }, { email: string }>({
      query: (data) => ({
        url: "/otp/account",
        method: "POST",
        body: data,
      }),
    }),

    forgotPassword: builder.mutation<
      { message: string },
      {
        email: string;
        new_password: string;
        otp_code: string;
      }
    >({
      query: (data) => ({
        url: "/forgot/account",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const merchantApi = createApi({
  reducerPath: "merchantApi",
  baseQuery: baseQueryWithMerchantId,
  tagTypes: [
    "User",
    "Transaction",
    "Dashboard",
    "Compliance",
    "Wallet",
    "Reports",
    "Customer",
    "Payout",
    "PaymentLink",
    "ReservedAccount",
    "Statements",
    "Cashbinding",
  ],
  endpoints: (builder) => ({
    // Dashboard endpoints
    getDashboardMetrics: builder.query<DashboardMetrics, void>({
      query: () => "/dashboard/metrics",
      providesTags: ["Dashboard"],
    }),

    // User management endpoints
    getUsers: builder.query<User[], void>({
      query: () => "/users",
      providesTags: ["User"],
    }),

    createUser: builder.mutation<User, Partial<User>>({
      query: (userData) => ({
        url: "/users",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    updateUser: builder.mutation<User, { id: string; data: Partial<User> }>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // Transaction endpoints
    queryTransactions: builder.query<
      TransactionQueryResponse,
      TransactionQueryRequest
    >({
      query: (params) => ({
        url: "/Transaction/Query",
        method: "POST",
        body: params,
      }),
      providesTags: ["Transaction"],
    }),

    getTransactionById: builder.query<Transaction, string>({
      query: (id) => `/transactions/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Transaction", id }],
    }),

    // Compliance endpoints
    getComplianceData: builder.query<ComplianceData, void>({
      query: () => "/compliance",
      providesTags: ["Compliance"],
    }),

    updateComplianceData: builder.mutation<
      ComplianceData,
      Partial<ComplianceData>
    >({
      query: (data) => ({
        url: "/compliance",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Compliance"],
    }),

    uploadDocument: builder.mutation<
      { id: string; name: string; status: string },
      FormData
    >({
      query: (formData) => ({
        url: "/compliance/documents",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Compliance"],
    }),

    // Wallet & Account endpoints
    getMerchantBalance: builder.query<MerchantBalance, void>({
      query: () => {
        return {
          url: "/Merchant/Balance",
          method: "POST",
          body: {}, // merchant_id will be automatically added by baseQueryWithMerchantId
        };
      },
      providesTags: ["Wallet"],
    }),

    listReservedAccounts: builder.query<ReservedAccount[], void>({
      query: () => ({
        url: "/v1/ReservedAccount/ListAccounts",
        method: "POST",
        body: {},
      }),
      providesTags: ["Wallet"],
    }),

    withdrawFromAccount: builder.mutation<
      { message: string },
      {
        account_number: string;
        bank_code: string;
        narration: string;
        reference: string;
        amount: string;
        pin: string;
        account_no: string;
      }
    >({
      query: (data) => ({
        url: "/v1/ReservedAccount/Withdraw",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Wallet"],
    }),

    // Payment Collection endpoints
    createDynamicAccount: builder.mutation<
      DynamicAccount,
      CreateDynamicAccountRequest
    >({
      query: (data) => ({
        url: "/v1/DynamicAccount/Create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Transaction"],
    }),

    verifyCollection: builder.mutation<
      { message: string; status: string },
      VerifyCollectionRequest
    >({
      query: (data) => ({
        url: "/v1/DynamicAccount/Verify",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Transaction"],
    }),

    debitOnCheckout: builder.mutation<
      { message: string },
      {
        merchant_id: string;
        checkout_reference: string;
        account_no: string;
      }
    >({
      query: (data) => ({
        url: "/checkout/debit-reserved-account",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Transaction"],
    }),

    // Reports & Analytics endpoints
    getAccountStatement: builder.query<
      AccountStatement,
      {
        merchant_id: string;
        account_no?: string;
        from_date?: string;
        to_date?: string;
        offset?: string;
        limit?: string;
      }
    >({
      query: (data) => ({
        url: "/v1/Statement/Account",
        method: "POST",
        body: data,
      }),
      providesTags: ["Reports"],
    }),

    listCustomers: builder.query<
      Customer[],
      {
        merchant_id: string;
        offset?: string;
        limit?: string;
      }
    >({
      query: (data) => ({
        url: "/v1/Customer/List",
        method: "POST",
        body: data,
      }),
      providesTags: ["Customer"],
    }),

    getCustomerList: builder.query<CustomerListResponse, CustomerListRequest>({
      query: (params) => ({
        url: "/Customer/List",
        method: "POST",
        body: params,
      }),
      providesTags: ["Customer"],
    }),

    // Payout Management endpoints
    getAllPayouts: builder.query<PayoutsResponse, void>({
      query: () => {
        const merchant_id = localStorage.getItem("merchantId");
        return {
          url: `/bulktransfer/all/${merchant_id}`,
          method: "GET",
        };
      },
      providesTags: ["Payout"],
    }),

    validateAccount: builder.mutation<
      ValidateAccountResponse,
      ValidateAccountRequest
    >({
      query: (data) => ({
        url: "/Transfer/ValidateAccount",
        method: "POST",
        body: data,
      }),
    }),

    processBulkTransfer: builder.mutation<
      { message: string; success: boolean },
      BulkTransferRequest
    >({
      query: (data) => ({
        url: "/bulkTransfer",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payout"],
    }),

    getPayoutBatch: builder.query<PayoutBatch, string>({
      query: (batchId) => `/bulktransfer/${batchId}`,
      providesTags: (_result, _error, batchId) => [
        { type: "Payout", id: batchId },
      ],
    }),

    // Payment Links endpoints
    getPaymentLinks: builder.query<PaymentLinkListResponse, void>({
      query: () => ({
        url: "/PaymentLink/List",
        method: "POST",
        body: {},
      }),
      providesTags: ["PaymentLink"],
    }),

    getPaymentLink: builder.query<PaymentLink, { payment_id: string }>({
      query: ({ payment_id }) => ({
        url: "/PaymentLink/Get",
        method: "POST",
        body: { payment_id },
      }),
      providesTags: (_result, _error, { payment_id }) => [
        { type: "PaymentLink", id: payment_id },
      ],
    }),

    createPaymentLink: builder.mutation<PaymentLink, PaymentLinkRequest>({
      query: (data) => ({
        url: "/PaymentLink/Create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PaymentLink"],
    }),

    updatePaymentLink: builder.mutation<PaymentLink, PaymentLinkRequest>({
      query: (data) => ({
        url: "/PaymentLink/Update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_result, _error, { payment_id }) => [
        { type: "PaymentLink", id: payment_id },
        "PaymentLink",
      ],
    }),

    createCheckout: builder.mutation<CheckoutResponse, Checkout>({
      query: (data) => ({
        url: `/checkout/${data.merchant_id}/create`,
        method: "POST",
        body: data,
      }),
    }),

    // Reserved Accounts endpoints
    getReservedAccounts: builder.query<ReservedAccountsResponse, void>({
      query: () => ({
        url: "/ReservedAccount/ListAccounts",
        method: "POST",
        body: {},
      }),
      providesTags: ["ReservedAccount"],
    }),

    getReservedAccount: builder.query<ReservedAccount, GetAccountRequest>({
      query: (data) => ({
        url: "/ReservedAccount/GetAccount",
        method: "POST",
        body: data,
      }),
      providesTags: (_result, _error, { account_no }) => [
        { type: "ReservedAccount", id: account_no },
      ],
    }),

    createReservedAccount: builder.mutation<
      ReservedAccount,
      CreateAccountRequest
    >({
      query: (data) => ({
        url: "/ReservedAccount/CreateAccount",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ReservedAccount"],
    }),

    setAccountPin: builder.mutation<
      { message: string; success: boolean },
      SetAccountPinRequest
    >({
      query: (data) => ({
        url: "/ReservedAccount/SetAccountPin",
        method: "POST",
        body: data,
      }),
    }),

    // Statements endpoints
    getAccountStatements: builder.query<StatementsResponse, StatementRequest>({
      query: (data) => ({
        url: "/Statement/Account",
        method: "POST",
        body: data,
      }),
      providesTags: (_result, _error, { account_no }) => [
        { type: "Statements", id: account_no },
      ],
    }),

    // Security endpoints
    generateSecretKey: builder.mutation<GenerateSecretKeyResponse, void>({
      query: () => ({
        url: "/Profile/GenerateKey",
        method: "POST",
        body: {},
      }),
      invalidatesTags: ["User"],
    }),

    setPin: builder.mutation<SetPinResponse, SetPinRequest>({
      query: (data) => ({
        url: "/Profile/SetPin",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // Mode and Logout endpoints
    changeMerchantMode: builder.mutation<ModeChangeResponse, ModeChangeRequest>(
      {
        query: (data) => ({
          url: "/Merchant/Mode",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["User"],
      }
    ),

    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: "/Auth/Logout",
        method: "POST",
        body: {},
      }),
    }),

    // Cashbinding/Phone Withdrawal endpoints
    getPhoneBindings: builder.query<PhoneBinding[], void>({
      query: () => {
        const merchant_id = localStorage.getItem("merchantId");
        return `/phone-withdrawal/merchants/${merchant_id}`;
      },
      providesTags: ["Cashbinding"],
    }),

    getPhoneBinding: builder.query<PhoneBinding, string>({
      query: (id) => `/phone-withdrawal/single/${id}`,
      providesTags: (_, __, id) => [{ type: "Cashbinding", id }],
    }),

    createPhoneBinding: builder.mutation<PhoneBinding, CreateBindingRequest>({
      query: (data) => ({
        url: "/phone-withdrawal/bind-reference",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cashbinding"],
    }),

    changeBindingStatus: builder.mutation<
      { success: boolean; message: string },
      ChangeBindingStatusRequest
    >({
      query: (data) => ({
        url: "/phone-withdrawal/change-ussd-status",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cashbinding"],
    }),

    getBlacklist: builder.query<BlacklistItem[], void>({
      query: () => "/phone-withdrawal/blacklist",
      providesTags: ["Cashbinding"],
    }),

    addToBlacklist: builder.mutation<
      { success: boolean; message: string },
      AddToBlacklistRequest
    >({
      query: (data) => ({
        url: "/phone-withdrawal/blacklist",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cashbinding"],
    }),

    removeFromBlacklist: builder.mutation<
      { success: boolean; message: string },
      AddToBlacklistRequest
    >({
      query: (data) => ({
        url: "/phone-withdrawal/undo-blacklist",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cashbinding"],
    }),

    validatePin: builder.mutation<ValidatePinResponse, ValidatePinRequest>({
      query: (data) => ({
        url: "/Profile/ValidatePin",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// Export auth API hooks
export const {
  useLoginMutation,
  useRegisterMutation,
  useSendOtpMutation,
  useForgotPasswordMutation,
} = authApi;

export const {
  useGetDashboardMetricsQuery,
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useQueryTransactionsQuery,
  useLazyQueryTransactionsQuery, // Added lazy version
  useGetTransactionByIdQuery,
  useGetComplianceDataQuery,
  useUpdateComplianceDataMutation,
  useUploadDocumentMutation,
  // Wallet & Account hooks
  useGetMerchantBalanceQuery,
  useWithdrawFromAccountMutation,
  // Payment Collection hooks
  useCreateDynamicAccountMutation,
  useVerifyCollectionMutation,
  useDebitOnCheckoutMutation,
  // Reports & Analytics hooks
  useGetAccountStatementQuery,
  useListCustomersQuery,
  // Customer Management hooks
  useGetCustomerListQuery,
  // Payout Management hooks
  useGetAllPayoutsQuery,
  useValidateAccountMutation,
  useProcessBulkTransferMutation,
  useGetPayoutBatchQuery,
  useGetPaymentLinksQuery,
  useGetPaymentLinkQuery,
  useCreatePaymentLinkMutation,
  useUpdatePaymentLinkMutation,
  useCreateCheckoutMutation,
  // Reserved Accounts hooks
  useGetReservedAccountsQuery,
  useGetReservedAccountQuery,
  useCreateReservedAccountMutation,
  useSetAccountPinMutation,
  // Statements hooks
  useGetAccountStatementsQuery,
  // Security hooks
  useGenerateSecretKeyMutation,
  useSetPinMutation,
  // Mode and Logout hooks
  useChangeMerchantModeMutation,
  useLogoutMutation,
  // Cashbinding hooks
  useGetPhoneBindingsQuery,
  useGetPhoneBindingQuery,
  useCreatePhoneBindingMutation,
  useChangeBindingStatusMutation,
  useGetBlacklistQuery,
  useAddToBlacklistMutation,
  useRemoveFromBlacklistMutation,
  useValidatePinMutation,
} = merchantApi;
