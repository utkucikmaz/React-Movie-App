import { createContext, useState } from "react";

export const LoadingContext = createContext<{
  loading: boolean;
  setLoading: (newState: boolean) => void;
} | null>(null);

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(false);

  const value = { loading, setLoading };
  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};
