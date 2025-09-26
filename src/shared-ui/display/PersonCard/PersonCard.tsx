import { Avatar, type AvatarSize } from "@/shared-ui/display";
import { Checkbox } from "@/shared-ui/input";
import { Badge, type BadgeVariant, type BadgeSize } from "@/shared-ui/display";

// PersonCard 메인 컴포넌트
interface PersonCardProps {
  // 선택 관련
  selectable?: boolean;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;

  // 아바타 관련
  avatarSrc?: string;
  avatarSize?: AvatarSize;

  // 뱃지 관련
  badgeLabel?: string;
  badgeColor?: BadgeVariant;
  badgeSize?: BadgeSize;

  // 기본 정보
  name: string;
  description?: string;

  // 액션들
  actions?: React.ReactNode;

  // 이벤트
  onClick?: () => void;

  // 스타일링
  className?: string;
}

export const PersonCard: React.FC<PersonCardProps> = ({
  selectable = false,
  selected = false,
  onSelect,
  avatarSrc,
  avatarSize = "md",
  name,
  description,
  badgeLabel,
  badgeColor = "primary",
  badgeSize = "sm",
  actions,
  onClick,
  className = "",
}) => {
  const handleCheckboxChange = (checked: boolean) => {
    onSelect?.(checked);
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else if (selectable && onSelect) {
      onSelect(!selected);
    }
  };

  const isClickable = onClick || (selectable && onSelect);

  return (
    <div
      className={`
          flex
          items-center
          space-x-3
          py-3
          px-1
          ${isClickable ? "cursor-pointer hover:bg-gray-50" : ""}
          transition-colors
          ${className}
        `}
      onClick={isClickable ? handleCardClick : undefined}
    >
      {/* 체크박스 (선택사항) */}
      {selectable && (
        <div onClick={(e) => e.stopPropagation()}>
          <Checkbox checked={selected} onChange={handleCheckboxChange} />
        </div>
      )}

      {/* 아바타 */}
      <Avatar src={avatarSrc} size={avatarSize} name={name} />

      {/* 메인 콘텐츠 영역 */}
      <div className="flex-1 min-w-0">
        {/* 이름과 뱃지들 */}
        <div className="flex items-center space-x-2 mb-1">
          <h3 className="font-medium text-gray-900 truncate">{name}</h3>
          {badgeLabel && (
            <Badge variant={badgeColor} size={badgeSize}>
              {badgeLabel}
            </Badge>
          )}
        </div>

        {/* 설명 */}
        {description && (
          <p className="text-sm text-gray-500 truncate">{description}</p>
        )}
      </div>

      {/* 액션 버튼들 */}
      {actions && (
        <div className="flex-shrink-0" onClick={(e) => e.stopPropagation()}>
          {actions}
        </div>
      )}
    </div>
  );
};
