import { css, html, LitElement } from 'lit-element';
import { nothing } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';

export class ChatItem extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      selected: { type: Boolean },
      isOnline: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      .chat-item {
        padding: var(--amenity-container-padding);
        border-bottom: 1px solid hsl(0, 0%, 86%);
        background-color: hsl(0, 0%, 96%);
        cursor: pointer;
        display: flex;
        justify-content: space-between;
      }

      .chat-item > .name {
        font-size: 125%;
      }

      .chat-item > .distance {
        color: #6a7071;
      }

      .chat-item.-selected {
        background-color: hsl(0, 0%, 92%);
      }

      .chat-item.-selected > .isOnline {
        color: #535859;
      }
    `;
  }

  constructor() {
    super();

    this.name = '';
    this.selected = false;
    this.isOnline = true;
  }

  render() {
    if (!this.name) {
      return nothing;
    }

    return html`<div
      class="chat-item ${classMap({ '-selected': this.selected })}"
    >
      <span class="name">${this.name}</span>
      <span class="isOnline"
        >${this.isOnline ? 'is Online' : 'is Offline'}</span
      >
    </div>`;
  }
}

customElements.define('chat-item', ChatItem);
