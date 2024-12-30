import { Box, List, Theme, useMediaQuery } from "@mui/material";
import { useLocation } from "react-router";
import useCustomizerStore from "@/shared/store/useCustomizerStore";
import Menudata from "../Menudata";
import { NavCollapse } from "../nav-collapse";
import { NavItem } from "../nav-item";

export function NavListing() {
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf("/"));
  const customizer = useCustomizerStore();
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const hideMenu = lgUp
    ? customizer.isCollapse && !customizer.isSidebarHover
    : "";

  return (
    <Box>
      <List sx={{ p: 0, display: "flex", gap: "3px", zIndex: "100" }}>
        {Menudata.map((item) => {
          if (item.children) {
            return (
              <NavCollapse
                menu={item}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                pathWithoutLastPart={pathWithoutLastPart}
                level={1}
                key={item.id}
                onClick={undefined}
              />
            );

            // {/********If Sub No Menu**********/}
          }
          return (
            <NavItem
              item={item}
              key={item.id}
              pathDirect={pathDirect}
              hideMenu={hideMenu}
              onClick={() => {}}
            />
          );
        })}
      </List>
    </Box>
  );
}
