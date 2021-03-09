/**
 * Service worker for notifications
 * @author mtownsend
 * @since March 08, 2021
 * @flow
 **/

import useNotifications from 'hooks/useNotifications.js';
import MoodNotification from 'model/MoodNotification.js';

const sendNotification = useNotifications(self.registration);

self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('notificationclick', event => {
  const url = event.notification.data.url;
  sendNotification(MoodNotification());
  console.log(self.location);
  event.notification.close();
  event.waitUntil(self
    .clients
    .openWindow(url)
    .then(w => w && w.focus()));
});