import { createContext, useState } from "react";

export const LoadingContext = createContext({
  loading: false,
  setLoading: null,
});

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const value = { loading, setLoading };
  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};
