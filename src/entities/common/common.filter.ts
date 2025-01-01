import { StateCreator, create } from "zustand";
import { DevtoolsOptions, devtools } from "zustand/middleware";
import { createSelectors } from "@/shared/lib/zustand";
import { SearchOp, Order } from "@/entities/common";

export type CommonFilterStore = ReturnType<typeof createBaseFilterStore>;
export const defaultCommonFilterState: CommonFilterState = {
  index: 0,
  size: 5,
  selected: [],
  searchOp: "OR",
  keywords: "",
  order: "desc",
  orderBy: "updatedAt",
};

export function createBaseFilterSlice<
  T extends CommonFilterState,
  A extends CommonFilterActions,
>(initialState?: Partial<T>, extendActions?: (set: any) => Partial<A>) {
  const filterSlice: StateCreator<
    CommonFilterState & CommonFilterActions,
    [["zustand/devtools", never]],
    [],
    CommonFilterState & CommonFilterActions
  > = (set) => ({
    ...defaultCommonFilterState,
    ...initialState,

    setIndex(index: number) {
      set({ index }, false, `setIndex ${index}`);
    },
    setSize(size: number) {
      set({ size }, false, `setSize ${size}`);
    },
    setSearchOp(searchOp: SearchOp) {
      set({ searchOp }, false, `setSearchOp ${searchOp}`);
    },
    setOrder(order: Order) {
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
    setState(
      updater: (state: CommonFilterState) => Partial<CommonFilterState>,
    ) {
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
      set({ ...defaultCommonFilterState, ...initialState }, false, "reset");
    },
    ...(extendActions ? extendActions(set) : {}),
  });

  return filterSlice;
}

export function createBaseFilterStore<
  T extends CommonFilterState,
  A extends CommonFilterActions = CommonFilterActions,
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

export type CommonFilterState = {
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

export type CommonFilterActions = {
  setIndex(index: number): void;
  setSize(size: number): void;
  setSearchOp(searchOp: SearchOp): void;
  setOrder(order: Order): void;
  setOrderBy(orderBy: string): void;
  setSelected(selected: any[]): void;
  setKeywords(keywords: string): void;
  setPidField(pidField: string): void;
  setFromDate(fromDate: string): void;
  setToDate(toDate: string): void;
  setState(
    updater: (state: CommonFilterState) => Partial<CommonFilterState>,
  ): void;
  reset(): void;
};
