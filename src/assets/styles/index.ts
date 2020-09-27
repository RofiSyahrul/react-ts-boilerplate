import { createGlobalStyle } from 'styled-components';
import { ScrollbarProps, scrollbarWithPrefix } from 'src/@systems/scrollbar';
import fontFace from './font-face';

export const GlobalStyle = createGlobalStyle<ScrollbarProps>`
  ${fontFace}

  html {
    font-size: 14px;
    ${({ theme }) => `
      ${theme.breakpoint('md')} {
        font-size: 14.5px;
      }
      ${theme.breakpoint('lg')} {
        font-size: 15px;
      }
      ${theme.breakpoint('xl')} {
        font-size: 16px;
      }
    `}
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  * {
    color: inherit;
    font-family: '${props => props.theme.fontBase || 'Baloo Tamma'}';
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  p {
    margin: 0;
    color: inherit;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0px;
    width: 100%;
    padding: 0px auto;
    background: ${props => props.theme.colors.black0};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 0;
    height: 0;
  }

  input:focus,
  textarea:focus,
  button:focus {
    outline: none;
  }

  input[type='button' i],
  input[type='submit' i],
  input[type='reset' i],
  input[type='file' i]::-webkit-file-upload-button,
  input {
    -webkit-appearance: none;
    background-color: white;
    -webkit-rtl-ordering: logical;
    cursor: text;
    padding: 0;
    border: none;
  }

  ${scrollbarWithPrefix('.scroll')}

  *:focus {
    outline: none;
    filter: none !important;
  }

  button {
    padding: 0;
    border-color: transparent;
    border-image: none;
    cursor: pointer;
    text-align: center;
  }

  button:hover:not(:disabled) {
    filter: brightness(0.8);
  }

  @media (hover: none) {
    button:hover:not(:disabled) {
      filter: none;
    }
  }
`;
