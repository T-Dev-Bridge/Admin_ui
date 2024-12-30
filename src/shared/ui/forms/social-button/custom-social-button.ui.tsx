import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CustomSocialButton = styled((props: any) => (
  <Button
    variant="outlined"
    size="large"
    color="inherit"
    {...props}
  />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,

  "&:hover": {
    color: theme.palette.primary.main,
  },
}));
