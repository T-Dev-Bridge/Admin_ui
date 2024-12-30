import { JSX } from "react";
import { Card, CardHeader, CardContent, Divider } from "@mui/material";

type Props = {
  title?: string;
  children: JSX.Element | JSX.Element[];
};

export function ChildCard({ title, children }: Props) {
  return (
    <Card
      sx={{ padding: 0, borderColor: (theme: any) => theme.palette.divider }}
      variant="outlined"
    >
      {title ? (
        <>
          <CardHeader title={title} />
          <Divider />{" "}
        </>
      ) : (
        ""
      )}

      <CardContent>{children}</CardContent>
    </Card>
  );
}
