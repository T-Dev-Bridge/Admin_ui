import { Box, Typography } from "@mui/material";

type ErrorMessageProps = {
  errorMessage?: string;
  absolute?: boolean;
  rootError?: boolean;
};

export function ErrorMessage({
  errorMessage,
  absolute,
  rootError,
}: ErrorMessageProps) {
  if (errorMessage) {
    return (
      <Box
        component="span"
        display="flex"
        alignItems="center"
        color="#fa896b"
        position={absolute ? "absolute" : "inherit"}
      >
        {/* <IconX size={14} /> */}
        <Typography
          component="span"
          fontWeight="400"
          fontSize={rootError ? "1rem" : "0.75rem"}
        >
          {errorMessage}
        </Typography>
      </Box>
    );
  }
  return null;
}
