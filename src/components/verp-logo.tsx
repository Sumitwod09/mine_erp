import React from "react";

const VERPLogo = ({ className = "", width = 40, height = 40 }: { 
  className?: string; 
  width?: number; 
  height?: number 
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="8" fill="bg-sidebar-primary" />
      <text
        x="50%"
        y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
        fill="text-sidebar-primary-foreground"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="bold"
        fontSize="20"
        letterSpacing="-0.5"
      >
        VERP
      </text>
    </svg>
  );
};

export default VERPLogo;
