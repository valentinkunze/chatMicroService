import { css, html, LitElement } from 'lit-element';
import '../components/UserList.js';
import '../components/UserItem.js';
import '../components/MessageList.js';
import '../components/MessageItem.js';
import '../components/SearchUsersItem.js';
import '../components/MessageHeaderItem.js';
import '../components/SendMessageItem.js';

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

    const nowString = new Date().toLocaleTimeString('de-DE').split(' ');
    this.users = [
      { id: 2, name: 'Noah', isOnline: true },
      { id: 3, name: 'Louisa', isOnline: true },
      { id: 1, name: 'Valentin', isOnline: true },
      { id: 5, name: 'Noah', isOnline: true },
      { id: 4, name: 'Eric', isOnline: true },
      { id: 6, name: 'Louisa', isOnline: false },
      { id: 7, name: 'Valentin', isOnline: false },
      { id: 8, name: 'Noah', isOnline: false },
      { id: 9, name: 'Louisa', isOnline: false },
    ];
    this.messages = [
      {
        senderName: 'WelcomeBot',
        sendTime: nowString,
        messageContent: 'Guten Morgen!',
      },
      {
        senderName: 'WelcomeBot',
        sendTime: nowString,
        messageContent: 'Guten Tag!',
      },
      {
        senderName: 'WelcomeBot',
        sendTime: nowString,
        messageContent: 'Schönen Abend!',
      },
    ];
    this.searchUserName = 'Valentin';
    this.selectedUserName = 'WelcomeBot';
  }

  static get styles() {
    return css`
      .chat {
        background-color: hsl(0, 0%, 96%);
      }

      .users {
        border-right: 10px solid;
        border-right-color: var(--background-color);
      }

      .headerSection {
        display: flex;
      }

      .userSearchItem {
        width: 40ch;
        max-width: 30vw;
        border-right: 10px solid;
        border-right-color: var(--background-color);
        border-bottom: 10px solid;
        border-bottom-color: var(--background-color);
      }

      .messageHeaderItem {
        width: 120ch;
        max-width: 90vw;
        border-bottom: 10px solid;
        border-bottom-color: var(--background-color);
      }

      .bodySection {
        display: flex;
      }

      .userList {
        border-right: 10px solid;
        border-right-color: var(--background-color);
      }

      .messageSection {
        position: relative;
      }

      .sendMessage {
        width: 120ch;
        max-width: 90vw;
        position: absolute;
        bottom: 0;
        left: 0;
      }
    `;
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
