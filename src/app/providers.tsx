import React from "react";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  // Aqui no futuro você pode incluir providers globais
  // ex: React Query, Context API, ThemeProvider, etc.
  return <>{children}</>;
}

export default Providers;
