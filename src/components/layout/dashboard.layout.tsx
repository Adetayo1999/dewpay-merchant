import { Header } from "@components/skeleton/header";
import { Sidebar } from "@components/skeleton/sidebar";
import ModalProvider from "context/modal";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

export const DashboardLayout = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDate(now);

      const hour = now.getHours();
      if (hour < 12) {
        setGreeting("Good morning");
      } else if (hour < 17) {
        setGreeting("Good afternoon");
      } else {
        setGreeting("Good evening");
      }
    };

    // Update immediately
    updateDateTime();

    // Update every minute
    const interval = setInterval(updateDateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <ModalProvider>
      <div className="">
        <Header />
        <div className="py-[2.5rem] md:py-[3rem] px-[1.375rem] md:px-[5.875rem]">
          <div className="mb-5 text-center md:text-left">
            <p className="inline-flex  gap-x-2 items-center mb-2">
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
              <span className="text-xs md:text-sm text-[#7D8592] font-medium">
                {formatDate(currentDate)}
              </span>
            </p>
            <h2 className="font-bold text-[#7D8592] text-2xl">{greeting}</h2>
          </div>
          <div className="md:grid grid-cols-12 gap-x-6 ">
            <div className="col-span-2 mb-5 md:mb-0 hidden md:block">
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
