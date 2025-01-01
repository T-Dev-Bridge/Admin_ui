import { withEnhancedTableToolbar } from "@/shared/hoc";

function ManagerTableToolbarContent() {
  return null;
}

export const ManagerTableToolbar = withEnhancedTableToolbar(
  ManagerTableToolbarContent,
  {},
);
