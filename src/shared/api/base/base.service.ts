import { AxiosResponse } from "axios";
import { AxiosContracts } from "@/shared/lib/axios";
import { baseClient } from "../index";
import { baseContractsDto } from ".";

interface RequestParams<TRequest> {
  url?: string;
  data?: TRequest;
  requestSchema: any;
  responseSchema: any;
}

export class BaseService {
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
          baseContractsDto.BaseResponseDtoSchema(
            baseContractsDto.BaseListResponseDtoSchema(params.schema),
          ),
        ),
      );
  }

  static async getCSV<TParams>(params: {
    url?: string;
    params: TParams;
    schema: any;
    config: { signal?: AbortSignal };
  }): Promise<AxiosResponse> {
    const fullUrl = this.buildFullUrl(params.url);
    const response = await baseClient.get(fullUrl, {
      params: params.params,
      ...params.config,
      responseType: "blob",
    });
    return response;
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
          baseContractsDto.BaseResponseDtoSchema(
            baseContractsDto.BaseAllListResponseDtoSchema(params.schema),
          ),
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
        AxiosContracts.responseContract(
          baseContractsDto.BaseResponseDtoSchema(params.schema),
        ),
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
          baseContractsDto.BaseResponseDtoSchema(params.responseSchema),
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
          baseContractsDto.BaseResponseDtoSchema(params.responseSchema),
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
          baseContractsDto.BaseResponseDtoSchema(params.responseSchema),
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
          baseContractsDto.BaseResponseDtoSchema(params.responseSchema),
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
          baseContractsDto.BaseResponseDtoSchema(params.responseSchema),
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
