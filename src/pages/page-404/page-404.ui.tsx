import { useState } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { useSnackbar } from "@/app/providers/SnackbarProvider";
import { pathKeys } from "@/shared/lib/react-router";
import { useSessionStore } from "@/shared/session";
import ErrorImg from "@/assets/images/backgrounds/errorimg.svg";

export function Page404() {
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();
  const [num, setNum] = useState(0);
  const session = useSessionStore.use.session();

  const test = () => {
    console.log("token : ", session?.accessToken);
    console.log("refreshToken : ", session?.refreshToken);
    console.log("userId : ", session?.userId);
    console.log("userName : ", session?.username);
    showSnackbar("hello", "success");
    setNum(num + 1);
  };

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
        <Button
          color="primary"
          variant="contained"
          onClick={test}
          disableElevation
        >
          useQuery 알람 테스트
        </Button>
      </Container>
    </Box>
  );
}
