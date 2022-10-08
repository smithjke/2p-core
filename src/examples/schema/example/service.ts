import { ApiConfig, RequestMetaData } from '../../../api';
import { CrudAxiosService, CrudService } from '../../../crud';
import {
  CreateEntity,
  EntityCrudType,
  EntityKey,
  UpdateEntity,
  listedEntity,
  singleEntity,
  SingleEntity,
} from './entity';

export interface EntityService extends CrudService<EntityCrudType> {
  superUpdate: (
    data: UpdateEntity,
    params: EntityKey,
    requestMetaData?: RequestMetaData,
  ) => Promise<SingleEntity>;

  superCreate: (
    data: CreateEntity,
    requestMetaData?: RequestMetaData,
  ) => Promise<SingleEntity>;
}

export const entityApiConfig: ApiConfig<EntityService, CrudService<EntityCrudType>> = {
  superUpdate: {
    method: 'PUT',
    url: '/:id/super-update',
  },
  superCreate: {
    method: 'POST',
    url: '/super-create',
  },
};

export class EntityCrudAxiosService extends CrudAxiosService<EntityCrudType> implements EntityService {
  protected singleEntity = singleEntity;

  protected listedEntity = listedEntity;

  async superUpdate(data: UpdateEntity, params: EntityKey): Promise<SingleEntity> {
    return this.request({
      ...entityApiConfig.superUpdate,
      params,
      data,
    }, this.validateSingleEntity);
  }

  async superCreate(data: CreateEntity): Promise<SingleEntity> {
    return this.request({
      ...entityApiConfig.superCreate,
      data,
    }, this.validateSingleEntity);
  }
}
