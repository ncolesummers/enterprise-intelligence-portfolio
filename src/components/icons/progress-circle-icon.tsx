import React from "react";
import { IconProps } from "./play-icon"; // Import from play-icon where it's defined

interface ProgressCircleIconProps extends IconProps {
  percentage: number;
}

const CIRCUMFERENCE = 2 * Math.PI * 45; // 2 * PI * radius (45)

export const ProgressCircleIcon: React.FC<ProgressCircleIconProps> = ({
  percentage,
  ...props
}) => {
  const offset = CIRCUMFERENCE * (1 - percentage / 100);

  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Background circle */}
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="#1f2937" // background color
        strokeWidth="10"
      />
      {/* Progress circle */}
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="currentColor"
        strokeWidth="10"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={offset}
        transform="rotate(-90 50 50)" // Start the circle from the top
        className="text-primary" // Progress color
      />
    </svg>
  );
};

export default ProgressCircleIcon;
