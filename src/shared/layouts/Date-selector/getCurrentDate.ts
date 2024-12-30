export function getCurrentDate(
  year: number = 0,
  month: number = 0,
  day: number = 0,
): string {
  const date = new Date(); // 현재 날짜와 시간 가져오기

  date.setFullYear(date.getFullYear() - year); // 주어진 년수만큼 빼기
  date.setMonth(date.getMonth() - month); // 주어진 년수만큼 빼기
  date.setDate(date.getDate() - day); // 주어진 일수만큼 빼기

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`; // 형식에 맞추어 문자열로 반환
}
