import React, { useEffect } from "react";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Stack,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import useCustomizerStore from "@/shared/store/useCustomizerStore";
import FlagEn from "@/assets/images/flag/icon-flag-en.svg";
import FlagKr from "@/assets/images/flag/icon-flag-kr.svg";

const Languages = [
  {
    flagname: "한국어 (Korean)",
    icon: FlagKr,
    value: "kr",
  },
  {
    flagname: "English (UK)",
    icon: FlagEn,
    value: "en",
  },
];

export function Language() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const customizer = useCustomizerStore();
  const currentLang =
    Languages.find((_lang) => _lang.value === customizer.isLanguage) ||
    Languages[1];
  const { i18n } = useTranslation();
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    i18n.changeLanguage(customizer.isLanguage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Avatar
          src={currentLang.icon}
          alt={currentLang.value}
          sx={{ width: 20, height: 20 }}
        />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}
      >
        {Languages.map((option, index) => (
          <MenuItem
            key={index}
            sx={{ py: 2, px: 3 }}
            onClick={() => customizer.setLanguage(option.value)}
          >
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <Avatar
                src={option.icon}
                alt={option.icon}
                sx={{ width: 20, height: 20 }}
              />
              <Typography> {option.flagname}</Typography>
            </Stack>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
