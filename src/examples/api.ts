import { createApi } from '../api';
import { Example } from './schema';

export const exampleAPI = createApi({
  example: new Example.EntityCrudAxiosService('/example'),
});
