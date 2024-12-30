import {
  Collapse,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { baseTypes } from "@/entities/base";
import { CustomCheckbox } from "../ui/forms";

export type TableHeadCellType = {
  name: string;
  sortable?: boolean;
  isPrimaryKey?: boolean;
};

interface ExternalTableHeadProps<T> {
  numSelected: number;
  tableHeadCells: TableHeadCellType[];
  order: baseTypes.Order;
  rowCount: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
  orderBy: string;
  collapseOpen: boolean; // 접힌 행 열기 여부
  onChangeCollapseOpenState: () => void;
  refObject?: any;
}

interface InternalTableHeadProps {
  translationNamespace: string;
}

type CombinedTableHeadProps<T> = ExternalTableHeadProps<T> &
  Partial<InternalTableHeadProps>;

export function withEnhancedCollapseTableHead<T>(
  Component: React.ComponentType<any>,
  HeaderCollapseComponent: React.ComponentType<any>,
  internalProps: InternalTableHeadProps,
) {
  return function EnhancedTableHead(externalProps: ExternalTableHeadProps<T>) {
    // 내부와 외부 props를 결합하여 combinedProps로 처리
    const combinedProps: CombinedTableHeadProps<T> = {
      ...internalProps,
      ...externalProps,
    };

    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
      tableHeadCells,
      translationNamespace,
      collapseOpen,
      onChangeCollapseOpenState,
      refObject,
    } = combinedProps;

    const theme = useTheme();
    const borderColor = theme.palette.divider;
    const { t } = useTranslation();

    const createSortHandler =
      (property: keyof T) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };

    return (
      <TableHead sx={{ borderTop: `1px solid ${borderColor}` }}>
        <TableRow>
          <TableCell />
          <TableCell padding="checkbox">
            <CustomCheckbox
              color="primary"
              checked={rowCount! > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all items",
              }}
            />
          </TableCell>
          {tableHeadCells!.map((tableHeadCell) => {
            if (tableHeadCell.sortable) {
              return (
                <TableCell
                  key={tableHeadCell.name}
                  sortDirection={orderBy === tableHeadCell.name ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === tableHeadCell.name}
                    direction={orderBy === tableHeadCell.name ? order : "asc"}
                    onClick={createSortHandler(tableHeadCell.name as keyof T)}
                  >
                    <Typography variant="h6">
                      {t(
                        `${tableHeadCell.name === "work" ? "common" : translationNamespace}.${tableHeadCell.name}`,
                      )}
                    </Typography>
                  </TableSortLabel>
                </TableCell>
              );
            }
            return (
              <TableCell key={tableHeadCell.name}>
                <Typography variant="h6">
                  {t(
                    `${tableHeadCell.name === "work" ? "common" : translationNamespace}.${tableHeadCell.name}`,
                  )}
                </Typography>
              </TableCell>
            );
          })}
        </TableRow>

        <Component {...combinedProps} />

        <TableRow>
          <TableCell
            sx={{ paddingBottom: 0, paddingTop: 0 }}
            colSpan={9}
          >
            <Collapse
              in={collapseOpen}
              timeout="auto"
              unmountOnExit
            >
              <HeaderCollapseComponent
                pObject={refObject}
                toggleCollapseOpen={onChangeCollapseOpenState}
              />
            </Collapse>
          </TableCell>
        </TableRow>
      </TableHead>
    );
  };
}
