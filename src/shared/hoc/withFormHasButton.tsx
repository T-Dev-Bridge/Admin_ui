import React, { ForwardedRef, forwardRef, useImperativeHandle } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack } from "@mui/material";
import { DefaultValues, FieldValues, Path, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IconLoadingButton } from "@/shared/ui/button";
import { FlexRowBox } from "@/shared/ui/material-ui/box";

interface ExternalFormProps<T extends FieldValues> {
  defaultValues: DefaultValues<T>;
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  externalReset?: (values?: DefaultValues<T>) => void;
  externalSetError: (name: string, message: string) => void;
  isLoading: boolean;
  saveButtonText?: string;
  cancelButtonText?: string;
}

interface InternalFormProps {
  formSchema: any;
}

type CombinedFormProps<T extends FieldValues> = ExternalFormProps<T> &
  Partial<InternalFormProps>;

export function withFormHasButton<T extends FieldValues>(
  Component: React.ComponentType<any>,
  internalProps: InternalFormProps,
) {
  return forwardRef(function EnhancedForm(
    externalProps: ExternalFormProps<T>,
    ref: ForwardedRef<any>,
  ) {
    const combinedProps: CombinedFormProps<T> = {
      ...internalProps,
      ...externalProps,
    };

    const { t } = useTranslation();

    const {
      onSubmit,
      formSchema,
      defaultValues,
      saveButtonText = t("button.save"),
      cancelButtonText = t("button.cancel"),
      onCancel,
      isLoading,
    } = combinedProps;

    const {
      control,
      handleSubmit,
      reset,
      setError,
      formState: { errors, isDirty, isValid, isSubmitting },
    } = useForm<T>({
      mode: "onTouched",
      resolver: zodResolver(formSchema),
      defaultValues: defaultValues as DefaultValues<T>,
    });

    useImperativeHandle(ref, () => ({
      externalReset: (values?: DefaultValues<T>) => reset(values),
      externalsetError: (name: Path<T>, message: string) =>
        setError(name, { message }),
    }));

    const canSubmit = [isDirty, isValid, !isLoading, !isSubmitting].every(
      Boolean,
    );

    const handleClose = () => {
      if (onCancel) onCancel();
      reset();
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Component
            control={control}
            errors={errors}
          />
          <FlexRowBox>
            <Button
              variant="contained"
              color="inherit"
              onClick={handleClose}
              sx={{ mr: 1 }}
            >
              {cancelButtonText}
            </Button>
            <IconLoadingButton
              loading={isLoading || isSubmitting}
              color="primary"
              type="submit"
              text={saveButtonText}
              disabled={!canSubmit}
            />
          </FlexRowBox>
          <Box />
        </Stack>
      </form>
    );
  });
}
