import React from "react";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  // Here in the future you can include global providers
  // ex: React Query, Context API, ThemeProvider, etc.
  return <>{children}</>;
}

export default Providers;
