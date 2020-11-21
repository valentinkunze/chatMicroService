import { LitElement, html } from 'lit-element';
import '@material/mwc-drawer';
import '@material/mwc-top-app-bar';
import '@material/mwc-list/mwc-list.js';
import '@material/mwc-list/mwc-list-item.js';
import '@material/mwc-icon-button';
import './views/ChatView.js';
import './views/LoginView.js';
import page from 'page';
import { chatMicroserviceCss } from './style/ChatMicroservice.css.js';

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
    this.userName = '';

    this._initializeRoutes();
  }

  static get styles() {
    return chatMicroserviceCss;
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
        ${this._renderAppContent()}
      </mwc-drawer>
    `;
  }

  _renderAppContent() {
    switch (this.currentView) {
      case 'login':
        return html`
          <div slot="appContent" class="loginView">
            <main>
              <login-view
                .userName="${this.userName}"
                @execute-search="${e => page(`/chat/${e.detail.userName}`)}"
              ></login-view>
            </main>
          </div>
        `;
      case 'chat':
        return html`
          <div slot="appContent">
            <mwc-top-app-bar>${this._renderHeader()}</mwc-top-app-bar>
            <main><chat-view .userName="${this.userName}"> </chat-view></main>
          </div>
        `;
      default:
        return html` <mwc-top-app-bar
          >${this._renderHeader()}</mwc-top-app-bar
        >`;
    }
  }

  _renderHeader() {
    return html`<mwc-icon-button
        icon="menu"
        slot="navigationIcon"
        @click="${() => {
          this.showSidebar = !this.showSidebar;
        }}"
      ></mwc-icon-button>
      <div slot="title">${`Chat Room`}</div> `;
  }

  _initializeRoutes() {
    page('/', () => {
      this.currentView = 'login';
    });
    page('/login', () => {
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
