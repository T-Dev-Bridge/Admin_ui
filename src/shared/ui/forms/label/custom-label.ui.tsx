import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CustomLabel = styled((props: any) => (
  <Typography
    variant="subtitle1"
    fontWeight={600}
    {...props}
    component="label"
    htmlFor={props.htmlFor}
  />
))(() => ({
  marginBottom: "5px",
  marginTop: "10px",
  display: "block",
}));
