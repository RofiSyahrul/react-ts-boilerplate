import {
  CSSProperties,
  ThemedStyledProps,
  DefaultTheme,
  CSSObject,
  StyledComponentProps,
} from 'styled-components';
import { InBreakpoint, Breakpoint } from '@styles/breakpoints';

export interface CssProps {
  w?: InBreakpoint<CSSProperties['width']>;
  maxW?: InBreakpoint<CSSProperties['maxWidth']>;
  minW?: InBreakpoint<CSSProperties['minWidth']>;
  h?: InBreakpoint<CSSProperties['height']>;
  maxH?: InBreakpoint<CSSProperties['maxHeight']>;
  minH?: InBreakpoint<CSSProperties['minHeight']>;
  p?: InBreakpoint<CSSProperties['padding']>;
  m?: InBreakpoint<CSSProperties['margin']>;
  bg?: InBreakpoint<CSSProperties['background']>;
  bgColor?: InBreakpoint<CSSProperties['backgroundColor']>;
  bgImage?: InBreakpoint<CSSProperties['backgroundImage']>;
  bgAttachment?: InBreakpoint<CSSProperties['backgroundAttachment']>;
  bgClip?: InBreakpoint<CSSProperties['backgroundClip']>;
  bgOrigin?: InBreakpoint<CSSProperties['backgroundOrigin']>;
  bgSize?: InBreakpoint<CSSProperties['backgroundSize']>;
  bgPos?: InBreakpoint<CSSProperties['backgroundPosition']>;
  bgRepeat?: InBreakpoint<CSSProperties['backgroundRepeat']>;
  c?: InBreakpoint<CSSProperties['color']>;
  shadow?: InBreakpoint<CSSProperties['boxShadow']>;
  r?: InBreakpoint<CSSProperties['borderRadius']>;
  d?: InBreakpoint<CSSProperties['display']>;
  fDir?: InBreakpoint<CSSProperties['flexDirection']>;
  fWrap?: InBreakpoint<CSSProperties['flexWrap']>;
  flex?: InBreakpoint<CSSProperties['flex']>;
  fAlign?: InBreakpoint<CSSProperties['alignItems']>;
  fASelf?: InBreakpoint<CSSProperties['alignSelf']>;
  fJustify?: InBreakpoint<CSSProperties['justifyContent']>;
  fJSelf?: InBreakpoint<CSSProperties['justifySelf']>;
  gap?: InBreakpoint<CSSProperties['gap']>;
  gTemplateColumns?: InBreakpoint<CSSProperties['gridTemplateColumns']>;
  gTemplateRows?: InBreakpoint<CSSProperties['gridTemplateRows']>;
  gAutoColumns?: InBreakpoint<CSSProperties['gridAutoColumns']>;
  gAutoRows?: InBreakpoint<CSSProperties['gridAutoRows']>;
  gAutoFlow?: InBreakpoint<CSSProperties['gridAutoFlow']>;
  pos?: InBreakpoint<CSSProperties['position']>;
  top?: InBreakpoint<CSSProperties['top']>;
  right?: InBreakpoint<CSSProperties['right']>;
  bottom?: InBreakpoint<CSSProperties['bottom']>;
  left?: InBreakpoint<CSSProperties['left']>;
  b?: InBreakpoint<CSSProperties['border']>;
  bTop?: InBreakpoint<CSSProperties['borderTop']>;
  bRight?: InBreakpoint<CSSProperties['borderRight']>;
  bBottom?: InBreakpoint<CSSProperties['borderBottom']>;
  bLeft?: InBreakpoint<CSSProperties['borderLeft']>;
  cursor?: InBreakpoint<CSSProperties['cursor']>;
  overflow?: InBreakpoint<CSSProperties['overflow']>;
  overflowX?: InBreakpoint<CSSProperties['overflowX']>;
  overflowY?: InBreakpoint<CSSProperties['overflowY']>;
  z?: InBreakpoint<CSSProperties['zIndex']>;
  transform?: InBreakpoint<CSSProperties['transform']>;
  transition?: InBreakpoint<CSSProperties['transition']>;
  tDuration?: InBreakpoint<CSSProperties['transitionDuration']>;
  tDelay?: InBreakpoint<CSSProperties['transitionDelay']>;
  tTimingFunction?: InBreakpoint<CSSProperties['transitionTimingFunction']>;
  tProperty?: InBreakpoint<CSSProperties['transitionProperty']>;
  animation?: InBreakpoint<CSSProperties['animation']>;
  fFamily?: InBreakpoint<CSSProperties['fontFamily']>;
  fSize?: InBreakpoint<CSSProperties['fontSize']>;
  weight?: InBreakpoint<CSSProperties['fontWeight']>;
  fLh?: InBreakpoint<CSSProperties['lineHeight']>;
  fLs?: InBreakpoint<CSSProperties['letterSpacing']>;
  fStyle?: InBreakpoint<CSSProperties['fontStyle']>;
  tAlign?: InBreakpoint<CSSProperties['textAlign']>;
  tDecoration?: InBreakpoint<CSSProperties['textDecoration']>;
  visibility?: InBreakpoint<CSSProperties['visibility']>;
  opacity?: InBreakpoint<CSSProperties['opacity']>;
  hoverBg?: InBreakpoint<CSSProperties['background']>;
  hoverTextColor?: InBreakpoint<CSSProperties['color']>;
  hoverTextDecoration?: InBreakpoint<CSSProperties['textDecoration']>;
  hoverBorder?: InBreakpoint<CSSProperties['border']>;
  hoverFilter?: InBreakpoint<CSSProperties['filter']>;
  hoverCursor?: InBreakpoint<CSSProperties['cursor']>;
  disabledBg?: InBreakpoint<CSSProperties['background']>;
  disabledTextColor?: InBreakpoint<CSSProperties['color']>;
  disabledTextDecoration?: InBreakpoint<CSSProperties['textDecoration']>;
  disabledBorder?: InBreakpoint<CSSProperties['border']>;
  disabledFilter?: InBreakpoint<CSSProperties['filter']>;
  disabledCursor?: InBreakpoint<CSSProperties['cursor']>;
}

export type CssHtmlProps<
  C extends keyof JSX.IntrinsicElements = 'div',
  Props extends CssProps = CssProps
> = StyledComponentProps<C, DefaultTheme, Props, never>;

export type ThemedCssProps = ThemedStyledProps<CssProps, DefaultTheme>;

const allBreakpoints: Breakpoint[] = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];

function getBreakpointFallbacks(bpOrigin: Breakpoint): Breakpoint | Breakpoint[] {
  const bpOriginIndex = allBreakpoints.indexOf(bpOrigin);
  return allBreakpoints.slice(bpOriginIndex, allBreakpoints.length);
}

function getBaseMapCssProps<P extends CssProps = CssProps>({
  defaultProps,
  props,
  theme,
  bpOrigin,
}: {
  defaultProps: P;
  props: P;
  theme: DefaultTheme;
  bpOrigin: Breakpoint;
}): CSSObject {
  const bp = getBreakpointFallbacks(bpOrigin);
  const { getValueInBp, fontBase } = theme;
  const dProps = defaultProps || {};
  return {
    width: getValueInBp(props.w || dProps.w, bp),
    maxWidth: getValueInBp(props.maxW || dProps.maxW, bp),
    minWidth: getValueInBp(props.minW || dProps.minW, bp),
    height: getValueInBp(props.h || dProps.h, bp),
    maxHeight: getValueInBp(props.maxH || dProps.maxH, bp),
    minHeight: getValueInBp(props.minH || dProps.minH, bp),
    padding: getValueInBp(props.p || dProps.p, bp),
    margin: getValueInBp(props.m || dProps.m, bp),
    background: getValueInBp(props.bg || dProps.bg, bp),
    backgroundColor: getValueInBp(props.bgColor || dProps.bgColor, bp),
    backgroundAttachment: getValueInBp(
      props.bgAttachment || dProps.bgAttachment,
      bp
    ),
    backgroundClip: getValueInBp(props.bgClip || dProps.bgClip, bp),
    backgroundImage: getValueInBp(props.bgImage || dProps.bgImage, bp),
    backgroundOrigin: getValueInBp(props.bgOrigin || dProps.bgOrigin, bp),
    backgroundPosition: getValueInBp(props.bgPos || dProps.bgPos, bp),
    backgroundRepeat: getValueInBp(props.bgRepeat || dProps.bgRepeat, bp),
    backgroundSize: getValueInBp(props.bgSize || dProps.bgSize, bp),
    color: getValueInBp(props.c || dProps.c, bp) || theme.colors.secondary,
    boxShadow: getValueInBp(props.shadow || dProps.shadow, bp),
    borderRadius: getValueInBp(props.r || dProps.r, bp),
    display: getValueInBp(props.d || dProps.d, bp),
    flexDirection: getValueInBp(props.fDir || dProps.fDir, bp),
    flexWrap: getValueInBp(props.fWrap || dProps.fWrap, bp),
    flex: getValueInBp(props.flex || dProps.flex, bp),
    alignItems: getValueInBp(props.fAlign || dProps.fAlign, bp),
    alignSelf: getValueInBp(props.fASelf || dProps.fASelf, bp),
    justifyContent: getValueInBp(props.fJustify || dProps.fJustify, bp),
    justifySelf: getValueInBp(props.fJSelf || dProps.fJSelf, bp),
    gap: getValueInBp(props.gap || dProps.gap, bp),
    gridTemplateColumns: getValueInBp(
      props.gTemplateColumns || dProps.gTemplateColumns,
      bp
    ),
    gridTemplateRows: getValueInBp(props.gTemplateRows || dProps.gTemplateRows, bp),
    gridAutoColumns: getValueInBp(props.gAutoColumns || dProps.gAutoColumns, bp),
    gridAutoRows: getValueInBp(props.gAutoRows || dProps.gAutoRows, bp),
    gridAutoFlow: getValueInBp(props.gAutoFlow || dProps.gAutoFlow, bp),
    position: getValueInBp(props.pos || dProps.pos, bp),
    top: getValueInBp(props.top || dProps.top, bp),
    right: getValueInBp(props.right || dProps.right, bp),
    bottom: getValueInBp(props.bottom || dProps.bottom, bp),
    left: getValueInBp(props.left || dProps.left, bp),
    border: getValueInBp(props.b || dProps.b, bp),
    borderTop: getValueInBp(props.bTop || dProps.bTop, bp),
    borderRight: getValueInBp(props.bRight || dProps.bRight, bp),
    borderBottom: getValueInBp(props.bBottom || dProps.bBottom, bp),
    borderLeft: getValueInBp(props.bLeft || dProps.bLeft, bp),
    cursor: getValueInBp(props.cursor || dProps.cursor, bp),
    overflow: getValueInBp(props.overflow || dProps.overflow, bp),
    overflowX: getValueInBp(props.overflowX || dProps.overflowX, bp),
    overflowY: getValueInBp(props.overflowY || dProps.overflowY, bp),
    zIndex: getValueInBp(props.z || dProps.z, bp),
    transform: getValueInBp(props.transform || dProps.transform, bp),
    transition: getValueInBp(props.transition || dProps.transition, bp),
    transitionDuration: getValueInBp(props.tDuration || dProps.tDuration, bp),
    transitionDelay: getValueInBp(props.tDelay || dProps.tDelay, bp),
    transitionTimingFunction: getValueInBp(
      props.tTimingFunction || dProps.tTimingFunction,
      bp
    ),
    transitionProperty: getValueInBp(props.tProperty || dProps.tProperty, bp),
    animation: getValueInBp(props.animation || dProps.animation, bp),
    fontFamily: getValueInBp(props.fFamily || dProps.fFamily, bp) || fontBase,
    fontSize: getValueInBp(props.fSize || dProps.fSize, bp),
    fontWeight: getValueInBp(props.weight || dProps.weight, bp),
    lineHeight: getValueInBp(props.fLh || dProps.fLh, bp),
    letterSpacing: getValueInBp(props.fLs || dProps.fLs, bp),
    fontStyle: getValueInBp(props.fStyle || dProps.fStyle, bp),
    textAlign: getValueInBp(props.tAlign || dProps.tAlign, bp),
    textDecoration: getValueInBp(props.tDecoration || dProps.tDecoration, bp),
    visibility: getValueInBp(props.visibility || dProps.visibility, bp),
    opacity: getValueInBp(props.opacity || dProps.opacity, bp),

    '&:hover': {
      background: getValueInBp(props.hoverBg || dProps.hoverBg, bp),
      color: getValueInBp(props.hoverTextColor || dProps.hoverTextColor, bp),
      textDecoration: getValueInBp(
        props.hoverTextDecoration || dProps.hoverTextDecoration,
        bp
      ),
      filter: getValueInBp(props.hoverFilter || dProps.hoverFilter, bp),
      cursor: getValueInBp(props.hoverCursor || dProps.hoverCursor, bp),
    },

    '&:disabled': {
      background: getValueInBp(props.disabledBg || dProps.disabledBg, bp),
      color: getValueInBp(props.disabledTextColor || dProps.disabledTextColor, bp),
      textDecoration: getValueInBp(
        props.disabledTextDecoration || dProps.disabledTextDecoration,
        bp
      ),
      filter: getValueInBp(props.disabledFilter || dProps.disabledFilter, bp),
      cursor: getValueInBp(props.disabledCursor || dProps.disabledCursor, bp),
    },
  };
}

export function injectDefaultProps<P extends ThemedCssProps = ThemedCssProps>(
  defaultProps?: Omit<P, 'theme'>
): (props: P) => CSSObject {
  const dProps = defaultProps || {};
  return ({ theme, ...props }) => ({
    ...getBaseMapCssProps({ defaultProps: dProps, props, theme, bpOrigin: 'xs' }),
    [theme.breakpoint('sm')]: getBaseMapCssProps({
      defaultProps: dProps,
      props,
      theme,
      bpOrigin: 'sm',
    }),
    [theme.breakpoint('md')]: getBaseMapCssProps({
      defaultProps: dProps,
      props,
      theme,
      bpOrigin: 'md',
    }),
    [theme.breakpoint('lg')]: getBaseMapCssProps({
      defaultProps: dProps,
      props,
      theme,
      bpOrigin: 'lg',
    }),
    [theme.breakpoint('xl')]: getBaseMapCssProps({
      defaultProps: dProps,
      props,
      theme,
      bpOrigin: 'xl',
    }),
    [theme.breakpoint('xxl')]: getBaseMapCssProps({
      defaultProps: dProps,
      props,
      theme,
      bpOrigin: 'xxl',
    }),
  });
}

export const mapCssProps = injectDefaultProps();
