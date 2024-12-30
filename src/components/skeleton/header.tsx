import { LogoIcon } from "@assets/icons";
import { NotificationIcon } from "@assets/icons/notitfication-icon";
import { UserIcon } from "@assets/icons/user-icon";
import { WhiteLogo } from "@assets/icons/white-logo";
import { CiSearch } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ComplianceIcon,
  DashboardIcon,
  ServicesIcon,
  SettingsIcon,
  SupportIcon,
  TransactionIcon,
  UsersIcon,
  USSDCollectIcon,
  WalletIcon,
} from "@assets/icons";
import { paths } from "@routes/paths";
import clsx from "clsx";
import { MenuItem } from "./sidebar";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface MenuItemType {
  name: string;
  icon: JSX.Element;
  path: string;
  isActive: boolean;
  children?: {
    name: string;
    path: string;
  }[];
}

export const Header = () => {
  const [isNavActive, setIsNavActive] = useState(false);

  return (
    <>
      <header className="bg-primary py-[1.188rem] px-4 flex justify-between items-center md:px-[5.875rem]">
        <div className="md:hidden">
          <button
            className="bg-white rounded-full h-[2.8rem] w-[2.8rem] flex justify-center items-center"
            onClick={() => setIsNavActive(true)}
          >
            <svg
              width="16"
              height="10"
              viewBox="0 0 18 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1 12H17C17.55 12 18 11.55 18 11C18 10.45 17.55 10 17 10H1C0.45 10 0 10.45 0 11C0 11.55 0.45 12 1 12ZM1 7H17C17.55 7 18 6.55 18 6C18 5.45 17.55 5 17 5H1C0.45 5 0 5.45 0 6C0 6.55 0.45 7 1 7ZM0 1C0 1.55 0.45 2 1 2H17C17.55 2 18 1.55 18 1C18 0.45 17.55 0 17 0H1C0.45 0 0 0.45 0 1Z"
                fill="#15707A"
              />
            </svg>
          </button>
        </div>
        <div className="flex gap-x-2 items-center">
          <Link to="/" className="hidden md:inline-block">
            <WhiteLogo />
          </Link>
          <Link to="/" className="md:hidden">
            <WhiteLogo scale={0.85} />
          </Link>
          <h3 className="font-bold text-lg md:text-[1.25rem] text-white">
            DewPay
          </h3>
        </div>
        <div className="hidden md:block relative">
          <input
            type="text"
            name=""
            id=""
            placeholder="Search"
            className="border pl-12 border-[#E9ECEF]  border-opacity-50  w-[25rem] h-[3rem] bg-transparent rounded px-4 py-1 placeholder:text-[#ADB5BD] text-white outline-none focus:ring-2 focus:ring-[#E9ECEF] focus:ring-opacity-40  transition-all duration-200"
          />
          <div className="absolute top-[20%] left-3">
            <button>
              <CiSearch className="size-7 text-white" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-x-14">
          <button className="hidden  rounded-full bg-[#E9ECEF40] h-[3rem] w-[3rem] md:flex items-center justify-center focus:ring-2 focus:ring-[#E9ECEF] focus:ring-opacity-40  transition-all duration-200">
            <NotificationIcon scale={0.8} />
          </button>
          <button className="bg-[#E9ECEF40] h-[2.5rem] md:h-[3rem] rounded-[2rem] flex items-center gap-x-2 pr-2 md:pr-4 overflow-hidden focus:ring-2 focus:ring-[#E9ECEF] focus:ring-opacity-40   transition-all duration-200 ">
            <span className="bg-[#95959B] rounded-full h-[3rem] w-[3rem] hidden md:flex items-center justify-center">
              <UserIcon scale={0.8} />
            </span>
            <span className="bg-[#95959B] rounded-full  md:h-[3rem] md:w-[3rem] h-[2.5rem] w-[2.5rem] flex-shrink-0 md:hidden flex items-center justify-center">
              <UserIcon scale={0.65} />
            </span>
            <span>
              <svg
                width="10"
                height="5"
                viewBox="0 0 10 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0L5 5L10 0H0Z" fill="#042425" />
              </svg>
            </span>
          </button>
        </div>
      </header>
      <MobileNavigation
        isNavActive={isNavActive}
        setIsNavActive={setIsNavActive}
      />
    </>
  );
};

const MobileNavigation: React.FC<{
  setIsNavActive: React.Dispatch<React.SetStateAction<boolean>>;
  isNavActive: boolean;
}> = ({ setIsNavActive, isNavActive }) => {
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
    {
      name: "USSD Collect",
      icon: <USSDCollectIcon />,
      path: paths.ussd_collect.index,
      isActive: pathname.includes(paths.ussd_collect.index),
      children: [
        {
          name: "Collections",
          path: paths.ussd_collect.collections,
        },
        // {
        //   name: "Settings",
        //   path: paths.ussd_collect.settings,
        // },
      ],
    },
    {
      name: "Users",
      icon: <UsersIcon />,
      path: paths.users.index,
      isActive: pathname.includes(paths.users.index),
    },
    {
      name: "Services",
      icon: <ServicesIcon />,
      path: paths.services.index,
      isActive: pathname.includes(paths.services.index),
      children: [
        {
          name: "Local Services",
          path: paths.services.local_services,
        },
        {
          name: "Global Services",
          path: paths.services.global_services,
        },
      ],
    },
    {
      name: "Settings",
      icon: <SettingsIcon />,
      path: paths.settings.index,
      isActive: pathname.includes(paths.settings.index),
    },
  ];

  const closeModal = () => setIsNavActive(false);

  return (
    <AnimatePresence>
      {isNavActive && (
        <motion.div
          className="md:hidden  h-[100dvh] fixed w-full top-0 bg-white z-[10000000] py-4"
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="flex justify-between items-center pb-4 border-b border-opacity-40 px-6 mb-10">
            <Link
              to={paths.dashboard.index}
              onClick={closeModal}
              className="flex items-center gap-x-2"
            >
              <LogoIcon scale={0.65} />
              <span className="text-[#202224] text-sm font-bold uppercase ">
                DewPay
              </span>
            </Link>

            <button className="text-2xl text-primary" onClick={closeModal}>
              <FaTimes />
            </button>
          </div>
          <div className="px-6 flex flex-col gap-y-[1.75rem]">
            <button
              className={clsx(
                "w-full h-[3.438rem] gap-x-6 items-center px-[1.563rem] text-xs py-[1.063rem] flex text-[#7D8592]  transition duration-300   shadow-[0px_0px_17.21px_0px_#0000001A] rounded-xl font-semibold",
                location.pathname.includes(paths.complaince.index) &&
                  "text-white bg-primary"
              )}
              onClick={() => {
                navigate(paths.complaince.index);
                closeModal();
              }}
            >
              <span>
                <ComplianceIcon scale={0.85} />
              </span>
              <span>Compliance</span>
            </button>
            <ul className="flex flex-col gap-y-[1.75rem]">
              {navigations.map((item, idx) => (
                <MenuItem {...item} key={idx} onClick={closeModal} />
              ))}
            </ul>
            <button
              className={clsx(
                "w-full h-[3.438rem] gap-x-6 items-center px-[1.563rem] text-xs py-[1.063rem] flex  transition duration-300  text-[#7D8592]  shadow-[0px_0px_17.21px_0px_#0000001A] rounded-xl font-medium",
                location.pathname === paths.support.index &&
                  "bg-[#3B3F47] text-white"
              )}
              onClick={() => {
                navigate(paths.support.index);
                closeModal();
              }}
            >
              <span>
                <SupportIcon scale={1.2} />
              </span>
              <span>Chat Support</span>
            </button>
          </div>

          <div className="absolute text-gray-400 text-[0.625rem] font-medium text-center bottom-4 w-full">
            <p>&copy; Copyright 2024 DEWPAY</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
