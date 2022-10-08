import { AxiosRequestConfig } from 'axios';

export type ImprovedAxiosRequestConfig = AxiosRequestConfig & {
  url: string;
  params?: object;
  query?: object;
};
