import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  className?: string;
}

export function SearchInput({
  placeholder = "검색",
  value,
  onChange,
  onSearch,
  className = "",
}: SearchInputProps) {
  return (
    <div className={`w-full ${className}`}>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onPressEnter={(e) => onSearch?.((e.target as HTMLInputElement).value)}
        prefix={<SearchOutlined className="text-gray-400" />}
        className="rounded-full border-gray-300 hover:border-blue-400 focus:border-blue-500"
        size="large"
      />
    </div>
  );
}
