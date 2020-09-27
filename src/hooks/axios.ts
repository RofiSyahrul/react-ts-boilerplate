/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useEffect, useCallback, useReducer, Dispatch } from 'react';
import produce from 'immer';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { compareMemo, getId, getImageUrl } from '@utils/helpers';
import { useAxiosRequest } from '@contexts/axios';

type TDataBase = { [x: string]: unknown } | unknown[];
type ObjectBase = { [x: string]: unknown };

interface RequestAndResponseState<
  TData extends TDataBase = ObjectBase,
  TParams extends ObjectBase = ObjectBase,
  TBody extends any = ObjectBase
> {
  loading: boolean;
  error: Error | null;
  data: TData | null;
  params: TParams | null;
  body: TBody | null;
}

type AxiosActionType =
  | 'SET_ALL_REQ_RES_STATE'
  | 'RESET_REQ_RES_STATE'
  | 'SET_AXIOS_LOADING'
  | 'SET_AXIOS_ERROR'
  | 'SET_RES_DATA'
  | 'SET_REQ_PARAMS'
  | 'SET_REQ_BODY';

interface AxiosAction<
  TData extends TDataBase = ObjectBase,
  TParams extends ObjectBase = ObjectBase,
  TBody extends any = ObjectBase
> {
  type: AxiosActionType;
  payload?: Partial<RequestAndResponseState<TData, TParams, TBody>>;
}

const initialStateCallback = <
  TData extends TDataBase = ObjectBase,
  TParams extends ObjectBase = ObjectBase,
  TBody extends any = ObjectBase
>({
  params,
  body,
}: Pick<
  Partial<RequestAndResponseState<TData, TParams, TBody>>,
  'params' | 'body'
> = {}): RequestAndResponseState<TData, TParams, TBody> => ({
  loading: false,
  error: null,
  data: null,
  params: params || null,
  body: body || null,
});

function recipe<
  TData extends TDataBase = ObjectBase,
  TParams extends ObjectBase = ObjectBase,
  TBody extends any = ObjectBase
>(
  draft: RequestAndResponseState<TData, TParams, TBody>,
  action: AxiosAction<TData, TParams, TBody>
) {
  const { type, payload = {} } = action;
  switch (type) {
    case 'SET_ALL_REQ_RES_STATE':
      Object.keys(payload).forEach(key => {
        if (!compareMemo(draft[key], payload[key])) {
          draft[key] = payload[key];
        }
      });
      return;
    case 'SET_AXIOS_LOADING':
      if (draft.loading !== payload.loading) {
        draft.loading = Boolean(payload.loading);
      }
      return;
    case 'SET_AXIOS_ERROR':
      const { error } = payload;
      if (typeof error !== 'undefined' && !compareMemo(draft.error, error)) {
        draft.error = error;
      }
      return;
    case 'SET_RES_DATA':
      const { data } = payload;
      if (typeof data !== 'undefined' && !compareMemo(draft.data, data)) {
        draft.data = data;
      }
      return;
    case 'SET_REQ_PARAMS':
      const { params } = payload;
      if (typeof params !== 'undefined' && !compareMemo(draft.params, params)) {
        draft.params = params;
      }
      return;
    case 'SET_REQ_BODY':
      const { body } = payload;
      if (typeof body !== 'undefined' && !compareMemo(draft.body, body)) {
        draft.body = body;
      }
      return;
    case 'RESET_REQ_RES_STATE':
      return initialStateCallback({ params: payload.params, body: payload.body });
    default:
      throw new Error('Unknown action type');
  }
}

const reducer = produce(recipe);

export type ResourceListItem = { name: string; url: string };

export interface AxiosGetOptions<
  TData extends TDataBase = ObjectBase,
  TParams extends ObjectBase = ObjectBase
>
  extends Partial<Pick<RequestAndResponseState<TData, TParams>, 'params'>>,
    Omit<AxiosRequestConfig, 'url' | 'params' | 'method'> {
  endpoint: string;
  kind?: 'list' | 'item';
  withImage?: boolean;
}

export function useAxiosGet<
  TData extends TDataBase = ObjectBase,
  TParams extends ObjectBase = ObjectBase
>({
  params,
  endpoint,
  kind = 'item',
  withImage = false,
  headers,
  ...config
}: AxiosGetOptions<TData, TParams>): Pick<
  RequestAndResponseState<TData, TParams>,
  'data' | 'error' | 'loading'
> {
  const request = useAxiosRequest();

  const [state, dispatch] = useReducer(
    reducer,
    { params, body: null },
    initialStateCallback
  ) as [
    RequestAndResponseState<TData, TParams>,
    Dispatch<AxiosAction<TData, TParams>>
  ];

  const { params: paramsState, data, loading, error } = state;

  useEffect(() => {
    dispatch({ type: 'SET_REQ_PARAMS', payload: { params } });
  }, [params]);

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: 'SET_AXIOS_LOADING', payload: { loading: true } });
      const res: AxiosResponse<TData> = await request.get(
        config.baseURL ? '' : endpoint,
        {
          params: { ...request.defaults.params, ...paramsState },
          headers: { ...request.defaults.headers, ...headers },
          ...config,
        }
      );

      if (res.status >= 400) {
        throw new Error(`Failed to fetch data. Status: ${res.status}`);
      }

      if (kind === 'list') {
        const { results = [] }: { results: ResourceListItem[] } =
          (res.data as any) || {};
        (res.data as any).results = results.map(({ name, url }) => {
          const id = getId(url);
          return {
            id,
            name,
            url,
            ...(withImage && { image: getImageUrl({ url, id }) }),
          };
        });
      } else if (res.data && withImage) {
        (res.data as any).image = getImageUrl({ url: endpoint });
      }

      return res.data;
    }

    fetchData()
      .then(resData => {
        dispatch({
          type: 'SET_ALL_REQ_RES_STATE',
          payload: { loading: false, data: resData },
        });
      })
      .catch(err => {
        dispatch({
          type: 'SET_ALL_REQ_RES_STATE',
          payload: { loading: false, error: err },
        });
      });
  }, [paramsState]);

  return { data, loading, error };
}

type AxiosLazyFetchData<
  TData extends TDataBase = ObjectBase,
  TParams extends ObjectBase = ObjectBase
> = (
  options?: Pick<AxiosGetOptions<TData, TParams>, 'params'>
) => Promise<TData | null>;

export type AxiosLazyGetResult<
  TData extends TDataBase = ObjectBase,
  TParams extends ObjectBase = ObjectBase
> = [
  AxiosLazyFetchData<TData, TParams>,
  Pick<RequestAndResponseState<TData, TParams>, 'data' | 'error' | 'loading'>
];

export function useLazyAxiosGet<
  TData extends TDataBase = ObjectBase,
  TParams extends ObjectBase = ObjectBase
>({
  endpoint,
  params,
  kind = 'item',
  withImage = false,
  headers,
  ...config
}: AxiosGetOptions<TData, TParams>): AxiosLazyGetResult<TData, TParams> {
  const request = useAxiosRequest();

  const [state, dispatch] = useReducer(
    reducer,
    { params, body: null },
    initialStateCallback
  ) as [
    RequestAndResponseState<TData, TParams>,
    Dispatch<AxiosAction<TData, TParams>>
  ];

  const { params: paramsState, data, loading, error } = state;

  const fetchData: AxiosLazyFetchData<TData, TParams> = useCallback(
    async options => {
      try {
        const { params: paramOptions = paramsState } = options || {};
        dispatch({ type: 'SET_AXIOS_LOADING', payload: { loading: true } });
        const res: AxiosResponse<TData> = await request.get(
          config.baseURL ? '' : endpoint,
          {
            params: { ...request.defaults.params, ...paramOptions },
            headers: { ...request.defaults.headers, ...headers },
            ...config,
          }
        );

        if (res.status >= 400) {
          dispatch({
            type: 'SET_ALL_REQ_RES_STATE',
            payload: {
              loading: false,
              error: new Error(`Failed to fetch data. Status: ${res.status}`),
            },
          });
          return null;
        }

        if (kind === 'list') {
          const { results = [] }: { results: ResourceListItem[] } =
            (res.data as any) || {};
          (res.data as any).results = results.map(({ name, url }) => {
            const id = getId(url);
            return {
              id,
              name,
              url,
              ...(withImage && { image: getImageUrl({ url, id }) }),
            };
          });
        } else if (res.data && withImage) {
          (res.data as any).image = getImageUrl({ url: endpoint });
        }

        dispatch({
          type: 'SET_ALL_REQ_RES_STATE',
          payload: { data: res.data, loading: false },
        });
        return res.data;
      } catch (err) {
        dispatch({
          type: 'SET_ALL_REQ_RES_STATE',
          payload: { loading: false, error: err },
        });
        return null;
      }
    },
    [paramsState]
  );

  useEffect(() => {
    dispatch({ type: 'SET_REQ_PARAMS', payload: { params } });
  }, [params]);

  return [fetchData, { data, loading, error }];
}
