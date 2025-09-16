"use client";

interface DateSeparatorProps {
  createdAt: number;
}

export function DateSeparator({ createdAt }: DateSeparatorProps) {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const messageDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    const diffTime = today.getTime() - messageDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "오늘";
    } else if (diffDays === 1) {
      return "어제";
    } else {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
      const dayName = dayNames[date.getDay()];

      return `${year}년 ${month}월 ${day}일 (${dayName})`;
    }
  };

  return (
    <div className="flex justify-center py-4">
      <div className="bg-gray-100 rounded-full px-4 py-2">
        <span className="text-xs text-gray-600 font-medium">
          {formatDate(createdAt)}
        </span>
      </div>
    </div>
  );
}
