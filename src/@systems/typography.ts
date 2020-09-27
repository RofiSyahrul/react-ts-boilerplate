import { Property as Css } from 'csstype';
import {
  SxFn,
  system,
  TypographyVariant,
  TypographyVariantConfig,
  ResponsiveValue,
  ColorName,
} from '@styled-system/core';
import { defaultTheme } from '@styles/theme';

type TextEmphasisPos =
  | 'over'
  | 'under'
  | 'left'
  | 'right'
  | 'over left'
  | 'over right'
  | 'under left'
  | 'under right'
  | 'left over'
  | 'left under'
  | 'right over'
  | 'right under';

export interface TypographyProps {
  tVariant?: ResponsiveValue<TypographyVariant>;
  fFamily?: ResponsiveValue<Css.FontFamily>;
  fSize?: ResponsiveValue<Css.FontSize>;
  weight?: ResponsiveValue<Css.FontWeight>;
  fLh?: ResponsiveValue<Css.LineHeight>;
  fLs?: ResponsiveValue<Css.LetterSpacing>;
  fStyle?: ResponsiveValue<Css.FontStyle>;
  tAlign?: ResponsiveValue<Css.TextAlign>;
  tDecoration?: ResponsiveValue<Css.TextDecoration>;
  tOverflow?: ResponsiveValue<Css.TextOverflow>;
  tOrientation?: ResponsiveValue<Css.TextOrientation>;
  tJustify?: ResponsiveValue<Css.TextJustify>;
  tIndent?: ResponsiveValue<Css.TextIndent>;
  tTransform?: ResponsiveValue<Css.TextTransform>;
  tEmphasis?: ResponsiveValue<Css.TextEmphasis>;
  tEmphasisC?: ResponsiveValue<Css.TextEmphasisColor | ColorName>;
  tEmphasisPos?: ResponsiveValue<TextEmphasisPos | Css.TextEmphasisPosition>;
  tEmphasisS?: ResponsiveValue<Css.TextEmphasisStyle>;
  wordSpacing?: ResponsiveValue<Css.WordSpacing>;
  wordWrap?: ResponsiveValue<Css.WordWrap>;
  wordBreak?: ResponsiveValue<Css.WordBreak>;
  whiteSpace?: ResponsiveValue<Css.WhiteSpace>;
  lineClamp?: ResponsiveValue<Css.LineClamp>;
  lineBreak?: ResponsiveValue<Css.LineBreak>;
}

const typographyVariant: SxFn = (
  raw: TypographyVariant,
  scale: TypographyVariantConfig
) => {
  return scale && scale[raw];
};

typographyVariant.scale = 'typography';
typographyVariant.defaultScale = defaultTheme.typography;

export const typography = system<TypographyProps>({
  tVariant: typographyVariant,
  fFamily: { property: 'fontFamily' },
  fSize: { property: 'fontSize' },
  weight: { property: 'fontWeight' },
  fLh: { property: 'lineHeight' },
  fLs: { property: 'letterSpacing' },
  fStyle: { property: 'fontStyle' },
  tAlign: { property: 'textAlign' },
  tDecoration: { property: 'textDecoration' },
  tOverflow: { property: 'textOverflow' },
  tOrientation: { property: 'textOrientation' },
  tJustify: { property: 'textJustify' },
  tIndent: { property: 'textIndent' },
  tTransform: { property: 'textTransform' },
  tEmphasis: { properties: ['textEmphasis', 'WebkitTextEmphasis'] },
  tEmphasisC: {
    properties: ['textEmphasisColor', 'WebkitTextEmphasisColor'],
    scale: 'colors',
    defaultScale: defaultTheme.colors,
  },
  tEmphasisPos: {
    properties: ['textEmphasisPosition', 'WebkitTextEmphasisPosition'],
  },
  tEmphasisS: { properties: ['textEmphasisStyle', 'WebkitTextEmphasisStyle'] },
  wordBreak: { properties: ['wordBreak', 'msWordBreak'] },
  wordSpacing: true,
  wordWrap: true,
  lineBreak: {
    properties: ['lineBreak', 'msLineBreak', 'KhtmlLineBreak', 'WebkitLineBreak'],
  },
  lineClamp: { properties: ['lineClamp', 'WebkitLineClamp'] },
  whiteSpace: true,
});
