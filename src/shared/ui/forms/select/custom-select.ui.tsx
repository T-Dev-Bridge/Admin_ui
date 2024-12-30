import React, { ReactNode } from "react";
import {
  Select,
  FormHelperText,
  FormControl,
  SelectProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";

type CustomSelectProps = SelectProps & {
  helperText?: ReactNode;
  error?: boolean;
};

export const CustomSelect = styled(
  React.forwardRef<HTMLDivElement, CustomSelectProps>((props, ref) => {
    const { error, helperText, children, ...rest } = props;
    return (
      <FormControl
        fullWidth
        error={error}
        sx={{ position: "relative" }}
        ref={ref}
      >
        <Select {...rest}>{children}</Select>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }),
)(() => ({}));
