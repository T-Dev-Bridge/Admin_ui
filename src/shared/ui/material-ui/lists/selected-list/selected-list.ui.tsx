import React from "react";
import {
  List,
  ListItemText,
  ListItemButton,
  Divider,
  ListItemIcon,
} from "@mui/material";
import { IconInbox, IconMailOpened } from "@tabler/icons-react";
import { BlankCard } from "@/shared/ui/card";

export function SelectedList() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (
    // @ts-ignore
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };

  return (
    <BlankCard>
      <List
        component="nav"
        aria-label="main mailbox folders"
      >
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <IconInbox
              width={20}
              height={20}
            />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <IconMailOpened
              width={20}
              height={20}
            />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItemButton>
      </List>
      <Divider />
      <List
        component="nav"
        aria-label="secondary mailbox folder"
      >
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemText primary="Trash" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemText primary="Spam" />
        </ListItemButton>
      </List>
    </BlankCard>
  );
}
