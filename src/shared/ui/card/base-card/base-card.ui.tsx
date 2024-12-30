import { JSX } from "react";
import { Card, CardHeader, CardContent, Divider } from "@mui/material";
import useCustomizerStore from "@/shared/store/useCustomizerStore";

type Props = {
  title: string;
  children: JSX.Element | JSX.Element[];
};

export function BaseCard({ title, children }: Props) {
  const customizer = useCustomizerStore();

  return (
    <Card
      sx={{ padding: 0 }}
      elevation={customizer.isCardShadow ? 9 : 0}
      variant={!customizer.isCardShadow ? "outlined" : undefined}
    >
      <CardHeader title={title} />
      <Divider />
      <CardContent>{children}</CardContent>
    </Card>
  );
}
