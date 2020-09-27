import { Property as Css } from 'csstype';
import {
  system,
  ResponsiveValue,
  compose,
  TransformFn,
  get,
} from '@styled-system/core';
import { isNumber } from './core';

export interface TransformProps {
  transform?: ResponsiveValue<Css.Transform>;
  transformBox?: ResponsiveValue<Css.TransformBox>;
  transformOrigin?: ResponsiveValue<Css.TransformOrigin<number>>;
  transformStyle?: ResponsiveValue<Css.TransformStyle>;
}

export interface TransitionProps {
  transition?: ResponsiveValue<Css.Transition>;
  tDelay?: ResponsiveValue<Css.TransitionDelay | number>;
  tDuration?: ResponsiveValue<Css.TransitionDuration | number>;
  tProperty?: ResponsiveValue<Css.TransitionProperty>;
  tTimingFunc?: ResponsiveValue<Css.TransitionTimingFunction>;
}

export interface AnimationProps {
  animation?: ResponsiveValue<Css.Animation>;
  aDelay?: ResponsiveValue<Css.AnimationDelay | number>;
  aDir?: ResponsiveValue<Css.AnimationDirection>;
  aDuration?: ResponsiveValue<Css.AnimationDuration | number>;
  aFillMode?: ResponsiveValue<Css.AnimationFillMode | number>;
  aIterCount?: ResponsiveValue<Css.AnimationIterationCount>;
  aName?: ResponsiveValue<Css.AnimationName>;
  aPlayState?: ResponsiveValue<Css.AnimationPlayState>;
  aTimingFunc?: ResponsiveValue<Css.AnimationTimingFunction>;
}

export interface MotionProps
  extends TransformProps,
    TransitionProps,
    AnimationProps {}

const getTime: TransformFn = (n, scale) => get(scale, n, isNumber(n) ? `${n}ms` : n);

export const transform = system<TransformProps>({
  transform: true,
  transformBox: true,
  transformOrigin: true,
  transformStyle: true,
});

export const transition = system<TransitionProps>({
  transition: true,
  tDelay: { property: 'transitionDelay', transform: getTime },
  tDuration: { property: 'transitionDuration', transform: getTime },
  tProperty: { property: 'transitionProperty' },
  tTimingFunc: { property: 'transitionTimingFunction' },
});

export const animation = system<AnimationProps>({
  animation: true,
  aDelay: { property: 'animationDelay', transform: getTime },
  aDir: { property: 'animationDirection' },
  aDuration: { property: 'animationDuration', transform: getTime },
  aFillMode: { property: 'animationFillMode' },
  aIterCount: { property: 'animationIterationCount' },
  aName: { property: 'animationName' },
  aPlayState: { property: 'animationPlayState' },
  aTimingFunc: { property: 'animationTimingFunction' },
});

export const motion = compose<MotionProps>(transform, transition, animation);
