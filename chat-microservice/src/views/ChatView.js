import { html, LitElement } from 'lit-element';
import '../components/UserList.js';
import '../components/UserItem.js';
import '../components/MessageList.js';
import '../components/MessageItem.js';
import '../components/SearchUsersItem.js';
import '../components/MessageHeaderItem.js';
import '../components/SendMessageItem.js';
import {
  testUsers,
  testMessages,
  testUser,
  testSelectedUserName,
} from '../utils/constants.js';
import { chatViewCss } from '../style/views/ChatView.css.js';

export class ChatView extends LitElement {
  static get properties() {
    return {
      userName: { type: String },
      selectedUserName: { type: String },
      searchUserName: { type: String },
      users: { type: Array, attribute: false },
      messages: { type: Array, attribute: false },
    };
  }

  constructor() {
    super();
    this.users = testUsers;
    this.messages = testMessages;
    this.searchUserName = testUser;
    this.selectedUserName = testSelectedUserName;
  }

  static get styles() {
    return chatViewCss;
  }

  render() {
    return html`
      <div class="chat">
        <div class="headerSection">
          <div class="userSearchItem">
            <search-users-item>
              .searchUserName="${this.searchUserName}"
            </search-users-item>
          </div>
          <div class="messageHeaderItem">
            <message-header-item
              .selectedUserName="${this.selectedUserName}"
            ></message-header-item>
          </div>
        </div>

        <div class="bodySection">
          <user-list class="userList" .users="${this.users}"> </user-list>
          <div class="messageSection">
            <message-list .messages="${this.messages}"> </message-list>
            <div class="sendMessage">
              <send-message-item></send-message-item>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('chat-view', ChatView);
