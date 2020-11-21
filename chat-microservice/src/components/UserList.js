import { html, LitElement } from 'lit-element';
import { nothing } from 'lit-html';
import { userListCss } from '../style/components/UserList.css.js';

import './UserItem.js';
import '@material/mwc-textarea';

// TODO trigger event from UserSearchItem to update users
export class UserList extends LitElement {
  static get properties() {
    return {
      users: { type: Array },
      markers: { type: Array, attribute: false },
      selectedMarker: { type: Object, attribute: false },
    };
  }

  static get styles() {
    return userListCss;
    // :host {
    //     display: flex;
    //     flex: 1;
    //   }
    //
  }

  constructor() {
    super();
    this.users = [];
    this.markers = [];
    this.selectedMarker = null;
  }

  updated(changedProperties) {
    super.updated(changedProperties);

    if (changedProperties.has('userList')) {
      this._updateMarkersFromResults();
    }
  }

  render() {
    // TODO find friends form field
    // TODO @keyup="${e => {changeChat()}}"
    return html`
      <span class="users">
        <div class="userList">${this._renderUserList()}</div>
      </span>
    `;
  }

  _renderUserList() {
    if (!this._hasUsers()) {
      return nothing;
    }

    return html`${this.users.map(result => {
      const { id, name, isOnline } = result;
      return html` <user-item
        .name="${name}"
        .isOnline="${isOnline}"
        .selected="${this.selectedMarker && this.selectedMarker.id === id}"
        @click="${() => this._selectUser(id)}"
      ></user-item>`;
    })}`;
  }

  _selectUser(id) {
    const selectedMarker = this.markers.find(marker => marker.id === id);
    if (selectedMarker) {
      this.selectedMarker = selectedMarker;
    }
  }

  _hasUsers() {
    return this.users.length > 0;
  }

  _updateMarkersFromResults() {
    if (this.users.length < 1) {
      return;
    }

    this.markers = this.users.map(result => {
      const { id, userName, isOnline } = result;

      return {
        id,
        userName,
        isOnline,
      };
    });
  }
}

customElements.define('user-list', UserList);
