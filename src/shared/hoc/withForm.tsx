import React, { ForwardedRef, forwardRef, useImperativeHandle } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm, DefaultValues, Path } from "react-hook-form";

interface ExternalFormProps<T extends FieldValues> {
  defaultValues: DefaultValues<T>;
  onSubmit: (data: T) => void;
  isLoading?: boolean;
}

interface InternalFormProps {
  formSchema: any;
}

type CombinedFormProps<T extends FieldValues> = ExternalFormProps<T> &
  Partial<InternalFormProps>;

export function withForm<T extends FieldValues>(
  Component: React.ComponentType<any>, // 필드를 넘겨받아 처리할 컴포넌트
  internalProps: InternalFormProps, // 내부에서 처리할 스키마 정보
) {
  return forwardRef(function EnhancedForm(
    externalProps: ExternalFormProps<T> & any,
    ref: ForwardedRef<any>,
  ) {
    const combinedProps: CombinedFormProps<T> = {
      ...internalProps,
      ...externalProps,
    };

    const {
      defaultValues,
      onSubmit,
      formSchema,
      isLoading = false,
      ...restProps
    } = combinedProps;

    const {
      control,
      reset,
      setError,
      handleSubmit,
      formState: { errors, isDirty, isValid, isSubmitting },
    } = useForm<T>({
      mode: "onTouched",
      resolver: zodResolver(formSchema),
      defaultValues,
    });

    useImperativeHandle(ref, () => ({
      externalReset: (values?: DefaultValues<T>) => reset(values),
      externalSetError: (name: Path<T>, message: string) =>
        setError(name, { message }),
    }));

    const canSubmit = [isDirty, isValid, !isSubmitting, !isLoading].every(
      Boolean,
    );

    const handleFormSubmit = (data: T) => {
      onSubmit(data);
    };

    return (
      <Component
        control={control}
        errors={errors}
        onSubmit={handleSubmit(handleFormSubmit)}
        canSubmit={canSubmit}
        isLoading={isLoading}
        {...restProps}
      />
    );
  });
}
