import { html, LitElement } from 'lit-element';
import { nothing } from 'lit-html';
import { messageListCss } from '../style/components/MessageList.css.js';
import './MessageItem.js';
import '@material/mwc-textarea';

export class MessageList extends LitElement {
  static get properties() {
    return {
      messages: { type: Array },
      markers: { type: Array, attribute: false },
      selectedMarker: { type: Object, attribute: false },
    };
  }

  static get styles() {
    return messageListCss;
  }

  constructor() {
    super();
    this.messages = [];
    this.markers = [];
    this.selectedMarker = null;
  }

  updated(changedProperties) {
    super.updated(changedProperties);

    if (changedProperties.has('MessageList')) {
      this._updateMarkersFromResults();
    }
  }

  render() {
    // TODO @keyup="${e => {changeChat()}}"
    return html`
      <div class="messages">
        <div class="MessageList">${this._renderUserList()}</div>
      </div>
    `;
  }

  _renderUserList() {
    if (!this._hasUsers()) {
      return nothing;
    }

    return html`${this.messages.map(result => {
      const { senderName, sendTime, messageContent } = result;

      return html`<message-item
        .senderName="${senderName}"
        .sendTime="${sendTime}"
        .messageContent="${messageContent}"
      ></message-item>`;
    })}`;
  }

  _hasUsers() {
    return this.messages.length > 0;
  }

  _updateMarkersFromResults() {
    if (this.messages.length < 1) {
      return;
    }

    this.markers = this.messages.map(result => {
      const { senderName, sendTime, messageContent } = result;

      return {
        senderName,
        sendTime,
        messageContent,
      };
    });
  }
}

customElements.define('message-list', MessageList);
