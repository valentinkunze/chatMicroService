import { html, LitElement } from 'lit-element';
import { nothing } from 'lit-html';
import { messageItemCss } from '../style/components/MessageItem.css.js';

export class MessageItem extends LitElement {
  static get properties() {
    return {
      senderName: { type: String },
      messageContent: { type: String },
      sendTime: { type: String },
    };
  }

  static get styles() {
    return messageItemCss;
  }

  constructor() {
    super();
    this.senderName = '';
    this.messageContent = '';
    this.sendTime = '';
  }

  render() {
    if (!this.senderName) {
      return nothing;
    }

    return html` <div class="message-item">
      <div class="senderName">
        <span>${`${this.senderName}:`}</span>
        <span>${this.messageContent}</span>
      </div>
      <div class="sendTime">
        <span>${this.sendTime}</span>
      </div>
    </div>`;
  }
}

customElements.define('message-item', MessageItem);
