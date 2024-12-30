import { ChangeEvent } from "react";
import { Box, InputProps } from "@mui/material";
import { t } from "i18next";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { FORM_ABSOLUTE_MARGIN_BOTTOM } from "@/shared/constants/constants";
import { ErrorMessage } from "../error-message";
import { CustomOutlinedInput } from "../outlined-input";

interface FormOutlinedInputProps extends InputProps {
  name: string;
  control: Control<any>;
  errors: FieldErrors;
  type?: string;
  id?: string;
  absolute?: boolean;
}

export function FormOutlinedInput({
  name,
  control,
  errors,
  type = "text",
  id,
  placeholder,
  endAdornment,
  absolute,
  ...rest
}: FormOutlinedInputProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Box mb={absolute ? FORM_ABSOLUTE_MARGIN_BOTTOM : 0}>
          <CustomOutlinedInput
            {...rest}
            fullWidth
            endAdornment={endAdornment}
            id={id || name}
            type={type}
            placeholder={placeholder && t(`${placeholder}`)}
            {...field}
            error={Boolean(errors[name])}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              field.onChange(
                type === "number" ? +e.target.value : e.target.value,
              )
            }
            value={
              type === "number" && field.value !== ""
                ? Number(field.value)
                : field.value
            }
          />
          <Box ml={1.75}>
            <ErrorMessage
              absolute={absolute}
              errorMessage={errors[name]?.message?.toString()}
            />
          </Box>
        </Box>
      )}
    />
  );
}
