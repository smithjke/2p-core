import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { TypeCheck } from '@sinclair/typebox/compiler';
import { BeforeRequestHandler, ImprovedAxiosRequestConfig } from '../common';
import { mapImprovedAxiosRequestConfig } from '../utils';

export abstract class AxiosService {
  private readonly prefix: string;

  private beforeRequestHandler?: BeforeRequestHandler;

  protected axiosInstance: AxiosInstance;

  constructor(prefix: string, axiosRequestConfig?: AxiosRequestConfig) {
    this.axiosInstance = axios.create(axiosRequestConfig);
    this.prefix = prefix;
  }

  beforeRequest(handler: BeforeRequestHandler): void {
    this.beforeRequestHandler = handler;
  }

  async request<R>(config: ImprovedAxiosRequestConfig, typeCheck?: TypeCheck<any>): Promise<R> {
    const axiosRequestConfig = mapImprovedAxiosRequestConfig(config, this.prefix);
    const handledAxiosRequestConfig = this.beforeRequestHandler
      ? this.beforeRequestHandler(axiosRequestConfig)
      : axiosRequestConfig;

    const axiosResponse = await this.axiosInstance.request<R>(handledAxiosRequestConfig);

    if (typeCheck) {
      const errors = [...typeCheck.Errors(axiosResponse.data)];

      if (errors.length) {
        throw new Error('Validation error');
      }
    }

    return axiosResponse.data;
  }
}
