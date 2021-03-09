/**
 * Sends a scheduled notification
 * @author mtownsend
 * @since March 08, 2021
 * @flow
 **/
import React, { useState, useCallback } from 'react';
import useNotifications from 'hooks/useNotifications.js';
const NotificationButton = () => {
  const [ disabled, setDisabled ] = useState(false);
  const sendNotification = useNotifications();
  const onClick = useCallback(() => {
    const time = new Date().getTime();
    setDisabled(true);
    sendNotification({
      title: 'Test notification',
      scheduledTime: new Date(time + 3000), // TODO
      body: 'This is a test',
      actions: [{
        action: '1',
        title: '☹️'
      }, {
        action: '2',
        title: '🙁'
      }, {
        action: '3',
        title: '😐'
      }, {
        action: '4',
        title: '🙂'
      }, {
        action: '5',
        title: '😀'
      }]
    }).then(() => setDisabled(false));
  }, [ setDisabled, sendNotification ]);
  return (
    <button disabled={disabled} onClick={onClick}>
      TEST
    </button>
  );
};

export default NotificationButton;