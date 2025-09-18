import { useState } from "react";
import { Collapse } from "@/shared-ui/display";
import { EmployeeCard } from "../EmployeeCard";

export interface EmployeeCardGroupProps {
  employeeGroup: any;
  //   onUserToggle: (groupId: string, userId: string, checked: boolean) => void;
  //   onGroupToggle: (groupId: string) => void;
}

export const EmployeeCardGroup: React.FC<EmployeeCardGroupProps> = ({
  employeeGroup,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapse
      title={`${employeeGroup.title} (${employeeGroup.count})`}
      isOpen={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
    >
      {employeeGroup.users.map((user: any) => (
        <EmployeeCard key={user.id} employee={user} />
      ))}
    </Collapse>
  );
};
