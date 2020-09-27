import { Property as Css } from 'csstype';
import { system, ResponsiveValue } from '@styled-system/core';

export interface FlexboxProps {
  flex?: ResponsiveValue<Css.Flex<number>>;
  fDir?: ResponsiveValue<Css.FlexDirection>;
  fWrap?: ResponsiveValue<Css.FlexWrap>;
  fGrow?: ResponsiveValue<Css.FlexGrow>;
  fShrink?: ResponsiveValue<Css.FlexShrink>;
  fBasis?: ResponsiveValue<Css.FlexBasis<number>>;
  fAlign?: ResponsiveValue<Css.AlignItems>;
  fASelf?: ResponsiveValue<Css.AlignSelf>;
  fJustify?: ResponsiveValue<Css.JustifyContent>;
  fJSelf?: ResponsiveValue<Css.JustifySelf>;
}

export const flexbox = system<FlexboxProps>({
  flex: true,
  fDir: { property: 'flexDirection' },
  fWrap: { property: 'flexWrap' },
  fGrow: { property: 'flexGrow' },
  fShrink: { property: 'flexShrink' },
  fBasis: { property: 'flexBasis' },
  fAlign: { property: 'alignItems' },
  fASelf: { property: 'alignSelf' },
  fJustify: { property: 'justifyContent' },
  fJSelf: { property: 'justifySelf' },
});
