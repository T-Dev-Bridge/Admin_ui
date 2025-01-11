import { getI18n } from "react-i18next";
import { z } from "zod";

export interface BaseDto {
  createdWho?: string | null;
  createdAt?: string | null;
  updatedWho?: string | null;
  updatedAt?: string | null;
  id?: number | null;
  seq?: number | null;
}

interface ValidationMessage {
  key: string;
  maxLen?: number;
  minLen?: number;
}

interface ValidationMessages {
  commonRequired: string;
  commonEmail: string;
  commonMinLen4: string;
  commonMinLen6: string;
  commonMinLen8: string;
  commonMaxLen10: string;
  commonMaxLen15: string;
  commonMaxLen20: string;
  commonMaxLen100: string;
  commonMaxLen200: string;
  commonMaxLen1000: string;
  confirmPassword: string;
}

const createValidationMessages = (
  messages: Record<keyof ValidationMessages, ValidationMessage>,
): ValidationMessages => {
  const i18n = getI18n();
  const validationMessages: Partial<ValidationMessages> = {};

  Object.keys(messages).forEach((key) => {
    const message = messages[key as keyof ValidationMessages];
    const result = i18n.t(message.key, {
      maxLen: message.maxLen,
      minLen: message.minLen,
    });
    validationMessages[key as keyof ValidationMessages] =
      typeof result === "string" ? result : String(result);
  });

  return validationMessages as ValidationMessages;
};

export const validationMessages: ValidationMessages = createValidationMessages({
  commonRequired: { key: "common.validation.required" },
  commonEmail: { key: "common.validation.email" },
  commonMinLen4: { key: "common.validation.minLen", minLen: 4 },
  commonMinLen6: { key: "common.validation.minLen", minLen: 6 },
  commonMinLen8: { key: "common.validation.minLen", minLen: 8 },
  commonMaxLen10: { key: "common.validation.maxLen", maxLen: 10 },
  commonMaxLen15: { key: "common.validation.maxLen", maxLen: 15 },
  commonMaxLen20: { key: "common.validation.maxLen", maxLen: 20 },
  commonMaxLen100: { key: "common.validation.maxLen", maxLen: 100 },
  commonMaxLen200: { key: "common.validation.maxLen", maxLen: 200 },
  commonMaxLen1000: { key: "common.validation.maxLen", maxLen: 1000 },
  confirmPassword: { key: "common.validation.confirmPassword" },
});

/**
 * 기본 Axios 응답 형식 ( BackEnd CommonResponse )
 */
export const BaseResponseDtoSchema = <T>(dataSchema?: z.ZodType<T>) =>
  z.object({
    success: z.boolean(),
    data: dataSchema ? dataSchema.nullable() : z.null(),
    message: z.string().nullable(),
  });

export const BaseErrorResponseDtoSchema = z.object({
  error: z.string().nullable(),
  message: z.string(),
  path: z.string(),
  status: z.number(),
});

/**
 * Base Entity Schema
 */
export const BaseDtoSchema = z.object({
  seq: z.number().nullable().optional(),
  id: z.any().nullable().optional(),
  createdWho: z.string().nullable().optional(),
  createdAt: z.string().nullable().optional(),
  updatedWho: z.string().nullable().optional(),
  updatedAt: z.string().nullable().optional(),
});

/**
 * Page 조회시 돌아오는 Pagination 응답 형식 정의
 */
export const BaseResponsePaginationDtoSchema = z.object({
  endIndex: z.number(),
  lastPage: z.number(),
  length: z.number(),
  page: z.number(),
  size: z.number(),
  startIndex: z.number(),
});

/**
 * Page 조회시 돌아오는 기본 응답 형식 Schema
 */
export const BaseListResponseDtoSchema = <T>(dataSchema: z.ZodType<T>) =>
  z.object({
    list: z.array(dataSchema),
    pagination: BaseResponsePaginationDtoSchema,
  });

export const BaseAllListResponseDtoSchema = <T>(dataSchema: z.ZodType<T>) =>
  z.array(dataSchema);

export const BaseExportCSVRequestDtoSchema = z.object({
  rootPath: z.string(),
  dbPath: z.string(),
  csvPath: z.string(),
});

/**
 * Page 조회시 사용될 기본 요청 Request Params
 */
export const PageParamsDtoSchema = z.object({
  index: z.number().min(0),
  size: z.number().min(1),
  searchOp: z.enum(["OR", "AND"]),
  keywords: z.string().optional(),
  sortProperties: z.string(),
});
