import styled, { CSSObject, StyledComponentPropsWithAs } from 'styled-components';
import { compose, merge } from '@styled-system/core';
import {
  BorderProps,
  FlexboxProps,
  GridProps,
  InteractionProps,
  LayoutProps,
  MotionProps,
  PaletteProps,
  TypographyProps,
  TransformProps,
  ColorProps,
  OverflowProps,
  SpacingProps,
  DisplayProps,
  TransitionProps,
  ScrollbarProps,
  border,
  flexbox,
  grid,
  interaction,
  layout,
  motion,
  palette,
  typography,
  color,
  transform,
  overflow,
  spacing,
  display,
  transition,
  scrollbar,
} from 'src/@systems';

interface HoverProps extends BorderProps, ColorProps, TransformProps, LayoutProps {}

export interface DivStyledProps
  extends BorderProps,
    FlexboxProps,
    GridProps,
    InteractionProps,
    LayoutProps,
    MotionProps,
    PaletteProps,
    ScrollbarProps {
  hoverProps?: HoverProps;
}

export type DivProps = StyledComponentPropsWithAs<'div', DivStyledProps>;

const divStyleFn = compose(
  border,
  flexbox,
  grid,
  interaction,
  layout,
  motion,
  palette
);

const hoverStyleFn = compose(border, color, transform, layout);

export const Div = styled.div<DivStyledProps>(
  ({
    hoverProps = {},
    d = 'flex',
    customScrollbar,
    scrollbarBg,
    scrollbarBtnC,
    scrollbarBtnHoverC,
    scrollbarC,
    scrollbarH,
    scrollbarRadius,
    scrollbarW,
    ...props
  }) => {
    const baseStyle = divStyleFn({ d, ...props });
    const customStyle: CSSObject = {
      ':hover': hoverStyleFn(hoverProps),
      ...scrollbar({
        customScrollbar: customScrollbar || props.overflow === 'scroll',
        scrollbarBg,
        scrollbarBtnC,
        scrollbarBtnHoverC,
        scrollbarC,
        scrollbarH,
        scrollbarRadius,
        scrollbarW,
      }),
    };
    return merge(baseStyle, customStyle);
  }
);

export interface TextStyledProps
  extends TypographyProps,
    SpacingProps,
    ColorProps,
    OverflowProps,
    Pick<DisplayProps, 'd'> {}

export type TextProps = StyledComponentPropsWithAs<'p', TextStyledProps>;

const textStyleFn = compose(typography, spacing, color, overflow, display);

export const Text = styled.p<TextStyledProps>(
  ({ c = 'cyan0', tVariant = 'body1', ...props }) =>
    textStyleFn({ c, tVariant, fFamily: props.theme?.fontBase, ...props })
);

interface BackdropStyledProps
  extends LayoutProps,
    FlexboxProps,
    ColorProps,
    TransitionProps {
  isOpen: boolean;
}

export type BackdropContainerProps = StyledComponentPropsWithAs<
  'div',
  BackdropStyledProps
>;

const backdropStyleFn = compose(layout, flexbox, color, transition);

export const BackdropContainer = styled.div<BackdropStyledProps>(
  ({
    isOpen,
    d = 'flex',
    pos = 'fixed',
    left = '0px',
    top = '0px',
    fJustify = 'center',
    fAlign = 'center',
    w = '100vw',
    h = '100vh',
    overflow: o = 'hidden',
    bg = 'black1',
    bgAlpha = 0.7,
    tProperty = 'all',
    tDuration = 500,
    tTimingFunc = 'ease-in',
    ...props
  }) => {
    return backdropStyleFn({
      d,
      pos,
      left,
      top,
      fJustify,
      fAlign,
      w,
      h,
      overflow: o,
      bg,
      bgAlpha,
      tProperty,
      tDuration,
      tTimingFunc,
      visibility: isOpen ? 'visible' : 'hidden',
      opacity: isOpen ? 1 : 0,
      z: isOpen ? 'backdrop' : -1,
      ...props,
    });
  }
);

export const Backdrop = styled.div<Omit<BackdropStyledProps, 'isOpen'>>(
  ({
    d = 'flex',
    pos = 'absolute',
    top = '0px',
    left = '0px',
    w = '100%',
    h = '100%',
    bg = 'transparent',
    ...props
  }) => backdropStyleFn({ d, pos, top, left, w, h, bg, ...props })
);
