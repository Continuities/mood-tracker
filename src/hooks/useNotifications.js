/**
 * Functionality for sending notifications via service worker
 * @author mtownsend
 * @since March 08, 2021
 * @flow
 **/

/* global TimestampTrigger */

// import { useEffect } from 'react';

type ActionConfig = {|
  action: string,
  title: string
|};

type NotificationConfig = {|
  scheduledTime: Date,
  title: string,
  body: string,
  badge?: string,
  icon?: string,
  actions?: Array<ActionConfig>
|};

const useNotifications = (): (config:NotificationConfig) => Promise<void> => {
  return async (config:NotificationConfig):Promise<void> => {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      alert('this app requires notifications');
      return;
    }
    const sw = await navigator.serviceWorker?.ready;
    if (!sw) {
      console.error('Service worker is not registered');
      return;
    }
    // $FlowIgnore[prop-missing] This feature is too new for Flow
    return sw.showNotification(config.title, {
      tag: config.scheduledTime.getTime(),
      body: config.body,
      // $FlowIgnore[cannot-resolve-name] This feature is too new for Flow
      showTrigger: new TimestampTrigger(config.scheduledTime.getTime()),
      data: {
        url: window.location.href
      },
      badge: config.badge,
      icon: config.icon,
      actions: config.actions
    });
  };
};

export default useNotifications;