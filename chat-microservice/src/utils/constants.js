export const testUsers = [
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

export const testUser = 'Valentin';

export const testSelectedUserName = 'WelcomeBot';

export const now = new Date().toLocaleTimeString('de-DE').split(' ');

export const testMessages = [
  {
    senderName: 'WelcomeBot',
    sendTime: now,
    messageContent: 'Guten Morgen!',
  },
  {
    senderName: 'WelcomeBot',
    sendTime: now,
    messageContent: 'Guten Tag!',
  },
  {
    senderName: 'WelcomeBot',
    sendTime: now,
    messageContent: 'Schönen Abend!',
  },
];
