import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { CustomLabel } from "../label";

interface EnhancedFormLabelProps {
  labelKey: string;
  required?: boolean;
}

export function EnhancedFormLabel({
  labelKey,
  required = false,
}: EnhancedFormLabelProps) {
  const { t } = useTranslation();
  if (required) {
    return (
      <CustomLabel
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {t(labelKey)}
        <Typography color="error">*</Typography>
      </CustomLabel>
    );
  }
  return <CustomLabel>{t(labelKey)}</CustomLabel>;
}
