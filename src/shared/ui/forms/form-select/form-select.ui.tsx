import { MenuItem, SelectProps } from "@mui/material";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { ErrorMessage } from "../error-message";
import { CustomSelect } from "../select";

export interface Option {
  label: string;
  value: any;
}

type FormSelectProps = SelectProps & {
  name: string;
  namespace: string;
  options: Option[];
  control: Control<any>;
  errors: FieldErrors;
  customPlaceholder?: Option;
  absolute?: boolean;
};

export function FormSelect({
  name,
  namespace,
  options,
  control,
  errors,
  customPlaceholder,
  absolute = false,
  ...rest
}: FormSelectProps) {
  const pOptions: Option[] = [
    ...(customPlaceholder ? [customPlaceholder] : []),
    ...options.filter((option) => option !== undefined),
  ];
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <CustomSelect
          {...rest}
          {...field}
          fullWidth
          value={field.value}
          onChange={(e) => field.onChange(e.target.value)}
          error={Boolean(errors[name])}
          helperText={
            <ErrorMessage
              absolute={absolute}
              errorMessage={errors[name]?.message?.toString()}
            />
          }
        >
          {pOptions.map((option) => (
            <MenuItem
              key={`${namespace} ${option.label}`}
              value={option.value}
            >
              {option.label}
            </MenuItem>
          ))}
        </CustomSelect>
      )}
    />
  );
}
