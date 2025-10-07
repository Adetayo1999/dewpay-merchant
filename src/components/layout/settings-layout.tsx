import { paths } from "@routes/paths";
import clsx from "clsx";
import { NavLink, Outlet, useLocation } from "react-router-dom";

export const SettingsLayout = () => {
  const pathname = useLocation().pathname;

  const navigation = [
    {
      title: "Notification",
      path: paths.settings.notification,
      isActive:
        pathname === paths.settings.notification ||
        pathname === paths.settings.index,
    },
    {
      title: "Team Management",
      path: paths.settings.team_management,
      isActive: pathname === paths.settings.team_management,
    },
    {
      title: "Security",
      path: paths.settings.security,
      isActive: pathname === paths.settings.security,
    },
    {
      title: "API Keys",
      path: paths.settings.api_keys,
      isActive: pathname === paths.settings.api_keys,
    },
  ];

  return (
    <div className="">
      <div className="mb-5">
        <nav className="border-b block border-[#EAECF0]  relative">
          <ul className="flex items-center gap-x-6   -mb-px md:w-[80%] overflow-x-scroll">
            {navigation.map((item) => (
              <NavLink
                to={item.path}
                className={() =>
                  clsx(
                    "inline-block p-3 capitalize border-b-2  min-w-[9.5rem] rounded-t-lg text-xs md:text-sm font-medium text-center",
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
