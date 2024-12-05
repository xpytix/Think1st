import React from "react";

interface SubmitButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  label,
  onClick,
  disabled = true,
}) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled}
      className={`w-full my-4 px-4 py-2 text-white font-medium text-sm rounded-sm 
        ${
          disabled
            ? "bg-secondary cursor-not-allowed"
            : "bg-primary hover:bg-hoverBackground"
        }
        `}
    >
      {label}
    </button>
  );
};

export default SubmitButton;
