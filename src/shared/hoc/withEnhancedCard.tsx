import React from "react";
import {
  Grid2,
  Box,
  CardActions,
  CardHeader,
  Paper,
  Table,
  TablePagination,
  Typography,
  TableFooter,
  TableRow,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { BlankCard } from "@/shared/ui/card";
import { TablePaginationActions } from "@/shared/ui/tables";
import {
  BaseFilterActions,
  BaseFilterState,
} from "@/entities/base/base.filter";

interface ExternalCardProps<T> {
  filter: BaseFilterState & BaseFilterActions; // 필터
  renderCardTitle: (row: T) => React.ReactNode; // 각 셀에 대한 렌더 함수
  renderCardActions?: (row: T) => React.ReactNode; // 각 행에 대한 액션을 렌더링하는 함수
  renderCardBody: (row: T) => React.ReactNode; // 각 셀에 대한 렌더 함수
  renderCardFooter: (row: T) => React.ReactNode; // 카드 푸터에 대한 렌더 함수
  rows: any;
  isPending: boolean;
  isSuccess: boolean;
  CreateButton?: React.ReactNode;
  TableToolbar?: React.ReactNode; // 툴바 UI를 주입
}

interface InternalCardProps {}

type CombinedCardProps<T> = ExternalCardProps<T> & Partial<InternalCardProps>;

export function withEnhancedCard<T>(
  Component: React.ComponentType<any>, // 실제 사용할 컴포넌트
  internalProps: InternalCardProps, // 기본값으로 사용할 내부 props
) {
  return function EnhancedCard(externalProps: ExternalCardProps<T>) {
    const combinedProps: CombinedCardProps<T> = {
      ...internalProps,
      ...externalProps,
    };

    const {
      filter,
      renderCardTitle,
      renderCardActions,
      renderCardBody,
      renderCardFooter,
      rows,
      isPending,
      isSuccess,
      CreateButton,
      TableToolbar,
    } = combinedProps;

    const { t } = useTranslation();

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
          sx={{ mx: 2, mt: 1, border: `0px` }}
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
          {isPending && <Typography>Loading...</Typography>}
          <Grid2
            container
            spacing={3}
            mt={5}
            mb={5}
          >
            {isSuccess &&
              rows?.list.map((row: T, i: number) => {
                return (
                  <Grid2
                    size={{ xs: 12, sm: 6, lg: 4 }}
                    key={i}
                  >
                    <BlankCard>
                      <CardHeader
                        title={renderCardTitle(row)}
                        titleTypographyProps={{
                          variant: "subtitle1",
                          fontSize: "12px",
                          color: "white",
                          textTransform: "uppercase",
                        }}
                        action={renderCardActions && renderCardActions(row)}
                        sx={{
                          p: "10px 20px",
                          background:
                            "linear-gradient(to right, #4d78eb, #5D87FF, #6e98ff)",
                          color: "white",
                          "& .MuiCardHeader-content": { flex: "1 1 auto" },
                          "& .MuiCardHeader-action": {
                            alignSelf: "center",
                            marginTop: 0,
                            marginRight: 0,
                          },
                        }}
                      />
                      {renderCardBody &&
                        (renderCardBody(row) as React.ReactElement)}
                      {renderCardFooter && (
                        <CardActions
                          sx={{
                            justifyContent: "space-between",
                            p: "10px 20px",
                            alignItems: "center",
                            backgroundColor: "rgba(0, 0, 0, 0.04)",
                          }}
                        >
                          {renderCardFooter(row)}
                        </CardActions>
                      )}
                    </BlankCard>
                  </Grid2>
                );
              })}
          </Grid2>
          <Table aria-label="enhanced table">
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
                    rowsPerPageOptions={[6, 12, 18]}
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
        </Paper>
      </Box>
    );
  };
}
