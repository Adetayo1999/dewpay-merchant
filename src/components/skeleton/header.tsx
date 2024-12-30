import { NotificationIcon } from "@assets/icons/notitfication-icon";
import { UserIcon } from "@assets/icons/user-icon";
import { WhiteLogo } from "@assets/icons/white-logo";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-primary py-[1.188rem] flex justify-between items-center px-[5.875rem]">
      <div className="flex gap-x-2 items-center">
        <Link to="/">
          <WhiteLogo />
        </Link>
        <h3 className="font-bold text-[1.25rem] text-white">DewPay</h3>
      </div>
      <div className="relative">
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
        <button className="rounded-full bg-[#E9ECEF40] h-[3rem] w-[3rem] flex items-center justify-center focus:ring-2 focus:ring-[#E9ECEF] focus:ring-opacity-40  transition-all duration-200">
          <NotificationIcon scale={0.8} />
        </button>
        <button className="bg-[#E9ECEF40] h-[3rem] rounded-[2rem] flex items-center gap-x-2 pr-4 overflow-hidden focus:ring-2 focus:ring-[#E9ECEF] focus:ring-opacity-40  transition-all duration-200 ">
          <span className="bg-[#95959B] rounded-full h-[3rem] w-[3rem] flex items-center justify-center">
            <UserIcon scale={0.8} />
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
  );
};
