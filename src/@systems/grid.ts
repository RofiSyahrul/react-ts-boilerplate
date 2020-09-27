import { Property as Css } from 'csstype';
import { system, ResponsiveValue } from '@styled-system/core';

export interface GridProps {
  gap?: ResponsiveValue<Css.Gap<number>>;
  gArea?: ResponsiveValue<Css.GridArea>;
  gAutoCols?: ResponsiveValue<Css.GridAutoColumns<number>>;
  gAutoRows?: ResponsiveValue<Css.GridAutoRows<number>>;
  gAutoFlow?: ResponsiveValue<Css.GridAutoFlow>;
  gTemp?: ResponsiveValue<Css.GridTemplate>;
  gTempAreas?: ResponsiveValue<Css.GridTemplateAreas>;
  gTempCols?: ResponsiveValue<Css.GridTemplateColumns<number>>;
  gTempRows?: ResponsiveValue<Css.GridTemplateRows<number>>;
  gCol?: ResponsiveValue<Css.GridColumn>;
  gColStart?: ResponsiveValue<Css.GridColumnStart>;
  gColEnd?: ResponsiveValue<Css.GridColumnEnd>;
  gColGap?: ResponsiveValue<Css.GridColumnGap>;
  gRow?: ResponsiveValue<Css.GridRow>;
  gRowStart?: ResponsiveValue<Css.GridRowStart>;
  gRowEnd?: ResponsiveValue<Css.GridRowEnd>;
  gRowGap?: ResponsiveValue<Css.GridRowGap>;
}

export const grid = system<GridProps>({
  gap: true,
  gArea: { property: 'gridArea' },
  gAutoCols: { property: 'gridAutoColumns' },
  gAutoFlow: { property: 'gridAutoFlow' },
  gAutoRows: { property: 'gridAutoRows' },
  gCol: { property: 'gridColumn' },
  gColEnd: { property: 'gridColumnEnd' },
  gColGap: { property: 'gridColumnGap' },
  gColStart: { property: 'gridColumnStart' },
  gRow: { property: 'gridRow' },
  gRowEnd: { property: 'gridRowEnd' },
  gRowGap: { property: 'gridRowGap' },
  gRowStart: { property: 'gridRowStart' },
  gTemp: { property: 'gridTemplate' },
  gTempCols: { property: 'gridTemplateColumns' },
  gTempRows: { property: 'gridTemplateRows' },
  gTempAreas: { property: 'gridTemplateAreas' },
});
