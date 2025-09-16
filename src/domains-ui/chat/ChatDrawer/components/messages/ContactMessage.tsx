import { ContactMessageData } from "../../types/messageTypes";

interface ContactMessageProps {
  data: ContactMessageData;
  isMine: boolean;
}

export function ContactMessage({ data, isMine }: ContactMessageProps) {
  const { contact } = data;

  const handleCall = () => {
    window.open(`tel:${contact.phoneNumber}`);
  };

  const handleEmail = () => {
    if (contact.email) {
      window.open(`mailto:${contact.email}`);
    }
  };

  return (
    <div className={`max-w-xs md:max-w-md ${isMine ? 'ml-auto' : 'mr-auto'}`}>
      <div
        className={`
          p-4 rounded-lg border
          ${isMine
            ? 'bg-blue-50 border-blue-200 rounded-br-sm'
            : 'bg-gray-50 border-gray-200 rounded-bl-sm'
          }
        `}
      >
        {/* 헤더 */}
        <div className="flex items-center mb-3">
          <span className="text-lg mr-2">👤</span>
          <span className="text-sm font-medium text-gray-600">연락처</span>
        </div>

        {/* 연락처 정보 */}
        <div className="space-y-2">
          {/* 프로필 이미지와 이름 */}
          <div className="flex items-center space-x-3">
            {contact.avatar ? (
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-lg">👤</span>
              </div>
            )}
            <div>
              <div className="font-semibold text-gray-900">
                {contact.name}
              </div>
              {contact.organization && (
                <div className="text-sm text-gray-600">
                  {contact.organization}
                </div>
              )}
            </div>
          </div>

          {/* 연락처 액션 버튼 */}
          <div className="flex space-x-2 mt-4">
            {/* 전화 버튼 */}
            <button
              onClick={handleCall}
              className="flex-1 flex items-center justify-center py-2 px-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="text-sm">통화</span>
            </button>

            {/* 이메일 버튼 */}
            {contact.email && (
              <button
                onClick={handleEmail}
                className="flex-1 flex items-center justify-center py-2 px-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-sm">메일</span>
              </button>
            )}
          </div>

          {/* 상세 정보 */}
          <div className="text-xs text-gray-600 space-y-1 mt-3 pt-3 border-t border-gray-200">
            <div className="flex justify-between">
              <span>전화번호:</span>
              <span className="font-mono">{contact.phoneNumber}</span>
            </div>
            {contact.email && (
              <div className="flex justify-between">
                <span>이메일:</span>
                <span className="truncate ml-2">{contact.email}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}