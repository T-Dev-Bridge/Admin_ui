import React, { useState } from "react";
import {
  alpha,
  Box,
  Button,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { IconSearch } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

interface InternalTableToolbarProps {}

interface ExternalTableToolbarProps {
  selected?: any[];
  setKeywords: (keywords: string) => void;
  deleteAllButton?: React.ReactNode;
}

type CombinedTableToolbarProps = ExternalTableToolbarProps &
  Partial<InternalTableToolbarProps>;

export function withEnhancedTableToolbar(
  Component: React.ComponentType<any>,
  internalProps: InternalTableToolbarProps,
) {
  return function EnhancedTableToolbar(
    externalProps: ExternalTableToolbarProps,
  ) {
    const combinedProps: CombinedTableToolbarProps = {
      ...internalProps,
      ...externalProps,
    };

    const [searchValue, setSearchValue] = useState("");
    const { t } = useTranslation();

    const { selected = [], setKeywords } = combinedProps; // 기본값으로 빈 배열 설정

    const handleSearch = () => {
      setKeywords(searchValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
    };

    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(selected.length > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity,
              ),
          }),
        }}
      >
        {selected.length > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle2"
            component="div"
          >
            {selected.length}개 선택됨
          </Typography>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
              flex: "1 1 100%",
            }}
          >
            <TextField
              fullWidth
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconSearch size="1.1rem" />
                    </InputAdornment>
                  ),
                },
              }}
              onKeyDown={handleKeyDown}
              onChange={handleInputChange}
              placeholder="검색"
              size="small"
              value={searchValue}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
            >
              {t("button.search")}
            </Button>
          </Box>
        )}

        {selected.length > 0 && combinedProps.deleteAllButton
          ? combinedProps.deleteAllButton
          : null}

        <Component {...combinedProps} />
      </Toolbar>
    );
  };
}
