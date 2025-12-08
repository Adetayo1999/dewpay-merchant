export const paths = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    forgot_password: "/auth/forgot_password",
    reset_password: "/auth/reset_password",
    otp: "/auth/otp",
  },
  complaince: {
    index: "/compliance",
    checklist: "/compliance/checklist",
    business_information: "/compliance/business_information",
    document_uploads: "/compliance/document_uploads",
    two_fa: "/compliance/two_fa",
  },
  dashboard: {
    index: "/",
  },
  wallets: {
    index: "/wallets",
  },
  transactions: {
    index: "/transactions",
    collections: "/transactions/collections",
    payout: "/transactions/payout",
  },
  ussd_collect: {
    index: "/ussd_collect",
    collections: "/ussd_collect/collections",
    settings: "/ussd_collect/settings",
  },
  users: {
    index: "/users",
    transaction_history: "/users/:id",
  },
  services: {
    index: "/services",
    local_services: "/services/local_services",
    global_services: "/services/global_services",
  },
  settings: {
    index: "/settings",
    notification: "/settings/notification",
    team_management: "/settings/team_management",
    security: "/settings/security",
    api_keys: "/settings/api-keys",
    profile: "/settings/profile",
  },
  support: {
    index: "/support",
  },
  cashbinding: {
    index: "/withdrawal/phone",
  },
  payouts: {
    index: "/payouts",
  },
  paymentLinks: {
    index: "/payment-links",
  },
  accounts: {
    index: "/accounts",
  },
  statements: {
    index: "/statements",
  },
};
