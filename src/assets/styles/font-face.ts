import { css } from 'styled-components';

import FontBaseBoldEot from '../fonts/baloo-tamma-2-700.eot';
import FontBaseBoldTtf from '../fonts/baloo-tamma-2-700.ttf';
import FontBaseBoldWoff from '../fonts/baloo-tamma-2-700.woff';
import FontBaseBoldWoff2 from '../fonts/baloo-tamma-2-700.woff2';
import FontBaseRegularEot from '../fonts/baloo-tamma-2-regular.eot';
import FontBaseRegularTtf from '../fonts/baloo-tamma-2-regular.ttf';
import FontBaseRegularWoff from '../fonts/baloo-tamma-2-regular.woff';
import FontBaseRegularWoff2 from '../fonts/baloo-tamma-2-regular.woff2';

const fontFace = css`
  @font-face {
    font-family: 'Baloo Tamma';
    font-style: normal;
    font-display: swap;
    font-weight: 400;
    font-weight: normal;
    src: url(${FontBaseRegularEot});
    src: url(${FontBaseRegularWoff2}), url(${FontBaseRegularWoff2}) format('woff2'),
      url(${FontBaseRegularWoff}) format('woff'),
      url(${FontBaseRegularTtf}) format('truetype'),
      url(${FontBaseRegularEot}?#iefix) format('embedded-opentype');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
      U+FEFF, U+FFFD;
  }

  @font-face {
    font-family: 'Baloo Tamma';
    font-style: normal;
    font-display: swap;
    font-weight: 700;
    font-weight: bold;
    font-weight: 600;
    font-weight: 500;
    src: url(${FontBaseBoldEot});
    src: url(${FontBaseBoldWoff2}), url(${FontBaseBoldWoff2}) format('woff2'),
      url(${FontBaseBoldWoff}) format('woff'),
      url(${FontBaseBoldTtf}) format('truetype'),
      url(${FontBaseBoldEot}?#iefix) format('embedded-opentype');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
      U+FEFF, U+FFFD;
  }
`;

export default fontFace;
