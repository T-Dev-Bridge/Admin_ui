import { JSX } from "react";
import { Card } from "@mui/material";
import useCustomizerStore from "@/shared/store/useCustomizerStore";

type Props = {
  children: JSX.Element | JSX.Element[];
};

export function AppCard({ children }: Props) {
  const customizer = useCustomizerStore();

  return (
    <Card
      sx={{ display: "flex", p: 0 }}
      elevation={customizer.isCardShadow ? 9 : 0}
      variant={!customizer.isCardShadow ? "outlined" : undefined}
    >
      {children}
    </Card>
  );
}
