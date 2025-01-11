import { useRef, useState } from "react";
import { Button } from "@mui/material";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "@/app/providers/SnackbarProvider";
import { useSessionStore } from "@/shared/store/session";
import { Manager } from "@/entities/admin";
import {
  UpdateManagerDialog,
  useUpdateManagerMutation,
} from "./update-manager-dialog";
import type { UpdateManager } from "./update-manager-dialog";

interface UpdateManagerProps {
  row: Manager;
}

export function UpdateManager({ row }: UpdateManagerProps) {
  const [openCreateDialog, setOpenUpdateDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();
  const handleClickOpen = () => {
    setOpenUpdateDialog(true);
  };
  const updateManagerFormDialogRef = useRef<any>(null);

  const { mutate } = useUpdateManagerMutation({
    onMutate: () => {
      setIsLoading(true);
    },

    onSuccess: () => {
      setOpenUpdateDialog(false);
      showSnackbar(
        t("common.message.success", {
          entity: t("manager.entity"),
          action: t("common.action.update"),
        }),
        "success",
      );
      handleReset();
    },

    onError: (error: AxiosError) => {
      setOpenUpdateDialog(false);
      showSnackbar(
        t("common.message.error", {
          entity: t("manager.entity"),
          action: t("common.action.update"),
        }),
        "error",
      );
      handleSetError("root", error.message);
    },
  });

  const handleReset = () => {
    if (updateManagerFormDialogRef.current) {
      updateManagerFormDialogRef.current.externalReset();
    }
  };

  const handleSetError = (name: string, message: string) => {
    if (updateManagerFormDialogRef.current) {
      updateManagerFormDialogRef.current.externalsetError(name, message);
      updateManagerFormDialogRef.current.externalReset();
    }
  };

  const onSubmit = (updateManager: UpdateManager) => {
    const { session } = useSessionStore.getState();

    if (!session) throw new Error("유효하지 않은 세션입니다.");

    mutate(updateManager);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
      >
        {t("button.update")}
      </Button>
      <UpdateManagerDialog
        ref={updateManagerFormDialogRef}
        title={t("common.dialog.add", { entity: t("manager.entity") })}
        defaultValues={{
          id: row.id,
          email: row.email,
          username: row.username,
          roleId: 9999,
          pwdId: row.pwdId,
        }}
        open={openCreateDialog}
        setOpen={setOpenUpdateDialog}
        onSubmit={onSubmit}
        externalReset={handleReset}
        externalSetError={handleSetError}
        isLoading={isLoading}
        maxWidth="md"
      />
    </>
  );
}
