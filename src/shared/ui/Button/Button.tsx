import { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: React.ReactNode;
}

export default function Button({
  type = 'button',
  isLoading,
  children,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${styles.button} ${className || ''}`}
      {...rest}
    >
      {isLoading ? '로그인 중...' : <>{children}</>}
    </button>
  );
}
