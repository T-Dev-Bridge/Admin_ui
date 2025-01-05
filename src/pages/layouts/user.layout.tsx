import { Box, Container, styled, useTheme } from "@mui/material";
import { withErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router";
import { HorizontalHeader, VerticalHeader } from "@/shared/layouts/header";
import { HorizontalNavigation } from "@/shared/layouts/navigation";
import { compose, withSuspense } from "@/shared/lib/react";
import useCustomizerStore from "@/shared/store/useCustomizerStore";
import { Customizer } from "@/shared/ui/customizer";
import { ErrorHandler, logError } from "@/shared/ui/error-handler";
import { Spinner } from "@/shared/ui/spinner";
import { Sidebar } from "@/features/layouts/sidebar";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  width: "100%",
  backgroundColor: "transparent",
}));

export function UserLayout() {
  // const { pathname } = useLocation();

  return (
    <MainWrapper>
      {/* 로딩 중이 아닐 때만 UserNavigation 렌더링 */}
      <UserNavigation />
      {/* <ExpiredAccount />/ 계정 만료시 */}
    </MainWrapper>
  );
}

const enhance = compose(
  (component) =>
    withErrorBoundary(component, {
      FallbackComponent: ErrorHandler,
      onError: logError,
    }),
  (component) =>
    withSuspense(component, { FallbackComponent: UserNavigationSkeleton }),
);

const UserNavigation = enhance(() => {
  const customizer = useCustomizerStore();
  const theme = useTheme();

  return (
    <>
      {/* ------------------------------------------- */}
      {/* Sidebar */}
      {/* ------------------------------------------- */}
      {customizer.isHorizontal ? "" : <Sidebar />}
      {/* ------------------------------------------- */}
      {/* Main Wrapper */}
      {/* ------------------------------------------- */}
      <PageWrapper
        className="page-wrapper"
        sx={{
          ...(customizer.isCollapse && {
            [theme.breakpoints.up("lg")]: {
              ml: `${customizer.MiniSidebarWidth}px`,
            },
          }),
        }}
      >
        {/* ------------------------------------------- */}
        {/* Header */}
        {/* ------------------------------------------- */}
        {customizer.isHorizontal ? <HorizontalHeader /> : <VerticalHeader />}
        {/* PageContent */}
        {customizer.isHorizontal ? <HorizontalNavigation /> : ""}
        <Container
          sx={{
            maxWidth: customizer.isLayout === "boxed" ? "lg" : "100%!important",
          }}
        >
          {/* ------------------------------------------- */}
          {/* PageContent */}
          {/* ------------------------------------------- */}

          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
            <Outlet />
          </Box>

          {/* ------------------------------------------- */}
          {/* End Page */}
          {/* ------------------------------------------- */}
        </Container>
        <Customizer />
      </PageWrapper>
    </>
  );
});

function UserNavigationSkeleton() {
  return <Spinner display />;
}
