import { ServicesContainer } from "@components/containers/services-container";
import { CustomToggle } from "@components/custom-toggle";

export default function LocalServices() {
  return (
    <ServicesContainer
      title="Give your customers ability to do more..."
      description="Select Services you want your customers to have access to"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-[1.5rem] md:gap-y-[3.5rem] gap-x-[7rem] px-[1.5rem]  py-[2.5rem] md:px-[3rem] md:p-[3rem]">
        {data.map((item, idx) => (
          <ServiceComponent {...item} key={idx} />
        ))}
      </div>
    </ServicesContainer>
  );
}

const ServiceComponent: React.FC<(typeof data)[0]> = (props) => {
  return (
    <div className="p-4 hover:bg-opacity-5 hover:bg-primary  rounded-md">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-base md:text-lg font-semibold text-[#1E3F52]">
          {props.title}
        </h2>
        <CustomToggle />
      </div>
      <p className="text-xs md:text-sm text-[#5C5C60] leading-[1.326rem]">
        {props.description}
      </p>
    </div>
  );
};

const data = [
  {
    title: "USSD",
    description:
      "Enabling your customers to complete purchases effortlessly using a unique USSD code assigned to your business. ",
  },
  {
    title: "Payment Links",
    description:
      "Enabling secure, payment links to your customers, enabling them to complete payments swiftly and easily from any device, anytime. No app required.",
  },
  {
    title: "Invoicing",
    description:
      "Enabling your invoicing process and provide your customers with professional invoices in seconds.",
  },
  {
    title: "Inventory",
    description:
      "Convenient way to manage your inventory. Generate real-time inventory reports or check stock levels.",
  },
  {
    title: "Bank Connect",
    description:
      "Link all your bank accounts and gain instant access to real-time balances and insights into the financial health of your business.",
  },
];
