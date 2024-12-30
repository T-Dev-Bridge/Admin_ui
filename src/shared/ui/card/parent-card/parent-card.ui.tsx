import { JSX } from "react";
import { Card, CardHeader, CardContent, Divider, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useCustomizerStore from "@/shared/store/useCustomizerStore";

type Props = {
  title: string;
  footer?: string | JSX.Element;
  children: JSX.Element;
};

export function ParentCard({ title, children, footer }: Props) {
  const customizer = useCustomizerStore();

  const theme = useTheme();
  const borderColor = theme.palette.divider;

  return (
    <Card
      sx={{
        padding: 0,
        border: !customizer.isCardShadow ? `1px solid ${borderColor}` : "none",
      }}
      elevation={customizer.isCardShadow ? 9 : 0}
      variant={!customizer.isCardShadow ? "outlined" : undefined}
    >
      <CardHeader title={title} />
      <Divider />

      <CardContent>{children}</CardContent>
      {footer ? (
        <>
          <Divider />
          <Box p={3}>{footer}</Box>
        </>
      ) : (
        ""
      )}
    </Card>
  );
}
