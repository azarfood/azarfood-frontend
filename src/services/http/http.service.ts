import axios from 'axios';

import { StorageService } from '../storage/storage.service';

export const HttpService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus: (status) => status < 300,
});

HttpService.interceptors.request.use(
  function (config) {
    const token = StorageService.user_token.get();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

HttpService.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (axios.isCancel(error)) {
      // eslint-disable-next-line no-console
      console.warn('Request canceled', error.message);
      return Promise.reject(error);
    }

    // eslint-disable-next-line no-console
    console.error('API Error:', error);

    if (error.response && error.response.status === 401) {
      // TODO: save current path
      StorageService.reset();
      location.href = '/login';
    }

    return Promise.reject(error);
  },
);
