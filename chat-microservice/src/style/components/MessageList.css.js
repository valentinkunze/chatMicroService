import { css } from 'lit-element';

export const messageListCss = css`
  .MessageList:not(:empty) {
    width: 120ch;
    max-width: 90vw;
  }

  .messages {
    padding-top: var(--chat-container-padding);
  }
`;
