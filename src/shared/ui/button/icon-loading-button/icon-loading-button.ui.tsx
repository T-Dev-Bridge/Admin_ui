import { ReactElement, ReactNode } from "react";
import { Button, ButtonProps } from "@mui/material";

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
  text: string;
  icon?: ReactNode;
}

export function IconLoadingButton({
  loading,
  disabled,
  color,
  text,
  icon,
  type = "button",
  ...rest
}: LoadingButtonProps): ReactElement {
  return (
    <Button
      fullWidth
      disabled={disabled}
      loading={loading}
      variant="contained"
      color={color}
      startIcon={icon}
      type={type}
      {...rest}
    >
      {text}
    </Button>
  );
}
