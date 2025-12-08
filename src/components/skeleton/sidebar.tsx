import { motion, AnimatePresence } from "framer-motion";
import {
  ComplianceIcon,
  DashboardIcon,
  ServicesIcon,
  SettingsIcon,
  TransactionIcon,
  UsersIcon,
  USSDCollectIcon,
  WalletIcon,
  AccountIcon,
  StatementsIcon,
} from "@assets/icons";
import { paths } from "@routes/paths";
import clsx from "clsx";
import { Link, useLocation, useNavigate } from "react-router-dom";

export interface MenuItemType {
  name: string;
  icon: JSX.Element;
  path: string;
  isActive: boolean;
  children?: {
    name: string;
    path: string;
  }[];
  onClick?: VoidFunction;
}

export const Sidebar = () => {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const navigations: Array<MenuItemType> = [
    {
      name: "Dashboard",
      icon: <DashboardIcon />,
      path: paths.dashboard.index,
      isActive: pathname === paths.dashboard.index,
    },
    {
      name: "Wallets",
      icon: <WalletIcon />,
      path: paths.wallets.index,
      isActive: pathname === paths.wallets.index,
    },
    {
      name: "Transactions",
      icon: <TransactionIcon />,
      path: paths.transactions.index,
      isActive: pathname.includes(paths.transactions.index),
      children: [
        {
          name: "Collections",
          path: paths.transactions.collections,
        },
        {
          name: "Payout",
          path: paths.transactions.payout,
        },
      ],
    },
    // {
    //   name: "USSD Collect",
    //   icon: <USSDCollectIcon />,
    //   path: paths.ussd_collect.index,
    //   isActive: pathname.includes(paths.ussd_collect.index),
    //   children: [
    //     {
    //       name: "Collections",
    //       path: paths.ussd_collect.collections,
    //     },
    //     // {
    //     //   name: "Settings",
    //     //   path: paths.ussd_collect.settings,
    //     // },
    //   ],
    // },
    {
      name: "Customers",
      icon: <UsersIcon />,
      path: paths.users.index,
      isActive: pathname.includes(paths.users.index),
    },
    {
      name: "Cashbinding",
      icon: <USSDCollectIcon />, // Using USSD icon as placeholder
      path: paths.cashbinding.index,
      isActive: pathname.includes(paths.cashbinding.index),
    },
    {
      name: "Payouts",
      icon: <TransactionIcon />,
      path: paths.payouts.index,
      isActive: pathname.includes(paths.payouts.index),
    },
    {
      name: "Payment Links",
      icon: <ServicesIcon />,
      path: paths.paymentLinks.index,
      isActive: pathname.includes(paths.paymentLinks.index),
    },
    {
      name: "Accounts",
      icon: <AccountIcon />,
      path: paths.accounts.index,
      isActive: pathname.includes(paths.accounts.index),
    },
    {
      name: "Statements",
      icon: <StatementsIcon />,
      path: paths.statements.index,
      isActive: pathname.includes(paths.statements.index),
    },
    // {
    //   name: "Services",
    //   icon: <ServicesIcon />,
    //   path: paths.services.index,
    //   isActive: pathname.includes(paths.services.index),
    //   children: [
    //     {
    //       name: "Local Services",
    //       path: paths.services.local_services,
    //     },
    //     {
    //       name: "Global Services",
    //       path: paths.services.global_services,
    //     },
    //   ],
    // },
    {
      name: "Settings",
      icon: <SettingsIcon />,
      path: paths.settings.index,
      isActive: pathname.includes(paths.settings.index),
    },
  ];

  return (
    <div className="flex flex-col gap-y-[0.875rem]">
      <button
        className={clsx(
          "w-full h-[3.438rem] gap-x-6 items-center px-[1.563rem] text-sm py-[1.063rem] flex text-[#7D8592]  transition duration-300   shadow-[0px_0px_17.21px_0px_#0000001A] rounded-xl font-medium",
          location.pathname.includes(paths.complaince.index) &&
            "text-white bg-primary"
        )}
        onClick={() => navigate(paths.complaince.index)}
      >
        <span>
          <ComplianceIcon />
        </span>
        <span>Compliance</span>
      </button>
      <ul className="bg-white rounded-[0.938rem] shadow-[0px_0px_25px_0px_#0000001A] min-h-[25rem] py-[2rem] px-[1.875rem] flex flex-col gap-y-[1.75rem]">
        {navigations.map((item, idx) => (
          <MenuItem {...item} key={idx} />
        ))}
      </ul>
    </div>
  );
};

export const MenuItem: React.FC<MenuItemType> = ({
  icon,
  isActive,
  name,
  path,
  children,
  onClick,
}) => {
  const pathname = useLocation().pathname;

  return (
    <li className="text-xs md:text-sm" onClick={onClick}>
      <Link
        to={path}
        className={clsx(
          "text-[#7D8592] hover:text-primary flex items-center gap-x-3 transition duration-300",
          isActive && "text-primary font-bold"
        )}
      >
        <div className="flex items-center gap-x-4">
          <span>{icon}</span>
          <span className="">{name}</span>
        </div>
        {children && (
          <span
            className={clsx(
              "transition duration-300",
              !isActive && "rotate-180"
            )}
          >
            <svg
              width="9"
              height="6"
              viewBox="0 0 9 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.73438 1.26172L4.58709 4.8082C4.33843 5.0884 3.90082 5.0884 3.65215 4.8082L0.504867 1.26172"
                stroke="currentColor"
                strokeLinecap="round"
              />
            </svg>
          </span>
        )}
      </Link>

      <AnimatePresence>
        {children && isActive && (
          <motion.ul
            className="flex mt-4 ml-2 flex-col"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {children.map((child, idx) => (
              <motion.li
                key={idx}
                className={clsx(
                  "border-l-2 px-8 py-2 hover:bg-primary hover:bg-opacity-5 text-[#7D8592] hover:text-primary transition duration-300",
                  pathname === child.path || (idx === 0 && pathname === path)
                    ? "border-primary text-primary font-bold bg-primary bg-opacity-5"
                    : "border-[#D9D9D9]"
                )}
                initial={{ borderColor: "#D9D9D9" }}
                animate={{
                  borderColor:
                    pathname === child.path || (idx === 0 && pathname === path)
                      ? "#15707A"
                      : "#D9D9D9",
                }}
                transition={{ duration: 0.3 }}
              >
                <Link to={child.path}>{child.name}</Link>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
};
