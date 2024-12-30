import { Grid2, Box, Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import { PageContainer } from "@/shared/ui/container";
import { Logo } from "@/shared/ui/logo";
import { Login } from "@/features/auth/login";
import img1 from "@/assets/images/backgrounds/login-bg.svg";

export function LoginPage() {
  const { t } = useTranslation();
  return (
    <PageContainer
      title={t("login.title")}
      description={t("login.description")}
    >
      <Grid2
        container
        spacing={0}
        sx={{ overflowX: "hidden" }}
      >
        <Grid2
          size={{ xs: 12, sm: 12, lg: 7, xl: 8 }}
          sx={{
            position: "relative",
            "&:before": {
              content: '""',
              background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
              backgroundSize: "400% 400%",
              animation: "gradient 15s ease infinite",
              position: "absolute",
              height: "100%",
              width: "100%",
              opacity: "0.3",
            },
          }}
        >
          <Box position="relative">
            <Box px={3}>
              <Logo />
            </Box>
            <Box
              alignItems="center"
              justifyContent="center"
              height="calc(100vh - 75px)"
              sx={{
                display: {
                  xs: "none",
                  lg: "flex",
                },
              }}
            >
              <img
                src={img1}
                alt="bg"
                style={{
                  width: "100%",
                  maxWidth: "500px",
                }}
              />
            </Box>
          </Box>
        </Grid2>
        <Grid2
          size={{ xs: 12, sm: 12, lg: 5, xl: 4 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Container>
            <Box p={4}>
              <Login
                title="AI 민원 행정 관리자포털 로그인"
                // subtext={
                //   <Typography
                //     variant="subtitle1"
                //     color="textSecondary"
                //     mb={1}
                //   >
                //     Your Admin Dashboard
                //   </Typography>
                // }
              />
            </Box>
          </Container>
        </Grid2>
      </Grid2>
    </PageContainer>
  );
}
