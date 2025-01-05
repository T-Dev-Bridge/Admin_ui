import { Box, List, useMediaQuery } from "@mui/material";
import { useLocation } from "react-router";
import useCustomizerStore from "@/shared/store/useCustomizerStore";
import MenuItems from "@/features/layouts/sidebar/MenuItems";
import { NavCollapse } from "../nav-collapse";
import { NavGroup } from "../nav-group";
import { NavItem } from "../nav-item";

export function SidebarItems() {
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf("/"));
  const customizer = useCustomizerStore();
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const hideMenu: any = lgUp
    ? customizer.isCollapse && !customizer.isSidebarHover
    : "";

  return (
    <Box sx={{ px: 3 }}>
      <List
        sx={{ pt: 0 }}
        className="sidebarNav"
      >
        {MenuItems.map((item) => {
          // {/********SubHeader**********/}
          if (item.subheader) {
            return (
              <NavGroup
                item={item}
                hideMenu={hideMenu}
                key={item.subheader}
              />
            );

            // {/********If Sub Menu**********/}
            /* eslint no-else-return: "off" */
          } else if (item.children) {
            return (
              <NavCollapse
                menu={item}
                pathDirect={pathDirect}
                // pathDirect={'/'}
                hideMenu={hideMenu}
                // pathWithoutLastPart={''}
                pathWithoutLastPart={pathWithoutLastPart}
                level={1}
                key={item.id}
                onClick={() => customizer.toggleMobileSidebar()}
              />
            );

            // {/********If Sub No Menu**********/}
          } else {
            return (
              <NavItem
                item={item}
                key={item.id}
                // pathDirect={'/'}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                onClick={() => customizer.toggleMobileSidebar()}
              />
            );
          }
        })}
      </List>
    </Box>
  );
}
