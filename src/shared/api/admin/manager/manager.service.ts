import { AxiosResponse } from "axios";
import {
  CreateManagerDtoSchema,
  DeleteManagerDtoSchema,
  ManagerDtoSchema,
  UpdateManagerDtoSchema,
} from "@/shared/api/admin/manager/manager.contracts";
import {
  CreateManagerDto,
  DeleteManagerDto,
  ManagerParamsDto,
  UpdateManagerDto,
} from "@/shared/api/admin/manager/manager.types";
import { UserDtoSchema } from "@/shared/api/auth/auth.contract";
import { CommonService } from "@/shared/api/common/common.service";
import { apiPathKeys } from "@/shared/lib/axios/config";

export class ManagerService extends CommonService {
  static {
    this.setBaseUrl(`${apiPathKeys.admin()}/api/admin/manager`);
  }

  /**
   * 기본 Page 조회 쿼리
   */
  static managersQuery(config: {
    params: ManagerParamsDto;
    signal?: AbortSignal;
  }): Promise<AxiosResponse> {
    const url = "/listPage";
    return this.getList({
      url,
      params: config.params,
      schema: ManagerDtoSchema,
      config,
    });
  }

  /**
   * findById 쿼리
   */
  static managerQuery(
    id: string,
    config: { signal?: AbortSignal },
  ): Promise<AxiosResponse> {
    const url = `/${id}`;
    return this.getOne({
      url,
      schema: UserDtoSchema,
      config,
    });
  }

  /**
   * 기본 Post 요청
   */
  static createManagerMutation(data: {
    createManagerDto: CreateManagerDto;
  }): Promise<AxiosResponse> {
    const url = "/signup";
    return this.create({
      url,
      data: data.createManagerDto,
      requestSchema: CreateManagerDtoSchema,
      responseSchema: ManagerDtoSchema,
    });
  }

  /**
   * 기본 Put 요청
   */
  static updateManagerMutation(data: {
    updateManagerDto: UpdateManagerDto;
  }): Promise<AxiosResponse> {
    return this.update({
      data: data.updateManagerDto,
      requestSchema: UpdateManagerDtoSchema,
      responseSchema: ManagerDtoSchema,
    });
  }

  /**
   * 기본 Delete 요청
   */
  static deleteManagerMutation(data: {
    deleteManagerDto: DeleteManagerDto;
  }): Promise<AxiosResponse> {
    const url = `/${data.deleteManagerDto.id}`;
    return this.deleteOne({
      url: url,
      data: data.deleteManagerDto,
      requestSchema: DeleteManagerDtoSchema,
      responseSchema: ManagerDtoSchema,
    });
  }
}
