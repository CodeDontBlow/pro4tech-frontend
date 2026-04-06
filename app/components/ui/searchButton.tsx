import { Search, X } from "lucide-react";
import { useState, useRef } from "react";

type SearchButtonProps = {
  onSearch: (value: string) => void;
};

export function SearchButton({ onSearch }: SearchButtonProps) {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleClose = () => {
    setOpen(false);
    onSearch("");
  };

  return (
    <div
      className={`flex items-center bg-white-300 border rounded-xl overflow-hidden transition-colors
      ${open ? "border-green-700" : "border-white-700 hover:bg-white-500"}`}
    >
      <button
        onClick={open ? undefined : handleOpen}
        className="flex items-center gap-2 px-3.5 h-9.5 text-sm text-black-300 cursor-pointer"
      >
        <Search size={14} />
        {!open && <span>Buscar</span>}
      </button>

      {open && (
        <input
          ref={inputRef}
          type="text"
          placeholder="Digite o nome ou email..."
          className="w-48 pr-2 text-sm text-black-base outline-none bg-transparent placeholder:text-black-300"
          onChange={(e) => onSearch(e.target.value)}
        />
      )}

      {open && (
        <button
          onClick={handleClose}
          className="flex items-center px-2.5 h-9.5 border-l border-white-700 text-black-300 cursor-pointer hover:bg-white-500 transition-colors"
        >
          <X size={13} />
        </button>
      )}
    </div>
  );
}
