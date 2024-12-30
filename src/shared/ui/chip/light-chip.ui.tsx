import { Chip, ChipProps } from "@mui/material";
import { styled, Theme } from "@mui/material/styles";

type ColorName =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success";

const isPaletteColor = (
  color: any,
): color is { light: string; main: string } => {
  return (
    color && typeof color.light === "string" && typeof color.main === "string"
  );
};

const commonChipStyles = (colorName: ColorName) => (theme: Theme) => {
  const color = theme.palette[colorName];
  if (!isPaletteColor(color)) {
    console.warn(`Color ${colorName} is not a valid palette color`);
    return {};
  }
  return {
    backgroundColor: color.light,
    color: color.main,
    textTransform: "uppercase" as const,
    fontSize: "11px",
    fontWeight: 500,
    "& .MuiChip-label": {
      padding: "0 8px",
    },
  };
};

export const InfoLightChip = styled(Chip)(({ theme }) =>
  commonChipStyles("info")(theme),
);
export const SuccessLightChip = styled(Chip)(({ theme }) =>
  commonChipStyles("success")(theme),
);
export const WarningLightChip = styled(Chip)(({ theme }) =>
  commonChipStyles("warning")(theme),
);
export const ErrorLightChip = styled(Chip)(({ theme }) =>
  commonChipStyles("error")(theme),
);
export const PrimaryLightChip = styled(Chip)(({ theme }) =>
  commonChipStyles("primary")(theme),
);

// 범용 LightChip 컴포넌트
interface LightChipProps extends Omit<ChipProps, "color"> {
  colorName: ColorName;
}

export const LightChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "colorName",
})<LightChipProps>(({ theme, colorName }) =>
  commonChipStyles(colorName)(theme),
);
