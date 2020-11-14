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
