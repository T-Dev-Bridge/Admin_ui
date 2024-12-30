import React from "react";
import {
  Grid2,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Divider,
  CardHeader,
  Stack,
  Paper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react";
import { CustomCheckbox } from "../../../forms";

function not(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a: readonly number[], b: readonly number[]) {
  return [...a, ...not(b, a)];
}

type EnhancedTransferListProps = {
  left: any[];
  right: any[];
  setLeft: (value: any[]) => void;
  setRight: (value: any[]) => void;
  keyColumn?: string;
  labelColumn?: string;
  valueItself?: boolean;
};

export function EnhancedTransferList({
  left,
  right,
  setLeft,
  setRight,
  keyColumn,
  labelColumn,
  valueItself,
}: EnhancedTransferListProps) {
  const [checked, setChecked] = React.useState<readonly number[]>([]);

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

  const numberOfChecked = (items: readonly number[]) =>
    intersection(checked, items).length;

  const handleToggleAll = (items: readonly number[]) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
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

  const theme = useTheme();
  const borderColor = theme.palette.grey[100];

  const customList = (title: React.ReactNode, items: readonly any[]) => (
    <Paper
      variant="outlined"
      sx={{ border: `1px solid ${borderColor}` }}
    >
      <CardHeader
        sx={{ px: 2 }}
        avatar={
          <CustomCheckbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              "aria-label": "all items selected",
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          width: 200,
          height: 230,
          overflow: "auto",
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value.id}-label`;

          return (
            <ListItem
              key={
                valueItself ? value : keyColumn ? value[keyColumn] : value.id
              }
              role="listitem"
              component="button"
              onClick={handleToggle(value)}
              sx={{
                width: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <ListItemIcon>
                <CustomCheckbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={
                  valueItself
                    ? value
                    : labelColumn
                      ? value[labelColumn]
                      : value.name
                }
                sx={{ whiteSpace: "normal", wordWrap: "break-word" }}
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
      <Grid2>{customList("선택 가능 목록", left)}</Grid2>
      <Grid2>
        <Stack spacing={1}>
          <Button
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
        </Stack>
      </Grid2>
      <Grid2>{customList("선택 완료 목록", right)}</Grid2>
    </Grid2>
  );
}
