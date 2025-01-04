import { Box, Container, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { pathKeys } from "@/shared/lib/react-router";
import ErrorImg from "@/assets/images/backgrounds/errorimg.svg";

export function Page404() {
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      textAlign="center"
      justifyContent="center"
    >
      <Container maxWidth="sm">
        <img
          src={ErrorImg}
          alt="404"
        />
        <Typography
          align="center"
          variant="h1"
          mb={4}
        >
          {t("notFound.title")}
        </Typography>
        <Typography
          align="center"
          variant="h4"
          mb={4}
        >
          {t("notFound.description")}
        </Typography>
        <Button
          color="primary"
          variant="contained"
          component={Link}
          to={pathKeys.root}
          disableElevation
        >
          {t("button.back")}
        </Button>
      </Container>
    </Box>
  );
}
