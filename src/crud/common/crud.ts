import { TSchema } from '@sinclair/typebox';

export type CrudSchema = {
  singleEntity: TSchema;
  listedEntity: TSchema;
  createEntity: TSchema;
  updateEntity: TSchema;
  entityKey: TSchema;
  entityFilter: TSchema;
  entityOrderField: TSchema;
};

export type CrudType<
  S_E extends object,
  L_E extends object,
  C_E extends object,
  U_E extends object,
  K extends object,
  F extends object,
  OF extends string,
  > = {
  singleEntity: S_E;
  listedEntity: L_E;
  createEntity: C_E;
  updateEntity: U_E;
  entityKey: K;
  entityFilter: F;
  entityOrderField: OF;
};

export type BaseCrudType = CrudType<object, object, object, object, object, object, string>;

export type AnyCrudType = CrudType<any, any, any, any, any, any, any>;
