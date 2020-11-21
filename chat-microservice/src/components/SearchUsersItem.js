import { html, LitElement } from 'lit-element';
import { searchUserItemCss } from '../style/components/SearchUsersItem.css.js';

export class SearchUsersItem extends LitElement {
  static get properties() {
    return {
      searchUserName: { type: String },
    };
  }

  static get styles() {
    return searchUserItemCss;
  }

  constructor() {
    super();
    this.searchUserName = '';
  }

  render() {
    return html`
      <mwc-textfield
        class="searchUserName"
        label="Enter a name"
        .value="${this.searchUserName !== 'default'
          ? this.searchUserName
          : ' '}"
        @keyup="${e => {
          this.searchUserName = e.target.value;
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

customElements.define('search-users-item', SearchUsersItem);
