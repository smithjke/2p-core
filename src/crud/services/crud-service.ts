import { RequestMetaData } from '~/api';
import {
  AnyCrudType,
  BaseCrudType,
  CrudFindAllQuery,
  CrudFindAllResult,
} from '../common';

export interface CrudService<T extends BaseCrudType> {
  create: (
    data: T['createEntity'],
    requestMetaData?: RequestMetaData,
  ) => Promise<T['singleEntity']>;

  update: (
    data: T['updateEntity'],
    params: T['entityKey'],
    requestMetaData?: RequestMetaData,
  ) => Promise<T['singleEntity']>;

  remove: (
    params: T['entityKey'],
    requestMetaData?: RequestMetaData,
  ) => Promise<void>;

  findOne: (
    params: T['entityKey'],
    requestMetaData?: RequestMetaData,
  ) => Promise<T['singleEntity']>;

  findAll: (
    query?: CrudFindAllQuery<T['entityOrderField'], T['entityFilter']>,
    requestMetaData?: RequestMetaData,
  ) => Promise<CrudFindAllResult<T['listedEntity']>>;
}

export type BaseCrudService = CrudService<BaseCrudType>;

export type AnyCrudService = CrudService<AnyCrudType>;
