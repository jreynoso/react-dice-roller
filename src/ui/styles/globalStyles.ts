import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  :root {
    --bg: #f7f3ea;
    --ink: #1b1a17;
    --accent: #d9712a;
    --panel: #ffffff;
    --border: #e6dfd2;
    --shadow: 0 20px 50px rgba(27, 26, 23, 0.12);
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-height: 100vh;
    font-family: 'Georgia', 'Times New Roman', serif;
    color: var(--ink);
    background: radial-gradient(circle at top, #fff6e5 0%, var(--bg) 55%);
  }

  #root {
    min-height: 100vh;
  }
`

export default GlobalStyles
