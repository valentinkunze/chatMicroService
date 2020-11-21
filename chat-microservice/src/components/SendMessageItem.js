import { css, html, LitElement } from 'lit-element';

export class SendMessageItem extends LitElement {
  static get properties() {
    return {
      message: { type: String },
    };
  }

  static get styles() {
    return css`
      .message {
        padding-top: 0;
        padding-bottom: calc(var(--chat-container-padding) / 2);
        padding-left: calc(var(--chat-container-padding) / 2);
        padding-right: calc(var(--chat-container-padding) / 2);
        border-top: 1px solid hsl(0, 0%, 86%);
        background-color: hsl(0, 0%, 96%);
        cursor: pointer;
        display: flex;
      }
    `;
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

  // _triggerEnterChat() {
  //   // TODO goOnline()
  //   this.dispatchEvent(
  //     new CustomEvent('execute-search', {
  //       detail: {
  //         searchUserName: this.searchUserName,
  //       },
  //     })
  //   );
  // }
}

customElements.define('send-message-item', SendMessageItem);
