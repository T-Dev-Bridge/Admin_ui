import { CheckboxProps } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { CustomCheckbox } from "../checkbox";

interface FormCheckboxProps extends CheckboxProps {
  name: string;
  control: Control<any>;
}

export function FormCheckbox({ name, control, ...rest }: FormCheckboxProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <CustomCheckbox
          {...rest}
          {...field}
        />
      )}
    />
  );
}
