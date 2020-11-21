import { css, html, LitElement } from 'lit-element';

export class SearchUsersItem extends LitElement {
  static get properties() {
    return {
      searchUserName: { type: String },
    };
  }

  static get styles() {
    return css`
      .searchUserName {
        padding: calc(var(--chat-container-padding) / 2);
        background-color: hsl(0, 0%, 96%);
        cursor: pointer;
        display: flex;
      }
    `;
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
