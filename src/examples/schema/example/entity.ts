import { Static, Type } from '@sinclair/typebox';
import { CrudSchema, CrudType } from '~/crud';

export const entity = Type.Object({
  id: Type.String(),
  title: Type.String(),
  amount: Type.Number(),
  relationId: Type.Integer(),
  createdAt: Type.Integer(),
  updatedAt: Type.Integer(),
});

export const singleEntity = Type.Intersect([
  Type.Omit(entity, ['relationId']),
  Type.Object({
    relation: Type.Object({
      id: Type.String(),
      title: Type.String(),
    }),
  }),
]);

export const listedEntity = Type.Omit(singleEntity, [
  'createdAt',
  'updatedAt',
]);

export const createEntity = Type.Omit(entity, [
  'id',
  'createdAt',
  'updatedAt',
]);

export const updateEntity = Type.Partial(createEntity);

export const entityKey = Type.Pick(entity, ['id']);

export const entityFilter = Type.Object({
  amount: Type.Optional(
    Type.Union([
      Type.Number(),
      Type.Object({
        lt: Type.Number(),
      }),
      Type.Object({
        gt: Type.Number(),
      }),
    ]),
  ),
});

export enum EntityOrderField {
  ID = 'id',
  TITLE = 'title',
  AMOUNT = 'amount',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export const entityOrderField = Type.Enum(EntityOrderField);

export const crudSchema: CrudSchema = {
  singleEntity,
  listedEntity,
  createEntity,
  updateEntity,
  entityKey,
  entityFilter,
  entityOrderField,
};

export type Entity = Static<typeof entity>;
export type SingleEntity = Static<typeof singleEntity>;
export type ListedEntity = Static<typeof listedEntity>;
export type CreateEntity = Static<typeof createEntity>;
export type UpdateEntity = Static<typeof updateEntity>;
export type EntityKey = Static<typeof entityKey>;
export type EntityFilter = Static<typeof entityFilter>;

export type EntityCrudType = CrudType<
  SingleEntity,
  ListedEntity,
  CreateEntity,
  UpdateEntity,
  EntityKey,
  EntityFilter,
  EntityOrderField
  >;
