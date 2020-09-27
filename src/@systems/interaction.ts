import { Property as Css } from 'csstype';
import { ResponsiveValue, system } from '@styled-system/core';

export interface InteractionProps {
  cursor?: ResponsiveValue<Css.Cursor>;
  pointerEvents?: ResponsiveValue<Css.PointerEvents>;
  resize?: ResponsiveValue<Css.Resize>;
}

export const interaction = system<InteractionProps>({
  cursor: true,
  pointerEvents: true,
  resize: true,
});
