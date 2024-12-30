import { Link, Outlet } from "react-router-dom";

const authFooterLinks = [
  {
    id: 1,
    title: "Home",
    path: "#",
  },
  {
    id: 2,
    title: "Services",
    path: "#",
  },
  {
    id: 3,
    title: "Policies",
    path: "#",
  },
  {
    id: 4,
    title: "Terms & Conditions",
    path: "#",
  },
];

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-auth bg-contain xl:bg-cover bg-no-repeat bg-[#15707A] flex justify-center items-center flex-col p-6 pt-[9.063rem]">
      <div className="flex-grow mb-[5.938rem] flex">
        <Outlet />
      </div>
      <div className="flex gap-x-[3.438rem] ">
        {authFooterLinks.map((item) => (
          <Link
            to={item.path}
            key={item.path}
            className="text-sm text-white font-medium"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};
