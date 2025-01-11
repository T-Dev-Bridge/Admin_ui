import { Box, Grid2 } from "@mui/material";
import { Control, FieldErrors, FieldValues } from "react-hook-form";
import { withFormDialog } from "@/shared/hoc";
import { LabeledFormInput } from "@/shared/ui/forms";
import { UpdateManagerSchema } from "./update-manager-dialog.contracts";

interface UpdateManagerDialogProps {
  control: Control<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

function UpdateManagerDialogContent({
  control,
  errors,
}: UpdateManagerDialogProps) {
  return (
    <Box mb={3}>
      <Grid2
        container
        spacing={2}
      >
        <Grid2 size={6}>
          <LabeledFormInput
            name="id"
            control={control}
            errors={errors}
            type="id"
            labelKey="manager.fields.id"
            required
          />
        </Grid2>
        <Grid2 size={6}>
          <LabeledFormInput
            name="username"
            control={control}
            errors={errors}
            type="username"
            labelKey="manager.fields.username"
            required
          />
        </Grid2>
      </Grid2>
      <Grid2
        container
        spacing={2}
      >
        <Grid2 size={4}>
          <LabeledFormInput
            name="email"
            control={control}
            errors={errors}
            type="email"
            labelKey="manager.fields.email"
            required
          />
        </Grid2>
      </Grid2>

      <Grid2
        container
        spacing={2}
      >
        {/*<Grid2 size={3}>*/}
        {/*  <LabeledFormSelect*/}
        {/*    name="roleId"*/}
        {/*    required*/}
        {/*    errors={errors}*/}
        {/*    control={control}*/}
        {/*    namespace={constants.USER_NAMESPACE}*/}
        {/*    labelKey="user.fields.role"*/}
        {/*    options={roleOptions}*/}
        {/*    customPlaceholder={{*/}
        {/*      label: "역할을 선택해 주세요.",*/}
        {/*      value: -1,*/}
        {/*    }}*/}
        {/*  />*/}
        {/*</Grid2>*/}
        {/*<Grid2 size={3}>*/}
        {/*  <LabeledFormSelect*/}
        {/*    name="groupId"*/}
        {/*    required*/}
        {/*    errors={errors}*/}
        {/*    control={control}*/}
        {/*    namespace={constants.USER_NAMESPACE}*/}
        {/*    labelKey="manager.fields.group"*/}
        {/*    options={groupOptions}*/}
        {/*    customPlaceholder={{*/}
        {/*      label: "조직을 선택해 주세요.",*/}
        {/*      value: -1,*/}
        {/*    }}*/}
        {/*  />*/}
        {/*</Grid2>*/}
      </Grid2>
    </Box>
  );
}

export const UpdateManagerDialog = withFormDialog(UpdateManagerDialogContent, {
  formSchema: UpdateManagerSchema,
});
