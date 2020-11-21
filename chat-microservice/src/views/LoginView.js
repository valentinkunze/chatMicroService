import { css, html, LitElement } from 'lit-element';
import '@material/mwc-button';
import '@material/mwc-textfield';

export class LoginView extends LitElement {
  static get properties() {
    return {
      userName: { type: String },
      hasChosenName: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      :host {
        --amenity-search-form-spacing: 1rem;

        flex: 1;
        display: flex;
        flex-direction: column;
      }

      .search-form {
        margin: auto;
      }

      .search-form > div {
        margin: auto;
      }

      .mwcTextfield {
        border-bottom: 10px solid transparent;
      }

      .mwcTextfield > mwc-textfield {
        background-color: hsl(0, 0%, 92%);
      }

      mwc-button {
        display: flex;
      }
    `;
  }

  render() {
    return html`
      <div class="search-form">
        <div class="mwcTextfield">
          <mwc-textfield
            label="UserName"
            .value="${this.userName !== 'default' ? this.userName : ''}"
            @keyup="${e => {
              this.userName = e.target.value;
              this.hasChosenName = true;
            }}"
            @keydown="${e => {
              if (e.key === 'Enter') {
                this._triggerEnterChat();
              }
            }}}"
          ></mwc-textfield>
        </div>
        <div class="mwcButton">
          <mwc-button
            raised
            label="Enter Chat"
            @click="${this._triggerEnterChat}"
          ></mwc-button>
        </div>
      </div>
    `;
  }

  _canEnterChat() {
    return this.hasChosenName;
  }

  _triggerEnterChat() {
    this.dispatchEvent(
      new CustomEvent('execute-search', {
        detail: {
          userName: this.userName,
          hasChosenName: this.hasChosenName,
        },
      })
    );
  }
}

customElements.define('login-view', LoginView);
