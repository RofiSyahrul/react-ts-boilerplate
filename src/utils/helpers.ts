import { BASE_IMAGE_URL } from './constants';

export function compareMemo(prev: unknown, next: unknown): boolean {
  return JSON.stringify(prev) === JSON.stringify(next);
}

export function getId(url = ''): number {
  return url
    .split('/')
    .filter(s => s && Number.isFinite(Number(s)))
    .map(Number)[0];
}

interface GetImageUrlOptions {
  url?: string;
  id?: number;
}

export function getImageUrl({ url, id }: GetImageUrlOptions = {}): string {
  if (typeof id === 'number') return `${BASE_IMAGE_URL}/${id}.png`;
  if (url && typeof url === 'string') {
    return `${BASE_IMAGE_URL}/${getId(url)}.png`;
  }
  return '';
}

type Primitive = string | number | boolean | null | undefined;
export type General = Primitive | Primitive[] | Record<string, Primitive>;

export function decode(value = ''): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function encode(value = ''): string {
  try {
    return encodeURIComponent(value);
  } catch {
    return value;
  }
}

export function cast(value = ''): unknown {
  try {
    return JSON.parse(value);
  } catch {
    if (!value) return undefined;
    return value;
  }
}

type QsToObjOptions<V extends boolean> = { autoCast?: V };

export const queryStringToObj = <
  K extends string | number | symbol = string,
  V extends boolean = false
>(
  qs: string,
  options?: QsToObjOptions<V>
): V extends true ? Record<K, General> : Record<K, string> => {
  qs = qs.replace('?', '');
  const { autoCast = false } = options || {};

  const result = qs.split('&').reduce((obj, keyvalue) => {
    const [key, value] = keyvalue.split('=');
    const decoded = decode(value);
    if (autoCast) obj[key] = cast(decoded);
    else obj[key] = decoded;
    return obj;
  }, {} as V extends true ? Record<K, General> : Record<K, string>);

  return result;
};

export const mergeQueryString = <
  K extends string | number | symbol = string,
  M extends string | number | symbol = string
>(
  qs: string | Record<K, General> | Record<K, string> = '',
  mergeWith: string | Record<M, General> | Record<M, string> = '',
  options: QsToObjOptions<boolean> = {}
): string => {
  const { autoCast = false } = options;

  const queryObj = typeof qs === 'object' ? qs : queryStringToObj(qs, { autoCast });

  const otherQueryObj =
    typeof mergeWith === 'object'
      ? mergeWith
      : queryStringToObj(mergeWith, { autoCast });

  const newQueryObj = { ...queryObj, ...otherQueryObj };
  return Object.keys(newQueryObj)
    .reduce((str, key) => {
      const value = newQueryObj[key];
      if (value) {
        if (typeof value !== 'object') {
          str += `${key}=${encode(`${value}`)}&`;
        } else {
          str += `${key}=${encode(JSON.stringify(value))}&`;
        }
      }
      return str;
    }, '?')
    .replace(/&$/, '');
};

export const formatNumber = (value?: string | number): string => {
  if (!value) return '0';
  return parseFloat(`${value}`).toLocaleString('de-DE', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  });
};
