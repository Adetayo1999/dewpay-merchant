import { ComplianceUploadDocumentsModal } from "@components/modals/compliance/upload-documents";
import { useModal } from "context/modal";

interface ComplianceDocumentUploaderType {
  title: string;
  file?: {
    link: string;
    name: string;
  };
}

const documents: Array<ComplianceDocumentUploaderType> = [
  {
    title: "Registration Certificate",
    file: { link: "https://google.com", name: "CAC Certificate.pdf" },
  },
  {
    title: "Articles of incorporration",
    file: { link: "https://google.com", name: "CAC Articles.pdf" },
  },
  {
    title: "TIN Certificate",
    file: { link: "https://google.com", name: "TIN Cert..pdf" },
  },
  {
    title: "Valid Proof of Address (Utility Bill)",
  },
  {
    title: "Valid Proof of Identity",
  },
  {
    title: "Anti-Money Laundering  Policy",
  },
];

const ComplianceDocumentUploader: React.FC<ComplianceDocumentUploaderType> = (
  props
) => {
  const { setModalContent } = useModal();

  return (
    <div className="flex flex-col md:flex-row gap-y-2 justify-between  py-5 border-t border-[#2022240D]">
      <p className="text-xs md:text-sm text-[#7D8592]">{props.title}</p>
      <div className="flex justify-between md:justify-start items-center gap-x-4">
        <div className="">
          {props.file && (
            <button className="flex items-center gap-x-2">
              <span className="text-xs md:text-sm text-[#20222466] underline">
                {props.file.name}
              </span>
              <span>
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.5327 5.17871C5.81646 5.17871 2.09521 9.99996 2.09521 9.99996C2.09521 9.99996 5.81646 14.8218 10.5327 14.8218C14.139 14.8218 18.9702 9.99996 18.9702 9.99996C18.9702 9.99996 14.139 5.17871 10.5327 5.17871ZM10.5327 13.0037C8.87646 13.0037 7.52834 11.6562 7.52834 9.99996C7.52834 8.34371 8.87646 6.99559 10.5327 6.99559C12.189 6.99559 13.5371 8.34371 13.5371 9.99996C13.5371 11.6562 12.189 13.0037 10.5327 13.0037ZM10.5327 8.24621C10.2997 8.24181 10.0681 8.28391 9.85149 8.37006C9.63489 8.4562 9.43765 8.58465 9.27128 8.74791C9.10491 8.91117 8.97276 9.10595 8.88254 9.32088C8.79233 9.5358 8.74586 9.76656 8.74586 9.99965C8.74586 10.2327 8.79233 10.4635 8.88254 10.6784C8.97276 10.8933 9.10491 11.0881 9.27128 11.2514C9.43765 11.4146 9.63489 11.5431 9.85149 11.6292C10.0681 11.7154 10.2997 11.7575 10.5327 11.7531C10.992 11.7444 11.4296 11.5559 11.7513 11.228C12.0731 10.9001 12.2534 10.459 12.2534 9.99965C12.2534 9.54026 12.0731 9.09921 11.7513 8.77132C11.4296 8.44343 10.992 8.25488 10.5327 8.24621Z"
                    fill="#15707A"
                  />
                </svg>
              </span>
            </button>
          )}
        </div>
        <label
          htmlFor={`${props.title}-uploader`}
          className="flex items-center gap-x-2 cursor-pointer"
          onClick={() => setModalContent(<ComplianceUploadDocumentsModal />)}
        >
          {!props.file && (
            <span className="text-xs md:text-sm underline text-[#15707A]">
              Upload
            </span>
          )}
          <span>
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8438 16.875V13.125H13.3438L10.2188 9.375L7.09375 13.125H9.59375V16.875H6.46875V16.8438C6.36375 16.85 6.26375 16.875 6.15625 16.875C4.91305 16.875 3.72076 16.3811 2.84169 15.5021C1.96261 14.623 1.46875 13.4307 1.46875 12.1875C1.46875 9.7825 3.2875 7.8225 5.62125 7.55375C5.82587 6.48412 6.39681 5.51922 7.23589 4.82501C8.07497 4.1308 9.12972 3.75067 10.2188 3.75C11.3079 3.7506 12.3629 4.13068 13.2022 4.82488C14.0414 5.51908 14.6126 6.48401 14.8175 7.55375C17.1512 7.8225 18.9675 9.7825 18.9675 12.1875C18.9675 13.4307 18.4736 14.623 17.5946 15.5021C16.7155 16.3811 15.5232 16.875 14.28 16.875C14.175 16.875 14.0737 16.85 13.9675 16.8438V16.875H10.8438Z"
                fill="#15707A"
              />
            </svg>
          </span>
        </label>
      </div>
    </div>
  );
};

export const ComplianceDocumentUploads = () => {
  return (
    <div className="">
      {documents.map((item, idx) => (
        <ComplianceDocumentUploader {...item} key={idx} />
      ))}
    </div>
  );
};
