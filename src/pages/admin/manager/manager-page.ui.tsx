import { useTranslation } from "react-i18next";
import { Breadcrumb } from "@/shared/ui/breadcrumb";
import { PageContainer } from "@/shared/ui/container";
import { ManagerQueries } from "@/entities/admin";
import { ManagerTable } from "@/features/admin/manager/manager-table";
import { managerModel } from "@/pages/admin/manager/manager-page.model";

export function ManagerPage() {
  const { t } = useTranslation();
  const BCrumb = [
    {
      title: t("menu.admin"),
    },
    {
      title: t("menu.manager"),
    },
  ];

  const filterStore = managerModel.useManageFilterStore();

  return (
    <PageContainer
      title={t("menu.manager")}
      description={t("menu.manager")}
    >
      <Breadcrumb
        title={t("menu.manager")}
        items={BCrumb}
      />
      <ManagerTable
        filterStore={filterStore}
        managersQueryOptions={boundManagersQuery}
      />
    </PageContainer>
  );
}

const boundManagersQuery = ManagerQueries.managersQuery.bind(ManagerQueries);
