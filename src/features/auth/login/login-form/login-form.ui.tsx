import React from "react";
import { Box, Stack, InputAdornment, IconButton } from "@mui/material";
import {
  IconEye,
  IconEyeOff,
  IconKeyFilled,
  IconUser,
} from "@tabler/icons-react";
import { Control } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IconLoadingButton } from "@/shared/ui/button";
import { ErrorMessage } from "@/shared/ui/forms";
import { LabeledFormOutlinedInput } from "@/shared/ui/forms/labeled-form-outlined-input";

interface LoginFormProps {
  control: Control<any>;
  errors: any;
  onSubmit: (data: any) => void;
  canSubmit: boolean;
  isLoading?: boolean;
}

export const LoginForm = ({
  control,
  errors,
  onSubmit,
  canSubmit,
  isLoading,
}: LoginFormProps) => {
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack
        spacing={2}
        position="relative"
      >
        <LabeledFormOutlinedInput
          name="username"
          autoComplete="username"
          control={control}
          errors={errors}
          type="text"
          labelKey="login.fields.userId"
          startAdornment={
            <InputAdornment position="start">
              <IconUser size="20" />
            </InputAdornment>
          }
        />
        <LabeledFormOutlinedInput
          name="password"
          autoComplete="current-password"
          control={control}
          errors={errors}
          type={showPassword ? "text" : "password"}
          labelKey="login.fields.password"
          mb={0}
          startAdornment={
            <InputAdornment position="start">
              <IconKeyFilled size="20" />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? (
                  <IconEye size="20" />
                ) : (
                  <IconEyeOff size="20" />
                )}
              </IconButton>
            </InputAdornment>
          }
        />
        <Box
          position="relative"
          top={0}
          left={0}
          pb={1}
        >
          {errors.root && (
            <ErrorMessage
              rootError
              errorMessage={errors.root?.message!}
            />
          )}
        </Box>

        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >
          {/* <Typography
            component={Link}
            to={pathKeys.forgotUsername()}
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            {t("login.forgotUsername")}
          </Typography>
          <Typography
            component={Link}
            to={pathKeys.forgotPassword()}
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            {t("login.forgotPassword")}
          </Typography> */}
        </Stack>

        <Box>
          <IconLoadingButton
            color="primary"
            size="large"
            fullWidth
            variant="contained"
            type="submit"
            loading={isLoading ?? false}
            disabled={!canSubmit || isLoading}
            text={t("button.signin")}
          />
        </Box>
      </Stack>
    </form>
  );
};
