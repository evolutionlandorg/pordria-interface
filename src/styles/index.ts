import { createGlobalStyle } from 'styled-components'
import { size } from './variables'

const GlobalStyle = createGlobalStyle`
  body {
    font-size: ${size.base}px;
    margin: 0;
    font-family:
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    text-decoration: none;
    word-break: break-word;
  }

  h1,
  h2,
  h3,
  h4 {
    margin: 0;
    font-weight: 700;
  }

  button {
    outline: none;
    border: none;
    cursor: pointer;
    background-color: transparent;
  }
`

export default GlobalStyle
