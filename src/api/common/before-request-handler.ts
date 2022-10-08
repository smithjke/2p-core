import { AxiosRequestConfig } from 'axios';

export type BeforeRequestHandler = (config: AxiosRequestConfig) => AxiosRequestConfig;
