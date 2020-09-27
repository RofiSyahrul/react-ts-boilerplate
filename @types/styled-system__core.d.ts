/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '@styled-system/core' {
  import { Properties } from 'csstype';
  import { CSSObject, DefaultTheme as Theme } from 'styled-components';

  export type ScaleName = Exclude<keyof Theme, 'breakpoint' | 'fontBase'>;

  export type ColorName = keyof Theme['colors'];
  export type ShadowName = keyof Theme['shadows'];
  export type TypographyVariant = keyof Theme['typography'];
  export type TypographyVariantConfig = Theme['typography'];
  export type ZIndexName = keyof Theme['zIndex'];

  export function get(obj: any, ...paths: Array<string | number>): any;

  export type ObjectOrArray<T, K extends keyof any = keyof any> =
    | T[]
    | Record<K, T | Record<K, T> | T[]>;

  export type Scale = ObjectOrArray<number | string | Record<string, any>>;

  export type ResponsiveValue<T> =
    | T
    | null
    | { [key in keyof Required<Theme>['breakpoints']]?: T };

  export type TransformFn<P extends Record<string, any> = Record<string, any>> = (
    value?: any,
    scale?: any,
    props?: P
  ) => CSSObject[string];

  export interface SxFn<P extends Record<string, any> = Record<string, any>> {
    (value?: any, scale?: any, props?: P & { theme: Theme }):
      | CSSObject
      | void
      | undefined;
    scale?: ScaleName;
    defaultScale?: Scale;
  }

  export interface StyleFnBase<P extends Record<string, any>> {
    (props: Partial<P>): CSSObject | undefined;
    readonly config?: SxFn<P>;
    readonly propNames?: (keyof P)[];
    readonly cache?: { breakpoints?: Theme['breakpoints']; media?: string[] };
  }

  export type StyleFnObject<P extends Record<string, any>> = Partial<
    {
      readonly [K in Exclude<keyof P, 'config'>]: StyleFnBase<Record<K, P[K]>>;
    }
  >;

  export type StyleFn<P extends Record<string, any>> = StyleFnBase<P> &
    StyleFnObject<P>;

  export interface ConfigStyle<P extends Record<string, any>> {
    /** The CSS property to use in the returned style object (overridden by `properties` if present). */
    property?: keyof Properties;
    /**
     * An array of multiple properties (e.g. `['marginLeft', 'marginRight']`) to which this style's value will be
     * assigned (overrides `property` when present).
     */
    properties?: (keyof Properties)[];
    /** A string referencing a key in the `theme` object. */
    scale?: ScaleName;
    /** A fallback scale object for when there isn't one defined in the `theme` object. */
    defaultScale?: Scale;
    /** A function to transform the raw value based on the scale. */
    transform?: TransformFn<P>;
  }

  export type Config<P extends Record<string, any>> = Required<
    {
      [K in keyof P]: K extends keyof Properties
        ? ConfigStyle<P> | true | SxFn<P>
        : ConfigStyle<P> | SxFn<P>;
    }
  >;

  export function system<P>(config: Config<P>): StyleFn<P>;

  export function compose<A, B>(a: StyleFn<A>, b: StyleFn<B>): StyleFn<A & B>;
  export function compose<A, B, C>(
    a: StyleFn<A>,
    b: StyleFn<B>,
    c: StyleFn<C>
  ): StyleFn<A & B & C>;
  export function compose<A, B, C, D>(
    a: StyleFn<A>,
    b: StyleFn<B>,
    c: StyleFn<C>,
    d: StyleFn<D>
  ): StyleFn<A & B & C & D>;
  export function compose<A, B, C, D, E>(
    a: StyleFn<A>,
    b: StyleFn<B>,
    c: StyleFn<C>,
    d: StyleFn<D>,
    e: StyleFn<E>
  ): StyleFn<A & B & C & D & E>;
  export function compose<A, B, C, D, E, F>(
    a: StyleFn<A>,
    b: StyleFn<B>,
    c: StyleFn<C>,
    d: StyleFn<D>,
    e: StyleFn<E>,
    f: StyleFn<F>
  ): StyleFn<A & B & C & D & E & F>;
  export function compose<A, B, C, D, E, F, G>(
    a: StyleFn<A>,
    b: StyleFn<B>,
    c: StyleFn<C>,
    d: StyleFn<D>,
    e: StyleFn<E>,
    f: StyleFn<F>,
    g: StyleFn<G>
  ): StyleFn<A & B & C & D & E & F & G>;
  export function compose<P>(...parsers: StyleFn<P>[]): StyleFn<P>;

  export function createStyleFunction<P>(args: ConfigStyle<P>): SxFn<P>;

  export function createParser<P>(
    config: Partial<{ [K in keyof P]: SxFn<P> }>
  ): StyleFn<P>;

  export function merge(a: any, b: any): any;
}
