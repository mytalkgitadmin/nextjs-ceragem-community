import React, { useState, ReactNode, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

export interface SearchInputProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
}

// Search Input Component
export const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  placeholder = "검색",
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="relative mb-4 px-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 pr-12 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
      />
      <Search className="absolute right-7 top-3.5 h-5 w-5 text-gray-400" />
    </div>
  );
};
