/**
 * Functionality for sending notifications via service worker
 * @author mtownsend
 * @since March 08, 2021
 * @flow
 **/

/* global TimestampTrigger */

import type { NotificationType } from 'model/MoodNotification.js';

const useNotifications = (registration?:ServiceWorkerRegistration): (config:NotificationType) => Promise<void> => {
  return async (config:NotificationType):Promise<void> => {
    if (!registration) {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        alert('this app requires notifications');
        return;
      }
    }
    const sw = registration || await navigator.serviceWorker?.ready;
    if (!sw) {
      console.error('Service worker is not registered');
      return;
    }
    // $FlowIgnore[prop-missing] This feature is too new for Flow
    return sw.showNotification(config.title, {
      // $FlowIgnore[cannot-resolve-name] This feature is too new for Flow
      showTrigger: config.scheduledTime ? new TimestampTrigger(config.scheduledTime.getTime()) : undefined,
      badge: config.badge,
      icon: config.icon,
      actions: config.actions
    });
  };
};

export default useNotifications;