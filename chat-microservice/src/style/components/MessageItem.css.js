import { css } from 'lit-element';

export const messageItemCss = css`
  .message-item {
    padding: calc(var(--chat-container-padding) / 2);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
  }

  .senderName > span {
    padding-left: calc(var(--chat-container-padding) / 2);
  }

  .sendTime > span {
    color: #6a7071;
    padding-right: var(--chat-container-padding);
    padding-bottom: var(--chat-container-padding);
    font-size: 75%;
  }
`;
