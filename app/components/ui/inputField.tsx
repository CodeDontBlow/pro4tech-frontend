"use client";

import { InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  id?: string,
  placeholder?: string,
}

export function InputField({
  label,
  error,
  id,
  placeholder,
  className,
  ...props
}: InputFieldProps) {
  return (
    <div className="flex flex-col w-full">
      {/* Label */}
      {label && (
        <label className="text-[var(--black-base)] font-medium mb-2" htmlFor={id}>
          {label}
        </label>
      )}

      {/* Input */}
      <input
        className={`w-full px-5 py-2 rounded-full border border-[var(--white-700)] focus:outline-none focus:ring-2 focus:ring-[var(--green-base)] transition ${className}`}
        {...props}
        id={id}
        placeholder={placeholder}
      />

      {/* Erro */}
      {error && (
        <span className="text-sm text-[var(--red-base)] mt-1">{error}</span>
      )}
    </div>
  );
}
