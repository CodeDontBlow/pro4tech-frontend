"use client";

import { Search, X } from "lucide-react";
import { useState, useRef } from "react";

type SearchButtonProps = {
  onSearch: (value: string) => void;
};

export function SearchButton({ onSearch }: SearchButtonProps) {
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    setSearchValue("");
    onSearch("");
    inputRef.current?.focus();
  };

  return (
    <div className="flex items-center bg-white-300 rounded-md border hover:border-teal-base/50 border-white-700 h-10.5 px-4 w-full sm:w-64">
      <Search size={18} className="text-black-700/50 shrink-0" />

      <input
        ref={inputRef}
        type="text"
        value={searchValue}
        placeholder="Buscar..."
        className="w-full bg-transparent outline-none text-sm text-black-base ml-3"
        onChange={(e) => {
          setSearchValue(e.target.value);
          onSearch(e.target.value);
        }}
      />

      {searchValue && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClear();
          }}
          className="p-1 rounded-lg text-black-base/50 hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
