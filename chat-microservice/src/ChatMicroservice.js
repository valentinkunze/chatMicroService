import { LitElement, html, css } from 'lit-element';
import '@material/mwc-drawer';
import '@material/mwc-top-app-bar';
import '@material/mwc-list/mwc-list.js';
import '@material/mwc-list/mwc-list-item.js';
import '@material/mwc-icon-button';
import './views/ChatView.js';
import './views/LoginView.js';
import page from 'page';

export class ChatMicroservice extends LitElement {
  static get properties() {
    return {
      showSidebar: { type: Boolean },
      hasChosenName: { type: Boolean },
      userName: { type: String },
      currentView: { type: String },
    };
  }

  constructor() {
    super();
    this.showSidebar = false;
    this.currentView = 'login';
    this.hasChosenName = false;
    this.userName = ' ';
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
          <mwc-list-item @click="${() => this._navigateToUrl('/chat')}"
            >Chat</mwc-list-item
          >
        </mwc-list>

        <div slot="appContent">${this._renderAppContent()}</div>
      </mwc-drawer>
    `;
  }

  _renderAppContent() {
    if (this.currentView !== 'login') {
      return html`
        <mwc-top-app-bar>${this._renderHeader()}</mwc-top-app-bar>
        <main>${this._renderCurrentView()}</main>
      `;
    }
    return html`<main>${this._renderCurrentView()}</main>`;
  }

  _renderHeader() {
    return html`<mwc-icon-button
        icon="menu"
        slot="navigationIcon"
        @click="${() => {
          this.showSidebar = !this.showSidebar;
        }}"
      ></mwc-icon-button>
      <div slot="title">${`Chat Room (${this.userName})`}</div> `;
  }

  _renderCurrentView() {
    switch (this.currentView) {
      case 'login':
        return html`<login-view
          .userName="${this.userName}"
          @execute-search="${e => page(`/chat/${e.detail.userName}`)}"
        ></login-view>`;
      case 'chat':
        return html`<chat-view .userName="${this.userName}"> </chat-view>`;
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
    page('/login', () => {
      if (this.hasChosenName) {
        page.redirect(`/login/${this.userName}`);
        return;
      }
      this.currentView = 'login';
    });
    page('/chat', () => {
      if (this.hasChosenName) {
        page.redirect(`/chat/${this.userName}`);
        return;
      }
      page.redirect('/login');
    });
    page('/chat/:userName', ctx => {
      this._setUserNameFromRouteContext(ctx);
      this.currentView = 'chat';
    });

    page('/login/:userName', ctx => {
      this._setUserNameFromRouteContext(ctx);
      this.currentView = 'login';
    });
    page();
  }

  _setUserNameFromRouteContext(ctx) {
    const {
      params: { userName },
    } = ctx;

    if (!userName) {
      return;
    }

    this.userName = userName;
    this.hasChosenName = true;
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
