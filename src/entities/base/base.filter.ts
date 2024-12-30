import { StateCreator, create } from "zustand";
import { DevtoolsOptions, devtools } from "zustand/middleware";
import { createSelectors } from "@/shared/lib/zustand";
import { baseTypes } from "@/entities/base";
import { Order, SearchOp } from "./base.types";

export type BaseFilterStore = ReturnType<typeof createBaseFilterStore>;
export const defaultBaseFilterState: BaseFilterState = {
  index: 0,
  size: 5,
  selected: [],
  searchOp: "OR",
  keywords: "",
  order: "desc",
  orderBy: "modDt",
};

export function createBaseFilterSlice<
  T extends BaseFilterState,
  A extends BaseFilterActions,
>(initialState?: Partial<T>, extendActions?: (set: any) => Partial<A>) {
  const filterSlice: StateCreator<
    BaseFilterState & BaseFilterActions,
    [["zustand/devtools", never]],
    [],
    BaseFilterState & BaseFilterActions
  > = (set) => ({
    ...defaultBaseFilterState,
    ...initialState,

    setIndex(index: number) {
      set({ index }, false, `setIndex ${index}`);
    },
    setSize(size: number) {
      set({ size }, false, `setSize ${size}`);
    },
    setSearchOp(searchOp: baseTypes.SearchOp) {
      set({ searchOp }, false, `setSearchOp ${searchOp}`);
    },
    setOrder(order: baseTypes.Order) {
      set({ order }, false, `setOrder ${order}`);
    },
    setOrderBy(orderBy: string) {
      set({ orderBy }, false, `setOrderBy ${orderBy}`);
    },
    setSelected(selected: any[]) {
      set({ selected }, false, `setSelected ${selected}`);
    },
    setKeywords(keywords: string) {
      set(
        (state) => ({
          ...state,
          keywords,
          index: 0,
        }),
        false,
        `setKeywords ${keywords}`,
      );
    },
    setPidField(pidField: string) {
      set({ pidField }, false, `setPidField ${pidField}`);
    },
    setFromDate(fromDate: string) {
      set({ fromDate }, false, `setFromDate ${fromDate}`);
    },
    setToDate(toDate: string) {
      set({ toDate }, false, `setToDate ${toDate}`);
    },
    setState(updater: (state: BaseFilterState) => Partial<BaseFilterState>) {
      set(
        (prevState) => {
          const updatedState = updater(prevState);
          return { ...prevState, ...updatedState };
        },
        false,
        `setState ${JSON.stringify(updater)}`,
      );
    },
    reset() {
      set({ ...defaultBaseFilterState, ...initialState }, false, "reset");
    },
    ...(extendActions ? extendActions(set) : {}),
  });

  return filterSlice;
}

export function createBaseFilterStore<
  T extends BaseFilterState,
  A extends BaseFilterActions = BaseFilterActions,
>(config: {
  initialState?: Partial<T>;
  devtoolsOptions: DevtoolsOptions;
  extendActions?: (set: any) => Partial<A>;
}) {
  const { initialState, devtoolsOptions, extendActions } = config;
  const slice = createBaseFilterSlice<T, A>(initialState, extendActions);
  const withDevtools = devtools(slice, devtoolsOptions);
  const store = create(withDevtools);
  const useFilterStore = createSelectors(store);
  return useFilterStore;
}

export type BaseFilterState = {
  index: number;
  size: number;
  selected: any[];
  searchOp?: SearchOp;
  keywords?: string | undefined;
  order?: Order;
  orderBy?: string | undefined;
  pidField?: string;
  fromDate?: string;
  toDate?: string;
};

export type BaseFilterActions = {
  setIndex(index: number): void;
  setSize(size: number): void;
  setSearchOp(searchOp: baseTypes.SearchOp): void;
  setOrder(order: baseTypes.Order): void;
  setOrderBy(orderBy: string): void;
  setSelected(selected: any[]): void;
  setKeywords(keywords: string): void;
  setPidField(pidField: string): void;
  setFromDate(fromDate: string): void;
  setToDate(toDate: string): void;
  setState(updater: (state: BaseFilterState) => Partial<BaseFilterState>): void;
  reset(): void;
};
