import { get, TransformFn } from '@styled-system/core';

export const isNumber = (n: unknown): n is number =>
  typeof n === 'number' && !Number.isNaN(n);

export const autoPercentage = (n: string | number | true): string | number => {
  return n === true ? '100%' : isNumber(n) && n >= -1 && n <= 1 ? `${n * 100}%` : n;
};

export const getValue: TransformFn = (n, scale) => get(scale, n, autoPercentage(n));

const colorRegExp = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

export function hexToRgb(color: string): string {
  if (!colorRegExp.test(color)) return color;
  const result = colorRegExp.exec(color) || [];
  const rgbArray = result.slice(1, 4).map(hex => parseInt(hex, 16));
  return `rgb(${rgbArray.join(', ')})`;
}

export function hexToRgba(color: string, alpha: number): string {
  if (!colorRegExp.test(color) || alpha < 0 || alpha > 1) return color;
  const rgb = hexToRgb(color);
  const rgbArray = rgb.replace(/[rgb()]/g, '').split(', ');
  return `rgba(${rgbArray.join(', ')}, ${alpha})`;
}
