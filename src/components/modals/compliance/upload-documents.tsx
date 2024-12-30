import { CustomButton } from "@components/form-elements/button";
import { ModalContainer } from "@components/modal";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { HiMiniPause } from "react-icons/hi2";

const convertToMB = (fileSizeInBytes: number) => {
  return (fileSizeInBytes / 1048576).toFixed(2); // Convert to MB and round to 2 decimal places
};

const UploadedFileComponent: React.FC<{
  file: File;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}> = (props) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const simulateUpload = () => {
      setIsUploading(true);
      setUploadProgress(0);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            return 100;
          }
          return prevProgress + 5; // Increment progress by 5% every 100ms
        });
      }, 1000); // Update every 100ms
    };

    simulateUpload();
  }, []);

  return (
    <div className="border border-[#E4E9F0] text-xs text-[#202224] rounded-md p-3 overflow-hidden">
      <div className="mb-3 flex justify-between items-center">
        <div className="flex-[0.6] flex gap-x-3 md:flex-1  ">
          <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded"></div>
          <div className="flex-1">
            <p className="max-w-[10rem] md:w-[70%] truncate mb-1 font-medium">
              {props.file.name}
            </p>
            <p className="text-[#969DB2] ">{convertToMB(props.file.size)}MB</p>
          </div>
        </div>
        <div className="flex flex-shrink-0">
          {isUploading && (
            <div className="flex items-center gap-x-3">
              <button className="bg-[#F5F7F9] w-6 h-6 rounded-full flex items-center justify-center text-[#667384]">
                <HiMiniPause />
              </button>
              <button
                className="bg-[#FEF1F1] w-6 h-6 rounded-full flex items-center justify-center text-[#FF4747]"
                onClick={() => props.setFiles([])}
              >
                <FaTimes />
              </button>
            </div>
          )}
          {!isUploading && (
            <div className="">
              <button className="bg-[#F2FDF5] w-6 h-6 rounded-full flex items-center justify-center text-[#16A249]">
                <FaCheck />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-x-2 items-center">
        <div className="bg-[#F5F7F9] h-[0.313rem] flex-1 rounded overflow-hidden">
          <div
            className={clsx("h-full bg-[#FFA617] transition-all duration-300")}
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
        <p className="flex-shrink-0 text-[0.65rem] text-[#969DB2]">
          {uploadProgress}%
        </p>
      </div>
    </div>
  );
};

export const ComplianceUploadDocumentsModal = () => {
  const [files, setFiles] = useState<File[]>([]);

  const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setFiles((prev) => [...prev, ...e.target.files!]);
    }
  };

  return (
    <ModalContainer>
      <div className="px-6 md:px-8 mb-10">
        <div className="">
          <label
            htmlFor="compliance_document_uploader"
            className="flex justify-center flex-col items-center border-dashed cursor-pointer  border border-[#1F4690] h-[11.75rem] bg-[#004EE114] rounded"
          >
            <div className="mb-5">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.678 20.271C7.275 21.318 4 25.277 4 30C4 35.523 8.477 40 14 40C14.947 40 15.864 39.868 16.733 39.622M36.055 20.271C40.458 21.318 43.732 25.277 43.732 30C43.732 35.523 39.255 40 33.732 40C32.785 40 31.868 39.868 31 39.622M36 20C36 13.373 30.627 8 24 8C17.373 8 12 13.373 12 20M17.065 27.881L24 20.924L31.132 28M24 38V24.462"
                  stroke="#333333"
                  strokeOpacity="0.2"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="text-xs text-[#132A00] mb-1">
              <span> Drag your document here, or </span>
              <span className="underline text-[#15707A] font-semibold">
                browse
              </span>
            </p>
            <p className="text-[#20222466] text-[0.5rem]">
              Supports: PNG, JPG, PDF, Doc
            </p>
            <input
              type="file"
              name="compliance_document_uploader"
              className="hidden"
              id="compliance_document_uploader"
              onChange={onFileUpload}
              disabled={files.length === 1}
            />
          </label>
        </div>

        {Boolean(files.length) && (
          <div className="mt-6 flex flex-col gap-y-2.5">
            {files.map((item, idx) => (
              <UploadedFileComponent
                file={item}
                key={idx}
                setFiles={setFiles}
              />
            ))}
          </div>
        )}

        <div className="mt-10 w-[85%] mx-auto">
          <CustomButton
            className="disabled:bg-[#69696940] disabled:text-[#7B94C6] text-sm font-semibold rounded-lg p-[0.7rem] w-full"
            variant="primary"
            disabled={files.length === 0}
          >
            Submit
          </CustomButton>
        </div>
      </div>
    </ModalContainer>
  );
};
