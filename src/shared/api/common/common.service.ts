import { AxiosResponse } from "axios";
import { AxiosContracts } from "@/shared/lib/axios";
import { baseClient } from "../index";
import {
  BaseListResponseDtoSchema,
  BaseResponseDtoSchema,
  BaseAllListResponseDtoSchema,
} from ".";

/**
 * Axios 요청 정의를 위한 base 클래스
 * getList : Pagination 을 포함한 목록 조회
 * getAllList : 전체 리스트 조회
 * getOne : 단일 객체 조회
 * create : 객체 생성
 * update : 단일 객체 업데이트
 * updateMultiple : 목록 업데이트
 * deleteOne : 단일 객체 삭제
 * deleteMultiple : 목록 삭제
 */
interface RequestParams<TRequest> {
  url?: string;
  data?: TRequest;
  requestSchema: any;
  responseSchema: any;
}

export class CommonService {
  static baseUrl: string;

  static setBaseUrl(url: string) {
    this.baseUrl = url;
  }

  static getList<TParams>(params: {
    url?: string;
    params: TParams;
    schema: any;
    config: { signal?: AbortSignal };
  }): Promise<AxiosResponse> {
    const fullUrl = this.buildFullUrl(params.url);
    return baseClient
      .get(fullUrl, {
        params: params.params,
        ...params.config,
      })
      .then(
        AxiosContracts.responseContract(
          BaseResponseDtoSchema(BaseListResponseDtoSchema(params.schema)),
        ),
      );
  }

  static getAllList<TParams>(params: {
    url?: string;
    params: TParams;
    schema: any;
    config: { signal?: AbortSignal };
  }): Promise<AxiosResponse> {
    const fullUrl = this.buildFullUrl(params.url);

    return baseClient
      .get(fullUrl, {
        params: params.params,
        ...params.config,
      })
      .then(
        AxiosContracts.responseContract(
          BaseResponseDtoSchema(BaseAllListResponseDtoSchema(params.schema)),
        ),
      );
  }

  static getOne(params: {
    url?: string;
    schema: any;
    config: { signal?: AbortSignal };
  }): Promise<AxiosResponse> {
    const fullUrl = this.buildFullUrl(params.url);
    return baseClient
      .get(fullUrl, params.config)
      .then(
        AxiosContracts.responseContract(BaseResponseDtoSchema(params.schema)),
      );
  }

  static create<TRequest>(
    params: RequestParams<TRequest>,
  ): Promise<AxiosResponse> {
    const fullUrl = this.buildFullUrl(params.url);
    const validatedData = AxiosContracts.requestContract(
      params.requestSchema,
      params.data,
    );

    return baseClient
      .post(fullUrl, validatedData)
      .then(
        AxiosContracts.responseContract(
          BaseResponseDtoSchema(params.responseSchema),
        ),
      );
  }

  static updateMultiple<TRequest>(
    params: RequestParams<TRequest>,
  ): Promise<AxiosResponse> {
    const validatedData = AxiosContracts.requestContract(
      params.requestSchema,
      params.data,
    );
    const fullUrl = this.buildFullUrl(params.url);
    return baseClient
      .put(fullUrl, validatedData)
      .then(
        AxiosContracts.responseContract(
          BaseResponseDtoSchema(params.responseSchema),
        ),
      );
  }

  static update<TRequest>(
    params: RequestParams<TRequest>,
  ): Promise<AxiosResponse> {
    const fullUrl = this.buildFullUrl(params.url);
    const validatedData = AxiosContracts.requestContract(
      params.requestSchema,
      params.data,
    );

    return baseClient
      .put(fullUrl, validatedData)

      .then(
        AxiosContracts.responseContract(
          BaseResponseDtoSchema(params.responseSchema),
        ),
      );
  }

  static deleteOne<TRequest>(
    params: RequestParams<TRequest>,
  ): Promise<AxiosResponse> {
    const fullUrl = this.buildFullUrl(params.url);
    const validatedData = AxiosContracts.requestContract(
      params.requestSchema,
      params.data,
    );
    return baseClient
      .delete(fullUrl, { data: validatedData })
      .then(
        AxiosContracts.responseContract(
          BaseResponseDtoSchema(params.responseSchema),
        ),
      );
  }

  static deleteMultiple<TRequest>(
    params: RequestParams<TRequest>,
  ): Promise<AxiosResponse> {
    const validatedData = AxiosContracts.requestContract(
      params.requestSchema,
      params.data,
    );
    const fullUrl = this.buildFullUrl(params.url);
    return baseClient
      .delete(fullUrl, { data: validatedData })
      .then(
        AxiosContracts.responseContract(
          BaseResponseDtoSchema(params.responseSchema),
        ),
      );
  }

  static buildFullUrl(url?: string): string {
    if (url && url.length) {
      return `${this.baseUrl}${url}`;
    }
    return this.baseUrl;
  }
}
