import React, { useState } from "react";

const CustomButton = ({ onClick, popupText, children, className }) => {
  const [iseHovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };
  return (
    <div>
      <button
        className={`${className} task-button`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        {children}
      </button>
      {iseHovered && <div className="popup">{popupText}</div>}
    </div>
  );
};

export default CustomButton;
