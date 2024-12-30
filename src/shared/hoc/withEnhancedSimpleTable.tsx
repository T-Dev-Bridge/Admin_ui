import React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  // Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { TableHeadCellType } from "@/shared/hoc/withEnhancedTableHead";
import { CustomCheckbox } from "@/shared/ui/forms";
import {
  BaseFilterActions,
  BaseFilterState,
} from "@/entities/base/base.filter";

interface ExternalTableProps<T> {
  namespace: string;
  filter: BaseFilterState & BaseFilterActions; // 필터
  tableHeadCells: TableHeadCellType[]; // 테이블 헤더 셀 타입 배열
  renderRowActions?: (row: T) => React.ReactNode; // 각 행에 대한 액션을 렌더링하는 함수
  renderCells: (row: T, cell: TableHeadCellType) => React.ReactNode; // 각 셀에 대한 렌더 함수
  rows: any;
  isPending: boolean;
  isSuccess: boolean;
  selectable?: boolean;
  TopButtons?: React.ReactNode;
  TableToolbar: React.ReactNode; // 툴바 UI를 주입
  TableHead: React.ReactNode; // 테이블 헤더 UI를 주입
  pObject?: any;
  emptyTableMessage?: string;
}

interface InternalTableProps {}

type CombinedTableProps<T> = ExternalTableProps<T> &
  Partial<InternalTableProps>;

export function withEnhancedSimpleTable<T>(
  Component: React.ComponentType<any>, // 실제 사용할 컴포넌트
  internalProps: InternalTableProps, // 기본값으로 사용할 내부 props
) {
  return function EnhancedTable(externalProps: ExternalTableProps<T>) {
    const combinedProps: CombinedTableProps<T> = {
      ...internalProps,
      ...externalProps,
    };

    const {
      namespace,
      filter,
      tableHeadCells,
      renderRowActions,
      renderCells,
      rows,
      isPending,
      isSuccess,
      selectable = true,
      TopButtons,
      TableToolbar,
      TableHead,
      emptyTableMessage,
    } = combinedProps;

    const theme = useTheme();
    const borderColor = theme.palette.divider;

    const handleClick = (_: React.MouseEvent<unknown>, row: T) => {
      const selectedIndex = filter.selected.indexOf(row);
      let newSelected: T[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(filter.selected, row);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(filter.selected.slice(1));
      } else if (selectedIndex === filter.selected.length - 1) {
        newSelected = newSelected.concat(filter.selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          filter.selected.slice(0, selectedIndex),
          filter.selected.slice(selectedIndex + 1),
        );
      }

      filter.setSelected(newSelected);
    };

    return (
      <Box>
        <Paper
          variant="outlined"
          sx={{ mx: 2, mt: 1, border: `1px solid ${borderColor}` }}
        >
          {TableToolbar || <Component {...externalProps} />}
          <Box
            sx={{
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 },
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              flex: "1 1 100%",
            }}
          >
            {TopButtons}
            {/* <Button
              variant="contained"
              color="primary"
            >
              {t("button.export")}
            </Button> */}
          </Box>
          <TableContainer sx={{ mt: 2 }}>
            <Table aria-label="enhanced table">
              {TableHead}
              <TableBody>
                {isPending && (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Typography>불러오는 중...</Typography>
                    </TableCell>
                  </TableRow>
                )}
                {isSuccess && rows && rows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Typography>{emptyTableMessage}</Typography>
                    </TableCell>
                  </TableRow>
                )}
                {isSuccess &&
                  rows?.map((row: T) => {
                    const isItemSelected = filter.selected.includes(row);
                    return (
                      <TableRow key={`${namespace} ${(row as any).seq}`}>
                        {selectable && (
                          <TableCell padding="checkbox">
                            <CustomCheckbox
                              color="primary"
                              checked={isItemSelected}
                              onClick={(event) => handleClick(event, row)}
                            />
                          </TableCell>
                        )}
                        {tableHeadCells.map((tableHeadCell) => (
                          <TableCell
                            key={`${namespace} ${(row as any).seq}}-${tableHeadCell.name}`}
                          >
                            {renderCells(row, tableHeadCell)}
                          </TableCell>
                        ))}
                        {renderRowActions && (
                          <TableCell>{renderRowActions(row)}</TableCell>
                        )}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    );
  };
}
