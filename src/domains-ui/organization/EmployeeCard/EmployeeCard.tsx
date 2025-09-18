import { Avatar } from "@/shared-ui/display";
import { EmployeeCardPositionTag } from "./components";

export interface EmployeeCardProps {
  employee: any;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  return (
    <div className="flex items-center py-3 px-4 hover:bg-gray-50 transition-colors">
      <input
        type="checkbox"
        id={`${employee.id}`}
        // checked={user.checked}
        // onChange={(e) => onToggle(groupId, user.id, e.target.checked)}
        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-3"
      />

      <Avatar src={employee.avatar} name={employee.name} />

      <div className="ml-3 flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <label
            htmlFor={`${employee.id}`}
            className="text-sm font-medium text-gray-900 cursor-pointer"
          >
            {employee.name || "이름 없음"}
          </label>
          <EmployeeCardPositionTag
            position={employee.position}
            type={employee.positionType}
          />
        </div>
        {employee.description && (
          <p className="text-xs text-gray-500 truncate">
            {employee.description}
          </p>
        )}
      </div>
    </div>
  );
};
