/**
 * Service worker for notifications
 * @author mtownsend
 * @since March 08, 2021
 * @flow
 **/

const recordMood = async e => {
  const path = `/mood/${e.action}`;
  const clientArray = await e.waitUntil(self.clients.matchAll({ 
    includeUncontrolled: true, 
    type: 'window' 
  }));
  const appWindow = clientArray && clientArray
    .find(windowClient => windowClient.url === e.notification.data.url);
  if (appWindow) {
    appWindow.focus();
    appWindow.location = path;
    return appWindow;
  }
  return self.clients.openWindow(path);
};

self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('notificationclick', event => {
  console.log(`Received action: ${event.action}`);
  recordMood(event);
});