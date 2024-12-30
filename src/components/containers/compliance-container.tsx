import clsx from "clsx";
import { HTMLAttributes } from "react";

export const ComplianceContainer: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <div
      className={clsx(
        "bg-white shadow-[0px_0px_23px_0px_#0000001A] rounded-[0.938rem] py-[2.438rem] px-[5.25rem] min-h-[40rem]",
        className
      )}
      {...rest}
    >
      <div className="flex items-center gap-x-4 pb-4 border-b border-[#3333330D] mb-[1.688rem]">
        <div className="h-[3rem] w-[3rem] rounded-full bg-[#2022240D] flex justify-center items-center">
          <svg
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M28.7476 17.5501C28.7476 20.3795 26.7051 22.2501 24.1851 22.2501H5.80943C3.29068 22.2501 1.24756 20.1464 1.24756 17.5501V14.4501C1.24756 11.8539 3.29068 9.75012 5.80943 9.75012H24.1851C26.7051 9.75012 28.7476 11.8539 28.7476 14.4501V17.5501Z"
              fill="#3F51B5"
            />
            <path
              d="M14.9959 25.375C20.1397 25.375 24.3096 21.1777 24.3096 16C24.3096 10.8223 20.1397 6.625 14.9959 6.625C9.85204 6.625 5.68213 10.8223 5.68213 16C5.68213 21.1777 9.85204 25.375 14.9959 25.375Z"
              fill="#3F51B5"
            />
            <path
              d="M10.6243 12.8749H8.91428L8.39115 16.5368L7.74178 12.8924H6.20553L5.53928 16.5368L5.03303 12.8924H3.29053L4.7474 19.1249H6.28428L6.94928 15.2836L7.6299 19.1249H9.1824L10.6243 12.8749ZM11.8743 14.7499H13.4418V19.1249H11.8743V14.7499ZM13.4368 13.3418C13.441 13.447 13.4239 13.552 13.3865 13.6504C13.3492 13.7489 13.2923 13.8388 13.2193 13.9147C13.1464 13.9907 13.0588 14.0511 12.9619 14.0923C12.8651 14.1336 12.7608 14.1549 12.6555 14.1549C12.5502 14.1549 12.446 14.1336 12.3491 14.0923C12.2522 14.0511 12.1647 13.9907 12.0917 13.9147C12.0188 13.8388 11.9619 13.7489 11.9245 13.6504C11.8872 13.552 11.8701 13.447 11.8743 13.3418C11.8743 12.9068 12.2243 12.5555 12.6555 12.5555C13.0868 12.5555 13.4368 12.9068 13.4368 13.3418ZM24.0999 10.9999H19.113C19.113 10.9999 15.6243 11.1205 15.6243 14.6961V17.4061C15.6243 17.4061 15.6874 19.2443 13.7493 20.9999H24.2399C24.2399 20.9999 27.4993 20.9999 27.4993 17.5293V14.4799C27.4993 14.4799 27.3568 10.9999 24.0999 10.9999ZM23.3362 14.3555H19.8043V15.753H22.988V17.218H19.8043V19.1249H18.1243V12.8749H23.3362V14.3555ZM25.1555 12.5555C25.5862 12.5555 25.9368 12.9068 25.9368 13.3418C25.9368 13.7749 25.5862 14.1249 25.1555 14.1249C24.7249 14.1249 24.3743 13.7749 24.3743 13.3418C24.3743 12.9068 24.7249 12.5555 25.1555 12.5555ZM25.9418 19.1249H24.3743V14.7499H25.9418V19.1249Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="">
          <h4 className="text-[#7D8592] font-bold text-lg">CAP Suite</h4>
          <p className="text-sm text-[#7D8592]">alex.doe@gmail.com</p>
        </div>
      </div>
      {children}
    </div>
  );
};