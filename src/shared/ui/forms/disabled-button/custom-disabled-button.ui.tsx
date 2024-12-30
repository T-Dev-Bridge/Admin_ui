import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CustomDisabledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
}));
