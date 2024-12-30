import { AxiosHeaders, AxiosResponse } from "axios";
import { ZodType } from "zod";
import { AxiosValidationError } from "./AxiosValidationError";

export class AxiosContracts {
  // 응답 객체 타입 유효성 확인
  static responseContract<Data>(schema: ZodType<Data>) {
    return (response: AxiosResponse<unknown>): AxiosResponse<Data> => {
      console.log("response -----> ", response.data);
      const validation = schema.safeParse(response.data);
      console.log("validation -----> ", validation);
      if (validation.error || !validation.success) {
        throw new AxiosValidationError(
          response.config,
          response.request,
          response,
        );
      }
      return { ...response, data: validation.data };
    };
  }

  // 요청 객체 타입 유효성 확인
  static requestContract<Data>(schema: ZodType<Data>, data: unknown) {
    const validation = schema.safeParse(data);
    if (validation.error || !validation.success) {
      throw new AxiosValidationError(
        { headers: new AxiosHeaders() },
        undefined,
        undefined,
        validation.error.errors,
      );
    }
    return validation.data;
  }
}
