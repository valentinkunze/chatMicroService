import { html, LitElement } from 'lit-element';
import { nothing } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';
import { userItemCss } from '../style/components/UserItem.css.js';

export class UserItem extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      selected: { type: Boolean },
      isOnline: { type: Boolean },
    };
  }

  static get styles() {
    return userItemCss;
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
