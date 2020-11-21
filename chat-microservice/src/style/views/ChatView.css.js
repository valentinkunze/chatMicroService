import { css } from 'lit-element';

export const chatViewCss = css`
  .chat {
    background-color: hsl(0, 0%, 96%);
  }

  .chat > div {
    display: flex;
  }

  .headerSection > div {
    border-bottom: 10px solid;
    border-color: var(--background-color);
  }

  .userSearchItem {
    width: 40ch;
    max-width: 30vw;
    border-right: 10px solid;
  }

  .messageHeaderItem {
    width: 120ch;
    max-width: 90vw;
  }

  .userList {
    border-right: 10px solid;
    border-right-color: var(--background-color);
  }

  .messageSection {
    position: relative;
  }

  .sendMessage {
    width: 120ch;
    max-width: 90vw;
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;
