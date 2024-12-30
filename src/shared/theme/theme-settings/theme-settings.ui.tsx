import { useEffect } from "react";
import * as locales from "@mui/material/locale";
import { createTheme } from "@mui/material/styles";
import _ from "lodash";
import useCustomizerStore from "@/shared/store/useCustomizerStore";
import { DarkThemeColors } from "../dark-theme-colors/dark-theme-colors";
import {
  baseDarkTheme,
  baselightTheme,
} from "../default-colors/default-colors";
import { LightThemeColors } from "../light-theme-colors/light-theme-colors";
import { darkshadows, shadows } from "../shadows";
import typography from "../typography/Typography";
import { components } from "./theme-settings.model";

export const BuildTheme = (config: any = {}) => {
  const themeOptions = LightThemeColors.find(
    (theme) => theme.name === config.theme,
  );
  const darkthemeOptions = DarkThemeColors.find(
    (theme) => theme.name === config.theme,
  );
  const customizer = useCustomizerStore();
  const activeMode = useCustomizerStore((state) => state.activeMode);
  const defaultTheme = activeMode === "dark" ? baseDarkTheme : baselightTheme;
  const defaultShadow = activeMode === "dark" ? darkshadows : shadows;
  const themeSelect = activeMode === "dark" ? darkthemeOptions : themeOptions;
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

const ThemeSettings = () => {
  const activeDir = useCustomizerStore((state) => state.activeDir);
  const activeTheme = useCustomizerStore((state) => state.activeTheme);
  const theme = BuildTheme({
    direction: activeDir,
    theme: activeTheme,
  });
  useEffect(() => {
    document.dir = activeDir;
  }, [activeDir]);

  return theme;
};

export { ThemeSettings };
