import { CssBaseline, ThemeProvider } from "@mui/material";
import { withErrorBoundary } from "react-error-boundary";
import { compose } from "@/shared/lib/react";
import { RTL } from "@/shared/lib/rt";
import useCustomizerStore from "@/shared/store/useCustomizerStore";
import { ThemeSettings } from "@/shared/theme/theme-settings";
import { ErrorHandler, logError } from "@/shared/ui/error-handler";
import { Spinner, spinnerModel } from "@/shared/ui/spinner";
import { AlertDialogProvider } from "./AlertDialogProvider";
import { QueryClientProvider } from "./QueryClientProvider";
import { CustomBrowserRouter } from "./RouterProvider";
import { SnackbarProvider } from "./SnackbarProvider";

const enhance = compose((component) =>
  withErrorBoundary(component, {
    FallbackComponent: ErrorHandler,
    onError: logError,
  }),
);

export const Provider = enhance(() => {
  // const routing = useRoutes(Router);
  const theme = ThemeSettings();

  // UI 방향
  const activeDir = useCustomizerStore((state) => state.activeDir);

  // Snackbar = 알림 메세지
  // AlertDialogProvider = 팝업 알림 창
  return (
    <>
      <GlobalSpinner />
      <QueryClientProvider>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            <AlertDialogProvider>
              <RTL direction={activeDir}>
                <CssBaseline />
                <CustomBrowserRouter />
              </RTL>
            </AlertDialogProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
});

function GlobalSpinner() {
  const display = spinnerModel.globalSpinner.use.display();

  return <Spinner display={display} />;
}
