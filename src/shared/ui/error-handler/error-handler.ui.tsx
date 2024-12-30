import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

type ErrorHandlerProps = {
  error: Error;
  resetErrorBoundary?: (...args: any[]) => void;
};

const isDevelopment = import.meta.env.DEV;

export function ErrorHandler(props: ErrorHandlerProps) {
  const { t } = useTranslation();
  const { error, resetErrorBoundary } = props;

  return (
    <div>
      <h3>Something went wrong.</h3>
      {isDevelopment && (
        <>
          <ul className="error-messages">
            <li key={error.message}>{error.message}</li>
          </ul>
          <pre>{error.stack}</pre>
        </>
      )}
      <Button
        type="button"
        onClick={resetErrorBoundary}
      >
        {t("button.retry")}
      </Button>
    </div>
  );
}
