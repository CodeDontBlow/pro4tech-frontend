"use client";

import { Search, X } from "lucide-react";
import { useState, useRef } from "react";

type SearchButtonProps = {
  onSearch: (value: string) => void;
};

export function SearchButton({ onSearch }: SearchButtonProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleClose = () => {
    setOpen(false);
    setSearchValue("");
    onSearch("");
  };

  return (
    <div
      className={`relative flex items-center bg-white border transition-all duration-300 ease-in-out h-[42px] rounded-xl shadow-sm
      ${
        open
          ? "w-full sm:w-64 border-teal-base/50 ring-2 ring-teal-base/10"
          : "w-[42px] border-gray-200 hover:border-teal-base/50 cursor-pointer"
      }`}
      onClick={!open ? handleOpen : undefined}
    >
      <div
        className={`absolute flex items-center justify-center transition-all duration-300
        ${open ? "left-4 text-teal-base" : "left-0 w-full h-full text-gray-400"}`}
      >
        <Search size={18} />
      </div>

      <input
        ref={inputRef}
        type="text"
        value={searchValue}
        placeholder="Buscar..."
        className={`w-full bg-transparent outline-none font-ibm-plex text-sm text-gray-700 transition-all duration-300
          ${open ? "pl-11 pr-10 opacity-100" : "pl-0 pr-0 opacity-0 pointer-events-none"}`}
        onChange={(e) => {
          setSearchValue(e.target.value);
          onSearch(e.target.value);
        }}
      />

      {open && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          className="absolute right-2 p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}