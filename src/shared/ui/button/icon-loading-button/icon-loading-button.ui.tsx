import LoadingButton from "@mui/lab/LoadingButton";
import { ButtonProps } from "@mui/material";

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
  text: string;
  icon?: React.ReactNode;
}

export function IconLoadingButton({
  loading,
  disabled,
  color,
  text,
  icon,
  type = "button",
  ...rest
}: LoadingButtonProps) {
  return (
    <LoadingButton
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
    </LoadingButton>
  );
}
