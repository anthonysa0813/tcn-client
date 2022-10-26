import React, { MouseEventHandler } from "react";
import { icons } from "react-icons/lib";
import { AiTwotoneFilter } from "react-icons/ai";
import { BiFilterAlt } from "react-icons/bi";

interface PropTypes {
  content: string;
  type: "submit" | "button" | "reset" | undefined;
  color: string;
  onClick?: () => void;
  iconName?: string;
}

const ButtonPrimary = ({
  content,
  type,
  color,
  onClick,
  iconName,
}: PropTypes) => {
  return (
    <button type={type} className={`bg-${color} btn`} onClick={onClick}>
      {iconName === "filter" && <BiFilterAlt />}
      {content}
    </button>
  );
};

export default ButtonPrimary;
