import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

const BACKEND_URL = 'https://14.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;
export const AUTH_TOKEN_KEY = 'six-cities-token';
const AUTH_HEADER_NAME = 'X-Token';

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);

    if (token) {
      config.headers[AUTH_HEADER_NAME] = token;
    }

    return config;
  });

  return api;
};
