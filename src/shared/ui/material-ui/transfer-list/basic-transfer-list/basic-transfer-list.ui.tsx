import React from "react";
import {
  Grid2,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Paper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  IconChevronRight,
  IconChevronLeft,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react";
import { CustomCheckbox } from "@/shared/ui/forms";

function not(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export function BasicTransferList() {
  const [checked, setChecked] = React.useState<readonly number[]>([]);
  const [left, setLeft] = React.useState<readonly number[]>([0, 1, 2, 3]);
  const [right, setRight] = React.useState<readonly number[]>([4, 5, 6, 7]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };
  const theme = useTheme();
  const borderColor = theme.palette.divider;

  const customList = (items: readonly number[]) => (
    <Paper
      variant="outlined"
      sx={{
        width: 200,
        height: 230,
        overflow: "auto",
        border: `1px solid ${borderColor}`,
      }}
    >
      <List
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              component="button"
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <CustomCheckbox
                  tabIndex={-1}
                  disableRipple
                  checked={checked.indexOf(value) !== -1}
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={`List item ${value + 1}`}
              />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid2
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
    >
      <Grid2>{customList(left)}</Grid2>
      <Grid2>
        <Grid2
          container
          direction="column"
          alignItems="center"
        >
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            <IconChevronsRight
              width={20}
              height={20}
            />
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            <IconChevronRight
              width={20}
              height={20}
            />
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            <IconChevronLeft
              width={20}
              height={20}
            />
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            <IconChevronsLeft
              width={20}
              height={20}
            />
          </Button>
        </Grid2>
      </Grid2>
      <Grid2>{customList(right)}</Grid2>
    </Grid2>
  );
}
