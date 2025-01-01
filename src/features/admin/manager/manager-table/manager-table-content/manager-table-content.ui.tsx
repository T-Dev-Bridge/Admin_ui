import { withEnhancedTable } from "@/shared/hoc";
import { Manager } from "@/entities/admin";

function ManagerTableContentInner() {
  return null;
}

export const ManagerTableContent = withEnhancedTable<Manager>(
  ManagerTableContentInner,
  {},
);
