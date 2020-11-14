import { css, html, LitElement } from 'lit-element';
import '../components/UserList.js';
import '../components/UserItem.js';
import '../components/MessageList.js';
import '../components/MessageItem.js';
import '../components/UserSearchItem.js';
import '../components/MessageHeaderItem.js';

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
    this.users = [
      { id: 1, name: 'Valentin', isOnline: true },
      { id: 2, name: 'Noah', isOnline: true },
      { id: 3, name: 'Louisa', isOnline: true },
      { id: 4, name: 'Valentin', isOnline: true },
      { id: 5, name: 'Noah', isOnline: true },
      { id: 6, name: 'Louisa', isOnline: false },
      { id: 7, name: 'Valentin', isOnline: false },
      { id: 8, name: 'Noah', isOnline: false },
      { id: 9, name: 'Louisa', isOnline: false },
    ];
    this.messages = [
      {
        senderName: 'Valentin',
        sendTime: '18:30',
        messageContent: 'Yoyo what up?',
      },
      {
        senderName: 'Noah',
        sendTime: '18:30',
        messageContent: 'Yoyo what up?',
      },
      {
        senderName: 'Louisa',
        sendTime: '18:30',
        messageContent: 'Yoyo what up?',
      },
      {
        senderName: 'Valentin',
        sendTime: '18:30',
        messageContent: 'Yoyo what up?',
      },
      {
        senderName: 'Noah',
        sendTime: '18:30',
        messageContent: 'Yoyo what up?',
      },
    ];
    this.searchUserName = 'Valentin';
    this.selectedUserName = 'Valentin';
  }

  static get styles() {
    return css`
      .chat {
        display: flex;
        background-color: hsl(0, 0%, 96%);
      }

      .users {
        border-right: 10px solid;
        border-right-color: var(--background-color);
      }
    `;
    // flex: inline-flex;
  }

  render() {
    // TODO add send field for writing messages and add sendMessage()

    return html`
      <div class="chat">
        <div class="users">
          <user-search-item>
            .searchUserName="${this.searchUserName}"
          </user-search-item>
          <user-list .users="${this.users}"> </user-list>
        </div>
        <div class="messages">
          <message-header-item
            .selectedUserName="${this.selectedUserName}"
          ></message-header-item>
          <message-list .messages="${this.messages}"> </message-list>
        </div>
      </div>
    `;
  }
}

customElements.define('chat-view', ChatView);
