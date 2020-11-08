import { css, html, LitElement } from 'lit-element';
import '@inventage/leaflet-map';
import '@material/mwc-button';
import '@material/mwc-textfield';

export class LoginView extends LitElement {
  static get properties() {
    return {
      userName: { type: String },
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
      <h1>Search</h1>

      <div class="search-form">
        <mwc-textfield
          label="UserName"
          .value="${this.userName}"
          @keyup="${e => {
            this.userName = e.target.value;
          }}"
        ></mwc-textfield>

        <mwc-button
          raised
          label="Search"
          @click="${this._triggerSearch}"
          .disabled="${!this._canSearch()}"
        ></mwc-button>
      </div>
    `;
  }

  _canSearch() {
    return this.latitude && this.longitude && this.radius;
  }

  _triggerSearch() {
    this.dispatchEvent(
      new CustomEvent('execute-search', {
        detail: {
          latitude: this.latitude,
          longitude: this.longitude,
          radius: this.radius,
        },
      })
    );
  }
}

customElements.define('login-view', LoginView);
