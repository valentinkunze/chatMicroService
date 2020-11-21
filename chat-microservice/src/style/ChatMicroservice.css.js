import { css } from 'lit-element';

export const chatMicroserviceCss = css`
  :host {
    --chat-container-padding: 1rem;
  }

  main {
    padding: var(--chat-container-padding, 1rem);
    box-sizing: border-box;
    display: flex;
    flex: 1;
    max-height: calc(100vh - 64px);
  }

  [slot='appContent'] {
    display: flex;
    flex-direction: column;
    height: 100%;

    /* fixes issues where content would overlay sidebar */
    z-index: 1;
    position: relative;
  }

  .loginView {
    background-image: url('./Background.jpg');
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
`;
