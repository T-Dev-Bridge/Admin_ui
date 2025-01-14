import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Order } from "entities/common";
import { useTranslation } from "react-i18next";
import { COMMON_NAMESPACE } from "../constants/namespace";
import { CustomCheckbox } from "../ui/forms";

export type TableHeadCellType = {
  name: string;
  sortable?: boolean;
  isPrimaryKey?: boolean;
  commonNamespace?: boolean; // 다국어 적용 시 common namespace인지 확인
};

interface ExternalTableHeadProps<T> {
  numSelected: number;
  tableHeadCells: TableHeadCellType[];
  order?: Order;
  rowCount: number;
  onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRequestSort?: (event: React.MouseEvent<unknown>, property: keyof T) => void;
  orderBy?: string;
  selectable?: boolean;
}

interface InternalTableHeadProps {
  translationNamespace: string;
}

type CombinedTableHeadProps<T> = ExternalTableHeadProps<T> &
  Partial<InternalTableHeadProps>;

export function withEnhancedTableHead<T>(
  Component: React.ComponentType<any>,
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
      selectable = true,
    } = combinedProps;

    const theme = useTheme();
    const borderColor = theme.palette.divider;
    const { t } = useTranslation();

    const createSortHandler =
      (property: keyof T) => (event: React.MouseEvent<unknown>) => {
        if (onRequestSort) {
          onRequestSort(event, property);
        }
      };

    return (
      <TableHead sx={{ borderTop: `1px solid ${borderColor}` }}>
        <TableRow>
          {selectable && (
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
          )}

          {tableHeadCells!.map((tableHeadCell) => {
            if (tableHeadCell.sortable) {
              return (
                <TableCell
                  key={tableHeadCell.name}
                  sortDirection={orderBy === tableHeadCell.name ? order : false}
                  align="center"
                >
                  <TableSortLabel
                    active={orderBy === tableHeadCell.name}
                    direction={
                      orderBy === tableHeadCell.name ? order || "asc" : "asc"
                    }
                    onClick={createSortHandler(tableHeadCell.name as keyof T)}
                  >
                    <Typography variant="h6">
                      {t(
                        `${tableHeadCell.commonNamespace ? COMMON_NAMESPACE : translationNamespace}.${tableHeadCell.name}`,
                      )}
                    </Typography>
                  </TableSortLabel>
                </TableCell>
              );
            }
            return (
              <TableCell
                key={tableHeadCell.name}
                align="center"
              >
                <Typography variant="h6">
                  {t(
                    `${tableHeadCell.commonNamespace ? COMMON_NAMESPACE : translationNamespace}.${tableHeadCell.name}`,
                  )}
                </Typography>
              </TableCell>
            );
          })}
        </TableRow>

        <Component {...combinedProps} />
      </TableHead>
    );
  };
}
