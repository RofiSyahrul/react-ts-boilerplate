import { Property as Css } from 'csstype';
import {
  system,
  ResponsiveValue,
  compose,
  ZIndexName,
  ColorName,
} from '@styled-system/core';
import { defaultTheme } from '@styles/theme';

import { getValue } from './core';

export interface WidthProps {
  w?: ResponsiveValue<Css.Width<number> | true>;
  maxW?: ResponsiveValue<Css.MaxWidth<number> | true>;
  minW?: ResponsiveValue<Css.MinWidth<number> | true>;
  s?: ResponsiveValue<Css.Width<number> | true>;
}

export interface HeightProps {
  h?: ResponsiveValue<Css.Height<number> | true>;
  maxH?: ResponsiveValue<Css.MaxHeight<number> | true>;
  minH?: ResponsiveValue<Css.MinHeight<number> | true>;
}

export interface SpacingProps {
  p?: ResponsiveValue<Css.Padding<number>>;
  m?: ResponsiveValue<Css.Margin<number>>;
}

export interface OverflowProps {
  overflow?: ResponsiveValue<Css.Overflow>;
  overflowX?: ResponsiveValue<Css.OverflowX>;
  overflowY?: ResponsiveValue<Css.OverflowY>;
  /**
   * **overflow-wrap**
   *
   * The **overflow-wrap** CSS property applies to inline elements, setting whether
   * the browser should insert line breaks within an otherwise unbreakable string
   * to prevent text from overflowing its line box.
   *
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap)
   */
  overflowWrap?: ResponsiveValue<Exclude<Css.OverflowWrap, 'anywhere'>>;
  /**
   * **hyphens**
   *
   * The **hyphens** CSS property specifies how words should be hyphenated when
   * text wraps across multiple lines. It can prevent hyphenation entirely, hyphenate at
   * manually-specified points within the text, or let the browser automatically insert
   * hyphens where appropriate.
   *
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/hyphens#Suggesting_line_break_opportunities)
   *
   * [Suggesting line break opportunities](https://developer.mozilla.org/en-US/docs/Web/CSS/hyphens#Suggesting_line_break_opportunities):
   * `&hyphen;` | `&shy;`
   */
  hyphens?: ResponsiveValue<Css.Hyphens>;
}

export interface DisplayProps {
  d?: ResponsiveValue<Css.Display>;
  vAlign?: ResponsiveValue<Css.VerticalAlign>;
  visibility?: ResponsiveValue<Css.Visibility>;
  float?: ResponsiveValue<Css.Float>;
  order?: ResponsiveValue<Css.Order>;
  /**
   * **writing-mode**
   *
   * The **writing-mode** CSS property sets whether lines of text are laid
   * out horizontally or vertically, as well as the direction in which
   * blocks progress. When set for an entire document, it should be set on
   * the root element (html element for HTML documents).
   *
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode)
   */
  writingMode?: ResponsiveValue<Css.WritingMode>;
  /**
   * **widows**
   *
   * The **widows** CSS property sets the minimum number of lines in a
   * block container that must be shown at the top of a page, region, or
   * column.
   *
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/widows)
   * */
  widows?: ResponsiveValue<Css.Widows>;
  /**
   * **orphans**
   *
   * The orphans CSS property sets the minimum number of lines in a block
   * container that must be shown at the bottom of a page, region, or
   * column.
   *
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/orphans)
   */
  orphans?: ResponsiveValue<Css.Orphans>;
}

export interface PositionProps {
  pos?: ResponsiveValue<Css.Position>;
  top?: ResponsiveValue<Css.Top<number>>;
  right?: ResponsiveValue<Css.Right<number>>;
  bottom?: ResponsiveValue<Css.Bottom<number>>;
  left?: ResponsiveValue<Css.Left<number>>;
  z?: ResponsiveValue<Css.ZIndex | ZIndexName>;
}

export interface ColumnProps {
  /**
   * **columns**
   *
   * The **columns** CSS shorthand property sets the number of columns to use
   * when drawing an element's contents, as well as those columns' widths.
   *
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/column)
   */
  columns?: ResponsiveValue<Css.Columns>;
  /**
   * **column-count**
   *
   * The **column-count** CSS property breaks an element's content into the
   * specified number of columns.
   *
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/column-count)
   */
  colCount?: ResponsiveValue<Css.ColumnCount>;
  /**
   * **column-gap**
   *
   * The **column-gap** CSS property sets the size of the gap (gutter) between
   * an element's columns.
   *
   * [MDC](https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap)
   */
  colGap?: ResponsiveValue<Css.ColumnGap>;
  colRule?: ResponsiveValue<Css.ColumnRule>;
  colRuleC?: ResponsiveValue<Css.ColumnRuleColor | ColorName>;
  colRuleS?: ResponsiveValue<Css.ColumnRuleStyle>;
  colRuleW?: ResponsiveValue<Css.ColumnRuleWidth>;
  colSpan?: ResponsiveValue<Css.ColumnSpan>;
  colWidth?: ResponsiveValue<Css.ColumnWidth>;
}

export interface LayoutProps
  extends WidthProps,
    HeightProps,
    SpacingProps,
    OverflowProps,
    DisplayProps,
    PositionProps,
    ColumnProps {}

export const width = system<WidthProps>({
  w: { property: 'width', transform: getValue },
  maxW: { property: 'maxWidth', transform: getValue },
  minW: { property: 'minWidth', transform: getValue },
  s: { properties: ['width', 'height'], transform: getValue },
});

export const height = system<HeightProps>({
  h: { property: 'height', transform: getValue },
  maxH: { property: 'maxHeight', transform: getValue },
  minH: { property: 'minHeight', transform: getValue },
});

export const spacing = system<SpacingProps>({
  p: { property: 'padding' },
  m: { property: 'margin' },
});

export const overflow = system<OverflowProps>({
  overflow: true,
  overflowX: true,
  overflowY: true,
  overflowWrap: true,
  hyphens: true,
});

export const display = system<DisplayProps>({
  d: { property: 'display' },
  vAlign: { property: 'verticalAlign' },
  order: { properties: ['order', 'msOrder', 'WebkitOrder'] },
  visibility: true,
  float: true,
  writingMode: true,
  widows: true,
  orphans: true,
});

export const position = system<PositionProps>({
  pos: { property: 'position' },
  top: { property: 'top', transform: getValue },
  right: { property: 'right', transform: getValue },
  bottom: { property: 'bottom', transform: getValue },
  left: { property: 'left', transform: getValue },
  z: { property: 'zIndex', scale: 'zIndex', defaultScale: defaultTheme.zIndex },
});

export const column = system<ColumnProps>({
  columns: true,
  colCount: { property: 'columnCount' },
  colGap: { properties: ['columnGap', 'MozColumnGap', 'WebkitColumnGap'] },
  colRule: { property: 'columnRule' },
  colRuleC: {
    property: 'columnRuleColor',
    scale: 'colors',
    defaultScale: defaultTheme.colors,
  },
  colRuleS: { property: 'columnRuleStyle' },
  colRuleW: { property: 'columnRuleWidth' },
  colSpan: { property: 'columnSpan' },
  colWidth: { property: 'columnWidth' },
});

export const layout = compose<LayoutProps>(
  width,
  height,
  spacing,
  overflow,
  display,
  position,
  column
);
