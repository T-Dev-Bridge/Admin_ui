import { AxiosError } from "axios";
import { TFunction } from "i18next";

export function handleError(
  error: AxiosError,
  handleSetError: (field: string, message: string) => void,
  t: TFunction,
  message400: string,
  message500: string,
) {
  if (error.message) {
    handleSetError("root", error.message);
    return;
  }

  if (error.response?.status === 400) {
    handleSetError("root", t(message400));
  } else if (error.response?.status === 500) {
    handleSetError("root", t(message500));
  }
}
