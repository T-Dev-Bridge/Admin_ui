import { Box, styled, SxProps } from "@mui/material";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

const SimpleBarStyle = styled(SimpleBar)(() => ({
  maxHeight: "100%",
}));

interface PropsType {
  children: React.ReactElement | React.ReactNode;
  sx: SxProps;
}

export function Scrollbar(props: PropsType) {
  const { children, sx, ...other } = props;
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );

  if (isMobile) {
    return <Box sx={{ overflowX: "auto" }}>{children}</Box>;
  }

  return (
    <SimpleBarStyle
      sx={sx}
      {...other}
    >
      {children}
    </SimpleBarStyle>
  );
}
