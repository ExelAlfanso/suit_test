"use client";

import { useEffect, useRef, useState } from "react";

type Option = {
  label: string;
  value: string | number;
};

export interface DropdownProps {
  label?: string;
  value?: string | number;
  options: Option[];
  onChange?: (value: string | number) => void;
}

export default function Dropdown({
  label,
  value,
  options,
  onChange,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div className="flex items-center gap-2">
      {label && <span className="text-sm text-gray-500 w-50">{label}</span>}

      <div ref={ref} className="relative min-w-40">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between w-full px-3 py-2 text-sm text-black bg-white border-gray-200 rounded-full shadow-sm border hover:bg-gray-50"
        >
          {selected?.label}
          <span className="ml-2">▾</span>
        </button>

        {open && (
          <ul className="absolute top-full left-0 z-50 w-full mt-1 bg-white border rounded-md shadow-lg">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => {
                  onChange?.(option.value);
                  setOpen(false);
                }}
                className={`cursor-pointer px-3 py-2 text-sm hover:bg-gray-100 text-black ${
                  option.value === value ? "bg-gray-100 font-medium" : ""
                }`}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
