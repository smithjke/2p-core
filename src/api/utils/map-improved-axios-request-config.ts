import { AxiosRequestConfig } from 'axios';
import { ImprovedAxiosRequestConfig } from '../common';
import { fillUrl } from './fill-url';
import { makeQueryString } from './make-query-string';

export const mapImprovedAxiosRequestConfig = (config: ImprovedAxiosRequestConfig, prefix?: string): AxiosRequestConfig => {
  const {
    url,
    params,
    query,
    ...axiosRequestConfig
  } = config;

  return {
    ...axiosRequestConfig,
    url: `${prefix}${params ? fillUrl(url, params) : url}`,
    params: query,
    paramsSerializer: makeQueryString,
  };
};
