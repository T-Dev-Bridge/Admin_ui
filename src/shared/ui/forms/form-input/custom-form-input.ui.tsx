import React from "react";
import { Box } from "@mui/material";
import {
  Control,
  Controller,
  FieldErrors,
  Path,
  FieldValues,
} from "react-hook-form";
import { CustomTextField } from "@/shared/ui/forms";

export interface CustomFormInputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  errors: FieldErrors<T>;
  disabled?: boolean;
  width?: string;
  type?: string;
}

export const CustomFormInput = <T extends FieldValues>({
  name,
  label,
  control,
  errors,
  type = "text",
  disabled = false,
  width = "100%",
}: CustomFormInputProps<T>): React.ReactElement => (
  <Box width={width}>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <CustomTextField
          fullWidth
          id={name}
          {...field}
          label={label}
          value={type === "number" ? Number(field.value) : field.value}
          onChange={(e: any) => {
            const value =
              type === "number" ? Number(e.target.value) : e.target.value;
            field.onChange(value);
          }}
          type={type}
          disabled={disabled}
          error={Boolean(errors[name])}
          helperText={errors[name]?.message as string}
        />
      )}
    />
  </Box>
);
