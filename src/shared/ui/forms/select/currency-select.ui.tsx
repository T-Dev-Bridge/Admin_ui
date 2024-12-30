import React from "react";
import {
  Select,
  FormHelperText,
  FormControl,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { Control, Controller, FieldValues } from "react-hook-form";
import {
  CurrencyCode,
  getSafeCurrencyOptions,
} from "@/shared/utils/currencyUtils";

interface CurrencySelectProps {
  name: string;
  control: Control<FieldValues>;
  label?: string;
  helperText?: string;
}

export const CurrencySelect: React.FC<CurrencySelectProps> = ({
  name,
  control,
  label,
  helperText,
}) => {
  const options = getSafeCurrencyOptions();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl
          fullWidth
          error={!!error}
        >
          {label && <InputLabel id={`${name}-label`}>{label}</InputLabel>}
          <Select
            {...field}
            labelId={`${name}-label`}
            id={name}
            label={label}
            onChange={(e: SelectChangeEvent<CurrencyCode>) =>
              field.onChange(e.target.value as CurrencyCode)
            }
          >
            {options.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {(helperText || error) && (
            <FormHelperText>
              {error ? error.message : helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};
