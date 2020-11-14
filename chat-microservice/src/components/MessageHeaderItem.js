import { css, html, LitElement } from 'lit-element';
// import { nothing } from 'lit-html';

export class MessageHeaderItem extends LitElement {
  static get properties() {
    return {
      selectedUserName: { type: String },
    };
  }

  static get styles() {
    return css`
      .messageHeaderItem {
        border-bottom: 1px solid hsl(0, 0%, 86%);
        background-color: hsl(0, 0%, 96%);
        display: flex;
        padding: calc(var(--chat-container-padding) / 4);
        height: 70px;
      }

      .userIcon {
        heigth: max-content;
        padding: calc(var(--chat-container-padding) / 2);
      }

      mwc-icon-button {
        color: green;
        --mdc-icon-size: 40px;
      }
    `;
  }

  constructor() {
    super();

    this.selectedUserName = '';
  }

  render() {
    // if (!this.selectedUserName) {
    //   return nothing;
    // }

    return html`
      <div class="messageHeaderItem">
        <mwc-icon-button class="userIcon" icon="adb"></mwc-icon-button>
        <h2>
          ${this.selectedUserName !== 'default' ? this.selectedUserName : ' '}
        </h2>
      </div>
    `;
  }
}

customElements.define('message-header-item', MessageHeaderItem);
