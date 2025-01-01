import { DevtoolsOptions } from "zustand/middleware";
import {
  BaseFilterActions,
  createBaseFilterStore,
  defaultCommonFilterState,
} from "@/entities/common/common.filter.ts";
import { FilterQuery } from "@/entities/common/common.types.ts";

export type ManagerFilterStore = ReturnType<typeof createManagerFilterStore>;
export const defaultManagerFilterState: ManagerFilterState = {
  ...defaultCommonFilterState,
  additionalManagerSpecificField: "",
};

const extendManagerFilterActions = (set: any) => ({
  setAdditionalManagerField(value: string) {
    set(
      { additionalManagerSpecificField: value },
      false,
      `setAdditionalManagerField ${value}`,
    );
  },
});

export function createManagerFilterStore(config: {
  initialState?: Partial<ManagerFilterState>;
  devtoolsOptions: DevtoolsOptions;
}) {
  return createBaseFilterStore<ManagerFilterState, ManagerFilterActions>({
    initialState: config.initialState,
    devtoolsOptions: config.devtoolsOptions,
    extendActions: extendManagerFilterActions,
  });
}

export type ManagerFilterState = FilterQuery & {
  additionalManagerSpecificField?: string;
};

export type ManagerFilterActions = BaseFilterActions & {
  setAdditionalManagerField(value: string): void;
};
