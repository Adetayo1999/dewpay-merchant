import clsx from "clsx";
import { useModal } from "context/modal";
import { motion } from "framer-motion";

export const ModalContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  title?: string;
  hasCancel?: boolean;
}> = ({ children, className, title, hasCancel = true }) => {
  const { setModalContent } = useModal();

  return (
    <div
      className="py-[5rem] px-[10rem] 2xl:px-[13.313rem] 2xl:py-[7.875rem] bg-[#D9D9D966]   h-screen overflow-y-auto  fixed top-0 left-0 w-full z-[10000] flex justify-center items-center "
      onClick={() => setModalContent(null)}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "0%" }}
        exit={{ x: "-250%" }}
        // transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={clsx(
          " bg-white border border-[#DEE2E6] shadow-[0px_0px_2px_0px_#0000001F] md:rounded-lg rounded-2xl min-w-[27rem] md:w-fit 2xl:min-w-[35rem] px-4 py-3",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {hasCancel && (
          <div className="mb-6">
            <div className="flex justify-end">
              <button
                className="bg-[#15707A29] h-9 w-9 hover:bg-primary  text-[#15707A] hover:text-white flex justify-center items-center rounded-full"
                onClick={() => setModalContent(null)}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 3.88906L8.88906 0L10 1.11094L6.11094 5L10 8.88906L8.88906 10L5 6.11094L1.11094 10L0 8.88906L3.88906 5L0 1.11094L1.11094 0L5 3.88906Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
            {title && (
              <div className="text-center">
                <h2 className="text-[#202224] font-medium text-lg md:text-xl">
                  {title}
                </h2>
              </div>
            )}
          </div>
        )}
        {children}
      </motion.div>
    </div>
  );
};
