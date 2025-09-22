import { AdminMessageData } from "../../types/messageTypes";

interface AdminMessageProps {
  data: AdminMessageData;
}

export function AdminMessage({ data }: AdminMessageProps) {
  const { content } = data;
  console.log(content);

  return (
    <div className="flex justify-center my-2">
      <div className="max-w-sm px-3 py-2 bg-gray-100 text-gray-600 text-sm rounded-full text-center">
        <span>{content}</span>
      </div>
    </div>
  );
}
