import { css, html, LitElement } from 'lit-element';
import { nothing } from 'lit-html';

import './ChatItem.js';
import '@material/mwc-textarea';

export class ChatList extends LitElement {
  static get properties() {
    return {
      chats: { type: Array },

      // Internal properties
      markers: { type: Array, attribute: false },
      selectedMarker: { type: Object, attribute: false },
    };
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex: 1;
      }

      .chatList:not(:empty) {
        width: 40ch;
        max-width: 30vw;
      }

      .chat {
        flex: auto;
      }

      .chats {
        flex: auto;
        display: flex;
      }
    `;
  }

  constructor() {
    super();

    this.chats = [];
    this.markers = [];
    this.selectedMarker = null;
  }

  updated(changedProperties) {
    super.updated(changedProperties);

    if (changedProperties.has('chatList')) {
      this._updateMarkersFromResults();
    }
  }

  render() {
    const messageTemplate = 'Valentin: Hallo\nNoah: Hallo\n';
    return html`

         <div class="chats">
            <div class="chatList">${this._renderChatList()}</div>
                <mwc-textarea class="chat"
                    .value="${messageTemplate}"
                ></mwc-textarea>
             </div>
        </div>
    `;
    //   <mwc-textarea class="chat"
    //      .value="${messageTemplate}"
    //      @keyup="${e => {}}"
    // ></mwc-textarea>
  }

  _renderChatList() {
    if (!this._hasChats()) {
      return nothing;
    }

    return html`${this.chats.map(result => {
      const { id, name, isOnline } = result;

      return html`<chat-item
        .name="${name}"
        .isOnline="${isOnline}"
        .selected="${this.selectedMarker && this.selectedMarker.id === id}"
        @click="${() => this._selectChat(id)}"
      ></chat-item>`;
    })}`;
  }

  _selectChat(id) {
    const selectedMarker = this.markers.find(marker => marker.id === id);
    if (selectedMarker) {
      this.selectedMarker = selectedMarker;
    }
  }

  _hasChats() {
    return this.chats.length > 0;
  }

  _updateMarkersFromResults() {
    if (this.chats.length < 1) {
      return;
    }

    this.markers = this.chats.map(result => {
      const { id, userName, isOnline } = result;

      return {
        id,
        userName,
        isOnline,
      };
    });
  }
}

customElements.define('chat-list', ChatList);
