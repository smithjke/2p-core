import { BeforeRequestHandler } from '../common';

export interface HandleableService {
  beforeRequest: (handler: BeforeRequestHandler) => void;
}

export type ApiControls = {
  setBaseURL: (url: string) => void;
  setBearerGetter: (bearerGetter: () => string) => void;
};

export function createApi<T extends Record<string, HandleableService>>(record: T): T & ApiControls {
  let baseURL = '';
  let bearerGetter: (() => string) | null = null;

  const setBaseURL = (url: string) => baseURL = url;
  const setBearerGetter = (bg: () => string) => bearerGetter = bg;

  const beforeRequestHandler: BeforeRequestHandler = (config) => ({
    ...config,
    headers: {
      ...(bearerGetter ? {
        authorization: `Bearer ${bearerGetter()}`,
      } : {}),
    },
    baseURL,
  });

  Object.keys(record).forEach((key) => record[key].beforeRequest(beforeRequestHandler));

  return {
    ...record,
    setBaseURL,
    setBearerGetter,
  };
}
