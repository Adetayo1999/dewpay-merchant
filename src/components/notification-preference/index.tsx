import { ArrowRightIcon } from "@assets/icons/arrow-right-icon";
import { CustomToggle } from "@components/custom-toggle";
import { EmailNotificationPreferenceModal } from "@components/modals/settings/email-notification-preference-modal";
import { PhoneNotificationPreferenceModal } from "@components/modals/settings/phone-notification-preference-modal";
import { useModal } from "context/modal";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export const NotificationPreference = () => {
  const { setModalContent } = useModal();

  return (
    <div className="shadow-[0px_0px_23px_0px_#0000001A] bg-white min-h-[20rem] md:min-h-[40rem] rounded-[0.938rem]  py-[1.563rem] px-[2rem] md:px-[5.254rem]">
      <div className="mb-10 md:mb-6">
        <h1 className="text-base md:text-lg text-[#7D8592] font-semibold">
          Notification Preference
        </h1>
      </div>

      <div className="flex flex-col gap-y-5">
        <NotificationComponent
          title="Email"
          description="Email Address"
          value="test@test.com"
          onClick={() => setModalContent(<EmailNotificationPreferenceModal />)}
        />
        <NotificationComponent
          title="SMS"
          description="Phone Number"
          value="08060750426"
          onClick={() => setModalContent(<PhoneNotificationPreferenceModal />)}
        />
      </div>
    </div>
  );
};

const NotificationComponent: React.FC<{
  title: string;
  description: string;
  value: string;
  onClick?: VoidFunction;
}> = (props) => {
  const [state, setState] = useState(false);

  return (
    <div className="flex flex-col gap-y-6 text-xs md:text-sm text-[#7D8592] border-b border-[#2022240D] pb-5 last:border-none">
      <div className="flex justify-between items-center">
        <p className="">{props.title}</p>
        <CustomToggle onChange={(s) => setState(s)} />
      </div>
      <AnimatePresence>
        {state && (
          <motion.div
            className="flex justify-between items-center"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p>{props.description}</p>
            <button
              className="flex items-center gap-x-3"
              onClick={props.onClick}
            >
              <span className=" text-[#20222466]">{props.value}</span>
              <span>
                <ArrowRightIcon scale={0.8} />
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
