import { useContext } from "react";
import { LoadingContext } from "context/LoadingContext";

export const useLoading = () => {
  const loadingContext = useContext(LoadingContext);

  if (!loadingContext) {
    throw new Error(
      "useLoading has to be used within <LoadingContext.Provider>"
    );
  }

  return loadingContext;
};
