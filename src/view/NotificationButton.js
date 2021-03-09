/**
 * Sends a scheduled notification
 * @author mtownsend
 * @since March 08, 2021
 * @flow
 **/
import React, { useState, useCallback } from 'react';
import useNotifications from 'hooks/useNotifications.js';
import MoodNotification from 'model/MoodNotification.js';

const NotificationButton = () => {
  const [ disabled, setDisabled ] = useState(false);
  const sendNotification = useNotifications();
  const onClick = useCallback(() => {
    setDisabled(true);
    sendNotification(MoodNotification(true)).then(() => setDisabled(false));
  }, [ setDisabled, sendNotification ]);
  return (
    <button disabled={disabled} onClick={onClick}>
      TEST
    </button>
  );
};

export default NotificationButton;