import { createGlobalStyle } from 'styled-components'
import OSCAfont from './assets/fonts/osca.woff2'

let GlobalStyle = createGlobalStyle`
  @font-face {
     font-family: 'osca';
     src: url(${OSCAfont});
  }
  body {
    margin: 0;
    padding: 0;
    background: #000;
    font-family: 'osca', Arial, Helvetica, Sans-Serif;
    color: ${ ({theme}: any) => theme.CLR_cold}
  }
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  ul {
    list-style-type: none;
  }
  svg {
    width: 100%;
    height: 100%;
    fill: ${ ({theme}: any) => theme.CLR_cold}
  }
`;

export default GlobalStyle;