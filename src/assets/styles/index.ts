import { createGlobalStyle } from 'styled-components';
import fontFace from './font-face';

export const GlobalStyle = createGlobalStyle`
  ${fontFace}

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
    background: ${props => props.theme.colors.background};
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

  .scroll::-webkit-scrollbar-track {
    width: 6px;
    border-radius: 3px;
    background-color: ${props => props.theme.colors.white};
  }
  .scroll::-webkit-scrollbar {
    width: 6px;
  }
  .scroll::-webkit-scrollbar-thumb {
    width: 6px;
    height: 20%;
    border-radius: 3px;
    background-color: ${props => props.theme.colors.primary};
  }

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

export * from './theme';
