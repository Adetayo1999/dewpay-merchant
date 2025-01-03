import { lazy } from "react";

// Auth Module
export const LoginPage = lazy(() => import("@modules/auth/login"));
export const RegisterPage = lazy(() => import("@modules/auth/register"));
export const ForgotPasswordPage = lazy(
  () => import("@modules/auth/forgot_password")
);
export const ResetPasswordPage = lazy(
  () => import("@modules/auth/reset_password")
);

// Compliance Module
export const BusinessInformationPage = lazy(
  () => import("@modules/compliance/business_information")
);
export const DocumentsUploadPage = lazy(
  () => import("@modules/compliance/document_uploads")
);
export const QuickCheckListPage = lazy(
  () => import("@modules/compliance/quick-checklist")
);
export const TwoFaPage = lazy(() => import("@modules/compliance/two_fa"));

// Dashboard Modules
export const DashboardPage = lazy(() => import("@modules/dashboard"));

// Wallet Modules
export const WalletPage = lazy(() => import("@modules/wallets"));

// Transaction Modules
export const TransactionCollection = lazy(
  () => import("@modules/transactions/collections")
);
export const TransactionPayout = lazy(
  () => import("@modules/transactions/payout")
);

// USSD Colllect
export const USSDCollecCollections = lazy(
  () => import("@modules/ussd-collect/collections")
);

// Users
export const UsersPage = lazy(() => import("@modules/users"));
export const UserInformation = lazy(() => import("@modules/users/information"));

// Services
export const GlobalServicesPage = lazy(
  () => import("@modules/services/global-services")
);
export const LocalServicesPage = lazy(
  () => import("@modules/services/local-services")
);

// Settings

export const NotificationsPage = lazy(
  () => import("@modules/settings/notifications")
);
export const TeamManagementPage = lazy(
  () => import("@modules/settings/team-management")
);

export const CustomerSupportPage = lazy(() => import("@modules/support"));
