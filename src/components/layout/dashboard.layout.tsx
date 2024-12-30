import { Header } from "@components/skeleton/header";
import { Sidebar } from "@components/skeleton/sidebar";
import ModalProvider from "context/modal";
import { Outlet } from "react-router-dom";

export const DashboardLayout = () => {
  return (
    <ModalProvider>
      <div className="">
        <Header />
        <div className="py-[3rem] px-[5.875rem]">
          <div className="mb-5">
            <p className="flex gap-x-2 items-center mb-2">
              <span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.6667 2.66675H3.33333C2.59695 2.66675 2 3.2637 2 4.00008V13.3334C2 14.0698 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0698 14 13.3334V4.00008C14 3.2637 13.403 2.66675 12.6667 2.66675Z"
                    stroke="#7D8592"
                    strokeWidth="1.52381"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.6665 1.33325V3.99992"
                    stroke="#7D8592"
                    strokeWidth="1.52381"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.3335 1.33325V3.99992"
                    stroke="#7D8592"
                    strokeWidth="1.52381"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 6.66675H14"
                    stroke="#7D8592"
                    strokeWidth="1.52381"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-sm text-[#7D8592] font-medium">
                Friday, Oct 25 2022.
              </span>
            </p>
            <h2 className="font-bold text-[#7D8592] text-2xl">Good evening</h2>
          </div>
          <div className="grid grid-cols-12 gap-x-6">
            <div className="col-span-2 ">
              <Sidebar />
            </div>
            <div className="col-span-10">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </ModalProvider>
  );
};
