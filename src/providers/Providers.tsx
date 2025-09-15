import { ReactNode } from "react";
import { QueryProvider } from "./QueryProvider";
import { SendbirdProviderWrapper } from "./SendbirdProvider";
import { UIProviders } from "./UIProviders";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <UIProviders>
      <QueryProvider>
        <SendbirdProviderWrapper>{children}</SendbirdProviderWrapper>
      </QueryProvider>
    </UIProviders>
  );
}
