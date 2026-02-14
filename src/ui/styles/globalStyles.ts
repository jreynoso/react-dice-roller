import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  :root {
    --bg: #04070f;
    --bg-secondary: #0a1220;
    --ink: #f4f7ff;
    --muted: #b8c2d9;
    --accent: #f5d64c;
    --accent-ink: #17120a;
    --panel: #111a2b;
    --panel-secondary: #0c1322;
    --panel-inactive: rgba(245, 214, 76, 0.18);
    --panel-box-shadow: rgba(245, 214, 76, 0.3);
    --border: #2f3f61;
    --wild-bg: #2a1216;
    --wild-border: #ff6d5f;
    --wild-ink: #ffcdc4;
    --complication: #cc6a00;
    --complication-secondary: rgba(204, 106, 0, 0.2);
    --overlay: rgba(1, 4, 10, 0.72);
    --shadow: 0 22px 65px rgba(0, 0, 0, 0.42);
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
    background:
      radial-gradient(circle at 20% 15%, rgba(245, 214, 76, 0.18) 0%, transparent 35%),
      radial-gradient(circle at 78% 18%, rgba(107, 176, 255, 0.18) 0%, transparent 40%),
      linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg) 72%);
  }

  #root {
    min-height: 100vh;
  }
`

export default GlobalStyles
