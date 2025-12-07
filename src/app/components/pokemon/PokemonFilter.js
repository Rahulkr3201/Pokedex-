"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

export default function PokemonFilter({ types, selectedType, onChange }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (type) => {
    onChange(type);
    setOpen(false);
  };

  return (
    <div className="relative w-full">
      <div
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2 text-sm rounded-xl cursor-pointer select-none bg-white/20 border border-white/30 backdrop-blur-md text-white shadow-md flex justify-between items-center hover:bg-white/30 transition"
      >
        <span>{selectedType ? selectedType.toUpperCase() : "All Types"}</span>
        <FiChevronDown
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </div>

      {open && (
        <div className="absolute top-full left-0 w-full max-h-60 overflow-y-auto mt-1 bg-gray-300 border border-gray-300 rounded-md shadow-xl z-50">
          <div
            onClick={() => handleSelect(null)}
            className="px-4 py-2 text-sm text-black cursor-pointer hover:bg-gray-200"
          >
            All Types
          </div>

          {types.map((t) => (
            <div
              key={t}
              onClick={() => handleSelect(t)}
              className="px-4 py-2 text-sm text-black cursor-pointer hover:bg-yellow-300 transition"
            >
              {t.toUpperCase()}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
