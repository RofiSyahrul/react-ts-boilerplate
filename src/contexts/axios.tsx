import React, { createContext, useContext } from 'react';
import axios, { AxiosInstance } from 'axios';
import { BASE_URL } from '@utils/constants';

const request = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const AxiosContext = createContext(request);

export function useAxiosRequest(): AxiosInstance {
  return useContext(AxiosContext);
}

export const AxiosProvider: React.FC = ({ children }) => {
  return <AxiosContext.Provider value={request}>{children}</AxiosContext.Provider>;
};
