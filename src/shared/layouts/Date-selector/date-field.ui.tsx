import { Box, Button } from "@mui/material";
import { CustomLabel, CustomTextField } from "@/shared/ui/forms";

export const DateField = ({
  fromDate,
  toDate,
  setDate,
}: {
  fromDate: string;
  toDate: string;
  setDate: (fromDate: string, toDate: string) => void;
}) => {
  const dateChange = () => {
    const from = (document.getElementById("fromDate") as HTMLInputElement)
      .value;
    const to = (document.getElementById("toDate") as HTMLInputElement).value;
    setDate(from, to);
  };
  return (
    <Box
      sx={{ mx: 2, mt: 1 }}
      display="flex"
    >
      <CustomLabel
        htmlFor="fs-date"
        sx={{ mr: "1rem" }}
      >
        통계기간:
      </CustomLabel>
      <CustomTextField
        type="date"
        id="fromDate"
        defaultValue={fromDate}
        sx={{ width: "15%", mr: "1rem" }}
      />
      <CustomLabel
        htmlFor="fs-date"
        sx={{ mr: "1rem" }}
      >
        ~
      </CustomLabel>
      <CustomTextField
        type="date"
        id="toDate"
        defaultValue={toDate}
        sx={{ width: "15%", mr: "1rem" }}
      />
      <Button onClick={dateChange}>검색</Button>
    </Box>
  );
};
