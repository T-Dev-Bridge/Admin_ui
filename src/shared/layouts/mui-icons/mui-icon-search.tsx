import { useCallback, useEffect, useRef, useState } from "react";
import * as Icons from "@mui/icons-material";
import {
  TextField,
  Grid2,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDebounce } from "@/shared/hooks";

interface IconSearchModalProps {
  open: boolean;
  onClose: () => void;
  icon: string;
  setIcon: React.Dispatch<React.SetStateAction<string>>;
}

export const IconSearchModal = ({
  open,
  onClose,
  icon,
  setIcon,
}: IconSearchModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 200);
  const [filteredIconNames, setFilteredIconNames] = useState<string[]>([]);
  const [visibleItems, setVisibleItems] = useState(250);
  const [isFetching, setIsFetching] = useState(false);
  const dialogContentRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleScroll = useCallback(() => {
    const dialogContent = dialogContentRef.current;

    if (dialogContent) {
      const { scrollTop, scrollHeight, clientHeight } = dialogContent;

      const scrollPosition = scrollTop + clientHeight;
      const triggerPosition = scrollHeight * 0.8;

      if (scrollPosition >= triggerPosition && !isFetching) {
        setIsFetching(true);
      }
    }
  }, [isFetching]);

  useEffect(() => {
    const dialogContent = dialogContentRef.current;

    if (dialogContent) {
      dialogContent.addEventListener("scroll", handleScroll);
    }

    const observer = new MutationObserver(() => {
      const updatedDialogContent = dialogContentRef.current;
      if (updatedDialogContent) {
        updatedDialogContent.addEventListener("scroll", handleScroll);
        observer.disconnect();
      }
    });

    if (!dialogContent) {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      if (dialogContent) {
        dialogContent.removeEventListener("scroll", handleScroll);
      }
      observer.disconnect();
    };
  }, [handleScroll]);

  useEffect(() => {
    if (!isFetching) return;

    const timer = setTimeout(() => {
      setVisibleItems((prev) => prev + 250);
      setIsFetching(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [isFetching]);

  useEffect(() => {
    // 검색을 수행할 Key값 String만 가져온다.
    const iconNames = Object.keys(Icons);
    setFilteredIconNames(iconNames);
  }, []);

  useEffect(() => {
    const results = Object.keys(Icons).filter((iconName) =>
      iconName.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
    );
    setFilteredIconNames(results);
  }, [debouncedSearchTerm]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper"
      fullScreen={fullScreen}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <DialogTitle>
        <TextField
          label="검색어를 입력하세요"
          variant="outlined"
          fullWidth
          defaultValue={icon}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </DialogTitle>

      <DialogContent
        dividers
        ref={dialogContentRef}
      >
        <Grid2
          container
          spacing={2}
        >
          {filteredIconNames.slice(0, visibleItems).map((iconName) => {
            const IconComponent = Icons[iconName as keyof typeof Icons];
            return (
              <Grid2 key={iconName}>
                <IconButton
                  onClick={() => {
                    setIcon(iconName);
                    onClose();
                  }}
                >
                  <IconComponent />
                </IconButton>
              </Grid2>
            );
          })}
        </Grid2>
      </DialogContent>
    </Dialog>
  );
};
