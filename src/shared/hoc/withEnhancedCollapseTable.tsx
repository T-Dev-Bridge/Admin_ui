import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Box,
  Collapse,
  IconButton,
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
  filter: BaseFilterState & BaseFilterActions; // 필터
  tableHeadCells: TableHeadCellType[]; // 테이블 헤더 셀 타입 배열
  renderRowActions?: (row: T) => React.ReactNode; // 각 행에 대한 액션을 렌더링하는 함수
  renderCells: (row: T, cell: TableHeadCellType) => React.ReactNode; // 각 셀에 대한 렌더 함수
  rows: any;
  isPending: boolean;
  isSuccess: boolean;
  CreateButton: React.ReactNode;
  TableToolbar: React.ReactNode; // 툴바 UI를 주입
  TableHead: React.ReactNode; // 테이블 헤더 UI를 주입
  pObject?: any;
}

interface InternalTableProps {}

type CombinedTableProps<T> = ExternalTableProps<T> &
  Partial<InternalTableProps>;

interface RowExternalTableProps<T> {
  row: T;
  filter: BaseFilterState & BaseFilterActions;
  tableHeadCells: TableHeadCellType[];
  CollpaseComponent: React.ComponentType<any>;
  renderCells: (row: T, cell: TableHeadCellType) => React.ReactNode;
  renderRowActions?: (row: T) => React.ReactNode;
}

function Row<T>(props: RowExternalTableProps<T>) {
  const {
    row,
    filter,
    tableHeadCells,
    renderCells,
    renderRowActions,
    CollpaseComponent,
  } = props;
  const [open, setOpen] = React.useState(false);
  const handleCollapseOpen = () => {
    setOpen(!open);
  };

  const handleClick = (_: React.MouseEvent<unknown>, clickedRow: T) => {
    const selectedIndex = filter.selected.indexOf(clickedRow);
    let newSelected: T[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(filter.selected, clickedRow);
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

  const isItemSelected = filter.selected.includes(row);

  return (
    <>
      <TableRow key={(row as any).id}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell padding="checkbox">
          <CustomCheckbox
            color="primary"
            checked={isItemSelected}
            onClick={(event) => handleClick(event, row)}
          />
        </TableCell>
        {tableHeadCells.map((tableHeadCell) => (
          <TableCell key={`${(row as any).id}-${tableHeadCell.name}`}>
            {renderCells(row, tableHeadCell)}
          </TableCell>
        ))}
        {renderRowActions && <TableCell>{renderRowActions(row)}</TableCell>}
      </TableRow>
      <TableRow key={`${(row as any).id}-collapse`}>
        <TableCell
          sx={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={9}
        >
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
          >
            <CollpaseComponent
              row={row}
              toggleCollapseOpen={handleCollapseOpen}
            />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export function withEnhancedCollapseTable<T>(
  Component: React.ComponentType<any>, // 실제 사용할 컴포넌트
  // HeaderCollapseComponent: React.ComponentType<any>,
  RowCollapseComponent: React.ComponentType<any>,
  internalProps: InternalTableProps, // 기본값으로 사용할 내부 props
) {
  return function EnhancedTable(externalProps: ExternalTableProps<T>) {
    const combinedProps: CombinedTableProps<T> = {
      ...internalProps,
      ...externalProps,
    };

    const {
      filter,
      tableHeadCells,
      renderRowActions,
      renderCells,
      rows,
      isPending,
      isSuccess,
      CreateButton,
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
            {CreateButton}
          </Box>
          <TableContainer sx={{ mt: 2 }}>
            <Table aria-label="enhanced table">
              {TableHead}
              <TableBody>
                {isPending && (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Typography>Loading...</Typography>
                    </TableCell>
                  </TableRow>
                )}
                {isSuccess &&
                  rows?.list.map((row: T) => {
                    return (
                      <Row
                        key={(row as any).id}
                        row={row}
                        filter={filter}
                        tableHeadCells={tableHeadCells}
                        renderCells={renderCells}
                        renderRowActions={renderRowActions}
                        CollpaseComponent={RowCollapseComponent}
                      />
                    );
                  })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  {isSuccess && (
                    <TablePagination
                      colSpan={6}
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
