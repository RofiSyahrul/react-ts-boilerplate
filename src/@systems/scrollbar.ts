import { Property as Css } from 'csstype';
import { CSSObject } from 'styled-components';
import { ColorName, StyleFnBase, system } from '@styled-system/core';
import { defaultTheme } from '@styles/theme';

export interface ScrollbarProps {
  customScrollbar?: boolean;
  scrollbarW?: Css.Width;
  scrollbarH?: Css.Height;
  scrollbarBg?: Css.BackgroundColor | ColorName;
  scrollbarC?: Css.Color | ColorName;
  scrollbarBtnC?: Css.BorderColor | ColorName;
  scrollbarBtnHoverC?: Css.BorderColor | ColorName;
  scrollbarRadius?: Css.BorderRadius;
}

const { colors } = defaultTheme;

const scrollbarStyleFn = system<ScrollbarProps>({
  customScrollbar() {},
  scrollbarW: { property: 'width' },
  scrollbarH: { property: 'height' },
  scrollbarBg: {
    property: 'backgroundColor',
    scale: 'colors',
    defaultScale: colors,
  },
  scrollbarC: { property: 'color', scale: 'colors', defaultScale: colors },
  scrollbarBtnC: { property: 'borderColor', scale: 'colors', defaultScale: colors },
  scrollbarBtnHoverC: {
    property: 'borderInlineColor',
    scale: 'colors',
    defaultScale: colors,
  },
  scrollbarRadius: { property: 'borderRadius' },
});

type ScrollbarBtnDir = 'up' | 'right' | 'down' | 'left';
const scrollbarBtnDirs: ScrollbarBtnDir[] = ['up', 'right', 'down', 'left'];

function getScrollbarBtnStyles(
  dir: ScrollbarBtnDir,
  c?: string,
  w?: string
): CSSObject | undefined {
  if (!c && !w) return;
  const idx = scrollbarBtnDirs.indexOf(dir);
  const cIdx = (idx + 2) % 4;
  return {
    borderWidth: w
      ? scrollbarBtnDirs.map((_, i) => (i === idx ? '0px' : w)).join(' ')
      : '',
    borderColor: c
      ? scrollbarBtnDirs
          .map<Css.BorderColor>((_, i) => (i === cIdx ? c : 'transparent'))
          .join(' ')
      : '',
  };
}

export const scrollbar: StyleFnBase<ScrollbarProps> = ({
  customScrollbar,
  scrollbarBg = 'white0',
  scrollbarC = 'blue0',
  scrollbarW = '10px',
  scrollbarH = '24px',
  scrollbarRadius = '8px',
  scrollbarBtnC = 'blue0',
  scrollbarBtnHoverC = 'cyan4',
}) => {
  if (!customScrollbar) return;

  const baseStyle = scrollbarStyleFn({
    scrollbarBg,
    scrollbarC,
    scrollbarBtnC,
    scrollbarW,
    scrollbarH,
    scrollbarRadius,
    scrollbarBtnHoverC,
  });

  const {
    width,
    height,
    backgroundColor,
    color,
    borderColor: btnC,
    borderInlineColor: btnHovC,
    borderRadius,
  } = baseStyle || {};

  const h = `min(calc(${width} + 4px), 16px)`;
  const btnW = `calc(${width}/2)`;
  const btnH = `calc(${h}/2)`;
  const btnUp = getScrollbarBtnStyles('up', btnC, btnW);
  const btnDown = getScrollbarBtnStyles('down', btnC, btnW);
  const btnLeft = getScrollbarBtnStyles('left', btnC, btnH);
  const btnRight = getScrollbarBtnStyles('right', btnC, btnH);
  const btnHovUp = getScrollbarBtnStyles('up', btnHovC);
  const btnHovDown = getScrollbarBtnStyles('down', btnHovC);
  const btnHovLeft = getScrollbarBtnStyles('left', btnHovC);
  const btnHovRight = getScrollbarBtnStyles('right', btnHovC);

  return {
    scrollbarColor: `${backgroundColor} ${color}`,
    scrollbarWidth: 'auto',
    '::-webkit-scrollbar': {
      width,
      height: h,
    },
    '::-webkit-scrollbar-track': {
      backgroundColor,
    },
    '::-webkit-scrollbar-thumb': {
      height,
      backgroundColor: color,
      borderRadius,
    },
    '::-webkit-scrollbar-button:single-button': {
      backgroundColor,
      display: 'block',
      borderStyle: 'solid',
      width,
      height: h,
    },
    '::-webkit-scrollbar-button:single-button:vertical:decrement': btnUp,
    '::-webkit-scrollbar-button:single-button:vertical:decrement:hover': btnHovUp,
    '::-webkit-scrollbar-button:single-button:vertical:increment': btnDown,
    '::-webkit-scrollbar-button:single-button:vertical:increment:hover': btnHovDown,
    '::-webkit-scrollbar-button:single-button:horizontal:decrement': btnLeft,
    '::-webkit-scrollbar-button:single-button:horizontal:decrement:hover': btnHovLeft,
    '::-webkit-scrollbar-button:single-button:horizontal:increment': btnRight,
    '::-webkit-scrollbar-button:single-button:horizontal:increment:hover': btnHovRight,
  };
};

export const scrollbarWithPrefix = (
  prefix: string
): StyleFnBase<ScrollbarProps> => props => {
  const scrollbarStyle = scrollbar({ customScrollbar: true, ...props });
  const { scrollbarColor, scrollbarWidth, ...pseudos } = scrollbarStyle || {};
  const style: CSSObject = { [prefix]: { scrollbarColor, scrollbarWidth } };
  return Object.keys(pseudos).reduce((obj, key) => {
    obj[`${prefix}${key}`] = pseudos[key];
    return obj;
  }, style);
};
