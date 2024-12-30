import React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Typography,
  // Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { TableHeadCellType } from "@/shared/hoc/withEnhancedTableHead";
import { CustomCheckbox } from "@/shared/ui/forms";
import { TablePaginationActions } from "@/shared/ui/tables";
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
  TableHead?: React.ReactNode; // 테이블 헤더 UI를 주입
  pObject?: any;
}

interface InternalTableProps {}

type CombinedTableProps<T> = ExternalTableProps<T> &
  Partial<InternalTableProps>;

export function withEnhancedTable<T>(
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
    } = combinedProps;

    const { t } = useTranslation();
    const theme = useTheme();
    const borderColor = theme.palette.divider;

    const onPageChange = (_: any, newPage: number) => {
      filter.setIndex(newPage);
    };

    const onRowsPerPageChange = (event: any) => {
      const rowsPerPage = parseInt(event.target.value, 10);
      filter.setState((state: any) => ({
        ...state,
        index: 0,
        size: rowsPerPage,
        selected: [],
      }));
    };

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
                {isSuccess &&
                  rows?.list.map((row: T) => {
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
              <TableFooter>
                <TableRow>
                  {isSuccess && (
                    <TablePagination
                      colSpan={12}
                      count={rows?.pagination.length!}
                      page={filter.index}
                      onPageChange={onPageChange}
                      rowsPerPage={filter.size}
                      onRowsPerPageChange={onRowsPerPageChange}
                      rowsPerPageOptions={[5, 10, 25]}
                      labelRowsPerPage={t("Rows per page")}
                      labelDisplayedRows={({ from, to, count }) =>
                        `${from}-${to} of ${count}`
                      }
                      ActionsComponent={TablePaginationActions}
                    />
                  )}
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    );
  };
}
