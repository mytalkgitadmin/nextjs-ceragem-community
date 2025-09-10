// Pure Toaster component - removed next-themes dependency

import { Toaster as Sonner, ToasterProps } from "sonner";

export interface ToasterComponentProps extends ToasterProps {
  theme?: "light" | "dark" | "system"; // theme을 props로 받음
}

const Toaster = ({ theme = "system", ...props }: ToasterComponentProps) => {
  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
