import { createGlobalStyle } from 'styled-components'
import { weight } from './variables'

const GlobalStyle = createGlobalStyle`
  a {
    text-decoration: none;
    word-break: break-word;
  }

  h1,
  h2,
  h3,
  h4 {
    margin: 0;
    font-weight: ${weight.Bold};
  }

  button {
    outline: none;
    border: none;
    cursor: pointer;
    background-color: transparent;
  }
`

export default GlobalStyle
