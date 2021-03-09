/**
 * Service worker for notifications
 * @author mtownsend
 * @since March 08, 2021
 * @flow
 **/

import { DatabaseConfig } from 'config.js';
import useNotifications from 'hooks/useNotifications.js';
import MoodNotification from 'model/MoodNotification.js';

const sendNotification = useNotifications(self.registration);

const getDatabase = (name, version) => {
  return new Promise((resolve, reject) => {
    const DBOpenRequest:IDBOpenDBRequest = self.indexedDB.open(name, version);
    DBOpenRequest.onerror = ({ target: { error }}) => reject(error);
    DBOpenRequest.onsuccess = ({ target: { result }}) => resolve(result);
  });
};

const recordMood = async (value:number) => {
  const object = {
    timestamp: new Date().getTime(),
    mood: value
  };
  const db = await getDatabase(DatabaseConfig.database, DatabaseConfig.version);
  return new Promise((resolve, reject) => {
    const request = db
      .transaction(DatabaseConfig.store, 'readwrite')
      .objectStore(DatabaseConfig.store)
      .add(object);
    request.onsuccess = () => resolve();
    request.onerror = ({ target: { error }}) => reject(`Add failed: ${error}`);
  }); 
}

self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('notificationclick', event => {
  console.info(`Received mood: ${event.action}`);
  if (event.action && !isNaN(event.action)) {
    sendNotification(MoodNotification());
    event.waitUntil(recordMood(parseInt(event.action)));
  }
});