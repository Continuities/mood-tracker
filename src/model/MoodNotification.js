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
  title: string,
  url: string,
  scheduledTime?: Date,
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
  url: `${(typeof window === 'undefined' ? self : window).location.origin}/mood`,
  scheduledTime: sendNow ? undefined : getNextTime()
});

export default MoodNotification;