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
