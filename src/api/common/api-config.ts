import { ImprovedAxiosRequestConfig } from './improved-axios-request-config';

export type ApiConfig<SERVICE, EXCLUDED_SERVICE = void> = EXCLUDED_SERVICE extends void
  ? Record<keyof SERVICE, ImprovedAxiosRequestConfig>
  : Record<Exclude<keyof SERVICE, keyof EXCLUDED_SERVICE>, ImprovedAxiosRequestConfig>;
