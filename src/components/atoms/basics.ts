import styled from 'styled-components';
import { injectDefaultProps, CssProps } from '@utils/map-css-props';

export const Div = styled.div(
  injectDefaultProps({ d: 'flex', fDir: 'column', pos: 'static' })
);

export const Text = styled.p(injectDefaultProps({ fLh: 1.2 }));

interface BackdropContainerProps extends CssProps {
  isOpen: boolean;
}

export const BackdropContainer = styled.div<BackdropContainerProps>(
  ({ isOpen, ...props }) => ({
    ...injectDefaultProps({
      d: 'flex',
      pos: 'fixed',
      left: '0px',
      top: '0px',
      fJustify: 'center',
      fAlign: 'center',
      w: '100vw',
      h: '100vh',
      overflow: 'hidden',
      bg: props.theme.colors.backdrop,
      tProperty: 'opacity',
      tDuration: '0.5s',
      tTimingFunction: 'ease-in',
    })(props),
    visibility: isOpen ? 'visible' : 'hidden',
    opacity: isOpen ? 1 : 0,
    zIndex: isOpen ? 10001 : -1,
  })
);

export const Backdrop = styled.div(
  injectDefaultProps({
    d: 'flex',
    pos: 'absolute',
    top: '0px',
    left: '0px',
    w: '100%',
    h: '100%',
    bg: 'transparent',
  })
);
