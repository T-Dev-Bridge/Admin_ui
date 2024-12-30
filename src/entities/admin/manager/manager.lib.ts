import { ManagerDto, ManagersDto } from "@/shared/api/admin/manager";
import { Manager, Managers } from "@/entities/admin/manager/manager.types";

export function transformManagerDtoToManager(managerDto: ManagerDto): Manager {
  return {
    ...managerDto,
  };
}

export function transformManagersDtoToManagers(
  managersDto: ManagersDto,
): Managers {
  const { list, pagination } = managersDto;
  const listDto = list.map((managerDto: ManagerDto) => managerDto);
  return { list: listDto, pagination };
}
