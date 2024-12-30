export type CurrencyCode =
  | "USD"
  | "EUR"
  | "JPY"
  | "GBP"
  | "CHF"
  | "KRW"
  | "CNY"
  | "HKD"
  | "SGD"
  | "INR"
  | "AUD"
  | "CAD"
  | "NZD"
  | "BRL"
  | "MXN"
  | "SEK"
  | "NOK"
  | "DKK"
  | "RUB"
  | "PLN"
  | "SAR"
  | "AED"
  | "THB"
  | "VND"
  | "ZAR";

export const currencySymbols: Record<CurrencyCode, string> = {
  // 주요 통화
  USD: "$", // 미국 달러
  EUR: "€", // 유로
  JPY: "¥", // 일본 엔
  GBP: "£", // 영국 파운드
  CHF: "Fr", // 스위스 프랑

  // 아시아 통화
  KRW: "₩", // 대한민국 원
  CNY: "¥", // 중국 위안
  HKD: "HK$", // 홍콩 달러
  SGD: "S$", // 싱가포르 달러
  INR: "₹", // 인도 루피

  // 기타 주요 통화
  AUD: "A$", // 호주 달러
  CAD: "C$", // 캐나다 달러
  NZD: "NZ$", // 뉴질랜드 달러

  // 남미 통화
  BRL: "R$", // 브라질 헤알
  MXN: "Mex$", // 멕시코 페소

  // 북유럽 통화
  SEK: "kr", // 스웨덴 크로나
  NOK: "kr", // 노르웨이 크로네
  DKK: "kr", // 덴마크 크로네

  // 동유럽 통화
  RUB: "₽", // 러시아 루블
  PLN: "zł", // 폴란드 즐로티

  // 중동 통화
  SAR: "﷼", // 사우디아라비아 리얄
  AED: "د.إ", // 아랍에미리트 디르함

  // 동남아시아 통화
  THB: "฿", // 태국 바트
  VND: "₫", // 베트남 동

  // 아프리카 통화
  ZAR: "R", // 남아프리카 공화국 랜드
};

function isCurrencyCode(code: string): code is CurrencyCode {
  return code in currencySymbols;
}

export const getCurrencySymbol = (currencyCode: string): string => {
  if (isCurrencyCode(currencyCode)) {
    return currencySymbols[currencyCode];
  }
  return currencyCode;
};

export interface CurrencyOption {
  value: CurrencyCode;
  label: string;
}

export function getCurrencyOptions(): CurrencyOption[] {
  return Object.entries(currencySymbols).map(([code, symbol]) => ({
    value: code as CurrencyCode,
    label: `${code} (${symbol})`,
  }));
}

// 안전하게 옵션을 가져오는 함수 추가
export function getSafeCurrencyOptions(): CurrencyOption[] {
  const options = getCurrencyOptions();
  return Array.isArray(options) ? options : [];
}
