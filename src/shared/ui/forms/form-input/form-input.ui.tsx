import { ChangeEvent } from "react";
import { InputProps } from "@mui/material";
import { t } from "i18next";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { FORM_ABSOLUTE_MARGIN_BOTTOM } from "@/shared/constants/constants";
import { ErrorMessage } from "../error-message";
import { CustomTextField } from "../textfield";

interface FormInputProps extends InputProps {
  name: string;
  control: Control<any>;
  errors: FieldErrors;
  type?: string;
  id?: string;
  absolute?: boolean;
}

export function FormInput({
  name,
  control,
  errors,
  type = "text",
  id,
  placeholder,
  absolute = false,
  ...rest
}: FormInputProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <CustomTextField
          sx={{ mb: absolute ? FORM_ABSOLUTE_MARGIN_BOTTOM : 0 }}
          {...rest}
          fullWidth
          id={id || name}
          type={type}
          placeholder={placeholder && t(`${placeholder}`)}
          {...field}
          error={Boolean(errors[name])}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            field.onChange(type === "number" ? +e.target.value : e.target.value)
          }
          value={
            type === "number" && field.value !== ""
              ? Number(field.value)
              : field.value !== null
                ? field.value
                : ""
          }
          helperText={
            <ErrorMessage
              absolute={absolute}
              errorMessage={errors[name]?.message?.toString()}
            />
          }
          FormHelperTextProps={{ sx: { position: "relative" } }}
        />
      )}
    />
  );
}
