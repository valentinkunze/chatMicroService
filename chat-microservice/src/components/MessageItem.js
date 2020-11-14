import { css, html, LitElement } from 'lit-element';
import { nothing } from 'lit-html';

export class MessageItem extends LitElement {
  static get properties() {
    return {
      senderName: { type: String },
      messageContent: { type: String },
      sendTime: { type: String },
    };
  }

  static get styles() {
    return css`
      .message-item {
        padding: calc(var(--chat-container-padding) / 2);
        background-color: hsl(0, 0%, 96%);
        cursor: pointer;
      }
    `;
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
      <span>${this.sendTime}</span>
      <span>${this.senderName} + ':'</span>
      <span>${this.messageContent}</span>
    </div>`;
  }
}

customElements.define('message-item', MessageItem);
