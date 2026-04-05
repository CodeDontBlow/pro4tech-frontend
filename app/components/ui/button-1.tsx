import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
    children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button1({ children, className = "", ...props }: ButtonProps) {
    return (
        <button className={`button-1    
        px-4 py-2 
        rounded-lg 
        transition
        ${className}
      `}
            {...props}
        >
            {children}
        </button>
    );
}