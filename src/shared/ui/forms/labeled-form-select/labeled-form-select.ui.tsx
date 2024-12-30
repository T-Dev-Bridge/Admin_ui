import React from "react";
import { Box, SelectProps } from "@mui/material";
import { Control, FieldErrors } from "react-hook-form";
import { EnhancedFormLabel } from "../form-label";
import { FormSelect, Option } from "../form-select/form-select.ui";

type LabeledFormSelectProps = SelectProps & {
  name: string;
  control: Control<any>;
  errors: FieldErrors;
  options: Option[];
  namespace: string;
  labelKey: string;
  mb?: number;
  required?: boolean;
  customPlaceholder?: Option;
  absolute?: boolean;
};

export const LabeledFormSelect: React.FC<LabeledFormSelectProps> = ({
  name,
  control,
  errors,
  options,
  labelKey,
  mb = 0,
  namespace,
  required = false,
  customPlaceholder,
  absolute = true,
  ...rest
}) => {
  return (
    <Box pb={mb}>
      <EnhancedFormLabel
        labelKey={labelKey}
        required={required}
      />
      <FormSelect
        name={name}
        namespace={namespace}
        options={options}
        errors={errors}
        control={control}
        customPlaceholder={customPlaceholder}
        absolute={absolute}
        {...rest}
      />
    </Box>
  );
};
