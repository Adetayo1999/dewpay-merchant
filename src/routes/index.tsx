import { createBrowserRouter, Outlet } from "react-router-dom";
import { Suspense } from "react";
import * as pages from "./pages";
import { AuthLayout } from "../components/layout/auth.layout";
import { paths } from "./paths";
import { DashboardLayout } from "@components/layout/dashboard.layout";
import { ComplianceLayout, SettingsLayout } from "@components/layout";
import { ProtectedRoute } from "../components/auth";

const getElement = (
  Page: React.LazyExoticComponent<() => JSX.Element>,
  fallback = <p>Loading...</p>
) => {
  return (
    <Suspense fallback={fallback}>
      <Page />
    </Suspense>
  );
};

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: paths.auth.login,
        element: getElement(pages.LoginPage),
      },
      {
        path: paths.auth.register,
        element: getElement(pages.RegisterPage),
      },
      {
        path: paths.auth.forgot_password,
        element: getElement(pages.ForgotPasswordPage),
      },
      {
        path: paths.auth.reset_password,
        element: getElement(pages.ResetPasswordPage),
      },
      {
        path: paths.auth.otp,
        element: getElement(pages.OtpPage),
      },
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        element: <ComplianceLayout />,
        children: [
          {
            element: getElement(pages.QuickCheckListPage),
            path: paths.complaince.index,
          },
          {
            element: getElement(pages.QuickCheckListPage),
            path: paths.complaince.checklist,
          },
          {
            element: getElement(pages.BusinessInformationPage),
            path: paths.complaince.business_information,
          },
          {
            element: getElement(pages.DocumentsUploadPage),
            path: paths.complaince.document_uploads,
          },
          {
            element: getElement(pages.TwoFaPage),
            path: paths.complaince.two_fa,
          },
        ],
      },
      {
        element: <Outlet />,
        children: [
          {
            element: getElement(pages.DashboardPage),
            path: paths.dashboard.index,
          },
        ],
      },
      {
        element: <Outlet />,
        children: [
          {
            element: getElement(pages.TransactionCollection),
            path: paths.transactions.index,
          },
          {
            element: getElement(pages.TransactionCollection),
            path: paths.transactions.collections,
          },
          {
            element: getElement(pages.TransactionPayout),
            path: paths.transactions.payout,
          },
        ],
      },
      {
        element: <Outlet />,
        children: [
          {
            element: getElement(pages.WalletPage),
            path: paths.wallets.index,
          },
        ],
      },
      {
        element: <Outlet />,
        children: [
          {
            element: getElement(pages.USSDCollecCollections),
            path: paths.ussd_collect.index,
          },
          {
            element: getElement(pages.USSDCollecCollections),
            path: paths.ussd_collect.collections,
          },
        ],
      },
      {
        element: <Outlet />,
        children: [
          {
            element: getElement(pages.UsersPage),
            path: paths.users.index,
          },
          {
            element: getElement(pages.UserInformation),
            path: paths.users.transaction_history,
          },
        ],
      },
      {
        element: <Outlet />,
        children: [
          {
            element: getElement(pages.LocalServicesPage),
            path: paths.services.index,
          },
          {
            element: getElement(pages.GlobalServicesPage),
            path: paths.services.global_services,
          },
          {
            element: getElement(pages.LocalServicesPage),
            path: paths.services.local_services,
          },
        ],
      },
      {
        element: <SettingsLayout />,
        children: [
          {
            element: getElement(pages.NotificationsPage),
            path: paths.settings.index,
          },
          {
            element: getElement(pages.NotificationsPage),
            path: paths.settings.notification,
          },
          {
            element: getElement(pages.TeamManagementPage),
            path: paths.settings.team_management,
          },
          {
            element: getElement(pages.SecuritySettingsPage),
            path: paths.settings.security,
          },
          {
            element: getElement(pages.ApiKeysSettingsPage),
            path: paths.settings.api_keys,
          },
        ],
      },
      {
        element: <Outlet />,
        children: [
          {
            element: getElement(pages.CustomerSupportPage),
            path: paths.support.index,
          },
        ],
      },
      {
        element: <Outlet />,
        children: [
          {
            element: getElement(pages.CashbindingPage),
            path: paths.cashbinding.index,
          },
        ],
      },
      {
        element: <Outlet />,
        children: [
          {
            element: getElement(pages.PayoutsPage),
            path: paths.payouts.index,
          },
        ],
      },
      {
        element: <Outlet />,
        children: [
          {
            element: getElement(pages.PaymentLinksPage),
            path: paths.paymentLinks.index,
          },
        ],
      },
      {
        element: <Outlet />,
        children: [
          {
            element: getElement(pages.AccountsPage),
            path: paths.accounts.index,
          },
        ],
      },
      {
        element: <Outlet />,
        children: [
          {
            element: getElement(pages.StatementsPage),
            path: paths.statements.index,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: getElement(pages.NotFoundPage),
  },
]);

export default router;
