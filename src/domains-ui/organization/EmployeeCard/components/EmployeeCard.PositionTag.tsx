export interface EmployeeCardPositionTagProps {
  position: string;
  type: "manager" | "director" | "staff" | "coach";
}

// Position Badge Component
export const EmployeeCardPositionTag: React.FC<
  EmployeeCardPositionTagProps
> = ({ position, type }) => {
  const getPositionColor = (type: string) => {
    switch (type) {
      case "manager":
        return "bg-blue-500 text-white";
      case "director":
        return "bg-purple-500 text-white";
      case "staff":
        return "bg-green-500 text-white";
      case "coach":
        return "bg-gray-700 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <span
      className={`px-2 py-0.5 text-xs font-medium rounded-full ${getPositionColor(type)}`}
    >
      {position}
    </span>
  );
};
