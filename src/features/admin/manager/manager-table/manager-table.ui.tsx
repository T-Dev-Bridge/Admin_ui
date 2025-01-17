import { Box, Chip, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { RemoteButton } from "remoteApp/Button";
import { MANAGER_NAMESPACE } from "@/shared/constants/namespace";
import { TableHeadCellType } from "@/shared/hoc/withEnhancedTableHead";
import { Manager, ManagerQueries } from "@/entities/admin";
import {
  CommonFilterActions,
  CommonFilterState,
} from "@/entities/common/common.filter";
import { CreateManager } from "@/features/admin/manager/create-manager";
import { DeleteManagerButton } from "@/features/admin/manager/delete-manager";
import { ManagerTableContent } from "@/features/admin/manager/manager-table/manager-table-content";
import { ManagerTableToolbar } from "@/features/admin/manager/manager-table/manager-table-toolbar";
import { UpdateManager } from "@/features/admin/manager/update-manager";
import { ManagerTableHeader } from "./manager-table-header";

interface ManagerTableProps {
  filterStore: CommonFilterState & CommonFilterActions;
  managersQueryOptions: typeof ManagerQueries.managersQuery;
}

export function ManagerTable({
  filterStore,
  managersQueryOptions,
}: ManagerTableProps) {
  const tableHeadCells: TableHeadCellType[] = [
    {
      name: "seq",
    },
    {
      name: "username",
    },
    {
      name: "email",
    },
    {
      name: "enabled",
    },
    {
      name: "createdAt",
      sortable: true,
    },
    {
      name: "work",
      commonNamespace: true,
    },
  ];

  const {
    data: managers,
    isPending,
    isSuccess,
  } = useQuery(
    managersQueryOptions({
      index: filterStore.index,
      size: filterStore.size,
      searchOp: filterStore.searchOp,
      selected: filterStore.selected,
      keywords: filterStore.keywords,
      order: filterStore.order,
      orderBy: filterStore.orderBy,
    }),
  );

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = managers?.list ?? [];
      if (newSelecteds?.length > 0) {
        filterStore.setSelected(newSelecteds);
      }

      return;
    }
    filterStore.setSelected([]);
  };

  const handleRequestSort = (_: React.MouseEvent<unknown>, property: any) => {
    const isAsc =
      filterStore.orderBy === property && filterStore.order === "asc";
    filterStore.setOrder(isAsc ? "desc" : "asc");
    filterStore.setOrderBy(property);
  };

  const renderCells = (row: Manager, cell: TableHeadCellType) => {
    if (cell.name === "enabled") {
      const value = row.enabled;
      return (
        <Chip
          label={value ? "활성화" : "비활성화"}
          color={value ? "success" : "error"}
        />
      );
    }
    if (cell.name === "work") {
      return (
        <Box flexDirection="row">
          <UpdateManager row={row} />
          <DeleteManagerButton
            key={`${row.seq}-${cell.name}-button`}
            setIndex={filterStore.setIndex}
            manager={row}
          />
          <RemoteButton onClick={() => console.log("Host Log")}>
            Click Me
          </RemoteButton>
        </Box>
      );
    }
    return (
      <Typography
        color="textSecondary"
        variant="h6"
        fontWeight="400"
      >
        {row[cell.name as keyof Manager]}
      </Typography>
    );
  };

  return (
    <ManagerTableContent
      namespace={MANAGER_NAMESPACE}
      filter={filterStore}
      tableHeadCells={tableHeadCells}
      isPending={isPending}
      isSuccess={isSuccess}
      TopButtons={<CreateManager />}
      TableToolbar={
        <ManagerTableToolbar
          selected={filterStore.selected}
          setKeywords={filterStore.setKeywords}
        />
      }
      TableHead={
        <ManagerTableHeader
          numSelected={filterStore.selected.length}
          rowCount={managers?.list.length ?? 0}
          tableHeadCells={tableHeadCells}
          order={filterStore.order}
          orderBy={filterStore.orderBy}
          onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
        />
      }
      renderCells={(row, cell) => renderCells(row, cell)}
      rows={managers}
    />
  );
}
