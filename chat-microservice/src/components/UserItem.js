import { css, html, LitElement } from 'lit-element';
import { nothing } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';

export class UserItem extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      selected: { type: Boolean },
      isOnline: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      .user-item {
        padding: var(--chat-container-padding);
        border-bottom: 1px solid hsl(0, 0%, 86%);
        background-color: hsl(0, 0%, 96%);
        cursor: pointer;
        display: flex;
        justify-content: space-between;
      }

      .user-item > .name {
        font-size: 125%;
      }

      .user-item > .isOnline {
        color: #6a7071;
      }

      .user-item.-selected {
        background-color: hsl(0, 0%, 92%);
      }

      .user-item.-selected > .isOnline {
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
      class="user-item ${classMap({ '-selected': this.selected })}"
    >
      <span class="name">${this.name}</span>
      <span class="isOnline"
        >${this.isOnline ? 'is Online' : 'is Offline'}</span
      >
    </div>`;
  }
}

customElements.define('user-item', UserItem);
