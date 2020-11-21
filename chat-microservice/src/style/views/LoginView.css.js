import { css } from 'lit-element';

export const loginViewCss = css`
  :host {
    --amenity-search-form-spacing: 1rem;

    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .search-form {
    margin: auto;
  }

  .search-form > div {
    margin: auto;
  }

  .mwcTextfield {
    border-bottom: 10px solid transparent;
  }

  .mwcTextfield > mwc-textfield {
    background-color: hsl(0, 0%, 92%);
  }

  mwc-button {
    display: flex;
  }
`;
