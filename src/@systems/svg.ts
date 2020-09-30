import { Property as Css } from 'csstype';
import { ColorName, compose, ResponsiveValue, system } from '@styled-system/core';
import { defaultTheme } from '@styles/theme';

import { ColorProps, color } from './palette';
import { TypographyProps, typography } from './typography';
import { MotionProps, motion } from './motion';
import {
  DisplayProps,
  display,
  WidthProps,
  width,
  HeightProps,
  height,
} from './layout';

interface SvgBaseProps {
  svgAlignmentBaseline?: ResponsiveValue<Css.AlignmentBaseline>;
  svgBaselineShift?: ResponsiveValue<Css.BaselineShift>;
  svgClip?: ResponsiveValue<Css.Clip>;
  svgClipPath?: ResponsiveValue<Css.ClipPath>;
  svgClipRule?: ResponsiveValue<Css.ClipRule>;
  svgCInterpolation?: ResponsiveValue<Css.ColorInterpolation>;
  svgCRendering?: ResponsiveValue<Css.ColorRendering>;
  svgCursor?: ResponsiveValue<Css.Cursor>;
  svgDir?: ResponsiveValue<Css.Direction>;
  svgDominantBaseline?: ResponsiveValue<Css.DominantBaseline>;
  svgFill?: ResponsiveValue<Css.Fill | ColorName>;
  svgFillOpacity?: ResponsiveValue<Css.FillOpacity>;
  svgFillRule?: ResponsiveValue<Css.FillRule>;
  svgFilter?: ResponsiveValue<Css.Filter>;
  svgFloodC?: ResponsiveValue<Css.FloodColor | ColorName>;
  svgFloodOpacity?: ResponsiveValue<Css.FloodOpacity>;
  svgFont?: ResponsiveValue<Css.Font>;
  svgImageRendering?: ResponsiveValue<Css.ImageRendering>;
  svgLightingC?: ResponsiveValue<Css.LightingColor | ColorName>;
  svgMarker?: ResponsiveValue<Css.Marker>;
  svgMarkerEnd?: ResponsiveValue<Css.MarkerEnd>;
  svgMarkerMid?: ResponsiveValue<Css.MarkerMid>;
  svgMarkerStart?: ResponsiveValue<Css.MarkerStart>;
  svgMask?: ResponsiveValue<Css.Mask>;
  svgOpacity?: ResponsiveValue<Css.Opacity>;
  svgOverflow?: ResponsiveValue<Css.Overflow>;
  svgPaintOrder?: ResponsiveValue<Css.PaintOrder>;
  svgPointerEvents?: ResponsiveValue<Css.PointerEvents>;
  svgShapeRendering?: ResponsiveValue<Css.ShapeRendering>;
  svgStopC?: ResponsiveValue<Css.StopColor | ColorName>;
  svgStopOpacity?: ResponsiveValue<Css.StopOpacity>;
  svgStroke?: ResponsiveValue<Css.Stroke | ColorName>;
  svgStrokeDasharray?: ResponsiveValue<Css.StrokeDasharray>;
  svgStrokeDashoffset?: ResponsiveValue<Css.StrokeDashoffset>;
  svgStrokeLinecap?: ResponsiveValue<Css.StrokeLinecap>;
  svgStrokeLinejoin?: ResponsiveValue<Css.StrokeLinejoin>;
  svgStrokeMiterlimit?: ResponsiveValue<Css.StrokeMiterlimit>;
  svgStrokeOpacity?: ResponsiveValue<Css.StrokeOpacity>;
  svgStrokeW?: ResponsiveValue<Css.StrokeWidth>;
  svgTransform?: ResponsiveValue<Css.Transform>;
  svgTransformOrign?: ResponsiveValue<Css.TransformOrigin>;
  svgUnicodeBidi?: ResponsiveValue<Css.UnicodeBidi>;
  svgVectorEffect?: ResponsiveValue<Css.VectorEffect>;
  svgVisibility?: ResponsiveValue<Css.Visibility>;
  svgWhiteSpace?: ResponsiveValue<Css.WhiteSpace>;
  svgWordSpacing?: ResponsiveValue<Css.WordSpacing>;
  svgWritingMode?: ResponsiveValue<Css.WritingMode>;
}

export interface SvgSystemProps
  extends SvgBaseProps,
    Pick<DisplayProps, 'd'>,
    WidthProps,
    HeightProps,
    Pick<ColorProps, 'c' | 'cAlpha'>,
    Omit<MotionProps, 'transform' | 'transformOrigin'>,
    Pick<
      TypographyProps,
      | 'fFamily'
      | 'fSize'
      | 'fStyle'
      | 'weight'
      | 'fLs'
      | 'fLh'
      | 'fSizeAdjust'
      | 'fStretch'
      | 'fVariant'
      | 'tAnchor'
      | 'tDecoration'
      | 'tRendering'
    > {}

const { colors } = defaultTheme;

const svgBase = system<SvgBaseProps>({
  svgAlignmentBaseline: { property: 'alignmentBaseline' },
  svgBaselineShift: { property: 'baselineShift' },
  svgClip: { property: 'clip' },
  svgClipPath: { property: 'clipPath' },
  svgClipRule: { property: 'clipRule' },
  svgCInterpolation: { property: 'colorInterpolation' },
  svgCRendering: { property: 'colorRendering' },
  svgCursor: { property: 'cursor' },
  svgDir: { property: 'direction' },
  svgDominantBaseline: { property: 'dominantBaseline' },
  svgFill: { property: 'fill', scale: 'colors', defaultScale: colors },
  svgFillOpacity: { property: 'fillOpacity' },
  svgFillRule: { property: 'fillRule' },
  svgFilter: { properties: ['filter', 'msFilter'] },
  svgFloodC: { property: 'floodColor', scale: 'colors', defaultScale: colors },
  svgFloodOpacity: { property: 'floodOpacity' },
  svgFont: { property: 'font' },
  svgImageRendering: { property: 'imageRendering' },
  svgLightingC: { property: 'lightingColor', scale: 'colors', defaultScale: colors },
  svgMarker: { property: 'marker' },
  svgMarkerEnd: { property: 'markerEnd' },
  svgMarkerMid: { property: 'markerMid' },
  svgMarkerStart: { property: 'markerStart' },
  svgMask: { property: 'mask' },
  svgOpacity: { properties: ['opacity', 'KhtmlOpacity', 'MozOpacity'] },
  svgOverflow: { property: 'overflow' },
  svgPaintOrder: { property: 'paintOrder' },
  svgPointerEvents: { property: 'pointerEvents' },
  svgShapeRendering: { property: 'shapeRendering' },
  svgStopC: { property: 'stopColor', scale: 'colors', defaultScale: colors },
  svgStopOpacity: { property: 'stopOpacity' },
  svgStroke: { property: 'stroke', scale: 'colors', defaultScale: colors },
  svgStrokeDasharray: { property: 'strokeDasharray' },
  svgStrokeDashoffset: { property: 'strokeDashoffset' },
  svgStrokeLinecap: { property: 'strokeLinecap' },
  svgStrokeLinejoin: { property: 'strokeLinejoin' },
  svgStrokeMiterlimit: { property: 'strokeMiterlimit' },
  svgStrokeOpacity: { property: 'strokeOpacity' },
  svgStrokeW: { property: 'strokeWidth' },
  svgTransform: { property: 'transform' },
  svgTransformOrign: { property: 'transformOrigin' },
  svgUnicodeBidi: { property: 'unicodeBidi' },
  svgVectorEffect: { property: 'vectorEffect' },
  svgVisibility: { property: 'visibility' },
  svgWhiteSpace: { property: 'whiteSpace' },
  svgWordSpacing: { property: 'wordSpacing' },
  svgWritingMode: { property: 'writingMode' },
});

export const svg = compose<SvgSystemProps>(
  svgBase,
  display,
  width,
  height,
  color,
  motion,
  typography
);
