import React, { createContext, useContext } from 'react';
import axios, { AxiosInstance } from 'axios';
import { BASE_URL, API_KEY } from '@utils/constants';

interface BaseParams {
  apiKey: string;
}

const request = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  params: { apiKey: API_KEY } as BaseParams,
});

const AxiosContext = createContext(request);

export function useAxiosRequest(): AxiosInstance {
  return useContext(AxiosContext);
}

export const AxiosProvider: React.FC = ({ children }) => {
  return <AxiosContext.Provider value={request}>{children}</AxiosContext.Provider>;
};
