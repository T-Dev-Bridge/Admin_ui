import { useTranslation } from "react-i18next";
import { Breadcrumb } from "@/shared/ui/breadcrumb";
import { PageContainer } from "@/shared/ui/container";
import { ManagerQueries } from "@/entities/admin";

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

  return (
    <PageContainer
      title={t("menu.manager")}
      description={t("menu.manager")}
    >
      <Breadcrumb
        title={t("menu.manager")}
        items={BCrumb}
      />
    </PageContainer>
  );
}

const boundManagersQuery = ManagerQueries.managersQuery.bind(ManagerQueries);
