import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa6";

interface CustomDropdownProps {
  options: { title: string; value: string }[];
  loading?: boolean;
  onChange?: (selected: { title: string; value: string }) => void;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event?.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-[13.063rem] z-[10000]">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full px-4 py-2 bg-white border  rounded-md h-[3.5rem] focus:ring-2 focus:ring-primary focus:ring-opacity-40 outline-none transition-all duration-200"
      >
        <span className="text-[#7D8592] text-xs font-medium capitalize">
          {selected.value}
        </span>
        <svg
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 10L12 15L17 10H7Z" fill="black" />
        </svg>
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute w-full mt-2 bg-white shadow-md rounded-md overflow-hidden"
        >
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => {
                onChange?.(option);
                setSelected(option);
                setIsOpen(false);
              }}
              className="p-4  text-[#7D8592] hover:bg-primary hover:bg-opacity-5 text-xs cursor-pointer font-medium flex justify-between items-center"
            >
              <span> {option.title}</span>
              {JSON.stringify(option) === JSON.stringify(selected) && (
                <span className="text-primary">
                  <FaCheck />
                </span>
              )}
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
};
