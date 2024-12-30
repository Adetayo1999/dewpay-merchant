export const UserInformationCard = () => {
  return (
    <div className="bg-[#122A2C] rounded-[0.938rem] py-[1.938rem] px-[2rem] flex flex-col gap-y-10 md:flex-row justify-between gap-x-10">
      <div className="flex flex-col gap-y-3">
        <div className="flex items-center justify-between md:justify-start md:gap-x-16">
          <h2 className="font-bold text-xl md:text-3xl text-white">
            08012345678
          </h2>
          <button className="text-[#EF533A] text-xs md:text-sm underline font-medium">
            Block User
          </button>
        </div>
        <p className="text-sm md:text-[0.938rem] font-medium text-white">
          Juan Alexander
        </p>
        <p className="text-sm md:text-[0.938rem] font-medium text-white flex gap-x-2 items-center">
          <span>ID:</span>
          <span>6729</span>
        </p>
      </div>
      <div className="text-[#FFFFFF80] flex flex-col gap-y-4 text-xs md:text-[0.938rem]">
        <div className="flex gap-x-10 min-w-52 justify-between">
          <p className="font-medium">USSD</p>
          <p className="font-bold">32</p>
        </div>
        <div className="flex gap-x-10 min-w-52 justify-between">
          <p className="font-medium">Payment Link</p>
          <p className="font-bold">45</p>
        </div>
      </div>
    </div>
  );
};
