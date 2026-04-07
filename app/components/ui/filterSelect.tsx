"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Filter } from "lucide-react";

interface FilterSelectProps {
  value: string;
  onChange: (value: any) => void;
}

const options = [
  { value: "", label: "Todos os Níveis" },
  { value: "LEVEL_1", label: "Nível 1 (N1)" },
  { value: "LEVEL_2", label: "Nível 2 (N2)" },
  { value: "LEVEL_3", label: "Nível 3 (N3)" },
];

export function FilterSelect({ value, onChange }: FilterSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <div className="relative w-full sm:w-auto text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-white border border-gray-200 text-black-base px-4 py-2.5 rounded-xl hover:border-teal-base/50 transition-all duration-200 shadow-sm font-ibm-plex font-medium text-sm cursor-pointer w-full sm:min-w-[180px] justify-between focus:ring-2 focus:ring-teal-base/10"
      >
        <div className="flex items-center gap-2 truncate">
          <Filter size={16} className="text-gray-400 flex-shrink-0" />
          <span className="truncate">{selectedOption.label}</span>
        </div>
        <ChevronDown
          size={18}
          className={`text-gray-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-full origin-top-right rounded-xl bg-white shadow-xl ring-1 ring-gray-200 z-50 overflow-hidden animate-in fade-in zoom-in duration-100">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center px-4 py-3 text-sm transition-colors
                  ${value === option.value ? "bg-teal-50 text-teal-700 font-semibold" : "text-gray-600 hover:bg-gray-50"}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}