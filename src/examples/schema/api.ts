import { createApi } from '../../api';
import { EntityCrudAxiosService as Example } from './example';

export const exampleAPI = createApi({
  example: new Example('/example'),
});
