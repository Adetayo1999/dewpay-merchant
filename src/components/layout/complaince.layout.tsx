import { paths } from "@routes/paths";
import clsx from "clsx";
import { NavLink, Outlet, useLocation } from "react-router-dom";

export const ComplianceLayout = () => {
  const pathname = useLocation().pathname;

  const navigation = [
    {
      title: "Quick Checklist",
      path: paths.complaince.checklist,
      isActive:
        pathname === paths.complaince.checklist ||
        pathname === paths.complaince.index,
    },
    {
      title: "Business Information",
      path: paths.complaince.business_information,
      isActive: pathname === paths.complaince.business_information,
    },
    {
      title: "Document Uploads",
      path: paths.complaince.document_uploads,
      isActive: pathname === paths.complaince.document_uploads,
    },
    {
      title: "2-Factor Authentication",
      path: paths.complaince.two_fa,
      isActive: pathname === paths.complaince.two_fa,
    },
  ];

  return (
    <div className="">
      <div className="mb-5">
        <nav className="border-b block border-[#EAECF0] relative">
          <ul className="flex items-end gap-x-4  md:gap-x-6 -mb-5 md:w-[80%] overflow-x-scroll">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={() =>
                  clsx(
                    "inline-block p-3   flex-shrink-0 capitalize border-b-2  min-w-[8rem] md:min-w-[9.5rem] rounded-t-lg text-xs md:text-sm font-medium text-center",
                    item.isActive
                      ? "text-primary border-primary"
                      : "text-[#7D8592] border-transparent"
                  )
                }
              >
                {item.title}
              </NavLink>
            ))}
          </ul>
        </nav>
      </div>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};
