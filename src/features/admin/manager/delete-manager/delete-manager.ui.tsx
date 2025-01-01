import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAlertDialog } from "@/app/providers/AlertDialogProvider";
import { useSnackbar } from "@/app/providers/SnackbarProvider";
import { Manager } from "@/entities/admin";
import { useDeleteManagerMutation } from "./delete-manager.mutation";

interface DeleteManagerProps {
  manager: Manager;
  setIndex: (index: number) => void;
}

export function DeleteManagerButton({ manager, setIndex }: DeleteManagerProps) {
  const { t } = useTranslation(); // 다국어 처리를 위한 함수
  const { showDialog } = useAlertDialog(); // 알림 대화 상자 표시
  const { showSnackbar } = useSnackbar(); // 스낵바 메세지 표시

  const { mutate } = useDeleteManagerMutation({
    mutationKey: [manager.id],

    onMutate: () => {},

    onSuccess: () => {
      showSnackbar(
        t("common.message.success", {
          entity: t("manager.entity"),
          action: t("common.action.delete"),
        }),
        "success",
      );
      setIndex(0);
    },

    onSettled: () => {},
  });

  const handleClick = () => {
    showDialog({
      title: `${t("manager.entity")} ${t("common.action.delete")}`,
      description: t("common.message.confirm", {
        entity: t("manager.entity"),
        action: t("common.action.delete"),
        pluralSuffix: "를",
      }),
      onConfirm: () => {
        mutate(manager);
      },
      onCancel: () => {},
    });
  };

  return (
    <Button
      color="error"
      onClick={handleClick}
    >
      {t("button.delete")}
    </Button>
  );
}
