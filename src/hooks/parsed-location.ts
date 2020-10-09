import { useMemo, useCallback, useEffect } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { General, mergeQueryString, queryStringToObj } from '@utils/helpers';

export interface ParsedLocationOptions {
  autoCast?: boolean;
  forceUrlChange?: (forced?: boolean) => Promise<void>;
}

export interface GoToOptions {
  state?: Record<string, unknown>;
  /** @default "push" */
  method?: 'replace' | 'push';
  /** @default true */
  keepState?: boolean;
}

export interface ParsedLocationReturn<
  QS extends Record<keyof QS, General> | Record<keyof QS, string> =
    | Record<string, General>
    | Record<string, string>,
  Params extends { [K in keyof Params]?: string } = Record<string, string>
> extends ReturnType<typeof useLocation> {
  state: Partial<Record<string, unknown>>;
  params: Params;
  parsedQs: QS;
  goTo(to: string | QS, opts?: GoToOptions): void;
  getHref(to: string | QS): string | undefined;
}

export function useParsedLocation<
  QS extends Record<keyof QS, General> | Record<keyof QS, string> =
    | Record<string, General>
    | Record<string, string>,
  Params extends { [K in keyof Params]?: string } = Record<string, string>
>({
  autoCast = true,
  forceUrlChange = async () => {},
}: ParsedLocationOptions = {}): ParsedLocationReturn<QS, Params> {
  const location = useLocation();
  const history = useHistory();
  const params = useParams();
  const { search, state, pathname } = location;

  const parsedQs = useMemo(() => {
    const parsed = queryStringToObj<keyof QS, typeof autoCast>(search, {
      autoCast,
    }) as QS;
    return parsed;
  }, [search]);

  const getHref = useCallback(
    (to: string | QS): string | undefined => {
      if (!to) return;
      if (typeof to === 'string' && to.startsWith('/')) {
        return to;
      }
      let dest: string;
      if ((typeof to === 'string' && to.startsWith('?')) || typeof to === 'object') {
        dest = mergeQueryString(search, to, { autoCast });
      } else {
        dest = to;
      }
      const slashedPath = pathname.endsWith('/');
      return dest.startsWith('?') || slashedPath
        ? `${pathname}${dest}`
        : `${pathname}/${dest}`;
    },
    [pathname, search]
  );

  const goTo = useCallback<ParsedLocationReturn['goTo']>(
    (to: string | QS, opts) => {
      if (!to) return;
      const { method, keepState = true, state: destState } = opts || {};
      const historyMethod = method === 'replace' ? history.replace : history.push;
      const href = getHref(to) || '';
      historyMethod(href, {
        ...(keepState && { state }),
        ...destState,
      });
    },
    [state, getHref]
  );

  useEffect(() => {
    forceUrlChange(false);
  }, [state, search]);

  return {
    ...location,
    params: params as Params,
    parsedQs,
    getHref,
    goTo,
    state: typeof state !== 'object' ? {} : state || {},
  };
}
