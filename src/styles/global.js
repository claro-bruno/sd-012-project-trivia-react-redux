/* eslint-disable indent */
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle` /* desabilitando problema stylelint */
  .App-logo {
    pointer-events: none;
  }

  @media ( prefers-reduced-motion : no-preference ) {

    .App-logo {
      animation: shake infinite 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    }
  }

  @keyframes shake {

    10%, 90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%, 80% {
      transform: translate3d(2px, 0, 0);
    }

    30%, 50%, 70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%, 60% {
      transform: translate3d(4px, 0, 0);
    }
  }
`;

export default GlobalStyle;