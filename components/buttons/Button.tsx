import React, { MouseEventHandler } from "react";

interface PropTypes {
  content: string;
  type: "submit" | "button" | "reset" | undefined;
  color: string;
  onClick?: () => void;
}

const ButtonPrimary = ({ content, type, color, onClick }: PropTypes) => {
  return (
    <button type={type} className={`bg-${color} btn`} onClick={onClick}>
      {content}
    </button>
  );
};

export default ButtonPrimary;
