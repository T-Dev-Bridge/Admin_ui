import { ReactElement } from "react";
import {
  IconButton,
  Box,
  AppBar,
  useMediaQuery,
  Toolbar,
  styled,
  Stack,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import { IconMenu2 } from "@tabler/icons-react";
import { Language } from "@/shared/layouts/language";
import { MobileRightSidebar } from "@/shared/layouts/mobile-right-sidebar";
import { Notifications } from "@/shared/layouts/notification";
import { Search } from "@/shared/layouts/search";
import useCustomizerStore from "@/shared/store/useCustomizerStore";

export function TopHeader(): ReactElement {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));

  // drawer
  const customizer = useCustomizerStore();

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    background: theme.palette.background.paper,
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    [theme.breakpoints.up("lg")]: {
      minHeight: customizer.TopbarHeight,
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled
      position="sticky"
      color="default"
    >
      <ToolbarStyled>
        {/* ------------------------------------------- */}
        {/* Toggle Button Sidebar */}
        {/* ------------------------------------------- */}
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={
            lgUp
              ? (): void => customizer.toggleSidebar()
              : (): void => customizer.toggleMobileSidebar()
          }
        >
          <IconMenu2 size="20" />
        </IconButton>

        {/* ------------------------------------------- */}
        {/* Search Dropdown */}
        {/* ------------------------------------------- */}
        <Search />
        {/* {lgUp ? <VerticalNavigation /> : null} */}

        <Box flexGrow={1} />
        <Stack
          spacing={1}
          direction="row"
          alignItems="center"
        >
          <Language />
          {/* ------------------------------------------- */}
          {/* Ecommerce Dropdown */}
          {/* ------------------------------------------- */}
          {/* ------------------------------------------- */}
          {/* End Ecommerce Dropdown */}
          {/* ------------------------------------------- */}
          <Notifications />
          {/* ------------------------------------------- */}
          {/* Toggle Right Sidebar for mobile */}
          {/* ------------------------------------------- */}
          {lgDown ? <MobileRightSidebar /> : null}
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
}
