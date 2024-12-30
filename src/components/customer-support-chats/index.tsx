import clsx from "clsx";

interface CustomerSupportChatListCardProps {
  message: string;
  date: string;
  sent: boolean;
}

export const CustomerSupportChats = () => {
  return (
    <div className=" overflow-hidden grid grid-cols-1 gap-y-10 md:grid-cols-12 gap-x-2">
      <CustomerSupportChatList />
      <CustomerSupportSelectedChat />
    </div>
  );
};

const CustomerSupportChatListCard: React.FC<
  CustomerSupportChatListCardProps
> = (props) => {
  return (
    <div
      className={clsx(
        "px-4 py-3 flex justify-between items-center cursor-pointer",
        props.sent ? "bg-[#F2F1F5]" : "border border-[#E9ECEF] rounded"
      )}
    >
      <div className="">
        <h3
          className={clsx(
            "text-sm md:text-base mb-1",
            props.sent ? " text-[#797D8C]   " : "font-bold text-[#202224]"
          )}
        >
          {props.message}
        </h3>
        <small
          className={clsx(
            "text-xs",
            props.sent ? "text-[#797D8C]" : "font-bold text-[#202224]"
          )}
        >
          {props.date}
        </small>
      </div>
      <div className="">
        {!props.sent && (
          <svg
            width="20"
            height="20"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.6" clipPath="url(#clip0_293_9408)">
              <path
                d="M13.1193 2.2207C10.9682 2.2207 8.86541 2.85858 7.07684 4.05366C5.28827 5.24875 3.89425 6.94736 3.07106 8.93472C2.24788 10.9221 2.03249 13.1089 2.45215 15.2187C2.87181 17.3284 3.90766 19.2664 5.42871 20.7874C6.94977 22.3085 8.88771 23.3443 10.9975 23.764C13.1072 24.1836 15.2941 23.9683 17.2814 23.1451C19.2688 22.3219 20.9674 20.9279 22.1625 19.1393C23.3576 17.3507 23.9954 15.2479 23.9954 13.0968C23.9954 10.2123 22.8496 7.44592 20.8099 5.40625C18.7702 3.36658 16.0038 2.2207 13.1193 2.2207ZM13.1193 22.6134C11.2371 22.6134 9.39715 22.0553 7.83215 21.0096C6.26715 19.9639 5.04738 18.4776 4.32709 16.7387C3.6068 14.9997 3.41834 13.0863 3.78554 11.2402C4.15274 9.39419 5.05911 7.69849 6.39004 6.36757C7.72096 5.03665 9.41666 4.13028 11.2627 3.76308C13.1087 3.39588 15.0222 3.58434 16.7611 4.30463C18.5001 5.02492 19.9864 6.24469 21.0321 7.80969C22.0778 9.37468 22.6359 11.2146 22.6359 13.0968C22.6359 15.6208 21.6333 18.0414 19.8486 19.8261C18.0638 21.6108 15.6433 22.6134 13.1193 22.6134Z"
                fill="#202224"
              />
              <path
                d="M13.7428 13.3682V8.16804C13.7428 7.98776 13.6712 7.81486 13.5437 7.68738C13.4162 7.5599 13.2433 7.48828 13.0631 7.48828C12.8828 7.48828 12.7099 7.5599 12.5824 7.68738C12.4549 7.81486 12.3833 7.98776 12.3833 8.16804V14.0955L16.3939 16.8146C16.4678 16.8701 16.5522 16.91 16.642 16.9319C16.7318 16.9537 16.8252 16.957 16.9163 16.9415C17.0075 16.926 17.0945 16.8921 17.1721 16.8418C17.2496 16.7916 17.3162 16.726 17.3675 16.6492C17.4189 16.5723 17.4541 16.4858 17.4709 16.3949C17.4877 16.304 17.4858 16.2106 17.4653 16.1205C17.4448 16.0304 17.4061 15.9453 17.3516 15.8707C17.2971 15.796 17.228 15.7332 17.1484 15.6862L13.7428 13.3682Z"
                fill="#202224"
              />
              <path
                d="M6.3182 13.0559C6.31199 11.8331 6.63776 10.6314 7.26078 9.57918C7.8838 8.52691 8.78072 7.66345 9.8559 7.08086C10.9311 6.49827 12.1442 6.21839 13.3659 6.27106C14.5877 6.32373 15.7722 6.70698 16.7933 7.37995L17.3711 6.45548C16.4012 5.82017 15.3027 5.40756 14.1544 5.24727C13.0061 5.08698 11.8366 5.183 10.7299 5.52842C9.6231 5.87384 8.60659 6.4601 7.75333 7.24508C6.90008 8.03005 6.23127 8.99426 5.79495 10.0684C5.35863 11.1426 5.16563 12.3001 5.22981 13.4577C5.294 14.6154 5.61378 15.7444 6.16617 16.7638C6.71857 17.7831 7.48987 18.6675 8.42467 19.3533C9.35948 20.0392 10.4346 20.5094 11.5727 20.7304L11.7563 19.6904C10.2254 19.3779 8.84898 18.5476 7.85854 17.3393C6.8681 16.131 6.32414 14.6183 6.3182 13.0559Z"
                fill="#202224"
              />
            </g>
            <defs>
              <clipPath id="clip0_293_9408">
                <rect
                  width="24.4713"
                  height="24.4713"
                  fill="white"
                  transform="translate(0.885742 0.861328)"
                />
              </clipPath>
            </defs>
          </svg>
        )}
        {props.sent && (
          <svg
            width="25"
            height="24"
            viewBox="0 0 31 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.6">
              <path
                d="M17.3907 9.48364C17.6493 9.2375 17.9933 9.10142 18.3503 9.10412C18.7072 9.10682 19.0492 9.24809 19.304 9.49811C19.5587 9.74814 19.7064 10.0874 19.7159 10.4442C19.7253 10.8011 19.5958 11.1476 19.3545 11.4108L12.0315 20.5691C11.9056 20.7048 11.7536 20.8136 11.5847 20.8892C11.4157 20.9647 11.2333 21.0054 11.0482 21.0088C10.8632 21.0123 10.6793 20.9783 10.5077 20.9091C10.3361 20.8399 10.1802 20.7367 10.0493 20.6058L5.193 15.7495C5.05775 15.6235 4.94928 15.4715 4.87405 15.3027C4.79881 15.1338 4.75836 14.9515 4.7551 14.7667C4.75184 14.5819 4.78584 14.3983 4.85507 14.2269C4.9243 14.0555 5.02734 13.8998 5.15805 13.7691C5.28876 13.6384 5.44446 13.5353 5.61586 13.4661C5.78726 13.3969 5.97085 13.3629 6.15568 13.3661C6.3405 13.3694 6.52278 13.4099 6.69163 13.4851C6.86048 13.5603 7.01244 13.6688 7.13846 13.804L10.9817 17.6454L17.354 9.52401L17.3907 9.48364ZM15.7022 18.9173L17.3907 20.6058C17.5215 20.7364 17.6773 20.8393 17.8488 20.9084C18.0202 20.9775 18.2039 21.0113 18.3887 21.0079C18.5735 21.0045 18.7557 20.9638 18.9245 20.8885C19.0933 20.8131 19.2452 20.7045 19.3711 20.5691L26.6978 11.4108C26.8294 11.2808 26.9335 11.1257 27.0038 10.9546C27.0741 10.7836 27.1092 10.6001 27.1071 10.4151C27.1049 10.2302 27.0655 10.0476 26.9912 9.87823C26.9169 9.70886 26.8093 9.5562 26.6747 9.42936C26.54 9.30253 26.3813 9.20412 26.2078 9.14001C26.0343 9.07591 25.8497 9.04742 25.6649 9.05626C25.4802 9.06509 25.2991 9.11107 25.1325 9.19143C24.966 9.2718 24.8173 9.38491 24.6954 9.52401L18.3212 17.6454L17.4311 16.7534L15.7022 18.9173Z"
                fill="#0A1629"
              />
            </g>
          </svg>
        )}
      </div>
    </div>
  );
};

const CustomerSupportChatList = () => {
  return (
    <div className="md:col-span-4  border border-[#E4E6E8] rounded-lg h-[48.188rem] ">
      <div className="border-[#E4E6E8] border-b p-3 pt-5 mb-5">
        <div className="relative">
          <input
            type="text"
            name=""
            id=""
            className="border border-[#E9ECEF] h-[2.5rem] w-full rounded focus:ring-2 focus:ring-primary focus:ring-opacity-40 outline-none transition-all duration-200 pl-10 text-sm"
            placeholder="Search..."
          />
          <button className="absolute left-2 top-2">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse
                cx="12.1902"
                cy="11.0269"
                rx="8.90898"
                ry="8.69686"
                stroke="#ADB5BD"
                strokeWidth="1.9577"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.3848 17.5273L21.8776 20.9282"
                stroke="#ADB5BD"
                strokeWidth="1.9577"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="px-3 flex flex-col gap-y-1">
        <CustomerSupportChatListCard
          message="My payment link is not working..."
          date="12:32am 14 Jun"
          sent={false}
        />
        <CustomerSupportChatListCard
          message="My payment link is not working..."
          date="12:32am 14 Jun"
          sent
        />
        <CustomerSupportChatListCard
          message="My payment link is not working..."
          date="12:32am 14 Jun"
          sent
        />
        <CustomerSupportChatListCard
          message="My payment link is not working..."
          date="12:32am 14 Jun"
          sent
        />
      </div>
      <div className="px-3 mt-3">
        <button className="text-primary font-bold text-xs md:text-sm px-4 py-2 rounded hover:bg-primary hover:bg-opacity-5">
          + New Message
        </button>
      </div>
    </div>
  );
};

const CustomerSupportSelectedChat = () => {
  return (
    <div className="md:col-span-8  flex flex-col h-[48.188rem]">
      <div className="flex items-center gap-x-5 py-2.5">
        <div className="w-[2rem] h-[2rem] bg-slate-100 rounded-full" />
        <div className="">
          <h2 className="font-bold text-[#797D8C]  text-lg md:text-xl">
            Charles Avis
          </h2>
          <p className="text-sm text-[#797D8C]">acharles@dewpay.com</p>
        </div>
      </div>
      <div className="flex-grow border border-[#E4E6E8] rounded-lg overflow-hidden   relative">
        <div className="flex flex-col gap-y-6 md:gap-y-5 p-4 pb-[5rem]  h-[44rem] overflow-y-auto ">
          {messages.map((item, idx) => (
            <CustomerSupportMessageCard {...item} key={idx} />
          ))}
        </div>

        <div className="absolute z-[1000] w-full bottom-0 gap-x-4 flex border-t border-[#E0E0E0] px-6   h-[3.75rem] bg-white">
          <input
            type="text"
            name=""
            id=""
            placeholder="Write message..."
            className="h-full text-sm md:text-base flex-1 border-none outline-none "
          />
          <div className="flex-shrink-0 flex gap-x-5 items-center">
            <button>
              <svg
                width="17"
                height="20"
                viewBox="0 0 17 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.41605 17.0484C0.385698 14.9492 0.420111 11.6112 2.45046 9.54639L9.67714 2.14765C11.1913 0.599078 13.669 0.599078 15.2176 2.14765C16.6973 3.69623 16.7318 6.20836 15.2176 7.75693L8.92006 14.1921C7.88768 15.2245 6.20145 15.2245 5.20348 14.1577C4.20551 13.1253 4.23993 11.4735 5.2379 10.4755L10.1933 5.41686C10.3998 5.21039 10.7439 5.17597 10.9848 5.41686L11.7419 6.17394C11.9828 6.38042 11.9828 6.72455 11.7763 6.96544L6.82088 11.9897C6.64882 12.1618 6.64882 12.4715 6.78647 12.6435C6.95853 12.7812 7.19942 12.7812 7.33707 12.6435L13.6346 6.20836C14.2885 5.5201 14.2885 4.38448 13.6346 3.69623C12.9808 3.04238 11.914 3.04238 11.2601 3.69623L4.03345 11.095C2.829 12.2994 2.829 14.2954 3.99904 15.4998C5.16907 16.7042 7.06177 16.7042 8.23181 15.4998L14.1508 9.44316C14.3573 9.23668 14.7014 9.23668 14.9079 9.44316L15.6994 10.2346C15.9403 10.4411 15.9403 10.7853 15.7338 10.9917L9.81479 17.0484C7.75003 19.1476 4.4464 19.1131 2.41605 17.0484Z"
                  fill="#9D9D9D"
                />
              </svg>
            </button>
            <button>
              <svg
                width="14"
                height="19"
                viewBox="0 0 14 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.717 5.17597V5.38245H9.31215V0.977618H9.51863C9.72511 0.977618 9.93158 1.08086 10.1036 1.25292L13.4417 4.59096C13.6137 4.76302 13.717 4.9695 13.717 5.17597ZM9.03685 6.48366H13.717V17.771C13.717 18.2528 13.3384 18.5969 12.8911 18.5969H1.32839C0.846616 18.5969 0.502488 18.2528 0.502488 17.771V1.80352C0.502488 1.35616 0.846616 0.977618 1.32839 0.977618H8.21094V5.65775C8.21094 6.13953 8.55507 6.48366 9.03685 6.48366ZM4.35672 7.03426C3.46198 7.03426 2.7049 7.79134 2.7049 8.68607C2.7049 9.61522 3.46198 10.3379 4.35672 10.3379C5.28586 10.3379 6.00853 9.61522 6.00853 8.68607C6.00853 7.79134 5.28586 7.03426 4.35672 7.03426ZM11.5146 15.2933V11.4391L10.1725 10.097C10.0004 9.92493 9.72511 9.92493 9.58745 10.097L6.00853 13.6415L4.66643 12.2994C4.49437 12.1273 4.25348 12.1273 4.08141 12.265L2.73932 13.6415L2.7049 15.2933H11.5146Z"
                  fill="#9D9D9D"
                />
              </svg>
            </button>
            <button className="bg-primary flex items-center md:min-w-32 px-2.5 md:px-0 gap-x-2 text-sm text-white rounded-md justify-center py-2.5 font-semibold ">
              <span className="hidden md:block"> Send</span>
              <span>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.1226 1.12437C11.5126 0.894954 12.0174 1.21614 11.9256 1.67498L10.2738 11.5858C10.2279 11.9529 9.83789 12.1594 9.51671 12.0217L6.67192 10.8058L5.20364 12.5953C4.88246 12.9853 4.24009 12.7788 4.24009 12.2282V10.3699L9.74613 3.64797C9.86083 3.51032 9.6773 3.34973 9.56259 3.46444L2.97828 9.26872L0.523508 8.23634C0.110555 8.07575 0.064671 7.47926 0.477624 7.24984L11.1226 1.12437Z"
                    fill="white"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomerSupportMessageCard: React.FC<{
  message: string;
  date: string;
  sender?: string;
}> = (props) => {
  return (
    <div className={clsx("flex", !props.sender && "justify-end")}>
      <div className="flex items-end gap-x-5">
        {props.sender && (
          <div className="bg-[#D8D8D8] flex-shrink-0 rounded-full h-[2.375rem] w-[2.375rem] flex justify-center items-center text-sm font-bold text-primary ">
            {props.sender
              .split(" ")
              .map((item) => item[0])
              .join("")}
          </div>
        )}
        <div
          className={clsx(
            "w-fit max-w-[25rem] p-4 text-xs md:text-sm rounded-[0.938rem]",
            props.sender
              ? "bg-[#F5F5F5] rounded-bl-none"
              : "bg-primary rounded-br-none"
          )}
        >
          <p
            className={clsx(
              "mb-2 leading-[1.591rem] tracking-[0.1px] font-normal",
              props.sender ? "text-[#202224]" : "text-white"
            )}
          >
            {props.message}
          </p>
          <div className="flex justify-end items-center">
            <span
              className={clsx(
                "text-[0.625rem] md:text-xs",
                props.sender ? "text-[#757575]" : "text-white"
              )}
            >
              {props.date}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const messages = [
  {
    sender: "Arnalt Danjuma",
    message:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
    date: "6.30 pm",
  },
  {
    sender: "Arnalt Danjuma",
    message:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
    date: "6.30 pm",
  },
  {
    message:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
    date: "6.30 pm",
  },
  {
    sender: "Arnalt Danjuma",
    message:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
    date: "6.30 pm",
  },
  {
    sender: "Arnalt Danjuma",
    message:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
    date: "6.30 pm",
  },
  {
    message:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
    date: "6.30 pm",
  },
  {
    sender: "Arnalt Danjuma",
    message:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
    date: "6.30 pm",
  },
  {
    sender: "Arnalt Danjuma",
    message:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
    date: "6.30 pm",
  },
  {
    message:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
    date: "6.30 pm",
  },
];
