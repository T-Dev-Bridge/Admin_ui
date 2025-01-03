import { useMediaQuery, Box, Drawer, Container, Theme } from "@mui/material";
import useCustomizerStore from "@/shared/store/useCustomizerStore";
import { Logo } from "@/shared/ui/logo";
import { NavListing } from "../../horizontal-navbar/nav-listing";

export function HorizontalNavigation() {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const customizer = useCustomizerStore();

  if (lgUp) {
    return (
      <Box
        sx={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}
        py={2}
      >
        {/* ------------------------------------------- */}
        {/* Sidebar for desktop */}
        {/* ------------------------------------------- */}
        <Container
          sx={{
            maxWidth: customizer.isLayout === "boxed" ? "lg" : "100%!important",
          }}
        >
          <NavListing />
        </Container>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={customizer.isMobileSidebar}
      onClose={() => customizer.toggleMobileSidebar()}
      variant="temporary"
      PaperProps={{
        sx: {
          width: customizer.SidebarWidth,
          border: "0 !important",
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      {/* ------------------------------------------- */}
      {/* Logo */}
      {/* ------------------------------------------- */}
      <Box px={2}>
        <Logo />
      </Box>
      {/* ------------------------------------------- */}
      {/* Sidebar For Mobile */}
      {/* ------------------------------------------- */}
    </Drawer>
  );
}
