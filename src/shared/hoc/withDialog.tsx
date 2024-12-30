import {
  Breakpoint,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { FlexRowBox } from "../ui/material-ui/box";

interface ExternalDialogProps {
  title: string;
  onCancel?: () => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  footerButtons?: React.ReactNode;
  cancelButtonText?: string;
  pObject?: any;
  onValueChange?: (value: any[]) => void;
  maxWidth?: Breakpoint | false;
}

export function withDialog(Component: React.ComponentType<any>) {
  return function EnhancedDialog(externalProps: ExternalDialogProps) {
    const { t } = useTranslation();

    const {
      open,
      setOpen,
      title,
      cancelButtonText = t("button.cancel"),
      onCancel,
      footerButtons,
      pObject,
      onValueChange,
      maxWidth = "lg",
    } = externalProps;

    const handleClose = () => {
      if (onCancel) onCancel();
      setOpen!(false);
    };

    return (
      <Dialog
        maxWidth={maxWidth}
        fullWidth
        open={open!}
        onClose={handleClose}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Component
            pObject={pObject}
            onValueChange={onValueChange}
          />
          <DialogActions>
            <FlexRowBox>
              <Button
                variant="contained"
                color="inherit"
                onClick={handleClose}
                sx={{ mr: 1 }}
              >
                {cancelButtonText}
              </Button>
              {footerButtons}
            </FlexRowBox>
          </DialogActions>
        </DialogContent>
      </Dialog>
    );
  };
}
