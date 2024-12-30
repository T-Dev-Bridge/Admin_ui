import axios, { AxiosError } from "axios";
import { z } from "zod";
import { baseContractsDto } from "./base";

export const baseClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export function handleGenericError(error: AxiosError) {
  const errorValidation = baseContractsDto
    .BaseResponseDtoSchema(baseContractsDto.BaseErrorResponseDtoSchema)
    .safeParse(error.response?.data);

  if (errorValidation.success) {
    const baseErrorValidation =
      baseContractsDto.BaseErrorResponseDtoSchema.safeParse(
        errorValidation.data.data,
      );

    if (baseErrorValidation.success) {
      const { message } = baseErrorValidation.data;
      return new AxiosError(
        message,
        error.code,
        error.config,
        error.request,
        error.response,
      );
    }
    return new AxiosError(
      typeof errorValidation.data.data === "string"
        ? errorValidation.data.data
        : errorValidation.data.message ||
          errorValidation.error ||
          "오류가 발생했습니다.",
      error.code,
      error.config,
      error.request,
      error.response,
    );
  }
  const validation = GenericErrorSchema.safeParse(error.response?.data);

  if (validation.error) {
    return error;
  }

  const message = formatValidationErrors(validation.data);

  return new AxiosError(
    message,
    error.code,
    error.config,
    error.request,
    error.response,
  );
}

const GenericErrorSchema = z.object({
  errors: z.record(z.string(), z.array(z.string())),
});

type GenericError = z.infer<typeof GenericErrorSchema>;

function formatValidationErrors(data: GenericError): string {
  return Object.entries(data.errors)
    .map(([field, messages]) =>
      messages.map((message) => `${field}: ${message}`).join("\n"),
    )
    .join("\n");
}
