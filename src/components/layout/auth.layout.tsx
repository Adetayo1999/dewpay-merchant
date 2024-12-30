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
    <div className="min-h-[100dvh] md:min-h-screen bg-auth bg-contain xl:bg-cover bg-no-repeat bg-[#15707A] flex justify-center items-center flex-col p-6  md:pt-[9.063rem] relative">
      <div className="md:flex-grow mb-[5.938rem] flex  w-full md:w-fit">
        <Outlet />
      </div>
      <div className="flex gap-y-3 justify-center items-center md:justify-between md:items-start gap-x-[3.438rem] flex-wrap absolute md:static bottom-5 ">
        {authFooterLinks.map((item, idx) => (
          <Link
            to={item.path}
            key={idx}
            className="text-xs md:text-sm text-white font-medium"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};
