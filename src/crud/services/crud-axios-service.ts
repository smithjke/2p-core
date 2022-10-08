import { TypeCheck, TypeCompiler } from '@sinclair/typebox/compiler';
import { TSchema } from '@sinclair/typebox';
import { ApiConfig, AxiosService } from '~/api';
import {
  AnyCrudType,
  BaseCrudType, CrudFindAllQuery, CrudFindAllResult, makeCrudFindAllResult,
} from '../common';
import { BaseCrudService, CrudService } from './crud-service';

export const crudApiConfig: ApiConfig<BaseCrudService> = {
  create: {
    method: 'POST',
    url: '',
  },
  update: {
    method: 'PUT',
    url: '/:id',
  },
  remove: {
    method: 'DELETE',
    url: '/:id',
  },
  findOne: {
    method: 'GET',
    url: '/:id',
  },
  findAll: {
    method: 'GET',
    url: '',
  },
};

export abstract class CrudAxiosService<T extends BaseCrudType> extends AxiosService implements CrudService<T> {
  private _validateSingleEntity?: TypeCheck<any>;

  private _validateListedEntity?: TypeCheck<any>;

  protected abstract singleEntity: TSchema;

  protected abstract listedEntity: TSchema;

  get validateSingleEntity(): TypeCheck<any> {
    if (!this._validateSingleEntity) {
      this._validateSingleEntity = TypeCompiler.Compile(this.singleEntity);
    }

    return this._validateSingleEntity;
  }

  get validateListedEntity(): TypeCheck<any> {
    if (!this._validateListedEntity) {
      this._validateListedEntity = TypeCompiler.Compile(makeCrudFindAllResult(this.listedEntity));
    }

    return this._validateListedEntity;
  }

  async create(data: T['createEntity']): Promise<T['singleEntity']> {
    return this.request<T['singleEntity']>({
      ...crudApiConfig.create,
      data,
    }, this.validateSingleEntity);
  }

  async update(data: T['updateEntity'], params: T['entityKey']): Promise<T['singleEntity']> {
    return this.request<T['singleEntity']>({
      ...crudApiConfig.update,
      params,
      data,
    }, this.validateSingleEntity);
  }

  async remove(params: T['entityKey']): Promise<void> {
    return this.request<void>({
      ...crudApiConfig.remove,
      params,
    });
  }

  async findOne(params: T['entityKey']): Promise<T['singleEntity']> {
    return this.request<T['singleEntity']>({
      ...crudApiConfig.findOne,
      params,
    }, this.validateSingleEntity);
  }

  async findAll(
    query?: CrudFindAllQuery<T['entityOrderField'], T['entityFilter']>,
  ): Promise<CrudFindAllResult<T['listedEntity']>> {
    return this.request<CrudFindAllResult<T['listedEntity']>>({
      ...crudApiConfig.findAll,
      query,
    }, this.validateListedEntity);
  }
}

export abstract class AnyCrudAxiosService extends CrudAxiosService<AnyCrudType> {}
