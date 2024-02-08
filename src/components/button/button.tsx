import React, { ReactNode, ButtonHTMLAttributes } from "react";
import "./button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  className?: string;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
  ...buttonProps
}) => {
  return (
    <button
      onClick={onClick}
      className={`button-container ${className}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default Button;
