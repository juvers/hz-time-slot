import React from "react";
import "./style.css";

const DropdownArrowIcon = ({ isActive = false }) => {
  return (
    <svg
      width="18"
      height="18"
      fill="none"
      id="arrow"
      className={isActive ? "dropdown-arrow rotated" : "dropdown-arrow"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.932,4.909 L8.9658,12.8388 L0.9988,4.9099"
        stroke={isActive ? "#FF8C00" : "#858893"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const ArrowIcon = ({ isActive = false, className }) => {
  return (
    <svg
      width="55"
      height="35"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fill={isActive ? "#FFFFFF" : "#858893"}
        d="m1,19.125l45.924988,0l-11.899963,11.900002l2.974976,2.974998l17,-17l-17,-17l-2.974976,2.974998l11.899963,11.900002l-45.924988,0l0,4.25z"
        clipRule="evenodd"
        fillRule="evenodd"
      />
    </svg>
  );
};

export { ArrowIcon, DropdownArrowIcon };
