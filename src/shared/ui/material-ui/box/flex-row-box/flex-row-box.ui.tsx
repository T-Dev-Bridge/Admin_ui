import { Box } from "@mui/material";

interface FlexRowBoxProps {
  children: React.ReactNode;
}

export function FlexRowBox({ children }: FlexRowBoxProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {children}
    </Box>
  );
}
