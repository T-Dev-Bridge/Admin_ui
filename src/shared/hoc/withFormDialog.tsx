import React, { ForwardedRef, forwardRef, useImperativeHandle } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { DefaultValues, FieldValues, Path, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IconLoadingButton } from "@/shared/ui/button";
import { FlexRowBox } from "@/shared/ui/material-ui/box";

interface ExternalFormDialogProps<T extends FieldValues> {
  title: string;
  defaultValues: DefaultValues<T>;
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  externalReset?: (values?: DefaultValues<T>) => void;
  externalSetError: (name: string, message: string) => void;
  isLoading: boolean;
  saveButtonText?: string;
  cancelButtonText?: string;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
}

interface InternalFormDialogProps {
  formSchema: any;
  backdropClickClose?: boolean;
}

type CombinedFormDialogProps<T extends FieldValues> =
  ExternalFormDialogProps<T> & Partial<InternalFormDialogProps>;

export function withFormDialog<T extends FieldValues>(
  Component: React.ComponentType<any>,
  internalProps: InternalFormDialogProps,
) {
  return forwardRef(function EnhancedFormDialog(
    externalProps: ExternalFormDialogProps<T>,
    ref: ForwardedRef<any>,
  ) {
    const combinedProps: CombinedFormDialogProps<T> = {
      ...internalProps,
      ...externalProps,
    };

    const { t } = useTranslation();

    const {
      open,
      setOpen,
      onSubmit,
      formSchema,
      defaultValues,
      title,
      saveButtonText = t("button.save"),
      cancelButtonText = t("button.cancel"),
      onCancel,
      isLoading,
      maxWidth,
      backdropClickClose = true,
    } = combinedProps;

    const {
      control,
      handleSubmit,
      watch,
      reset,
      setValue,
      setError,
      clearErrors,
      trigger,
      formState: { errors, isDirty, isValid, isSubmitting },
    } = useForm<T>({
      mode: "onTouched",
      resolver: zodResolver(formSchema),
      defaultValues: defaultValues as DefaultValues<T>,
    });

    useImperativeHandle(ref, () => ({
      externalReset: (values?: DefaultValues<T>) => reset(values),
      externalSetError: (name: Path<T>, message: string) =>
        setError(name, { message }),
    }));

    const canSubmit = [isDirty, isValid, !isLoading, !isSubmitting].every(
      Boolean,
    );

    const handleClose = () => {
      if (onCancel) onCancel();
      setOpen!(false);
      reset();
    };

    return (
      <Dialog
        maxWidth={maxWidth}
        fullWidth
        open={open!}
        onClose={(_, reason) => {
          if (reason === "backdropClick" && backdropClickClose) {
            handleClose();
          }
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <Component
                watch={watch}
                clearErrors={clearErrors}
                setValue={setValue}
                control={control}
                errors={errors}
                trigger={trigger}
              />
              <DialogActions>
                <FlexRowBox>
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={handleClose}
                    // 버튼 글씨 크기에 맞도록 디자인
                    sx={{ mr: 1, minWidth: "fit-content" }}
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
              </DialogActions>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
    );
  });
}
