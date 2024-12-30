import { ComplianceContainer } from "@components/containers/compliance-container";
import { useModal } from "context/modal";
import {
  BusinessInformationModal,
  Field,
} from "@components/modals/compliance/business-information-modal";

type BUSINESS_INFORMATION_FORM_TYPE =
  | "business_address"
  | "business_description"
  | "phone_number"
  | "bvn"
  | "rc"
  | "website"
  | "email";

export default function BusinessInformation() {
  const { setModalContent } = useModal();

  const businessInformationData = [
    {
      title: "Business Type",
      value: "Offline, Online",
    },
    {
      title: "Business Address",
      value: "2715 Ash Dr. San Jose, South Dakota 83475",
      onClick: () =>
        setModalContent(
          <BusinessInformationModal
            {...formsData.business_address}
            onSubmit={() => {}}
          />
        ),
    },
    {
      title: "Business Description",
      value:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      onClick: () =>
        setModalContent(
          <BusinessInformationModal
            {...formsData.business_description}
            onSubmit={() => {}}
          />
        ),
    },
    {
      title: "Contact Phone Number",
      value: "0802 278 3475",
      onClick: () =>
        setModalContent(
          <BusinessInformationModal
            {...formsData.phone_number}
            onSubmit={() => {}}
          />
        ),
    },
    {
      title: "Email Address",
      value: "alex.doe@gmail.com",
      onClick: () =>
        setModalContent(
          <BusinessInformationModal {...formsData.email} onSubmit={() => {}} />
        ),
    },
    {
      title: "BVN",
      value: "1812 27 3475",
      onClick: () =>
        setModalContent(
          <BusinessInformationModal {...formsData.bvn} onSubmit={() => {}} />
        ),
    },
    {
      title: "RC. Number",
      value: "88886783475",
      onClick: () =>
        setModalContent(
          <BusinessInformationModal {...formsData.rc} onSubmit={() => {}} />
        ),
    },
    {
      title: "Nature of Business",
      value: "Online Boutique",
    },
    {
      title: "Website",
      value: "www.capsuiteonline.com",
      onClick: () =>
        setModalContent(
          <BusinessInformationModal
            {...formsData.website}
            onSubmit={() => {}}
          />
        ),
    },
  ];

  return (
    <ComplianceContainer>
      <div className="">
        {businessInformationData.map((item, idx) => (
          <div
            className="flex flex-col gap-y-2 md:flex-row justify-between  py-5 border-t border-[#2022240D]"
            key={idx}
          >
            <p className="text-xs md:text-sm text-[#7D8592]">{item.title}</p>
            <div
              className="flex gap-x-4 items-center justify-between md:justify-start hover:bg-slate-50 rounded py-2 md:px-4 cursor-pointer"
              onClick={item.onClick}
            >
              <p className="max-w-[17.625rem] text-xs md:text-sm text-[#20222466]">
                {item.value}
              </p>
              <button>
                <svg
                  width="19"
                  height="18"
                  viewBox="0 0 19 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.50146 3.9375L11.564 9L6.50146 14.0625"
                    stroke="#202224"
                    strokeOpacity="0.4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </ComplianceContainer>
  );
}

const formsData: Record<
  BUSINESS_INFORMATION_FORM_TYPE,
  { fields: Field[]; title: string }
> = {
  business_address: {
    title: "Business Address",
    fields: [
      {
        name: "house_no",
        type: "text",
        placeholder: "House No.",
        validation: {
          required: true,
        },
      },
      {
        name: "street",
        type: "text",
        placeholder: "Street",
        validation: {
          required: true,
        },
      },
      {
        name: "city",
        type: "text",
        placeholder: "City",
        validation: {
          required: true,
        },
      },
      {
        name: "landmark",
        type: "text",
        placeholder: "Landmark",
        validation: {
          required: true,
        },
      },
    ],
  },
  business_description: {
    title: "Business Description",
    fields: [
      {
        name: "description",
        type: "textarea",
        placeholder: "Enter your business description including",
        validation: {
          required: true,
        },
      },
    ],
  },
  bvn: {
    title: "Biometric Verification Number (BVN)",
    fields: [
      {
        name: "bvn",
        type: "text",
        placeholder: "BVN",
        validation: {
          required: true,
        },
      },
    ],
  },
  email: {
    title: "Email Address",
    fields: [
      {
        name: "email",
        type: "text",
        placeholder: "Update your email address",
        validation: {
          required: true,
        },
      },
    ],
  },
  phone_number: {
    title: "Phone Number",
    fields: [
      {
        name: "phone_number",
        type: "text",
        placeholder: "Phone Number",
        validation: {
          required: true,
        },
      },
    ],
  },
  rc: {
    title: "Company Registration Number (RC)",
    fields: [
      {
        name: "house_no",
        type: "text",
        placeholder: "Company Registration Number (RC)",
        validation: {
          required: true,
        },
      },
    ],
  },
  website: {
    title: "Website",
    fields: [
      {
        name: "website",
        type: "text",
        placeholder: "www.yourwebsite.com",
        validation: {
          required: true,
        },
      },
    ],
  },
};
