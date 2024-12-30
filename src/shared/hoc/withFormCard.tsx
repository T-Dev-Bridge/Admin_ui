import React, { ForwardedRef, forwardRef, useImperativeHandle } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save as SaveIcon, Cancel as CancelIcon } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { DefaultValues, FieldValues, Path, useForm } from "react-hook-form";

interface ExternalFormProps<T extends FieldValues> {
  title: string;
  defaultValues: DefaultValues<T>;
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
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

export function withFormCard<T extends FieldValues>(
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

    const { onSubmit, formSchema, defaultValues, onCancel, isLoading } =
      combinedProps;

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
      // reset();
    };

    return (
      <>
        <Box
          sx={{
            position: "absolute",
            top: 15,
            right: 24,
            display: "flex",
          }}
        >
          <IconButton
            onClick={handleSubmit(onSubmit)}
            disabled={!canSubmit}
            sx={{ color: "white" }}
          >
            <SaveIcon />
          </IconButton>
          <IconButton
            onClick={handleClose}
            sx={{ color: "white" }}
          >
            <CancelIcon />
          </IconButton>
        </Box>

        <Component
          control={control}
          errors={errors}
        />
      </>
    );
  });
}
