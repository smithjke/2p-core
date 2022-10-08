import { TSchema, Type } from '@sinclair/typebox';

export type CrudFindAllQuery<ORDER_FIELD = string, FILTER = object> = {
  limit?: number;
  offset?: number;
  order?: {
    field: ORDER_FIELD;
    direction: 'asc' | 'desc';
  };
  filter?: FILTER;
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

export type CrudFindAllResult<T> = {
  list: Array<T>;
  total: number;
};

export function makeCrudFindAllResult<T extends TSchema>(item: T) {
  return Type.Object({
    list: Type.Array(item),
    total: Type.Number({ minimum: 0 }),
  });
}
