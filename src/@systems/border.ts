import { Property as Css } from 'csstype';
import { system, ResponsiveValue, ColorName, compose } from '@styled-system/core';
import { defaultTheme } from '@styles/theme';

export interface BorderBaseProps {
  b?: ResponsiveValue<Css.Border>;
  bW?: ResponsiveValue<Css.BorderWidth<number>>;
  bS?: ResponsiveValue<Css.BorderStyle>;
  bC?: ResponsiveValue<Css.BorderColor | ColorName>;
  bTop?: ResponsiveValue<Css.BorderTop>;
  bTopW?: ResponsiveValue<Css.BorderTopWidth<number>>;
  bTopS?: ResponsiveValue<Css.BorderTopStyle>;
  bTopC?: ResponsiveValue<Css.BorderTopColor | ColorName>;
  bRight?: ResponsiveValue<Css.BorderRight>;
  bRightW?: ResponsiveValue<Css.BorderRightWidth<number>>;
  bRightS?: ResponsiveValue<Css.BorderRightStyle>;
  bRightC?: ResponsiveValue<Css.BorderRightColor | ColorName>;
  bBottom?: ResponsiveValue<Css.BorderBottom>;
  bBottomW?: ResponsiveValue<Css.BorderBottomWidth<number>>;
  bBottomS?: ResponsiveValue<Css.BorderBottomStyle>;
  bBottomC?: ResponsiveValue<Css.BorderBottomColor | ColorName>;
  bLeft?: ResponsiveValue<Css.BorderLeft>;
  bLeftW?: ResponsiveValue<Css.BorderLeftWidth<number>>;
  bLeftS?: ResponsiveValue<Css.BorderLeftStyle>;
  bLeftC?: ResponsiveValue<Css.BorderLeftColor | ColorName>;
}

export interface RadiusProps {
  r?: ResponsiveValue<Css.BorderRadius<number>>;
  rTopRight?: ResponsiveValue<Css.BorderTopRightRadius<number>>;
  rTopLeft?: ResponsiveValue<Css.BorderTopLeftRadius<number>>;
  rBottomRight?: ResponsiveValue<Css.BorderBottomRightRadius<number>>;
  rBottomLeft?: ResponsiveValue<Css.BorderBottomLeftRadius<number>>;
}

export interface OutlineProps {
  outline?: ResponsiveValue<Css.Outline>;
  outlineWidth?: ResponsiveValue<Css.OutlineWidth<number>>;
  outlineStyle?: ResponsiveValue<Css.OutlineStyle>;
  outlineColor?: ResponsiveValue<Css.OutlineColor | ColorName>;
  outlineOffset?: ResponsiveValue<Css.OutlineOffset<number>>;
  mozOutlineRadius?: ResponsiveValue<Css.MozOutlineRadius<number>>;
  mozOutlineRadiusTopright?: ResponsiveValue<Css.MozOutlineRadiusTopright<number>>;
  mozOutlineRadiusTopleft?: ResponsiveValue<Css.MozOutlineRadiusTopleft<number>>;
  mozOutlineRadiusBottomright?: ResponsiveValue<
    Css.MozOutlineRadiusBottomright<number>
  >;
  mozOutlineRadiusBottomleft?: ResponsiveValue<
    Css.MozOutlineRadiusBottomleft<number>
  >;
}

export interface BorderProps extends BorderBaseProps, RadiusProps, OutlineProps {}

const { colors } = defaultTheme;

export const borderBase = system<BorderBaseProps>({
  b: { property: 'border' },
  bW: { property: 'borderWidth' },
  bS: { property: 'borderStyle' },
  bC: { property: 'borderColor', scale: 'colors', defaultScale: colors },
  bTop: { property: 'borderTop' },
  bTopW: { property: 'borderTopWidth' },
  bTopS: { property: 'borderTopStyle' },
  bTopC: { property: 'borderTopColor', scale: 'colors', defaultScale: colors },
  bRight: { property: 'borderRight' },
  bRightW: { property: 'borderRightWidth' },
  bRightS: { property: 'borderRightStyle' },
  bRightC: { property: 'borderRightColor', scale: 'colors', defaultScale: colors },
  bBottom: { property: 'borderBottom' },
  bBottomW: { property: 'borderBottomWidth' },
  bBottomS: { property: 'borderBottomStyle' },
  bBottomC: { property: 'borderBottomColor', scale: 'colors', defaultScale: colors },
  bLeft: { property: 'borderLeft' },
  bLeftW: { property: 'borderLeftWidth' },
  bLeftS: { property: 'borderLeftStyle' },
  bLeftC: { property: 'borderLeftColor', scale: 'colors', defaultScale: colors },
});

export const radius = system<RadiusProps>({
  r: { property: 'borderRadius' },
  rTopRight: { property: 'borderTopRightRadius' },
  rTopLeft: { property: 'borderTopLeftRadius' },
  rBottomRight: { property: 'borderBottomRightRadius' },
  rBottomLeft: { property: 'borderBottomLeftRadius' },
});

export const outline = system<OutlineProps>({
  outline: true,
  outlineColor: { property: 'outlineColor', scale: 'colors', defaultScale: colors },
  outlineOffset: true,
  outlineStyle: true,
  outlineWidth: true,
  mozOutlineRadius: { property: 'MozOutlineRadius' },
  mozOutlineRadiusTopright: { property: 'MozOutlineRadiusTopright' },
  mozOutlineRadiusTopleft: { property: 'MozOutlineRadiusTopleft' },
  mozOutlineRadiusBottomright: { property: 'MozOutlineRadiusBottomright' },
  mozOutlineRadiusBottomleft: { property: 'MozOutlineRadiusBottomleft' },
});

export const border = compose<BorderProps>(borderBase, radius, outline);
