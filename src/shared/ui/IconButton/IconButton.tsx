import { forwardRef, ButtonHTMLAttributes } from "react";
import Icons, { IconType } from "../Icons";
import styles from "./IconButton.module.scss";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: IconType;
  size?: number;
  text: string;
}

/**
 * shadcn의 DrawerTrigger가 제대로 동작하려면 ref forwarding이 필요
 * asChild prop은 자식 컴포넌트에 ref와 이벤트 핸들러를 전달
 */
const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ type = "button", name, text, className, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={`${styles.button} ${className}`}
        {...props}
      >
        <Icons name={name} size={size} />
        <span className="sr-only">{text}</span>
      </button>
    );
  }
);
IconButton.displayName = "IconButton";
export default IconButton;
