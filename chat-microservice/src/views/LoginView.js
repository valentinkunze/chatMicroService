import { css, html, LitElement } from 'lit-element';
import '@inventage/leaflet-map';
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

      leaflet-map {
        flex: 1;

        /* stretch to edges */
        margin-left: calc(var(--amenity-container-padding) * -1);
        margin-right: calc(var(--amenity-container-padding) * -1);
        margin-bottom: calc(var(--amenity-container-padding) * -1);
      }

      .search-form {
        margin-bottom: 1rem;
      }
    `;
  }

  render() {
    return html`
      <h1>Login</h1>

      <div class="search-form">
        <mwc-textfield
          label="UserName"
          .value="${this.userName !== 'default' ? this.userName : ' '}"
          @keyup="${e => {
            this.userName = e.target.value;
            this.hasChosenName = true;
          }}"
        ></mwc-textfield>

        <mwc-button
          raised
          label="Enter Chat"
          @click="${this._triggerEnterChat}"
          .disabled="${!this._canEnterChat()}"
        ></mwc-button>
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
