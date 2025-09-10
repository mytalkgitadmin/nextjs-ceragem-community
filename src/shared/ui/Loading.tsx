import { SVGProps } from 'react';

interface LoadingProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

// 회전하는 로딩 아이콘 컴포넌트

export default function Loading({
  size = 16,
  className = '',
  ...props
}: LoadingProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`animate-spin ${className}`}
      aria-label="로딩 중"
      role="img"
      {...props}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="31.416"
        strokeDashoffset="31.416"
        fill="none"
        opacity="0.25"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
