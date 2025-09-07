import { useMemo, useState } from "react";

export interface UseSearchParams<T> {
  items: T[];
  selector: (item: T) => string;
}

export interface UseSearchResult<T> {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  filteredItems: T[];
  clearSearch: () => void;
  hasSearchQuery: boolean;
}

export function useSearch<T>({
  items,
  selector,
}: UseSearchParams<T>): UseSearchResult<T> {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;

    const query = searchQuery.toLocaleLowerCase().trim();
    return items.filter((item) => selector(item).toLowerCase().includes(query));
  }, [items, searchQuery, selector]);

  const clearSearch = () => setSearchQuery("");

  return {
    searchQuery,
    setSearchQuery,
    filteredItems,
    clearSearch,
    hasSearchQuery: searchQuery.trim().length > 0,
  };
}
