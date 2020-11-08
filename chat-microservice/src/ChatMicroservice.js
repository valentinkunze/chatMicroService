import { LitElement, html, css } from 'lit-element';
import '@material/mwc-drawer';
import '@material/mwc-top-app-bar';
import '@material/mwc-list/mwc-list.js';
import '@material/mwc-list/mwc-list-item.js';
import '@material/mwc-icon-button';
import './views/ResultsView.js';
import './views/LoginView.js';
import page from 'page';

export class ChatMicroservice extends LitElement {
  static get properties() {
    return {
      showSidebar: {
        type: Boolean,
      },
      currentView: { type: String },
      alreadySearched: { type: Boolean },
      latitude: { type: String },
      longitude: { type: String },
      radius: { type: Number },
    };
  }

  constructor() {
    super();
    this.showSidebar = false;
    this.currentView = 'login';
    this.alreadySearched = false;
    this.latitude = '47.3902';
    this.longitude = '8.5158';
    this.radius = 1000;
    this._initializeRoutes();
  }

  static get styles() {
    return css`
      :host {
        --amenity-container-padding: 1rem;
      }

      main {
        padding: var(--amenity-container-padding, 1rem);
        box-sizing: border-box;
        display: flex;
        flex: 1;
        max-height: calc(100vh - 64px);
      }

      [slot='appContent'] {
        display: flex;
        flex-direction: column;
        height: 100%;

        /* fixes issues where content would overlay sidebar */
        z-index: 1;
        position: relative;
      }
    `;
  }

  render() {
    return html`
      <mwc-drawer
        hasHeader
        type="modal"
        .open="${this.showSidebar}"
        @MDCDrawer:closed="${this._closeSidebar}"
      >
        <span slot="title">Navigation</span>

        <mwc-list>
          <mwc-list-item @click="${() => this._navigateToUrl('/login')}"
            >Login</mwc-list-item
          >
          <mwc-list-item @click="${() => this._navigateToUrl('/results')}"
            >Results</mwc-list-item
          >
        </mwc-list>

        <div slot="appContent">
          <mwc-top-app-bar>
            <mwc-icon-button
              icon="menu"
              slot="navigationIcon"
              @click="${() => {
                this.showSidebar = !this.showSidebar;
              }}"
            ></mwc-icon-button>
            <div slot="title">Quarkus Chat</div>
          </mwc-top-app-bar>
          <main>${this._renderCurrentView()}</main>
        </div>
      </mwc-drawer>
    `;
  }

  _renderCurrentView() {
    switch (this.currentView) {
      case 'login':
        return html`<login-view
          .latitude="${this.latitude}"
          .longitude="${this.longitude}"
          .radius="${this.radius}"
          @execute-search="${e =>
            page(
              `/results/${e.detail.latitude}/${e.detail.longitude}/${e.detail.radius}`
            )}"
        ></login-view>`;
      case 'results':
        return html`<results-view
          .latitude="${this.latitude}"
          .longitude="${this.longitude}"
          .radius="${this.radius}"
        >
          <p>
            <a
              href="${`/login/${this.latitude}/${this.longitude}/${this.radius}`}"
              >← Back to login</a
            >
          </p>
        </results-view>`;
      default:
        return ``;
    }
  }

  _navigateTo(view) {
    this.currentView = view;
    this.showSidebar = false;
  }

  _initializeRoutes() {
    page('/', () => {
      this.currentView = 'login';
    });
    page('/results', () => {
      if (this.alreadySearched) {
        page.redirect(
          `/results/${this.latitude}/${this.longitude}/${this.radius}`
        );
        return;
      }
      page.redirect('/login');
    });
    page('/results/:lat/:lon/:radius', ctx => {
      this._setSearchParametersFromRouteContext(ctx);
      this.currentView = 'results';
    });
    page('/login', () => {
      if (this.alreadySearched) {
        page.redirect(
          `/login/${this.latitude}/${this.longitude}/${this.radius}`
        );
        return;
      }

      this.currentView = 'login';
    });
    page('/login/:lat/:lon/:radius', ctx => {
      this._setSearchParametersFromRouteContext(ctx);
      this.currentView = 'login';
    });
    page();
  }

  _setSearchParametersFromRouteContext(ctx) {
    const {
      params: { radius, lat, lon },
    } = ctx;

    if (!radius || !lat || !lon) {
      return;
    }

    this.radius = radius;
    this.latitude = lat;
    this.longitude = lon;
    this.alreadySearched = true;
  }

  _navigateToUrl(url) {
    page(url);
    this._closeSidebar();
  }

  _closeSidebar() {
    this.showSidebar = false;
  }
}

customElements.define('chat-microservice', ChatMicroservice);
