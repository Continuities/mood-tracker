/**
 * Models a mood recording notification
 * @author mtownsend
 * @since March 09, 2021
 * @flow
 **/

import { NotificationConfig } from 'config.js';

type ActionConfig = {|
  action: string,
  title: string
|};

export type NotificationType = {|
  scheduledTime?: Date,
  title: string,
  badge?: string,
  icon?: string,
  actions?: Array<ActionConfig>
|};

const getNextTime = () => {
  const schedule = NotificationConfig.schedule;
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDay() + 1, schedule.hour);
}

const MoodNotification = (sendNow:boolean = false): NotificationType => ({
  title: NotificationConfig.title,
  scheduledTime: sendNow ? undefined : getNextTime(),
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
});

export default MoodNotification;