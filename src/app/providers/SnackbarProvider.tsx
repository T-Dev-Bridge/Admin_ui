// 알림 메세지
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Alert, Snackbar } from "@mui/material";

interface SnackbarProviderProps {
  children: ReactNode;
}

type SnackbarData = {
  message: string;
  severity: "success" | "error" | "warning" | "info";
};

type SnackbarContextType = {
  showSnackbar: (
    message: string,
    severity: "success" | "error" | "warning" | "info",
  ) => void;
  hideSnackbar: () => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined,
);

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
}: SnackbarProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [snackbarData, setSnackbarData] = useState<SnackbarData | null>(null);

  const showSnackbar = useCallback(
    (message: string, severity: "success" | "error" | "warning" | "info") => {
      setSnackbarData({ message, severity });
      setIsOpen(true);
    },
    [],
  );

  const hideSnackbar = useCallback(() => {
    setIsOpen(false);
    setSnackbarData(null);
  }, []);

  const handleClose = useCallback(
    (_: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === "clickaway") {
        return;
      }
      hideSnackbar();
    },
    [hideSnackbar],
  );

  const value = useMemo(
    () => ({
      showSnackbar,
      hideSnackbar,
    }),
    [showSnackbar, hideSnackbar],
  );

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      {snackbarData && (
        <Snackbar
          open={isOpen}
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleClose}
            severity={snackbarData.severity}
            sx={{ width: "100%" }}
            variant="filled"
          >
            {snackbarData.message}
          </Alert>
        </Snackbar>
      )}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
