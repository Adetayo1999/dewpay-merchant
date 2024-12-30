import { formatCurrency } from "@lib/number-formatter";

interface MerchantWalletCardProps {
  amount: number;
  currency: string;
  bank: string;
  account_number: string;
}

const MerchantWalletCard: React.FC<MerchantWalletCardProps> = (props) => {
  return (
    <div className=" bg-[linear-gradient(258.35deg,#B469FF_-0.64%,#8555C1_96.47%)] relative even:bg-[linear-gradient(258.35deg,#6C95FF_-0.65%,#3D69DB_96.47%)] md:w-[21.188rem] h-[11.938rem] rounded-xl flex flex-col justify-between shadow-[0px_4px_24px_0px_#00000040] px-[1.563rem] py-[0.813rem] pt-[2.125rem]">
      <div className="relative z-50">
        <p className="text-xs md:text-sm text-[#FFFFFF99]">Current Balance</p>
        <h3 className="text-[#FFFFFF] font-bold text-[1.65rem] md:text-[1.75rem]">
          {formatCurrency(props.amount, props.currency)}
        </h3>
      </div>
      <div className="flex justify-between relative z-50">
        <div className="">
          <p className="text-xs md:text-sm text-[#FFEF60] font-semibold mb-2 md:mb-0 ">
            {props.account_number.slice(0, 8) + "* ****"}
          </p>
          <p className="text-xs text-[#FFEF60] tracking-[20%]">{props.bank}</p>
        </div>
        <div className="flex">
          <div className="bg-[#FFFFFF40] h-[1.875rem] w-[1.875rem] rounded-full" />
          <div className="bg-[#FFFFFF40] h-[1.875rem] w-[1.875rem] rounded-full -ml-3" />
        </div>
      </div>
      <div className="absolute z-10 top-0 h-full">
        <svg
          width="387"
          height="239"
          viewBox="0 0 387 239"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M29.1869 113.977C-36.0136 156.526 9.6924 215.972 40.6955 240.376C136.557 314.945 147.791 228.055 286.24 291.995C424.688 355.936 396.932 310.939 572.263 94.9718C747.594 -120.995 517.714 -118.475 489.558 -76.1443C461.403 -33.8134 410.601 -53.5807 347.496 -118.775C284.391 -183.97 125.748 -69.0004 153.266 0.288365C180.783 69.5772 110.688 60.7914 29.1869 113.977Z"
            stroke="white"
            strokeOpacity="0.13"
          />
          <path
            d="M58.0342 111.637C-0.712917 150.017 40.4806 203.654 68.4208 225.676C154.812 292.965 164.924 214.574 289.689 272.279C414.453 329.984 389.437 289.384 547.401 94.5598C705.365 -100.264 498.219 -98.0202 472.853 -59.8326C447.487 -21.645 401.707 -39.4858 344.834 -98.3128C287.962 -157.14 145.023 -53.4341 169.828 9.08222C194.633 71.5985 131.468 63.6629 58.0342 111.637Z"
            stroke="white"
            strokeOpacity="0.13"
          />
          <path
            d="M80.4104 109.946C26.6758 145.013 64.3441 194.004 89.8951 214.116C168.899 275.572 178.157 203.962 292.259 256.659C406.36 309.355 383.485 272.27 527.983 94.2829C672.481 -83.7047 483.027 -81.6281 459.823 -46.7413C436.618 -11.8546 394.75 -28.1457 342.743 -81.8754C290.735 -135.605 159.991 -40.8538 182.669 16.2502C205.347 73.3541 147.579 66.1134 80.4104 109.946Z"
            stroke="white"
            strokeOpacity="0.13"
          />
          <path
            d="M101.53 107.659C52.5509 139.644 86.8918 184.341 110.185 202.691C182.206 258.762 190.64 193.435 294.654 241.518C398.669 289.601 377.814 255.768 509.517 93.4067C641.22 -68.9543 468.523 -67.0756 447.373 -35.2513C426.224 -3.42706 388.057 -18.2925 340.645 -67.3128C293.233 -116.333 174.06 -29.9052 194.737 22.1909C215.414 74.2871 162.754 67.6768 101.53 107.659Z"
            stroke="white"
            strokeOpacity="0.13"
          />
          <path
            d="M124.492 105.901C80.6655 134.557 111.403 174.616 132.251 191.064C196.71 241.321 204.249 182.781 297.337 225.885C390.426 268.989 371.759 238.667 489.596 93.188C607.433 -52.2906 452.887 -50.632 433.965 -22.1162C415.043 6.39967 380.886 -6.9273 338.45 -50.8631C296.014 -94.799 189.379 -17.3649 207.89 29.3234C226.402 76.0117 179.276 70.0803 124.492 105.901Z"
            stroke="white"
            strokeOpacity="0.13"
          />
          <path
            d="M148.634 104.069C110.217 129.164 137.155 164.235 155.425 178.633C211.918 222.629 218.532 171.373 300.119 209.102C381.706 246.832 365.347 220.285 468.647 92.8987C571.946 -34.488 436.487 -33.0188 419.899 -8.0497C403.311 16.9194 373.374 5.25476 336.184 -33.2086C298.994 -71.6719 205.521 -3.86279 221.741 37.0131C237.961 77.8889 196.656 72.7009 148.634 104.069Z"
            stroke="white"
            strokeOpacity="0.13"
          />
        </svg>
      </div>
    </div>
  );
};

export const MerchantWallets = () => {
  return (
    <div className="flex flex-col md:flex-row gap-y-6 gap-x-6">
      <MerchantWalletCard
        currency="NGN"
        amount={200200000}
        account_number="4444 2212 4444"
        bank="GT Bank"
      />
      <MerchantWalletCard
        currency="NGN"
        amount={200200000}
        account_number="4444 2212 4444"
        bank="Access Bank"
      />
    </div>
  );
};
