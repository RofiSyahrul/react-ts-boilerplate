import React from 'react';
import { keyframes } from 'styled-components';

import { Svg, SvgProps } from './basics';

const SIZE = 44;

const circularRotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const circularDash = keyframes`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0px;
  }
  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }
  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`;

export interface SpinnerProps extends SvgProps {
  cTrail?: SvgProps['c'];
  thickness?: number;
}

const Spinner = React.memo(
  React.forwardRef<SVGSVGElement, SpinnerProps>(
    (
      {
        c = 'cyan0',
        cTrail = 'cyan4',
        thickness = 3.6,
        s = '150px',
        id = `spinner-${Date.now()}`,
        ...props
      },
      ref
    ) => {
      return (
        <Svg
          ref={ref}
          c={c}
          s={`calc(2*${s}/3)`}
          id={id}
          viewBox={`${SIZE / 2} ${SIZE / 2} ${SIZE} ${SIZE}`}
          d='inline-block'
          aName={circularRotate}
          aDuration='1.4s'
          aTimingFunc='ease-in'
          aIterCount='infinite'
          {...props}
        >
          <Svg
            as='circle'
            cx={SIZE}
            cy={SIZE}
            r={(SIZE - thickness) / 2}
            strokeWidth={thickness}
            fill='transparent'
            strokeDasharray='0'
            svgStroke={cTrail}
          />
          <Svg
            as='circle'
            cx={SIZE}
            cy={SIZE}
            r={(SIZE - thickness) / 2}
            strokeWidth={thickness}
            fill='transparent'
            stroke='currentColor'
            strokeDasharray='80px, 200px'
            strokeDashoffset='0px'
            aName={circularDash}
            aDuration='2s'
            aTimingFunc='ease-in-out'
            aIterCount='infinite'
          />
        </Svg>
      );
    }
  )
);

export default Spinner;
