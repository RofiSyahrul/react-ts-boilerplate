import { Property as Css } from 'csstype';
import {
  system,
  ResponsiveValue,
  ColorName,
  compose,
  ShadowName,
  TransformFn,
  get,
} from '@styled-system/core';
import { defaultTheme } from '@styles/theme';

import { hexToRgba, isNumber } from './core';

export interface ColorProps {
  c?: ResponsiveValue<Css.Color | ColorName>;
  cAlpha?: number;
  bg?: ResponsiveValue<Css.BackgroundColor | ColorName>;
  bgAlpha?: number;
  opacity?: ResponsiveValue<Css.Opacity>;
  caretColor?: ResponsiveValue<Css.CaretColor | ColorName>;
  filter?: ResponsiveValue<Css.Filter>;
}

export interface BgProps {
  bgs?: ResponsiveValue<Css.Background>;
  bgAttach?: ResponsiveValue<Css.BackgroundAttachment>;
  bgBlendMode?: ResponsiveValue<Css.BackgroundBlendMode>;
  bgClip?: ResponsiveValue<Css.BackgroundClip>;
  bgImage?: ResponsiveValue<Css.BackgroundImage>;
  bgOrigin?: ResponsiveValue<Css.BackgroundOrigin>;
  bgPos?: ResponsiveValue<Css.BackgroundPosition>;
  bgPosX?: ResponsiveValue<Css.BackgroundPositionX>;
  bgPosY?: ResponsiveValue<Css.BackgroundPositionY>;
  bgRepeat?: ResponsiveValue<Css.BackgroundRepeat>;
  bgSize?: ResponsiveValue<Css.BackgroundSize>;
}

export interface ShadowProps {
  shadow?: ResponsiveValue<Css.BoxShadow | ShadowName>;
  tShadow?: ResponsiveValue<Css.TextShadow | ShadowName>;
}

export interface ImageProps {
  objectFit?: ResponsiveValue<Css.ObjectFit>;
  objectPos?: ResponsiveValue<Css.ObjectPosition>;
}

export interface PaletteProps extends ColorProps, BgProps, ShadowProps, ImageProps {}

const { colors, shadows } = defaultTheme;

export const addAlpha = (
  alphaKey: 'cAlpha' | 'bgAlpha'
): TransformFn<ColorProps> => (n, scale, props) => {
  const alpha = props && props[alphaKey];
  const value = get(scale, n, n);
  if (!isNumber(alpha) || alpha < 0 || alpha > 1) return value;
  return hexToRgba(value, alpha);
};

export const color = system<ColorProps>({
  c: {
    property: 'color',
    scale: 'colors',
    defaultScale: colors,
    transform: addAlpha('cAlpha'),
  },
  bg: {
    property: 'backgroundColor',
    scale: 'colors',
    defaultScale: colors,
    transform: addAlpha('bgAlpha'),
  },
  caretColor: {
    property: 'caretColor',
    scale: 'colors',
    defaultScale: colors,
  },
  opacity: true,
  filter: true,
  cAlpha() {},
  bgAlpha() {},
});

export const background = system<BgProps>({
  bgs: { property: 'background' },
  bgAttach: { property: 'backgroundAttachment' },
  bgBlendMode: { property: 'backgroundBlendMode' },
  bgClip: { property: 'backgroundClip' },
  bgImage: { property: 'backgroundImage' },
  bgOrigin: { property: 'backgroundOrigin' },
  bgPos: { property: 'backgroundPosition' },
  bgPosX: { property: 'backgroundPositionX' },
  bgPosY: { property: 'backgroundPositionY' },
  bgRepeat: { property: 'backgroundRepeat' },
  bgSize: { property: 'backgroundSize' },
});

export const shadow = system<ShadowProps>({
  shadow: { property: 'boxShadow', scale: 'shadows', defaultScale: shadows },
  tShadow: { property: 'textShadow', scale: 'shadows', defaultScale: shadows },
});

export const image = system<ImageProps>({
  objectFit: { properties: ['objectFit', 'OObjectFit'] },
  objectPos: { properties: ['objectPosition', 'OObjectPosition'] },
});

export const palette = compose<PaletteProps>(color, background, shadow);
