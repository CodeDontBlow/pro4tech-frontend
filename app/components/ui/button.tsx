import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  onClick?: () => void;
  label?: string | ReactNode;
  icon?: LucideIcon;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  iconPosition?: "left" | "right";
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-teal-base hover:bg-green-base text-white-300",
  secondary: "bg-green-700 hover:bg-teal-700 text-white-300",
  danger: "bg-red-600 hover:bg-red-700 text-white-300",
  ghost: "bg-transparent hover:bg-gray-100 text-black-base",
  outline:
    "bg-transparent border border-gray-300 hover:border-gray-400 text-black-base",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 h-8 text-xs gap-1.5",
  md: "px-6 h-10.5 text-sm gap-2",
  lg: "px-8 h-12 text-base gap-2.5",
};

export function Button({
  onClick,
  label,
  icon: Icon,
  variant = "primary",
  size = "md",
  disabled = false,
  fullWidth = false,
  className = "",
  type = "button",
  iconPosition = "left",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center rounded-md transition-all cursor-pointer shadow-sm flex-shrink-0
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? "w-full" : "sm:w-auto"}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}`}
    >
      {Icon && iconPosition === "left" && (
        <Icon size={size === "sm" ? 14 : size === "md" ? 18 : 20} />
      )}
      {label && <span>{label}</span>}
      {Icon && iconPosition === "right" && (
        <Icon size={size === "sm" ? 14 : size === "md" ? 18 : 20} />
      )}
    </button>
  );
}
