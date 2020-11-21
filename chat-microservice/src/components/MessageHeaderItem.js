import { html, LitElement } from 'lit-element';
import { nothing } from 'lit-html';
import { messageHeaderItemCss } from '../style/components/MessageHeaderItem.css.js';

export class MessageHeaderItem extends LitElement {
  static get properties() {
    return {
      selectedUserName: { type: String },
    };
  }

  static get styles() {
    return messageHeaderItemCss;
  }

  constructor() {
    super();
    this.selectedUserName = '';
  }

  render() {
    if (!this.selectedUserName) {
      return nothing;
    }

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
