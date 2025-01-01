import { Box, Grid2 } from "@mui/material";
import { Control, FieldErrors, FieldValues } from "react-hook-form";
import { withFormDialog } from "@/shared/hoc";
import { LabeledFormInput } from "@/shared/ui/forms";
import { CreateManagerSchema } from "@/features/admin/manager/create-manager/create-manager-dialog/create-manager-dialog.contracts";

interface CreateManagerDialogProps {
  control: Control<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

function CreateManagerDialogContent({
  control,
  errors,
}: CreateManagerDialogProps) {
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
            labelKey="user.fields.userId"
            required
          />
        </Grid2>
        <Grid2 size={6}>
          <LabeledFormInput
            name="username"
            control={control}
            errors={errors}
            type="username"
            labelKey="user.fields.name"
            required
          />
        </Grid2>
      </Grid2>

      <Grid2
        container
        spacing={2}
      >
        <Grid2 size={6}>
          <LabeledFormInput
            name="password"
            control={control}
            errors={errors}
            type="password"
            labelKey="user.fields.password"
            required
          />
        </Grid2>
        <Grid2 size={6}>
          <LabeledFormInput
            name="confirmPassword"
            control={control}
            errors={errors}
            type="password"
            labelKey="user.fields.confirmPassword"
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
            labelKey="user.fields.email"
            required
          />
        </Grid2>
        <Grid2 size={4}>
          <LabeledFormInput
            name="phone"
            control={control}
            errors={errors}
            type="phone"
            labelKey="user.fields.phone"
          />
        </Grid2>
        <Grid2 size={4}>
          <LabeledFormInput
            name="mobile"
            control={control}
            errors={errors}
            type="mobile"
            labelKey="user.fields.mobile"
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
        {/*    labelKey="user.fields.group"*/}
        {/*    options={groupOptions}*/}
        {/*    customPlaceholder={{*/}
        {/*      label: "조직을 선택해 주세요.",*/}
        {/*      value: -1,*/}
        {/*    }}*/}
        {/*  />*/}
        {/*</Grid2>*/}
        <Grid2 size={3}>
          <LabeledFormInput
            name="company"
            control={control}
            errors={errors}
            type="company"
            labelKey="user.fields.company"
          />
        </Grid2>
        <Grid2 size={3}>
          <LabeledFormInput
            name="title"
            control={control}
            errors={errors}
            type="title"
            labelKey="user.fields.title"
          />
        </Grid2>
      </Grid2>
      <LabeledFormInput
        name="rmk"
        control={control}
        errors={errors}
        type="rmk"
        labelKey="user.fields.rmk"
      />
    </Box>
  );
}

export const CreateManagerDialog = withFormDialog(CreateManagerDialogContent, {
  formSchema: CreateManagerSchema,
});
