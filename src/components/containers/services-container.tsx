export const ServicesContainer: React.FC<{
  title: string;
  description: string;
  children: React.ReactNode;
}> = (props) => {
  return (
    <div className="bg-white shadow-[0px_0px_23px_0px_#0000001A] min-h-[41.625rem] rounded-[0.938rem] overflow-hidden">
      <div className="bg-services bgg-[linear-gradient(90deg,#122A2C_29.47%,rgba(115,98,245,0.2)_100%)] rounded-[0.938rem] min-h-[13.563rem] py-[2.625rem] px-[2.5rem]  md:px-[5.188rem] ">
        <div className="max-w-[28.5rem]">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 text-white">
            {props.title}
          </h2>
          <p className="text-[#FFFFFF80]  font-medium text-xs md:text-[0.938rem]">
            {props.description}
          </p>
        </div>
      </div>
      <div className="">{props.children}</div>
    </div>
  );
};
