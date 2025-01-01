import { MANAGER_NAMESPACE } from "@/shared/constants/namespace";
import { withEnhancedTableHead } from "@/shared/hoc";
import { Manager } from "@/entities/admin";

function ManagerTableHeaderContent() {
  return null;
}

export const ManagerTableHeader = withEnhancedTableHead<Manager>(
  ManagerTableHeaderContent,
  {
    translationNamespace: MANAGER_NAMESPACE,
  },
);
