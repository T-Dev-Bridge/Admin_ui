import React from "react";
import { Box, InputProps } from "@mui/material";
import { Control, FieldErrors } from "react-hook-form";
import { EnhancedFormLabel } from "../form-label";
import { FormOutlinedInput } from "../form-outlined-input/form-outlined-input.ui";

interface LabeledFormOutlinedInputProps extends InputProps {
  name: string;
  control: Control<any>;
  errors: FieldErrors;
  type?: string;
  id?: string;
  labelKey: string;
  mb?: number;
  required?: boolean;
  absolute?: boolean;
}

export const LabeledFormOutlinedInput: React.FC<
  LabeledFormOutlinedInputProps
> = ({
  name,
  control,
  errors,
  type = "text",
  id,
  labelKey,
  mb = 0,
  required = false,
  absolute = true,
  ...rest
}) => {
  return (
    <Box pb={mb}>
      <EnhancedFormLabel
        labelKey={labelKey}
        required={required}
      />
      <FormOutlinedInput
        absolute={absolute}
        name={name}
        control={control}
        errors={errors}
        type={type}
        id={id}
        {...rest}
      />
    </Box>
  );
};
