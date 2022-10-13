import {
  AnyCrudType,
  BaseCrudType,
  CrudFindAllQuery,
  CrudFindAllResult,
} from '../common';

export interface CrudService<T extends BaseCrudType> {
  create: (
    data: T['createEntity'],
  ) => Promise<T['singleEntity']>;

  update: (
    data: T['updateEntity'],
    params: T['entityKey'],
  ) => Promise<T['singleEntity']>;

  remove: (
    params: T['entityKey'],
  ) => Promise<void>;

  findOne: (
    params: T['entityKey'],
  ) => Promise<T['singleEntity']>;

  findAll: (
    query?: CrudFindAllQuery<T['entityOrderField'], T['entityFilter']>,
  ) => Promise<CrudFindAllResult<T['listedEntity']>>;
}

export type BaseCrudService = CrudService<BaseCrudType>;

export type AnyCrudService = CrudService<AnyCrudType>;
