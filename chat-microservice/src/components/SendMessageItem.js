import { html, LitElement } from 'lit-element';
import { sendMessageItemCss } from '../style/components/SendMessageItem.css.js';

export class SendMessageItem extends LitElement {
  static get properties() {
    return {
      message: { type: String },
    };
  }

  static get styles() {
    return sendMessageItemCss;
  }

  constructor() {
    super();
    this.message = '';
  }

  render() {
    return html`
      <mwc-textfield
        class="message"
        label="Write a message"
        .value="${this.message}"
        @keyup="${e => {
          this.message = e.target.value;
        }}"
      ></mwc-textfield>
    `;
  }
}

customElements.define('send-message-item', SendMessageItem);
