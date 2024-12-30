import { create } from "zustand";
import { getCurrentDate } from "./getCurrentDate";

interface DateFieldState {
  fromDate: string;
  toDate: string;
  setDate: (fromDate: string, toDate: string) => void;
}

export const useDateFieldState = create<DateFieldState>((set) => ({
  fromDate: getCurrentDate(1),
  toDate: getCurrentDate(),
  setDate: (fromDate: string, toDate: string) => set({ fromDate, toDate }),
}));
