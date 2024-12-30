import React from "react";
import { Box, CheckboxProps } from "@mui/material";
import { Control } from "react-hook-form";
import { FormCheckbox } from "../form-checkbox/form-checkbox.ui";
import { EnhancedFormLabel } from "../form-label";

interface LabeledFormCheckboxProps extends CheckboxProps {
  name: string;
  control: Control<any>;
  labelKey: string;
  mb?: number;
  required?: boolean;
}

export const LabeledFormCheckbox: React.FC<LabeledFormCheckboxProps> = ({
  name,
  control,
  labelKey,
  mb = 0,
  required = false,
  ...rest
}) => {
  return (
    <Box pb={mb}>
      <EnhancedFormLabel
        labelKey={labelKey}
        required={required}
      />
      <FormCheckbox
        name={name}
        control={control}
        {...rest}
      />
    </Box>
  );
};
