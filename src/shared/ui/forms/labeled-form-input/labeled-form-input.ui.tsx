import React from "react";
import { Box, InputProps } from "@mui/material";
import { Control, FieldErrors } from "react-hook-form";
import { FormInput } from "../form-input";
import { EnhancedFormLabel } from "../form-label";

interface LabeledFormInputProps extends InputProps {
  name: string;
  control: Control<any>;
  errors: FieldErrors;
  type?: string;
  id?: string;
  labelKey: string;
  mb?: number;
  required?: boolean;
  multiline?: boolean;
  absolute?: boolean;
}

export const LabeledFormInput: React.FC<LabeledFormInputProps> = ({
  name,
  control,
  errors,
  type = "text",
  id,
  labelKey,
  mb = 0,
  required = false,
  multiline = false,
  absolute = true,
  ...rest
}) => {
  return (
    <Box pb={mb}>
      <EnhancedFormLabel
        labelKey={labelKey}
        required={required}
      />
      <FormInput
        name={name}
        control={control}
        errors={errors}
        type={type}
        id={id}
        absolute={absolute}
        multiline={multiline}
        {...rest}
      />
    </Box>
  );
};
