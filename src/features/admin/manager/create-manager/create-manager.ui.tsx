import { useRef, useState } from "react";
import { Button } from "@mui/material";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "@/app/providers/SnackbarProvider";
import { useSessionStore } from "@/shared/store/session";
import { CreateManagerDialog } from "@/features/admin/manager/create-manager/create-manager-dialog";
import type { CreateManager } from "@/features/admin/manager/create-manager/create-manager-dialog/create-manager-dialog.contracts";
import { useCreateManagerMutation } from "@/features/admin/manager/create-manager/create-manager-dialog/create-manager-dialog.mutation";

export function CreateManager() {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();
  const handleClickOpen = () => {
    setOpenCreateDialog(true);
  };
  const createManagerFormDialogRef = useRef<any>(null);

  const { mutate } = useCreateManagerMutation({
    onMutate: () => {
      setIsLoading(true);
    },

    onSuccess: () => {
      setOpenCreateDialog(false);
      showSnackbar(
        t("common.message.success", {
          entity: t("manager.entity"),
          action: t("common.action.add"),
        }),
        "success",
      );
      handleReset();
    },

    onError: (error: AxiosError) => {
      showSnackbar(
        t("common.message.error", {
          entity: t("manager.entity"),
          action: t("common.action.add"),
        }),
        "error",
      );
      handleSetError("root", error.message);
    },
  });

  const handleReset = () => {
    if (createManagerFormDialogRef.current) {
      createManagerFormDialogRef.current.externalReset();
    }
  };

  const handleSetError = (name: string, message: string) => {
    if (createManagerFormDialogRef.current) {
      createManagerFormDialogRef.current.externalsetError(name, message);
      createManagerFormDialogRef.current.externalReset();
    }
  };

  const onSubmit = (createUser: CreateManager) => {
    const { session } = useSessionStore.getState();

    if (!session) throw new Error("유효하지 않은 세션입니다.");

    mutate(createUser);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
      >
        {t("button.add")}
      </Button>
      <CreateManagerDialog
        ref={createManagerFormDialogRef}
        title={t("common.dialog.add", { entity: t("manager.entity") })}
        defaultValues={{
          id: "",
          password: "",
          confirmPassword: "",
          email: "",
          username: "",
          roleId: 9999,
        }}
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
        onSubmit={onSubmit}
        externalReset={handleReset}
        externalSetError={handleSetError}
        isLoading={isLoading}
        maxWidth="md"
      />
    </>
  );
}
