import React from "react";
import { OutlinedInput } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CustomOutlinedInput = styled(
  React.forwardRef((props: any, ref: React.Ref<any>) => (
    <OutlinedInput
      {...props}
      ref={ref}
    />
  )),
)(({ theme }) => ({
  "& .MuiOutlinedInput-input::-webkit-input-placeholder": {
    color: theme.palette.text.secondary,
    opacity: "0.8",
  },
  "& .MuiTypography-root": {
    color: theme.palette.text.secondary,
  },
  "& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder": {
    color: theme.palette.text.secondary,
    opacity: "1",
  },
}));
