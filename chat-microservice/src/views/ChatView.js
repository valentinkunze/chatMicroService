import { css, html, LitElement } from 'lit-element';
import '../components/ChatList.js';
import '../components/ChatItem.js';

export class ChatView extends LitElement {
  static get properties() {
    return {
      userName: { type: String },
      chats: { type: Array, attribute: false },
    };
  }

  constructor() {
    super();
    this.chats = [
      { id: 1, name: 'Valentin', isOnline: true },
      { id: 2, name: 'Noah', isOnline: true },
      { id: 3, name: 'Louisa', isOnline: true },
      { id: 4, name: 'Valentin', isOnline: true },
      { id: 5, name: 'Noah', isOnline: true },
      { id: 6, name: 'Louisa', isOnline: false },
      { id: 7, name: 'Valentin', isOnline: false },
      { id: 8, name: 'Noah', isOnline: false },
      { id: 9, name: 'Louisa', isOnline: false },
    ];
  }

  static get styles() {
    return css`
      :host {
        width: 100%;
        display: flex;
        flex-direction: column;
      }

      chat-list {
        position: relative;
        overflow-y: auto;
        flex: 1;

        /* stretch to edges */
        margin-left: calc(var(--amenity-container-padding) * -1);
        margin-right: calc(var(--amenity-container-padding) * -1);
        margin-bottom: calc(var(--amenity-container-padding) * -1);
      }
    `;
  }

  render() {
    return html`<chat-list .chats="${this.chats}"></chat-list>`;
  }
}

customElements.define('chat-view', ChatView);
