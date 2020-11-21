import { css } from 'lit-element';

export const userItemCss = css`
  .user-item {
    padding: calc(var(--chat-container-padding) * 4 / 3);
    border-bottom: 1px solid hsl(0, 0%, 86%);
    display: flex;
    justify-content: space-between;
  }

  .user-item > .name {
    font-size: 115%;
  }

  .user-item > .isOnline {
    color: #6a7071;
    font-size: 90%;
  }

  .user-item.-selected {
    background-color: hsl(0, 0%, 92%);
  }
`;
