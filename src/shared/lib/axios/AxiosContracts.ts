import { AxiosHeaders, AxiosResponse } from "axios";
import { ZodType } from "zod";
import { AxiosValidationError } from "./AxiosValidationError";

/**
 * Axios 요청, 응답 data Body Object 타입 유효성 체크
 */
export class AxiosContracts {
  // 응답 객체 타입 유효성 확인
  static responseContract<Data>(schema: ZodType<Data>) {
    return (response: AxiosResponse<unknown>): AxiosResponse<Data> => {
      // 응답이 잘 왔는지 확인
      console.log("response -----> ", response.data);
      const validation = schema.safeParse(response.data);
      // 유효한 타입 형태인지 확인, success : false 면 타입 체크 필요
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
