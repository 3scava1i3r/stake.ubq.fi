import { createContext, useCallback, useContext, useMemo, useReducer } from "react";

type StatusMessage = {
  successMessage: string | null;
  errorMessage: string | null;
};

type StatusMessageContext = {
  successMessage: string | null;
  errorMessage: string | null;
  setSuccessMessage: (msg: string | null) => void;
  setErrorMessage: (msg: string | null) => void;
  clearMessages: () => void;
};

type StatusMessageAction = { type: "setSuccess"; message: string | null } | { type: "setError"; message: string | null } | { type: "clear" };

const StatusMessageContext = createContext<StatusMessageContext>({
  successMessage: null,
  errorMessage: null,
  setSuccessMessage: () => {},
  setErrorMessage: () => {},
  clearMessages: () => {},
});

export const useStatusMessage = () => {
  return useContext(StatusMessageContext);
};

export function StatusMessageProvider({ children }: { children: React.ReactNode }) {
  const [statusMessage, dispatch] = useReducer(statusMessageReducer, {
    successMessage: null,
    errorMessage: null,
  });

  // Stable callbacks to avoid effect loops in consumers
  const setSuccessMessage = useCallback((msg: string | null) => {
    dispatch({ type: "setSuccess", message: msg });
  }, []);
  const setErrorMessage = useCallback((msg: string | null) => {
    dispatch({ type: "setError", message: msg });
  }, []);
  const clearMessages = useCallback(() => {
    dispatch({ type: "clear" });
  }, []);

  const value = useMemo(
    () => ({ ...statusMessage, setSuccessMessage, setErrorMessage, clearMessages }),
    [statusMessage, setSuccessMessage, setErrorMessage, clearMessages]
  );

  return <StatusMessageContext value={value}>{children}</StatusMessageContext>;
}

function statusMessageReducer(_: StatusMessage, action: StatusMessageAction): StatusMessage {
  switch (action.type) {
    case "setSuccess": {
      return { successMessage: action.message, errorMessage: null };
    }
    case "setError": {
      return { successMessage: null, errorMessage: action.message };
    }
    case "clear": {
      return { successMessage: null, errorMessage: null };
    }
    default: {
      throw Error("Unknown action");
    }
  }
}
