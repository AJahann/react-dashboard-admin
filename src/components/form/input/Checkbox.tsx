import type React from "react";

interface CheckboxProps {
  label?: string;
  checked: boolean;
  className?: string;
  id?: string;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  id,
  onChange,
  className = "",
  disabled = false,
}) => {
  return (
    <label
      className={`flex items-center space-x-3 group cursor-pointer ${
        disabled ? "cursor-not-allowed opacity-60" : ""
      }`}
    >
      <div className="relative w-5 h-5">
        <input
          checked={checked}
          disabled={disabled}
          id={id}
          type="checkbox"
          onChange={(e) => onChange(e.target.checked)}
          className={`w-5 h-5 appearance-none cursor-pointer dark:border-gray-700 border border-gray-300 checked:border-transparent rounded-md checked:bg-brand-500 disabled:opacity-60 
          ${className}`}
        />
        {checked && (
          <svg
            height="14"
            width="14"
            className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none top-1/2 left-1/2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 14"
          >
            <path
              d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.94437"
            />
          </svg>
        )}
        {disabled && (
          <svg
            height="14"
            width="14"
            className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none top-1/2 left-1/2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 14"
          >
            <path
              d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
              stroke="#E4E7EC"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.33333"
            />
          </svg>
        )}
      </div>
      {label && (
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
          {label}
        </span>
      )}
    </label>
  );
};

export default Checkbox;
