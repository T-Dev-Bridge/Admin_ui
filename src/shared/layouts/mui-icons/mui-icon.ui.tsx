import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import { IconSearchModal } from "./mui-icon-search";

interface IconSearchProps {
  icon: string;
  setIcon: React.Dispatch<React.SetStateAction<string>>;
}

export const IconSearch = ({ icon, setIcon }: IconSearchProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton onClick={handleOpen}>
        <SearchIcon />
      </IconButton>
      <IconSearchModal
        open={open}
        onClose={handleClose}
        icon={icon}
        setIcon={setIcon}
      />
    </>
  );
};
