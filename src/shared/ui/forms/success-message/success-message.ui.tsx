import { Box, Typography } from "@mui/material";
import { IconCheck } from "@tabler/icons-react";

type SuccessMessageProps = {
  successMessage?: string;
  absolute?: boolean;
};

export function SuccessMessage({
  successMessage,
  absolute,
}: SuccessMessageProps) {
  if (successMessage) {
    return (
      <Box
        component="span"
        display="flex"
        alignItems="center"
        color="#28c76f"
        position={absolute ? "absolute" : "inherit"}
      >
        <IconCheck size={14} />
        <Typography
          component="span"
          fontWeight="400"
          fontSize="0.75rem"
        >
          {successMessage}
        </Typography>
      </Box>
    );
  }
  return null;
}
