import { JSX } from "react";
import { Card } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useCustomizerStore from "@/shared/store/useCustomizerStore";

type Props = {
  className?: string;
  children: JSX.Element | JSX.Element[];
  sx?: any;
};

export function BlankCard({ children, className, sx }: Props) {
  const customizer = useCustomizerStore();

  const theme = useTheme();
  const borderColor = theme.palette.divider;

  return (
    <Card
      sx={{
        p: 0,
        border: !customizer.isCardShadow ? `1px solid ${borderColor}` : "none",
        position: "relative",
        sx,
      }}
      className={className}
      elevation={customizer.isCardShadow ? 9 : 0}
      variant={!customizer.isCardShadow ? "outlined" : undefined}
    >
      {children}
    </Card>
  );
}
