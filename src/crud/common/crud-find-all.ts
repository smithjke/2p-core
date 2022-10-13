import { TSchema, Type } from '@sinclair/typebox';
import { BaseCrudType } from './crud';

export type CrudFindAllQuery<T extends BaseCrudType> = {
  limit?: number;
  offset?: number;
  order?: {
    field: T['entityOrderField'];
    direction: 'asc' | 'desc';
  };
  filter?: T['entityFilter'];
};

export function makeCrudFindAllQuery<OF extends TSchema, F extends TSchema>(field: OF, filter: F) {
  return Type.Partial(
    Type.Object({
      limit: Type.Integer({ minimum: 0 }),
      offset: Type.Integer({ minimum: 0 }),
      order: Type.Object({
        field,
        direction: Type.Union([
          Type.Literal('asc'),
          Type.Literal('desc'),
        ])
      }),
      filter,
    }),
  );
}

export type CrudFindAllResult<T extends BaseCrudType> = {
  list: Array<T['listedEntity']>;
  total: number;
};

export function makeCrudFindAllResult<T extends TSchema>(item: T) {
  return Type.Object({
    list: Type.Array(item),
    total: Type.Number({ minimum: 0 }),
  });
}
