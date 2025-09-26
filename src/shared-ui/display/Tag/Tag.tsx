export interface TagProps {
  text: string;
  color:
    | "blue"
    | "gray"
    | "green"
    | "red"
    | "yellow"
    | "purple"
    | "pink"
    | "orange"
    | "brown";
}

export const Tag: React.FC<TagProps> = ({ text, color }) => {
  const getColor = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-500 text-white";
      case "gray":
        return "bg-gray-500 text-white";
      case "green":
        return "bg-green-500 text-white";
      case "red":
        return "bg-red-500 text-white";
      case "yellow":
        return "bg-yellow-500 text-white";
      case "purple":
        return "bg-purple-500 text-white";
      case "pink":
        return "bg-pink-500 text-white";
      case "orange":
        return "bg-orange-500 text-white";
      case "brown":
    }
    return "bg-gray-500 text-white";
  };
  return (
    <span
      className={`px-2 py-0.5 text-xs font-medium rounded-full ${getColor(color)}`}
    >
      {text}
    </span>
  );
};
