import { JSX, useRef } from "react";
import { Typography } from "@mui/material";
import { AxiosError, AxiosResponse } from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { withForm } from "@/shared/hoc/withForm";
import { handleError } from "@/shared/lib/handle-error";
import { pathKeys } from "@/shared/lib/react-router";
import { loginContract, LoginForm } from "./login-form";
import { LoginSchema } from "./login-form/login-form.contract";
import { useLoginMutation } from "./login.mutation";

interface LoginProps {
  title?: string;
  subtext?: JSX.Element | JSX.Element[];
}

export function Login({ title, subtext }: LoginProps) {
  const navigate = useNavigate();
  const loginFormRef = useRef<any>(null);
  const { t } = useTranslation();

  const { mutate, isPending } = useLoginMutation({
    onSuccess: async (response: AxiosResponse) => {
      const {
        data: { data },
      } = response;
      if (data == null) {
        return;
      }
      navigate(pathKeys.root);
    },
    onError: (error: AxiosError) => {
      handleError(
        error,
        handleSetError,
        t,
        "error.message.login400",
        "error.message.common500",
      );
    },
  });
  const handleSetError = (name: string, message: string) => {
    if (loginFormRef.current) {
      loginFormRef.current.externalSetError(name, message);
    }
  };

  const handleLoginSubmit = (data: loginContract.Login) => {
    mutate(data);
  };

  return (
    <>
      {title && (
        <Typography
          fontWeight="700"
          variant="h3"
          mb={1}
        >
          {title}
        </Typography>
      )}

      {subtext}

      <EnhancedLoginForm
        ref={loginFormRef}
        defaultValues={{ username: "", password: "" }}
        onSubmit={handleLoginSubmit}
        isLoading={isPending}
      />
    </>
  );
}

const EnhancedLoginForm = withForm<loginContract.Login>(LoginForm, {
  formSchema: LoginSchema,
});
