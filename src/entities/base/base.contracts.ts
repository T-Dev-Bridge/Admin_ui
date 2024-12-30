import { getI18n } from "react-i18next";
import { z } from "zod";

export const searchOp = z.enum(["OR", "AND"]).optional();
export const order = z.enum(["desc", "asc"]).optional();

// Backend Base API의 공통 파라미터 정의
export const FilterQuerySchema = z.object({
  index: z.number().min(0),
  size: z.number().min(1),
  selected: z.array(z.string()),
  keywords: z.string().optional(),
  searchOp: searchOp,
  order: order,
  orderBy: z.string().optional(),
  dateField: z.string().optional(),
  fromDate: z.string().optional(),
  toDate: z.string().optional(),
});

export interface Base {
  createdWho?: string | null;
  createdAt?: string | null;
  updatedWho?: string | null;
  updatedAt?: string | null;
  id?: number | null;
  seq?: number | null;
}

export const BaseSchema = z.object({
  seq: z.number().nullable().optional(),
  id: z.any().nullable().optional(),
  createdWho: z.string().nullable().optional(),
  createdAt: z.string().nullable().optional(),
  updatedWho: z.string().nullable().optional(),
  updatedAt: z.string().nullable().optional(),
});

export const BasePaginationSchema = z.object({
  endIndex: z.number(),
  startIndex: z.number(),
  lastPage: z.number(),
  length: z.number(),
  page: z.number(),
  size: z.number(),
});

interface ValidationMessage {
  key: string;
  maxLen?: number;
  minLen?: number;
}

// 공통 메세지
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

export const createValidationMessage = (key: string, options?: any): string => {
  const result = getI18n().t(key, options);

  if (typeof result === "string") {
    return result;
  }
  return String(result);
};

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

export const validationMessage: ValidationMessages = createValidationMessages({
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
