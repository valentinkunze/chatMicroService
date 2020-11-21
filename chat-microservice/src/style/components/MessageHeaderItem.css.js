import { css } from 'lit-element';

export const messageHeaderItemCss = css`
  .messageHeaderItem {
    display: flex;
    padding: calc(var(--chat-container-padding) / 4);
    height: 70px;
  }

  .messageHeaderItem > mwc-icon-button {
    color: green;
    --mdc-icon-size: 40px;
    padding: calc(var(--chat-container-padding) / 2);
  }
`;
