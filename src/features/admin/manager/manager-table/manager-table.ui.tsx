import React from "react";
import { Box, Chip, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { MANAGER_NAMESPACE } from "@/shared/constants/namespace";
import { TableHeadCellType } from "@/shared/hoc/withEnhancedTableHead";
import { filterManagerModel, Manager, ManagerQueries } from "@/entities/admin";
import { CreateManager } from "@/features/admin/manager/create-manager";
import { DeleteManagerButton } from "@/features/admin/manager/delete-manager";
import { ManagerTableContent } from "@/features/admin/manager/manager-table/manager-table-content";
import { ManagerTableToolbar } from "@/features/admin/manager/manager-table/manager-table-toolbar";
import { UpdateManager } from "@/features/admin/manager/update-manager";
import { ManagerTableHeader } from "./manager-table-header";

interface ManagerTableProps {
  useManagerFilterStore: filterManagerModel.ManagerFilterStore;
  managersQueryOptions: typeof ManagerQueries.managersQuery;
}

export function ManagerTable({
  useManagerFilterStore,
  managersQueryOptions,
}: ManagerTableProps) {
  const managerFilter = useManagerFilterStore?.();

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
      index: managerFilter.index,
      size: managerFilter.size,
      searchOp: managerFilter.searchOp,
      selected: managerFilter.selected,
      keywords: managerFilter.keywords,
      order: managerFilter.order,
      orderBy: managerFilter.orderBy,
    }),
  );

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = managers?.list ?? [];
      if (newSelecteds?.length > 0) {
        managerFilter.setSelected(newSelecteds);
      }

      return;
    }
    managerFilter.setSelected([]);
  };

  const handleRequestSort = (_: React.MouseEvent<unknown>, property: any) => {
    const isAsc =
      managerFilter.orderBy === property && managerFilter.order === "asc";
    managerFilter.setOrder(isAsc ? "desc" : "asc");
    managerFilter.setOrderBy(property);
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
            setIndex={managerFilter.setIndex}
            manager={row}
          />
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
      filter={managerFilter}
      tableHeadCells={tableHeadCells}
      isPending={isPending}
      isSuccess={isSuccess}
      TopButtons={<CreateManager />}
      TableToolbar={
        <ManagerTableToolbar
          selected={managerFilter.selected}
          setKeywords={managerFilter.setKeywords}
        />
      }
      TableHead={
        <ManagerTableHeader
          numSelected={managerFilter.selected.length}
          rowCount={managers?.list.length ?? 0}
          tableHeadCells={tableHeadCells}
          order={managerFilter.order}
          orderBy={managerFilter.orderBy}
          onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
        />
      }
      renderCells={(row, cell) => renderCells(row, cell)}
      rows={managers}
    />
  );
}
