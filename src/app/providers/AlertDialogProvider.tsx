import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface AlertDialogContextType {
  showDialog: (options: AlertDialogOptions) => void;
  hideDialog: () => void;
}

interface AlertDialogOptions {
  title: string;
  description: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const AlertDialogContext = createContext<AlertDialogContextType | undefined>(
  undefined,
);

export const AlertDialogProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [dialogOptions, setDialogOptions] = useState<AlertDialogOptions | null>(
    null,
  );

  const showDialog = useCallback((options: AlertDialogOptions) => {
    setDialogOptions(options);
    setOpen(true);
  }, []);

  const hideDialog = useCallback(() => {
    setOpen(false);
    setDialogOptions(null);
  }, []);

  const handleConfirm = () => {
    if (dialogOptions?.onConfirm) {
      dialogOptions.onConfirm();
    }
    hideDialog();
  };

  const handleCancel = () => {
    if (dialogOptions?.onCancel) {
      dialogOptions.onCancel();
    }
    hideDialog();
  };

  const value = useMemo(
    () => ({
      showDialog,
      hideDialog,
    }),
    [showDialog, hideDialog],
  );

  return (
    <AlertDialogContext.Provider value={value}>
      {children}
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {dialogOptions?.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogOptions?.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            onClick={handleCancel}
          >
            {t("button.cancel")}
          </Button>
          <Button
            onClick={handleConfirm}
            autoFocus
          >
            {t("button.confirm")}
          </Button>
        </DialogActions>
      </Dialog>
    </AlertDialogContext.Provider>
  );
};

export const useAlertDialog = (): AlertDialogContextType => {
  const context = useContext(AlertDialogContext);
  if (context === undefined) {
    throw new Error(
      "useAlertDialog must be used within an AlertDialogProvider",
    );
  }
  return context;
};
