import { css } from 'lit-element';

export const sendMessageItemCss = css`
  .message {
    padding-top: 0;
    padding-bottom: calc(var(--chat-container-padding) / 2);
    padding-left: calc(var(--chat-container-padding) / 2);
    padding-right: calc(var(--chat-container-padding) / 2);
    border-top: 1px solid hsl(0, 0%, 86%);
    cursor: pointer;
    display: flex;
  }
`;
