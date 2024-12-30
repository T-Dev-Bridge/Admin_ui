import { useState } from "react";
import {
  IconButton,
  Dialog,
  DialogContent,
  Stack,
  Divider,
  Box,
  List,
  Typography,
  TextField,
} from "@mui/material";
import { IconSearch, IconX } from "@tabler/icons-react";

export function Search() {
  // drawer top
  const [showDrawer2, setShowDrawer2] = useState(false);

  const handleDrawerClose2 = () => {
    setShowDrawer2(false);
  };

  return (
    <>
      <IconButton
        aria-label="show 4 new mails"
        color="inherit"
        aria-controls="search-menu"
        aria-haspopup="true"
        onClick={() => setShowDrawer2(true)}
        size="large"
      >
        <IconSearch size="16" />
      </IconButton>
      <Dialog
        open={showDrawer2}
        onClose={() => setShowDrawer2(false)}
        fullWidth
        maxWidth="sm"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ sx: { position: "fixed", top: 30, m: 0 } }}
      >
        <DialogContent className="testdialog">
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <TextField
              id="tb-search"
              placeholder="Search here"
              fullWidth
              onChange={(e) => console.log(e.target.value)}
              slotProps={{
                input: {
                  "aria-label": "Search here",
                },
              }}
            />
            <IconButton
              size="small"
              onClick={handleDrawerClose2}
            >
              <IconX size="18" />
            </IconButton>
          </Stack>
        </DialogContent>
        <Divider />
        <Box
          p={2}
          sx={{ maxHeight: "60vh", overflow: "auto" }}
        >
          <Typography
            variant="h5"
            p={1}
          >
            Quick Page Links
          </Typography>
          <Box>
            <List component="nav" />
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
