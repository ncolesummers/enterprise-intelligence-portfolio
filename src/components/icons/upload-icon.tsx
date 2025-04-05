import React from "react";

interface UploadIconProps {
  className?: string; // Allow custom className
}

export const UploadIcon: React.FC<UploadIconProps> = ({
  className,
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className} // Apply custom className
      {...props}
    >
      <path
        d="M7 14.5L12 9.5L17 14.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 9.5V21.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.5 17.5V6.5C20.5 5.39543 19.6046 4.5 18.5 4.5H5.5C4.39543 4.5 3.5 5.39543 3.5 6.5V17.5C3.5 18.6046 4.39543 19.5 5.5 19.5H18.5C19.6046 19.5 20.5 18.6046 20.5 17.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UploadIcon;
