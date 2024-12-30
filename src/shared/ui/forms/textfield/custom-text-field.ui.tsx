import React from "react";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CustomTextField = styled(
  React.forwardRef((props: any, ref: React.Ref<any>) => (
    <TextField
      {...props}
      ref={ref}
    />
  )),
)(({ theme }) => ({
  "& .MuiInputBase-inputMultiline": {
    padding: 0,
  },
  "& .MuiOutlinedInput-input::-webkit-input-placeholder": {
    color: theme.palette.text.secondary,
    opacity: "0.8",
  },
  "& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder": {
    color: theme.palette.text.secondary,
    opacity: "1",
  },
  "& .Mui-disabled .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.grey[200],
  },
}));
