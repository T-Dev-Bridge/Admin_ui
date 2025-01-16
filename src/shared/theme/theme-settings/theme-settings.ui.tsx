import { useEffect } from "react";
import * as locales from "@mui/material/locale";
import { createTheme, Theme } from "@mui/material/styles";
import _ from "lodash";
import useCustomizerStore from "@/shared/store/useCustomizerStore";
import { DarkThemeColors } from "@/shared/theme/dark-theme-colors";
import { baseDarkTheme, baselightTheme } from "@/shared/theme/default-colors";
import { LightThemeColors } from "@/shared/theme/light-theme-colors";
import { darkshadows, shadows } from "../shadows";
import typography from "../typography/Typography";
import { components } from "./theme-settings.model";

interface ThemeConfig {
  direction: string;
  theme: string;
}

export const BuildTheme = (
  config: ThemeConfig = { direction: "ltr", theme: "" },
): Theme => {
  const themeOptions = LightThemeColors.find(
    (theme) => theme.name === config.theme,
  );
  const darkThemeOptions = DarkThemeColors.find(
    (theme) => theme.name === config.theme,
  );
  const customizer = useCustomizerStore();
  const activeMode = useCustomizerStore((state) => state.activeMode);
  const defaultTheme = activeMode === "dark" ? baseDarkTheme : baselightTheme;
  const defaultShadow = activeMode === "dark" ? darkshadows : shadows;
  const themeSelect = activeMode === "dark" ? darkThemeOptions : themeOptions;
  const baseMode = {
    palette: {
      mode: activeMode,
    },
    shape: {
      borderRadius: customizer.borderRadius,
    },
    shadows: defaultShadow,
    typography,
  };
  const theme = createTheme(
    _.merge({}, baseMode, defaultTheme, locales, themeSelect, {
      direction: config.direction,
    }),
  );
  theme.components = components(theme);

  return theme;
};

const ThemeSettings = (): Theme => {
  const activeDir = useCustomizerStore((state) => state.activeDir);
  const activeTheme = useCustomizerStore((state) => state.activeTheme);

  useEffect(() => {
    if (activeDir) {
      document.dir = activeDir;
    }
  }, [activeDir]);

  return BuildTheme({
    direction: activeDir,
    theme: activeTheme,
  });
};

export { ThemeSettings };
